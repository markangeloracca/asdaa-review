"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { DAYS, EXAMS, TOPIC_COLOR, TOPIC_LABEL } from "@/content";
import { useStudy, type Attempt } from "@/lib/store";
import type { LessonId, Question } from "@/lib/types";
import { answerText, cx, fmtDuration, isCorrect, prettyDate, shuffle, uid, type Answer } from "@/lib/utils";
import { dateForDay, currentPlanDay } from "@/lib/schedule";
import { QuizItem } from "./QuizItem";
import { Rich } from "./Rich";

type Phase = "intro" | "run" | "results";

function scoreOf(qs: Question[], answers: Record<string, Answer>) {
  const byTopic: Partial<Record<LessonId, { c: number; t: number }>> = {};
  let score = 0;
  for (const q of qs) {
    const ok = isCorrect(q, answers[q.id]);
    if (ok) score++;
    const cur = byTopic[q.topic] ?? { c: 0, t: 0 };
    byTopic[q.topic] = { c: cur.c + (ok ? 1 : 0), t: cur.t + 1 };
  }
  return { score, byTopic };
}

export default function ExamRunner({ examId }: { examId: number }) {
  const exam = EXAMS[examId - 1];
  const { attempts, addAttempt, progress } = useStudy();
  const mine = attempts.filter((a) => a.examId === examId);
  const lastFull = [...mine].reverse().find((a) => a.mode === "full");
  const missedIds = lastFull ? exam.questions.filter((q) => !isCorrect(q, lastFull.answers[q.id])).map((q) => q.id) : [];

  const [phase, setPhase] = useState<Phase>("intro");
  const [practice, setPractice] = useState(false);
  const [mode, setMode] = useState<"full" | "missed">("full");
  const [qs, setQs] = useState<Question[]>([]);
  const [orders, setOrders] = useState<Record<string, number[]>>({});
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const [flags, setFlags] = useState<Record<string, boolean>>({});
  const [idx, setIdx] = useState(0);
  const [startedAt, setStartedAt] = useState(0);
  const [now, setNow] = useState(Date.now());
  const [confirm, setConfirm] = useState(false);
  const [grid, setGrid] = useState(false);
  const [result, setResult] = useState<Attempt | null>(null);
  const [reviewFilter, setReviewFilter] = useState<"all" | "wrong">("wrong");

  useEffect(() => {
    if (phase !== "run") return;
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, [phase]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [idx, phase]);

  const start = (m: "full" | "missed") => {
    const pool = m === "full" ? exam.questions : exam.questions.filter((q) => missedIds.includes(q.id));
    const list = shuffle(pool);
    const o: Record<string, number[]> = {};
    for (const q of list) if (q.options) o[q.id] = shuffle(q.options.map((_, i) => i));
    setMode(m);
    setQs(list);
    setOrders(o);
    setAnswers({});
    setRevealed({});
    setFlags({});
    setIdx(0);
    setStartedAt(Date.now());
    setNow(Date.now());
    setConfirm(false);
    setGrid(false);
    setResult(null);
    setPhase("run");
  };

  const submit = () => {
    const { score, byTopic } = scoreOf(qs, answers);
    const a: Attempt = {
      id: uid(),
      examId,
      mode,
      score,
      total: qs.length,
      answers,
      qids: qs.map((q) => q.id),
      byTopic,
      durationSec: Math.round((Date.now() - startedAt) / 1000),
      createdAt: new Date().toISOString(),
    };
    addAttempt(a);
    setResult(a);
    setReviewFilter(score === qs.length ? "all" : "wrong");
    setPhase("results");
  };

  const openPast = (a: Attempt) => {
    const ids = a.qids ?? (a.mode === "full" ? exam.questions.map((q) => q.id) : Object.keys(a.answers));
    const pool = exam.questions.filter((q) => ids.includes(q.id));
    setQs(pool);
    setResult(a);
    setReviewFilter("wrong");
    setPhase("results");
  };

  const answered = Object.keys(answers).length;
  const elapsed = Math.round((now - startedAt) / 1000);
  const sched = dateForDay(progress.startDate, exam.scheduleDay);
  const early = !exam.bonus && progress.startDate ? currentPlanDay(progress.startDate) < exam.scheduleDay : false;
  const reviewDone = [1, 2, 3].every((d) => progress.daysDone[d]);

  /* ---------------- INTRO ---------------- */
  if (phase === "intro")
    return (
      <div className="mx-auto max-w-3xl px-5 py-6 md:px-8 md:py-10">
        <Link href="/exams" className="text-sm font-medium text-slate-500">
          ← All mock exams
        </Link>
        <div className="mt-3 text-sm font-bold text-amber-600">
          {exam.bonus ? "EXTRA PRACTICE" : `DAY ${exam.scheduleDay}`} · EXAM {exam.id} OF {EXAMS.length}
        </div>
        <h1 className="mt-1 font-display text-4xl font-bold leading-tight">{exam.title}</h1>
        <p className="mt-2 text-lg text-slate-600">{exam.focus}</p>

        <div className="mt-6 grid grid-cols-3 gap-3">
          {[
            ["Questions", String(exam.questions.length)],
            ["Target time", `${exam.minutes} min`],
            ["Mix", "All 6 lectures"],
          ].map(([k, v]) => (
            <div key={k} className="rounded-2xl bg-white p-4 ring-1 ring-slate-200">
              <div className="text-xs font-semibold uppercase text-slate-500">{k}</div>
              <div className="mt-1 font-display text-2xl font-bold">{v}</div>
            </div>
          ))}
        </div>

        {(early || !reviewDone) && (
          <div className="mt-5 rounded-2xl bg-amber-50 p-4 text-[15px] ring-1 ring-amber-200">
            <b>Spacing tip:</b> {early && sched ? `This exam is scheduled for ${prettyDate(sched)} (Day ${exam.scheduleDay}). ` : ""}
            {!reviewDone ? "You haven't finished all 3 review days yet. " : ""}
            Taking it on schedule gives your memory a useful gap, but you can start whenever you like.
          </div>
        )}

        <div className="mt-6 rounded-2xl bg-white p-5 ring-1 ring-slate-200">
          <div className="font-semibold">Mode</div>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {[
              [false, "📝 Exam mode", "No feedback until you submit. Best for testing yourself."],
              [true, "💬 Practice mode", "See the answer and explanation after each question."],
            ].map(([v, t, d]) => (
              <button
                key={String(v)}
                onClick={() => setPractice(v as boolean)}
                className={cx("rounded-xl border-2 p-4 text-left", practice === v ? "border-indigo-500 bg-indigo-50" : "border-slate-200")}
              >
                <div className="font-semibold">{t as string}</div>
                <div className="text-sm text-slate-600">{d as string}</div>
              </button>
            ))}
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            <button onClick={() => start("full")} className="min-h-14 flex-1 rounded-xl bg-indigo-600 px-6 text-lg font-semibold text-white">
              {mine.length ? "Retake full exam" : "Start exam"} →
            </button>
            {missedIds.length > 0 && (
              <button onClick={() => start("missed")} className="min-h-14 flex-1 rounded-xl border-2 border-rose-300 bg-white px-6 text-lg font-semibold text-rose-700">
                Retake {missedIds.length} missed
              </button>
            )}
          </div>
          <p className="mt-3 text-sm text-slate-500">
            Questions and answer options are shuffled on every attempt. &ldquo;Select all&rdquo; questions need every correct option and no wrong ones.
          </p>
        </div>

        {mine.length > 0 && (
          <div className="mt-6 overflow-hidden rounded-2xl bg-white ring-1 ring-slate-200">
            <div className="border-b border-slate-200 px-5 py-3 font-semibold">Your attempts</div>
            {[...mine].reverse().map((a) => {
              const pct = Math.round((a.score / a.total) * 100);
              return (
                <button key={a.id} onClick={() => openPast(a)} className="flex min-h-14 w-full items-center justify-between border-b border-slate-100 px-5 py-2 text-left last:border-0 hover:bg-slate-50">
                  <div>
                    <div className="font-medium">
                      {new Date(a.createdAt).toLocaleString(undefined, { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })}
                      {a.mode === "missed" && <span className="ml-2 rounded bg-rose-100 px-1.5 text-xs text-rose-700">missed only</span>}
                    </div>
                    <div className="text-sm text-slate-500">
                      {a.score}/{a.total} · {fmtDuration(a.durationSec)}
                    </div>
                  </div>
                  <div className={cx("font-display text-2xl font-bold", pct >= 80 ? "text-emerald-600" : pct >= 60 ? "text-amber-600" : "text-rose-600")}>{pct}%</div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    );

  /* ---------------- RUN ---------------- */
  if (phase === "run") {
    const q = qs[idx];
    const over = elapsed > exam.minutes * 60;
    return (
      <div className="mx-auto max-w-3xl px-5 py-5 md:px-8">
        <div className="sticky top-[3.6rem] z-20 -mx-5 mb-5 border-b border-slate-200 bg-paper/95 px-5 py-3 backdrop-blur md:-mx-8 md:px-8 lg:top-0">
          <div className="flex items-center justify-between gap-3">
            <div className="font-semibold">
              Exam {exam.id}
              {mode === "missed" && <span className="ml-2 text-sm font-normal text-rose-600">missed only</span>}
              <span className="ml-2 text-sm font-normal text-slate-500">
                {idx + 1}/{qs.length} · {answered} answered
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className={cx("rounded-lg px-2.5 py-1 font-mono text-sm", over ? "bg-rose-100 text-rose-700" : "bg-white ring-1 ring-slate-200")}>
                ⏱ {fmtDuration(elapsed)} / {exam.minutes}:00
              </span>
              <button onClick={() => setGrid((g) => !g)} className="min-h-10 rounded-lg bg-white px-3 text-sm font-medium ring-1 ring-slate-300">
                ▦
              </button>
            </div>
          </div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-200">
            <div className="h-full bg-amber-500 transition-all" style={{ width: `${(answered / qs.length) * 100}%` }} />
          </div>
          {grid && (
            <div className="mt-3 grid grid-cols-8 gap-2 sm:grid-cols-12">
              {qs.map((qq, k) => (
                <button
                  key={qq.id}
                  onClick={() => {
                    setIdx(k);
                    setGrid(false);
                  }}
                  className={cx(
                    "relative h-10 rounded-lg text-sm font-semibold",
                    k === idx ? "bg-ink text-white" : answers[qq.id] !== undefined ? "bg-indigo-100 text-indigo-800" : "bg-white ring-1 ring-slate-300",
                  )}
                >
                  {k + 1}
                  {flags[qq.id] && <span className="absolute -right-1 -top-1 text-xs">🚩</span>}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-2xl bg-white p-5 ring-1 ring-slate-200 md:p-7">
          <QuizItem
            key={q.id}
            q={q}
            number={idx + 1}
            showTopic={practice}
            order={orders[q.id]}
            value={answers[q.id]}
            onChange={(a) => setAnswers((s) => ({ ...s, [q.id]: a }))}
            instant={practice}
            reveal={practice ? !!revealed[q.id] : false}
            onReveal={() => setRevealed((r) => ({ ...r, [q.id]: true }))}
          />
          <button onClick={() => setFlags((f) => ({ ...f, [q.id]: !f[q.id] }))} className={cx("mt-4 text-sm font-medium", flags[q.id] ? "text-rose-600" : "text-slate-400")}>
            🚩 {flags[q.id] ? "Flagged for review" : "Flag this question"}
          </button>
        </div>

        {confirm && (
          <div className="mt-5 rounded-2xl bg-amber-50 p-5 ring-1 ring-amber-300">
            <div className="font-semibold">
              {qs.length - answered > 0 ? `${qs.length - answered} question(s) unanswered.` : "All questions answered."} Submit now?
            </div>
            <div className="mt-3 flex gap-3">
              <button onClick={submit} className="min-h-12 flex-1 rounded-xl bg-emerald-600 font-semibold text-white">
                Submit
              </button>
              <button onClick={() => setConfirm(false)} className="min-h-12 flex-1 rounded-xl border border-slate-300 bg-white font-semibold">
                Keep working
              </button>
            </div>
          </div>
        )}

        <div className="fixed inset-x-0 bottom-16 z-30 border-t border-slate-200 bg-paper/95 px-5 py-3 backdrop-blur lg:bottom-0 lg:left-72">
          <div className="mx-auto flex max-w-3xl gap-3">
            <button onClick={() => setIdx((n) => Math.max(0, n - 1))} disabled={idx === 0} className="min-h-12 flex-1 rounded-xl border border-slate-300 bg-white font-semibold disabled:opacity-40">
              ← Prev
            </button>
            {idx < qs.length - 1 ? (
              <button onClick={() => setIdx((n) => n + 1)} className="min-h-12 flex-[2] rounded-xl bg-indigo-600 font-semibold text-white">
                Next →
              </button>
            ) : (
              <button onClick={() => setConfirm(true)} className="min-h-12 flex-[2] rounded-xl bg-emerald-600 font-semibold text-white">
                Finish & submit
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  /* ---------------- RESULTS ---------------- */
  return <Results exam={exam} qs={qs} result={result!} filter={reviewFilter} setFilter={setReviewFilter} onRetake={start} missedNow={qs.filter((q) => !isCorrect(q, result!.answers[q.id])).length} prev={mine} onBack={() => setPhase("intro")} />;
}

function Results({
  exam,
  qs,
  result,
  filter,
  setFilter,
  onRetake,
  missedNow,
  prev,
  onBack,
}: {
  exam: (typeof EXAMS)[number];
  qs: Question[];
  result: Attempt;
  filter: "all" | "wrong";
  setFilter: (f: "all" | "wrong") => void;
  onRetake: (m: "full" | "missed") => void;
  missedNow: number;
  prev: Attempt[];
  onBack: () => void;
}) {
  const pct = Math.round((result.score / result.total) * 100);
  const earlier = prev.filter((a) => a.mode === "full" && a.id !== result.id && a.createdAt < result.createdAt);
  const last = earlier[earlier.length - 1];
  const delta = result.mode === "full" && last ? pct - Math.round((last.score / last.total) * 100) : null;
  const list = useMemo(() => (filter === "wrong" ? qs.filter((q) => !isCorrect(q, result.answers[q.id])) : qs), [filter, qs, result]);
  const verdict = pct >= 85 ? ["Exam-ready 🔥", "text-emerald-600"] : pct >= 70 ? ["Solid. Polish the gaps", "text-emerald-600"] : pct >= 50 ? ["Getting there", "text-amber-600"] : ["Re-study, then retake", "text-rose-600"];
  const dayOf = (t: LessonId) => DAYS.find((d) => d.lessons.includes(t))!.day;

  return (
    <div className="mx-auto max-w-3xl px-5 py-6 md:px-8 md:py-10">
      <button onClick={onBack} className="text-sm font-medium text-slate-500">
        ← {exam.title}
      </button>
      <div className="mt-4 rounded-3xl bg-white p-6 text-center ring-1 ring-slate-200 md:p-8">
        <div className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          {result.mode === "missed" ? "Missed-questions retake" : "Your score"} · {fmtDuration(result.durationSec)}
        </div>
        <div className="mt-2 font-display text-7xl font-bold">{pct}%</div>
        <div className="text-lg text-slate-600">
          {result.score} of {result.total} correct
        </div>
        <div className={cx("mt-2 text-xl font-semibold", verdict[1])}>{verdict[0]}</div>
        {delta !== null && (
          <div className={cx("mt-1 text-sm font-semibold", delta >= 0 ? "text-emerald-600" : "text-rose-600")}>
            {delta >= 0 ? "▲" : "▼"} {Math.abs(delta)} points vs. your previous attempt
          </div>
        )}
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button onClick={() => onRetake("full")} className="min-h-12 rounded-xl bg-indigo-600 px-5 font-semibold text-white">
            ↻ Retake full exam
          </button>
          {missedNow > 0 && result.mode === "full" && (
            <button onClick={() => onRetake("missed")} className="min-h-12 rounded-xl border-2 border-rose-300 px-5 font-semibold text-rose-700">
              Retake {missedNow} missed
            </button>
          )}
          <Link href="/exams" className="flex min-h-12 items-center rounded-xl border border-slate-300 px-5 font-semibold">
            All exams
          </Link>
        </div>
      </div>

      <div className="mt-5 rounded-2xl bg-white p-5 ring-1 ring-slate-200">
        <div className="mb-3 font-semibold">By lecture</div>
        <div className="space-y-3">
          {(Object.entries(result.byTopic) as [LessonId, { c: number; t: number }][]).map(([k, v]) => {
            const p = Math.round((v.c / v.t) * 100);
            return (
              <Link key={k} href={`/day/${dayOf(k)}?lesson=${k}`} className="block">
                <div className="mb-1 flex justify-between text-sm">
                  <span className="flex items-center gap-2 font-medium">
                    <span className={cx("h-2.5 w-2.5 rounded-full", TOPIC_COLOR[k])} />
                    {TOPIC_LABEL[k]}
                  </span>
                  <span className="text-slate-500">
                    {v.c}/{v.t}
                  </span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                  <div className={cx("h-full rounded-full", p >= 75 ? "bg-emerald-500" : p >= 50 ? "bg-amber-500" : "bg-rose-500")} style={{ width: `${p}%` }} />
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <h2 className="font-display text-2xl font-semibold">Review answers</h2>
        <div className="flex rounded-xl bg-white p-1 ring-1 ring-slate-200">
          {(["wrong", "all"] as const).map((f) => (
            <button key={f} onClick={() => setFilter(f)} className={cx("min-h-10 rounded-lg px-4 text-sm font-semibold", filter === f ? "bg-ink text-white" : "text-slate-600")}>
              {f === "wrong" ? `Incorrect (${qs.length - result.score})` : `All (${qs.length})`}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-4 space-y-4">
        {list.length === 0 && <div className="rounded-2xl bg-emerald-50 p-6 text-center text-emerald-800">Nothing wrong. Perfect score! 🎉</div>}
        {list.map((q) => {
          const ok = isCorrect(q, result.answers[q.id]);
          return (
            <div key={q.id} className={cx("rounded-2xl border-l-4 bg-white p-5 ring-1 ring-slate-200", ok ? "border-l-emerald-500" : "border-l-rose-500")}>
              <div className="mb-1 flex items-center gap-2 text-xs font-semibold text-slate-500">
                <span className={cx("h-2 w-2 rounded-full", TOPIC_COLOR[q.topic])} />
                {TOPIC_LABEL[q.topic]}
              </div>
              <div className="text-lg font-medium">
                <Rich text={q.q} />
              </div>
              <div className="mt-3 grid gap-2 text-[15px] sm:grid-cols-2">
                <div className={cx("rounded-lg p-3", ok ? "bg-emerald-50" : "bg-rose-50")}>
                  <div className="text-xs font-bold uppercase text-slate-500">Your answer</div>
                  {answerText(q, result.answers[q.id])}
                </div>
                <div className="rounded-lg bg-emerald-50 p-3">
                  <div className="text-xs font-bold uppercase text-slate-500">Correct answer</div>
                  {answerText(q, q.answer)}
                </div>
              </div>
              <p className="mt-3 text-[15px] text-slate-700">
                <b>Why: </b>
                <Rich text={q.explain} />
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
