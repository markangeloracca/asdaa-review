"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useStudy } from "@/lib/store";
import { DAYS, EXAMS, LESSONS, TOPIC_COLOR, TOPIC_LABEL, ALL_FLASHCARDS } from "@/content";
import { PLAN, currentPlanDay, dateForDay, dayStatus } from "@/lib/schedule";
import { cx, prettyDate, todayISO } from "@/lib/utils";
import { daySteps } from "@/components/DayRunner";
import type { LessonId } from "@/lib/types";

const TECHNIQUES: [string, string, string][] = [
  ["Retrieval practice", "✍️", "Quick checks, warm-ups and exit tickets make you pull ideas out of memory, which strengthens them far more than re-reading."],
  ["Spaced repetition", "📆", "Content is spread over 6 days, warm-ups revisit earlier days, flashcards use a Leitner schedule (1→2→4→7 days), and the exams come back day after day."],
  ["Interleaving", "🔀", "Warm-ups and every mock exam mix lectures together, so you practise picking the right concept, like on the real exam."],
  ["Pretesting", "🎲", "Day 1 starts with a guess-first quiz. Being wrong before learning primes your memory."],
  ["Elaboration", "🧩", "'Connect the ideas' boxes link lectures together (debt ↔ refactoring ↔ testing ↔ security)."],
  ["Dual coding", "🖼️", "Every major idea comes with a diagram rebuilt from the slides, so words and pictures reinforce each other."],
  ["Concrete examples & analogies", "🔗", "Credit-card debt, bank vaults, the Alberta bus system: abstract terms are attached to stories."],
  ["Mnemonics", "🪄", "Short acronyms and phrases (RUF, PIWI, 'Debt Collectors Take Interest') for lists you must recall exactly."],
  ["Feynman technique", "🧠", "Explain it simply in your own words, then compare with a model answer to find your gaps."],
  ["Chunking", "📦", "Each lecture is split into 4–5 short sections with a clear goal, followed by a summary."],
];

export default function Dashboard() {
  const { progress, attempts, setStartDate } = useStudy();
  const [showSci, setShowSci] = useState(false);
  const start = progress.startDate;
  const cur = currentPlanDay(start);

  const dayPct = (d: number) => {
    const steps = daySteps(d);
    const done = steps.filter((s) => progress.steps[`d${d}:${s.id}`]).length;
    return progress.daysDone[d] ? 100 : Math.round((done / steps.length) * 100);
  };
  const best = (examId: number) => {
    const full = attempts.filter((a) => a.examId === examId && a.mode === "full");
    if (!full.length) return null;
    return Math.max(...full.map((a) => Math.round((a.score / a.total) * 100)));
  };
  const dueCards = ALL_FLASHCARDS.filter((c) => !progress.cards[c.id] || progress.cards[c.id].due <= Date.now()).length;
  const reviewPct = Math.round((dayPct(1) + dayPct(2) + dayPct(3)) / 3);
  const examsTaken = EXAMS.filter((e) => best(e.id) !== null).length;

  const weak = useMemo(() => {
    const agg: Partial<Record<LessonId, { c: number; t: number }>> = {};
    for (const a of attempts)
      for (const [k, v] of Object.entries(a.byTopic)) {
        const key = k as LessonId;
        const cur = agg[key] ?? { c: 0, t: 0 };
        agg[key] = { c: cur.c + (v?.c ?? 0), t: cur.t + (v?.t ?? 0) };
      }
    return (Object.entries(agg) as [LessonId, { c: number; t: number }][])
      .map(([k, v]) => ({ k, pct: Math.round((v.c / v.t) * 100) }))
      .sort((a, b) => a.pct - b.pct);
  }, [attempts]);

  return (
    <div className="mx-auto max-w-5xl px-5 py-6 md:px-8 md:py-10">
      <section className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600">ENSF 607 · Lectures 9–14</p>
        <h1 className="mt-1 font-display text-4xl font-bold leading-tight text-ink md:text-5xl">Your 6-day study plan</h1>
        <p className="mt-3 max-w-2xl text-lg text-slate-600">
          Three guided review days covering every slide, then two mock exams a day for three days. Short daily sessions spaced over time beat one long cram.
        </p>
      </section>

      {!start ? (
        <div className="mb-8 rounded-2xl border-2 border-indigo-200 bg-white p-6">
          <h2 className="font-display text-2xl font-semibold">When does Day 1 start?</h2>
          <p className="mt-1 text-slate-600">We'll date each day of the plan so you know exactly what to do today.</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <button onClick={() => setStartDate(todayISO())} className="min-h-12 rounded-xl bg-indigo-600 px-6 font-semibold text-white">
              Start today
            </button>
            <label className="flex min-h-12 items-center gap-2 rounded-xl border border-slate-300 bg-white px-4">
              <span className="text-slate-600">or pick:</span>
              <input type="date" className="bg-transparent text-base outline-none" onChange={(e) => e.target.value && setStartDate(e.target.value)} />
            </label>
          </div>
        </div>
      ) : (
        <div className="mb-8 grid gap-3 sm:grid-cols-4">
          {[
            ["Review progress", `${reviewPct}%`],
            ["Exams taken", `${examsTaken}/6`],
            ["Flashcards due", String(dueCards)],
            ["Today", cur === 0 ? "Not started" : cur >= 7 ? "Plan done 🎉" : `Day ${cur}`],
          ].map(([k, v]) => (
            <div key={k} className="rounded-2xl border border-slate-200 bg-white p-4">
              <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">{k}</div>
              <div className="mt-1 font-display text-3xl font-bold">{v}</div>
            </div>
          ))}
        </div>
      )}

      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {PLAN.map((p) => {
          const date = dateForDay(start, p.day);
          const st = dayStatus(start, p.day);
          const isToday = start && st === "today";
          if (p.kind === "review") {
            const d = DAYS[p.day - 1];
            const pct = dayPct(p.day);
            return (
              <Link
                key={p.day}
                href={`/day/${p.day}`}
                className={cx("group rounded-2xl border-2 bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-md", isToday ? "border-indigo-500" : "border-slate-200")}
              >
                <div className="flex items-center justify-between text-sm">
                  <span className="font-bold text-indigo-600">DAY {p.day} · REVIEW</span>
                  {isToday && <span className="rounded-full bg-indigo-600 px-2 py-0.5 text-xs font-bold text-white">TODAY</span>}
                </div>
                <h3 className="mt-2 font-display text-2xl font-semibold leading-tight">{d.title}</h3>
                <p className="text-slate-600">{d.theme}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {d.lessons.map((l) => (
                    <span key={l} className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium">
                      <span className={cx("h-2 w-2 rounded-full", TOPIC_COLOR[l])} />
                      {TOPIC_LABEL[l]}
                    </span>
                  ))}
                </div>
                <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full rounded-full bg-indigo-500 transition-all" style={{ width: `${pct}%` }} />
                </div>
                <div className="mt-2 flex justify-between text-sm text-slate-500">
                  <span>{date ? prettyDate(date) : `~${d.minutes} min`}</span>
                  <span>{pct === 100 ? "✓ Complete" : pct ? `${pct}%` : `~${d.minutes} min`}</span>
                </div>
              </Link>
            );
          }
          return (
            <div key={p.day} className={cx("rounded-2xl border-2 bg-white p-5", isToday ? "border-amber-500" : "border-slate-200")}>
              <div className="flex items-center justify-between text-sm">
                <span className="font-bold text-amber-600">DAY {p.day} · MOCK EXAMS</span>
                {isToday && <span className="rounded-full bg-amber-500 px-2 py-0.5 text-xs font-bold text-white">TODAY</span>}
              </div>
              <div className="mt-3 space-y-2">
                {p.exams.map((id) => {
                  const e = EXAMS[id - 1];
                  const b = best(id);
                  return (
                    <Link key={id} href={`/exams/${id}`} className="flex min-h-14 items-center justify-between rounded-xl bg-amber-50 px-4 py-2 ring-1 ring-amber-200 hover:bg-amber-100">
                      <div>
                        <div className="font-semibold">Exam {id}</div>
                        <div className="text-xs text-slate-600">{e.focus}</div>
                      </div>
                      <div className={cx("font-display text-xl font-bold", b === null ? "text-slate-300" : b >= 80 ? "text-emerald-600" : b >= 60 ? "text-amber-600" : "text-rose-600")}>
                        {b === null ? "—" : `${b}%`}
                      </div>
                    </Link>
                  );
                })}
              </div>
              <div className="mt-3 text-sm text-slate-500">{date ? prettyDate(date) : "Spaced: one day apart"}</div>
            </div>
          );
        })}
      </section>

      {weak.length > 0 && (
        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-5">
          <h2 className="font-display text-xl font-semibold">Your topic accuracy (all exam attempts)</h2>
          <p className="text-sm text-slate-500">Weakest first. Tap one to re-study that lecture.</p>
          <div className="mt-4 space-y-3">
            {weak.map(({ k, pct }) => {
              const day = DAYS.find((d) => d.lessons.includes(k))!.day;
              return (
                <Link key={k} href={`/day/${day}?lesson=${k}`} className="block">
                  <div className="mb-1 flex justify-between text-sm">
                    <span className="font-medium">{TOPIC_LABEL[k]}</span>
                    <span className="text-slate-500">{pct}%</span>
                  </div>
                  <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                    <div className={cx("h-full rounded-full", pct >= 80 ? "bg-emerald-500" : pct >= 60 ? "bg-amber-500" : "bg-rose-500")} style={{ width: `${pct}%` }} />
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-5">
        <button onClick={() => setShowSci((s) => !s)} className="flex w-full items-center justify-between text-left">
          <h2 className="font-display text-xl font-semibold">The learning science built into this plan</h2>
          <span className="text-2xl text-slate-400">{showSci ? "−" : "+"}</span>
        </button>
        {showSci && (
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {TECHNIQUES.map(([t, i, d]) => (
              <div key={t} className="rounded-xl bg-slate-50 p-4">
                <div className="font-semibold">
                  {i} {t}
                </div>
                <div className="mt-1 text-sm text-slate-600">{d}</div>
              </div>
            ))}
            <div className="rounded-xl bg-indigo-50 p-4 sm:col-span-2">
              <div className="font-semibold">How to use it each day</div>
              <ol className="mt-1 list-decimal space-y-1 pl-5 text-sm text-slate-700">
                <li>Do the day's session in one sitting (60–90 min), with a short break between the two lectures.</li>
                <li>Answer every quick check <b>before</b> reading on. Struggling a little is part of learning.</li>
                <li>Finish with flashcards and the exit ticket. Come back to <Link className="underline" href="/flashcards">due flashcards</Link> for 5 minutes on other days.</li>
                <li>Exam days: take each exam under exam conditions, read every explanation, and retake only the ones you missed the next day.</li>
              </ol>
            </div>
          </div>
        )}
      </section>

      <p className="mt-6 text-center text-sm text-slate-400">
        Covers {Object.keys(LESSONS).length} lectures · {Object.values(LESSONS).reduce((n, l) => n + l.sections.length, 0)} sections · {ALL_FLASHCARDS.length} flashcards ·{" "}
        {EXAMS.reduce((n, e) => n + e.questions.length, 0)} exam questions
        {start && (
          <>
            {" · "}
            <button className="underline" onClick={() => setStartDate(null)}>
              change start date
            </button>
          </>
        )}
      </p>
    </div>
  );
}
