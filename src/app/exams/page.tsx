"use client";

import Link from "next/link";
import { EXAMS } from "@/content";
import { useStudy } from "@/lib/store";
import { dateForDay, dayStatus } from "@/lib/schedule";
import { cx, prettyDate } from "@/lib/utils";

export default function ExamsPage() {
  const { progress } = useStudy();
  return (
    <div className="mx-auto max-w-5xl px-5 py-6 md:px-8 md:py-10">
      <p className="text-sm font-semibold uppercase tracking-widest text-amber-600">Days 4–6 · Spaced repetition</p>
      <h1 className="mt-1 font-display text-4xl font-bold">Mock exams</h1>
      <p className="mt-2 max-w-2xl text-lg text-slate-600">
        Six exams, each mixing all six lectures. Take <b>two per day</b>. Difficulty climbs from recall (Day 4) to application (Day 5) to analysis and a final simulation (Day 6). Retake as often as you like.
      </p>

      <div className="mt-8 space-y-8">
        {[4, 5, 6].map((day) => {
          const date = dateForDay(progress.startDate, day);
          const st = progress.startDate ? dayStatus(progress.startDate, day) : null;
          return (
            <section key={day}>
              <div className="mb-3 flex items-baseline gap-3">
                <h2 className="font-display text-2xl font-semibold">Day {day}</h2>
                {date && <span className="text-slate-500">{prettyDate(date)}</span>}
                {st === "today" && <span className="rounded-full bg-amber-500 px-2 py-0.5 text-xs font-bold text-white">TODAY</span>}
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {EXAMS.filter((e) => e.scheduleDay === day && !e.bonus).map((e) => (
                  <ExamCard key={e.id} e={e} />
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {EXAMS.some((e) => e.bonus) && (
        <section className="mt-8">
          <div className="mb-3 flex items-baseline gap-3">
            <h2 className="font-display text-2xl font-semibold">Extra practice</h2>
            <span className="text-slate-500">Questions from the instructor&rsquo;s study guides</span>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {EXAMS.filter((e) => e.bonus).map((e) => (
              <ExamCard key={e.id} e={e} />
            ))}
          </div>
        </section>
      )}

      <div className="mt-10 rounded-2xl bg-indigo-50 p-5 text-[15px] ring-1 ring-indigo-200">
        <b>After Day 6:</b> keep spacing. Retake your two lowest-scoring exams 2–3 days later, then again a week later. Use &ldquo;Retake missed&rdquo; for quick, targeted practice.
      </div>
    </div>
  );
}

function ExamCard({ e }: { e: (typeof EXAMS)[number] }) {
  const { attempts } = useStudy();
  const mine = attempts.filter((a) => a.examId === e.id && a.mode === "full");
  const best = mine.length ? Math.max(...mine.map((a) => Math.round((a.score / a.total) * 100))) : null;
  const last = mine.length ? Math.round((mine[mine.length - 1].score / mine[mine.length - 1].total) * 100) : null;
  return (
    <Link href={`/exams/${e.id}`} className="rounded-2xl border-2 border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-amber-400 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-sm font-bold text-amber-600">EXAM {e.id}</div>
          <div className="mt-1 font-display text-xl font-semibold leading-tight">{e.title.replace(/^Mock Exam \d+: /, "")}</div>
          <div className="mt-1 text-sm text-slate-600">{e.focus}</div>
        </div>
        <div className="text-right">
          <div className={cx("font-display text-3xl font-bold", best === null ? "text-slate-300" : best >= 80 ? "text-emerald-600" : best >= 60 ? "text-amber-600" : "text-rose-600")}>
            {best === null ? "—" : `${best}%`}
          </div>
          <div className="text-xs text-slate-500">best</div>
        </div>
      </div>
      <div className="mt-4 flex justify-between text-sm text-slate-500">
        <span>
          {e.questions.length} questions · {e.minutes} min
        </span>
        <span>{mine.length ? `${mine.length} attempt${mine.length > 1 ? "s" : ""} · last ${last}%` : "Not taken"}</span>
      </div>
    </Link>
  );
}
