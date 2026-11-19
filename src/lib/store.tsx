"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import type { Session } from "@supabase/supabase-js";
import { getSupabase, supabaseEnabled } from "./supabase";
import type { LessonId } from "./types";
import type { Answer } from "./utils";

export interface CardState {
  box: number; // 1..5 (Leitner)
  due: number; // epoch ms
}

export interface ProgressData {
  startDate: string | null;
  steps: Record<string, boolean>; // "d1:l9-smells"
  lastStep: Record<string, number>; // day -> step index
  daysDone: Record<string, string>; // day -> ISO completedAt
  checks: Record<string, boolean>; // question id -> answered correctly
  cards: Record<string, CardState>;
  updatedAt: number;
}

export interface Attempt {
  id: string;
  examId: number;
  mode: "full" | "missed";
  score: number;
  total: number;
  answers: Record<string, Answer>;
  qids?: string[]; // questions included in this attempt
  byTopic: Partial<Record<LessonId, { c: number; t: number }>>;
  durationSec: number;
  createdAt: string;
}

export type SyncState = "local" | "signed-out" | "syncing" | "synced" | "error";

const EMPTY: ProgressData = { startDate: null, steps: {}, lastStep: {}, daysDone: {}, checks: {}, cards: {}, updatedAt: 0 };
const LS_PROGRESS = "ensf607:progress:v1";
const LS_ATTEMPTS = "ensf607:attempts:v1";

// Leitner intervals in days for boxes 1..5
const INTERVALS = [0, 0, 1, 2, 4, 7];

function readLS<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}
function writeLS(key: string, value: unknown) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage full or blocked: ignore */
  }
}

function mergeProgress(a: ProgressData, b: ProgressData): ProgressData {
  const newer = a.updatedAt >= b.updatedAt ? a : b;
  const older = newer === a ? b : a;
  const cards: Record<string, CardState> = { ...older.cards };
  for (const [k, v] of Object.entries(newer.cards)) cards[k] = v;
  return {
    startDate: newer.startDate ?? older.startDate,
    steps: { ...older.steps, ...newer.steps },
    lastStep: { ...older.lastStep, ...newer.lastStep },
    daysDone: { ...older.daysDone, ...newer.daysDone },
    checks: { ...older.checks, ...newer.checks },
    cards,
    updatedAt: Math.max(a.updatedAt, b.updatedAt),
  };
}

interface Ctx {
  ready: boolean;
  progress: ProgressData;
  attempts: Attempt[];
  session: Session | null;
  sync: SyncState;
  syncError: string | null;
  setStartDate: (iso: string | null) => void;
  markStep: (day: number, stepId: string, index: number) => void;
  setLastStep: (day: number, index: number) => void;
  markDayDone: (day: number) => void;
  recordCheck: (qid: string, correct: boolean) => void;
  gradeCard: (cardId: string, knew: boolean) => void;
  addAttempt: (a: Attempt) => void;
  resetAll: () => Promise<void>;
  sendMagicLink: (email: string) => Promise<string | null>;
  verifyCode: (email: string, code: string) => Promise<string | null>;
  signOut: () => Promise<void>;
}

const StudyContext = createContext<Ctx | null>(null);

export function useStudy() {
  const c = useContext(StudyContext);
  if (!c) throw new Error("useStudy must be used inside <StudyProvider>");
  return c;
}

export function StudyProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [progress, setProgress] = useState<ProgressData>(EMPTY);
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [session, setSession] = useState<Session | null>(null);
  const [sync, setSync] = useState<SyncState>(supabaseEnabled ? "signed-out" : "local");
  const [syncError, setSyncError] = useState<string | null>(null);
  const pushTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const progressRef = useRef(progress);
  progressRef.current = progress;

  // 1) Load local data
  useEffect(() => {
    setProgress({ ...EMPTY, ...readLS<ProgressData>(LS_PROGRESS, EMPTY) });
    setAttempts(readLS<Attempt[]>(LS_ATTEMPTS, []));
    setReady(true);
  }, []);

  // 2) Supabase auth
  useEffect(() => {
    const sb = getSupabase();
    if (!sb) return;
    sb.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: sub } = sb.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  const userId = session?.user.id ?? null;

  // 3) Pull + merge remote when signed in
  useEffect(() => {
    if (!ready) return;
    const sb = getSupabase();
    if (!sb) return;
    if (!userId) {
      setSync("signed-out");
      return;
    }
    let cancelled = false;
    (async () => {
      setSync("syncing");
      setSyncError(null);
      try {
        const { data: prow, error: perr } = await sb.from("progress").select("data").eq("user_id", userId).maybeSingle();
        if (perr) throw perr;
        const remote = (prow?.data as ProgressData | undefined) ?? null;
        const merged = remote ? mergeProgress(progressRef.current, { ...EMPTY, ...remote }) : progressRef.current;
        const { error: uerr } = await sb.from("progress").upsert({ user_id: userId, data: merged, updated_at: new Date().toISOString() });
        if (uerr) throw uerr;

        const { data: arows, error: aerr } = await sb.from("exam_attempts").select("*").eq("user_id", userId).order("created_at", { ascending: true });
        if (aerr) throw aerr;
        const remoteAttempts: Attempt[] = (arows ?? []).map((r) => ({
          id: r.id as string,
          examId: r.exam_id as number,
          mode: (r.mode as "full" | "missed") ?? "full",
          score: r.score as number,
          total: r.total as number,
          answers: (r.answers ?? {}) as Record<string, Answer>,
          qids: (r.question_ids ?? undefined) as string[] | undefined,
          byTopic: (r.by_topic ?? {}) as Attempt["byTopic"],
          durationSec: (r.duration_sec as number) ?? 0,
          createdAt: r.created_at as string,
        }));
        const remoteIds = new Set(remoteAttempts.map((a) => a.id));
        const localOnly = readLS<Attempt[]>(LS_ATTEMPTS, []).filter((a) => !remoteIds.has(a.id));
        if (localOnly.length) {
          const { error: ierr } = await sb.from("exam_attempts").insert(localOnly.map((a) => toRow(a, userId)));
          if (ierr) throw ierr;
        }
        const all = [...remoteAttempts, ...localOnly].sort((x, y) => x.createdAt.localeCompare(y.createdAt));
        if (cancelled) return;
        setProgress(merged);
        writeLS(LS_PROGRESS, merged);
        setAttempts(all);
        writeLS(LS_ATTEMPTS, all);
        setSync("synced");
      } catch (e) {
        if (cancelled) return;
        setSync("error");
        setSyncError(e instanceof Error ? e.message : String((e as { message?: string })?.message ?? e));
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [ready, userId]);

  // Push progress (debounced)
  const schedulePush = useCallback(
    (p: ProgressData) => {
      const sb = getSupabase();
      if (!sb || !userId) return;
      if (pushTimer.current) clearTimeout(pushTimer.current);
      pushTimer.current = setTimeout(async () => {
        setSync("syncing");
        const { error } = await sb.from("progress").upsert({ user_id: userId, data: p, updated_at: new Date().toISOString() });
        if (error) {
          setSync("error");
          setSyncError(error.message);
        } else setSync("synced");
      }, 800);
    },
    [userId],
  );

  const update = useCallback(
    (fn: (p: ProgressData) => ProgressData) => {
      setProgress((prev) => {
        const next = { ...fn(prev), updatedAt: Date.now() };
        writeLS(LS_PROGRESS, next);
        schedulePush(next);
        return next;
      });
    },
    [schedulePush],
  );

  const value = useMemo<Ctx>(
    () => ({
      ready,
      progress,
      attempts,
      session,
      sync,
      syncError,
      setStartDate: (iso) => update((p) => ({ ...p, startDate: iso })),
      markStep: (day, stepId, index) =>
        update((p) => ({ ...p, steps: { ...p.steps, [`d${day}:${stepId}`]: true }, lastStep: { ...p.lastStep, [day]: index } })),
      setLastStep: (day, index) => update((p) => ({ ...p, lastStep: { ...p.lastStep, [day]: index } })),
      markDayDone: (day) =>
        update((p) => (p.daysDone[day] ? p : { ...p, daysDone: { ...p.daysDone, [day]: new Date().toISOString() } })),
      recordCheck: (qid, correct) => update((p) => ({ ...p, checks: { ...p.checks, [qid]: correct } })),
      gradeCard: (cardId, knew) =>
        update((p) => {
          const cur = p.cards[cardId]?.box ?? 1;
          const box = knew ? Math.min(5, cur + 1) : 1;
          const due = Date.now() + INTERVALS[box] * 86400000;
          return { ...p, cards: { ...p.cards, [cardId]: { box, due } } };
        }),
      addAttempt: (a) => {
        setAttempts((prev) => {
          const next = [...prev, a];
          writeLS(LS_ATTEMPTS, next);
          return next;
        });
        const sb = getSupabase();
        if (sb && userId) {
          sb.from("exam_attempts")
            .insert(toRow(a, userId))
            .then(({ error }) => {
              if (error) {
                setSync("error");
                setSyncError(error.message);
              }
            });
        }
      },
      resetAll: async () => {
        const sb = getSupabase();
        if (sb && userId) {
          await sb.from("exam_attempts").delete().eq("user_id", userId);
          await sb.from("progress").delete().eq("user_id", userId);
        }
        const fresh = { ...EMPTY, updatedAt: Date.now() };
        setProgress(fresh);
        setAttempts([]);
        writeLS(LS_PROGRESS, fresh);
        writeLS(LS_ATTEMPTS, []);
      },
      sendMagicLink: async (email) => {
        const sb = getSupabase();
        if (!sb) return "Supabase is not configured.";
        const { error } = await sb.auth.signInWithOtp({ email, options: { emailRedirectTo: window.location.origin + "/account" } });
        return error ? error.message : null;
      },
      verifyCode: async (email, code) => {
        const sb = getSupabase();
        if (!sb) return "Supabase is not configured.";
        const { error } = await sb.auth.verifyOtp({ email, token: code.trim(), type: "email" });
        return error ? error.message : null;
      },
      signOut: async () => {
        const sb = getSupabase();
        if (sb) await sb.auth.signOut();
      },
    }),
    [ready, progress, attempts, session, sync, syncError, update, userId],
  );

  return <StudyContext.Provider value={value}>{children}</StudyContext.Provider>;
}

function toRow(a: Attempt, userId: string) {
  return {
    id: a.id,
    user_id: userId,
    exam_id: a.examId,
    mode: a.mode,
    score: a.score,
    total: a.total,
    answers: a.answers,
    question_ids: a.qids ?? null,
    by_topic: a.byTopic,
    duration_sec: a.durationSec,
    created_at: a.createdAt,
  };
}
