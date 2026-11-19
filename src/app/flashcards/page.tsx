"use client";

import { useMemo, useState } from "react";
import { ALL_FLASHCARDS, TOPIC_COLOR, TOPIC_LABEL } from "@/content";
import { useStudy } from "@/lib/store";
import type { LessonId } from "@/lib/types";
import { cx } from "@/lib/utils";
import { FlashDeck } from "@/components/FlashDeck";

const TOPICS: LessonId[] = ["L9", "L10", "L11", "L12", "L13", "L14"];

export default function FlashcardsPage() {
  const { progress } = useStudy();
  const [topics, setTopics] = useState<LessonId[]>(TOPICS);
  const [mode, setMode] = useState<"due" | "all">("due");
  const [session, setSession] = useState(0);

  const cards = useMemo(() => {
    const now = Date.now();
    return ALL_FLASHCARDS.filter((c) => topics.includes(c.topic)).filter((c) => mode === "all" || !progress.cards[c.id] || progress.cards[c.id].due <= now);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topics, mode, session]);

  const toggle = (t: LessonId) => {
    setTopics((cur) => (cur.includes(t) ? (cur.length > 1 ? cur.filter((x) => x !== t) : cur) : [...cur, t]));
    setSession((s) => s + 1);
  };

  return (
    <div className="mx-auto max-w-3xl px-5 py-6 md:px-8 md:py-10">
      <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600">Active recall · Leitner boxes</p>
      <h1 className="mt-1 font-display text-4xl font-bold">Flashcards</h1>
      <p className="mt-2 text-lg text-slate-600">
        Cards you get right move up a box and come back later (1 → 2 → 4 → 7 days). Cards you miss go back to Box 1. A few minutes on <b>due</b> cards each day is the most efficient review there is.
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {TOPICS.map((t) => (
          <button
            key={t}
            onClick={() => toggle(t)}
            className={cx("flex min-h-10 items-center gap-2 rounded-full border px-3 text-sm font-medium", topics.includes(t) ? "border-ink bg-ink text-white" : "border-slate-300 bg-white text-slate-600")}
          >
            <span className={cx("h-2.5 w-2.5 rounded-full", TOPIC_COLOR[t])} />
            {TOPIC_LABEL[t]}
          </button>
        ))}
      </div>
      <div className="mt-3 flex rounded-xl bg-white p-1 ring-1 ring-slate-200 sm:inline-flex">
        {(["due", "all"] as const).map((m) => (
          <button
            key={m}
            onClick={() => {
              setMode(m);
              setSession((s) => s + 1);
            }}
            className={cx("min-h-10 flex-1 rounded-lg px-4 text-sm font-semibold", mode === m ? "bg-indigo-600 text-white" : "text-slate-600")}
          >
            {m === "due" ? "Due now" : "All cards (cram)"}
          </button>
        ))}
      </div>

      <div className="mt-6">
        <FlashDeck key={`${session}-${cards.length}`} cards={cards} title={mode === "due" ? "Due cards" : "All cards"} />
      </div>
    </div>
  );
}
