"use client";

import { useMemo, useState } from "react";
import type { Question } from "@/lib/types";
import { cx, isCorrect, shuffle, type Answer } from "@/lib/utils";
import { Rich } from "./Rich";
import { TOPIC_LABEL } from "@/content";

/**
 * Interactive question with instant feedback (retrieval practice).
 * `value`/`onChange` make it controllable (exam mode); `reveal` shows correctness.
 */
export function QuizItem({
  q,
  value,
  onChange,
  reveal,
  onReveal,
  instant = true,
  showTopic,
  number,
  order: orderProp,
}: {
  q: Question;
  value?: Answer;
  onChange?: (a: Answer) => void;
  reveal?: boolean;
  onReveal?: (correct: boolean) => void;
  instant?: boolean;
  showTopic?: boolean;
  number?: number;
  order?: number[];
}) {
  const [localVal, setLocalVal] = useState<Answer | undefined>(undefined);
  const [localReveal, setLocalReveal] = useState(false);
  const order = useMemo(() => orderProp ?? shuffle((q.options ?? []).map((_, i) => i)), [q, orderProp]);
  const val = value !== undefined ? value : localVal;
  const shown = reveal ?? localReveal;

  const set = (a: Answer, commit: boolean) => {
    if (shown) return;
    setLocalVal(a);
    onChange?.(a);
    if (instant && commit) {
      setLocalReveal(true);
      onReveal?.(isCorrect(q, a));
    }
  };

  const correct = shown && isCorrect(q, val);
  const optState = (i: number) => {
    const chosen = Array.isArray(val) ? val.includes(i) : val === i;
    const right = Array.isArray(q.answer) ? q.answer.includes(i) : q.answer === i;
    if (!shown) return chosen ? "chosen" : "idle";
    if (right) return "right";
    return chosen ? "wrong" : "idle";
  };

  const styles: Record<string, string> = {
    idle: "border-slate-200 bg-white hover:border-slate-400",
    chosen: "border-indigo-500 bg-indigo-50 ring-2 ring-indigo-200",
    right: "border-emerald-500 bg-emerald-50",
    wrong: "border-rose-500 bg-rose-50",
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
        {number !== undefined && <span>Question {number}</span>}
        {showTopic && <span className="rounded-full bg-slate-100 px-2 py-0.5 normal-case">{TOPIC_LABEL[q.topic]}</span>}
        {q.type === "multi" && <span className="rounded-full bg-amber-100 px-2 py-0.5 text-amber-800 normal-case">Select all that apply</span>}
        {q.type === "tf" && <span className="rounded-full bg-sky-100 px-2 py-0.5 text-sky-800 normal-case">True / False</span>}
      </div>
      <p className="text-lg font-medium leading-snug text-ink md:text-xl">
        <Rich text={q.q} />
      </p>

      {q.type === "tf" ? (
        <div className="grid grid-cols-2 gap-3">
          {[true, false].map((b) => {
            const chosen = val === b;
            const st = !shown ? (chosen ? "chosen" : "idle") : q.answer === b ? "right" : chosen ? "wrong" : "idle";
            return (
              <button key={String(b)} onClick={() => set(b, true)} disabled={shown} className={cx("min-h-14 rounded-xl border-2 px-4 text-lg font-semibold transition", styles[st])}>
                {b ? "True" : "False"}
              </button>
            );
          })}
        </div>
      ) : (
        <div className="space-y-2.5">
          {order.map((i) => {
            const st = optState(i);
            return (
              <button
                key={i}
                disabled={shown}
                onClick={() => {
                  if (q.type === "multi") {
                    const cur = Array.isArray(val) ? val : [];
                    set(cur.includes(i) ? cur.filter((x) => x !== i) : [...cur, i], false);
                  } else set(i, true);
                }}
                className={cx("flex min-h-14 w-full items-center gap-3 rounded-xl border-2 px-4 py-3 text-left text-base transition md:text-lg", styles[st])}
              >
                <span
                  className={cx(
                    "flex h-6 w-6 shrink-0 items-center justify-center border-2 text-xs",
                    q.type === "multi" ? "rounded-md" : "rounded-full",
                    st === "chosen" && "border-indigo-500 bg-indigo-500 text-white",
                    st === "right" && "border-emerald-500 bg-emerald-500 text-white",
                    st === "wrong" && "border-rose-500 bg-rose-500 text-white",
                    st === "idle" && "border-slate-300",
                  )}
                >
                  {st === "right" ? "✓" : st === "wrong" ? "✕" : st === "chosen" ? "•" : ""}
                </span>
                <Rich text={q.options![i]} />
              </button>
            );
          })}
          {q.type === "multi" && instant && !shown && (
            <button
              onClick={() => {
                setLocalReveal(true);
                onReveal?.(isCorrect(q, val));
              }}
              disabled={!Array.isArray(val) || val.length === 0}
              className="min-h-12 rounded-xl bg-indigo-600 px-6 font-semibold text-white disabled:opacity-40"
            >
              Check answer
            </button>
          )}
        </div>
      )}

      {shown && (
        <div className={cx("rounded-xl border-l-4 p-4 text-base", correct ? "border-emerald-500 bg-emerald-50" : "border-rose-500 bg-rose-50")}>
          <div className={cx("mb-1 font-bold", correct ? "text-emerald-700" : "text-rose-700")}>{correct ? "Correct!" : "Not quite."}</div>
          <Rich text={q.explain} />
        </div>
      )}
    </div>
  );
}
