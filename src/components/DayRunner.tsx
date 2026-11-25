"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { DAYS, LESSONS, TOPIC_COLOR, TOPIC_LABEL } from "@/content";
import { useStudy } from "@/lib/store";
import type { Block, LessonId, Question } from "@/lib/types";
import { cx } from "@/lib/utils";
import { Blocks } from "./Blocks";
import { QuizItem } from "./QuizItem";
import { FlashDeck } from "./FlashDeck";
import { Rich } from "./Rich";

type Step =
  | { id: string; kind: "intro"; title: string }
  | { id: string; kind: "warmup"; title: string }
  | { id: string; kind: "section"; title: string; lesson: LessonId; slides: string; blocks: Block[] }
  | { id: string; kind: "summary"; title: string; lesson: LessonId }
  | { id: string; kind: "bridge"; title: string }
  | { id: string; kind: "cards"; title: string }
  | { id: string; kind: "exit"; title: string }
  | { id: string; kind: "done"; title: string };

export function daySteps(day: number): Step[] {
  const d = DAYS[day - 1];
  const steps: Step[] = [
    { id: "intro", kind: "intro", title: "Today's plan" },
    { id: "warmup", kind: "warmup", title: day === 1 ? "Warm-up: pre-test" : "Warm-up: spaced recall" },
  ];
  for (const l of d.lessons) {
    for (const s of LESSONS[l].sections) steps.push({ id: s.id, kind: "section", title: s.title, lesson: l, slides: s.slides, blocks: s.blocks });
    steps.push({ id: `${l}-summary`, kind: "summary", title: `${LESSONS[l].title}: key takeaways`, lesson: l });
  }
  steps.push({ id: "bridge", kind: "bridge", title: "Connect the dots" });
  steps.push({ id: "cards", kind: "cards", title: "Flashcard recall" });
  steps.push({ id: "exit", kind: "exit", title: "Exit ticket" });
  steps.push({ id: "done", kind: "done", title: "Day complete" });
  return steps;
}

function QuizSet({ qs, label }: { qs: Question[]; label: string }) {
  const { recordCheck } = useStudy();
  const [res, setRes] = useState<Record<string, boolean>>({});
  const n = Object.keys(res).length;
  const c = Object.values(res).filter(Boolean).length;
  return (
    <div className="space-y-5">
      {qs.map((q, i) => (
        <div key={q.id} className="rounded-2xl border border-slate-200 bg-white p-5">
          <QuizItem
            q={q}
            number={i + 1}
            showTopic
            onReveal={(ok) => {
              recordCheck(q.id, ok);
              setRes((r) => ({ ...r, [q.id]: ok }));
            }}
          />
        </div>
      ))}
      {n === qs.length && (
        <div className="rounded-2xl bg-ink p-5 text-center text-white">
          <div className="font-display text-3xl font-bold">
            {c}/{qs.length}
          </div>
          <div className="text-slate-300">
            {label}: {c === qs.length ? "perfect recall! 🔥" : "the ones you missed are your highest-value review targets."}
          </div>
        </div>
      )}
    </div>
  );
}

export default function DayRunner({ day }: { day: number }) {
  const d = DAYS[day - 1];
  const steps = useMemo(() => daySteps(day), [day]);
  const { progress, markStep, setLastStep, markDayDone } = useStudy();
  const [i, setI] = useState(() => Math.min(progress.lastStep[day] ?? 0, steps.length - 1));
  const [outline, setOutline] = useState(false);

  // Deep link: /day/2?lesson=L12 → jump to that lesson's first section
  useEffect(() => {
    const l = new URLSearchParams(window.location.search).get("lesson");
    if (l) {
      const idx = steps.findIndex((s) => s.kind === "section" && s.lesson === l);
      if (idx >= 0) setI(idx);
    }
  }, [steps]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [i]);

  const step = steps[i];
  const go = (n: number) => {
    const next = Math.max(0, Math.min(steps.length - 1, n));
    if (n > i) markStep(day, step.id, next);
    else setLastStep(day, next);
    if (steps[next].kind === "done") markDayDone(day);
    setI(next);
  };
  const doneCount = steps.filter((s) => progress.steps[`d${day}:${s.id}`]).length;
  const lesson = "lesson" in step ? LESSONS[step.lesson] : null;

  const dayCards = d.lessons.flatMap((l) => LESSONS[l].flashcards.map((f) => ({ ...f, topic: l })));

  const OutlineList = (
    <ol className="space-y-1">
      {steps.map((s, k) => {
        const done = progress.steps[`d${day}:${s.id}`];
        return (
          <li key={s.id}>
            <button
              onClick={() => {
                setI(k);
                setLastStep(day, k);
                setOutline(false);
              }}
              className={cx("flex min-h-10 w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-left text-sm", k === i ? "bg-indigo-100 font-semibold text-indigo-900" : "text-slate-700 hover:bg-slate-100")}
            >
              <span className={cx("flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px]", done ? "bg-emerald-500 text-white" : "bg-slate-200 text-slate-500")}>{done ? "✓" : k + 1}</span>
              {"lesson" in s && <span className={cx("h-2 w-2 shrink-0 rounded-full", TOPIC_COLOR[s.lesson])} />}
              <span className="line-clamp-2">{s.title}</span>
            </button>
          </li>
        );
      })}
    </ol>
  );

  return (
    <div className="mx-auto flex max-w-6xl gap-8 px-5 py-6 md:px-8">
      <aside className="sticky top-6 hidden max-h-[calc(100dvh-3rem)] w-64 shrink-0 overflow-y-auto xl:block">
        <div className="mb-2 px-2 text-xs font-bold uppercase tracking-wide text-slate-500">Day {day} outline</div>
        {OutlineList}
      </aside>

      <div className="min-w-0 flex-1 pb-24">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between gap-3">
            <div className="text-sm font-semibold text-indigo-600">
              DAY {day} · {d.theme.toUpperCase()}
            </div>
            <button onClick={() => setOutline(true)} className="min-h-10 rounded-lg border border-slate-300 bg-white px-3 text-sm font-medium xl:hidden">
              ☰ Outline
            </button>
          </div>
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-200">
            <div className="h-full bg-indigo-500 transition-all" style={{ width: `${((i + 1) / steps.length) * 100}%` }} />
          </div>
          <div className="mt-1.5 flex justify-between text-xs text-slate-500">
            <span>
              Step {i + 1} of {steps.length}
            </span>
            <span>{doneCount} completed</span>
          </div>
          {lesson && (
            <div className="mt-5 flex flex-wrap items-center gap-2 text-sm">
              <span className={cx("rounded-full px-2.5 py-0.5 font-bold text-white", TOPIC_COLOR[lesson.id])}>Lecture {lesson.number}</span>
              <span className="font-medium text-slate-600">{lesson.title}</span>
              {step.kind === "section" && <span className="text-slate-400">· {step.slides}</span>}
            </div>
          )}
          <h1 className="mt-2 font-display text-3xl font-bold leading-tight md:text-4xl">{step.title}</h1>
        </div>

        {/* Body */}
        {/* Keyed by step so answers, revealed feedback and drafts never carry over to the next step */}
        <div key={step.id}>
        {step.kind === "intro" && (
          <div className="space-y-5">
            <div className="rounded-2xl bg-white p-6 ring-1 ring-slate-200">
              <h2 className="font-display text-2xl font-semibold">{d.title}</h2>
              <p className="mt-1 text-slate-600">About {d.minutes} minutes. Take a 5-minute break between the two lectures.</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {d.lessons.map((l) => (
                  <div key={l} className="rounded-xl bg-slate-50 p-4">
                    <div className="flex items-center gap-2">
                      <span className={cx("h-3 w-3 rounded-full", TOPIC_COLOR[l])} />
                      <span className="font-semibold">{TOPIC_LABEL[l]}</span>
                    </div>
                    <p className="mt-1 text-sm italic text-slate-600">“{LESSONS[l].tagline}”</p>
                    <ul className="mt-2 space-y-1 text-sm text-slate-700">
                      {LESSONS[l].sections.map((s) => (
                        <li key={s.id}>• {s.title}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl bg-indigo-50 p-5 ring-1 ring-indigo-200">
              <div className="font-semibold text-indigo-900">How today's session works</div>
              <ol className="mt-2 grid gap-1.5 text-[15px] text-indigo-950 sm:grid-cols-2">
                <li>1 · Warm-up quiz (retrieval)</li>
                <li>2 · Short lesson chunks with quick checks</li>
                <li>3 · Key takeaways after each lecture</li>
                <li>4 · Connect the dots (interleaving)</li>
                <li>5 · Flashcards (spaced repetition)</li>
                <li>6 · Exit ticket (self-assessment)</li>
              </ol>
            </div>
          </div>
        )}

        {step.kind === "warmup" && (
          <div className="space-y-5">
            <div className="rounded-2xl bg-amber-50 p-5 text-base ring-1 ring-amber-200">
              <Rich text={d.warmupIntro} />
            </div>
            <QuizSet qs={d.warmup} label="Warm-up" />
          </div>
        )}

        {step.kind === "section" && <Blocks blocks={step.blocks} />}

        {step.kind === "summary" && lesson && (
          <div className="space-y-5">
            <div className="rounded-2xl bg-white p-6 ring-1 ring-slate-200">
              <div className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-500">Lecture {lesson.number} in 5 lines</div>
              <ol className="space-y-3">
                {lesson.takeaways.map((t, k) => (
                  <li key={k} className="flex gap-3 text-lg leading-relaxed">
                    <span className={cx("mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white", TOPIC_COLOR[lesson.id])}>{k + 1}</span>
                    <Rich text={t} />
                  </li>
                ))}
              </ol>
            </div>
            <div className="rounded-2xl border-2 border-dashed border-slate-300 p-5 text-slate-700">
              <b>Blank-page recall (1 minute):</b> close your eyes or cover the list, then say every keyword from this lecture you can remember. Check what you missed. Those are tonight's flashcards.
            </div>
          </div>
        )}

        {step.kind === "bridge" && <Blocks blocks={d.bridge} />}

        {step.kind === "cards" && (
          <div>
            <p className="mb-4 text-slate-600">
              Today's {dayCards.length} cards. Try to answer each one out loud <b>before</b> flipping. Be honest with &ldquo;Again&rdquo;, because those cards come back sooner.
            </p>
            <FlashDeck cards={dayCards} title={`Day ${day} deck`} />
          </div>
        )}

        {step.kind === "exit" && <QuizSet qs={d.exitTicket} label="Exit ticket" />}

        {step.kind === "done" && (
          <div className="space-y-5 text-center">
            <div className="rounded-3xl bg-white p-8 ring-1 ring-slate-200">
              <div className="text-5xl">🎓</div>
              <h2 className="mt-3 font-display text-3xl font-bold">Day {day} complete</h2>
              <p className="mx-auto mt-3 max-w-xl text-lg text-slate-600">
                <Rich text={d.preview} />
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                {day < 3 ? (
                  <Link href={`/day/${day + 1}`} className="flex min-h-12 items-center rounded-xl bg-indigo-600 px-6 font-semibold text-white">
                    Preview Day {day + 1} →
                  </Link>
                ) : (
                  <Link href="/exams" className="flex min-h-12 items-center rounded-xl bg-amber-500 px-6 font-semibold text-white">
                    Go to mock exams →
                  </Link>
                )}
                <Link href="/" className="flex min-h-12 items-center rounded-xl border border-slate-300 bg-white px-6 font-semibold">
                  Back to plan
                </Link>
              </div>
            </div>
          </div>
        )}
        </div>
      </div>

      {/* Bottom step nav */}
      <div className="fixed inset-x-0 bottom-16 z-30 border-t border-slate-200 bg-paper/95 px-5 py-3 backdrop-blur lg:bottom-0 lg:left-72">
        <div className="mx-auto flex max-w-3xl gap-3">
          <button onClick={() => go(i - 1)} disabled={i === 0} className="min-h-12 flex-1 rounded-xl border border-slate-300 bg-white font-semibold disabled:opacity-40">
            ← Back
          </button>
          {i < steps.length - 1 && (
            <button onClick={() => go(i + 1)} className="min-h-12 flex-[2] rounded-xl bg-indigo-600 font-semibold text-white">
              {steps[i + 1].kind === "done" ? "Finish day ✓" : `Next: ${steps[i + 1].title.length > 34 ? steps[i + 1].title.slice(0, 32) + "…" : steps[i + 1].title}`}
            </button>
          )}
        </div>
      </div>

      {/* Outline drawer (portrait) */}
      {outline && (
        <div className="fixed inset-0 z-50 xl:hidden" onClick={() => setOutline(false)}>
          <div className="absolute inset-0 bg-slate-900/40" />
          <div className="absolute right-0 top-0 h-full w-80 max-w-[85%] overflow-y-auto bg-white p-4 pt-[max(1rem,env(safe-area-inset-top))] shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="mb-3 flex items-center justify-between">
              <div className="font-semibold">Day {day} outline</div>
              <button onClick={() => setOutline(false)} className="h-10 w-10 rounded-lg text-xl">
                ✕
              </button>
            </div>
            {OutlineList}
          </div>
        </div>
      )}
    </div>
  );
}
