"use client";

import { useMemo, useState } from "react";
import { useStudy } from "@/lib/store";
import type { Flashcard, LessonId } from "@/lib/types";
import { TOPIC_LABEL } from "@/content";
import { cx, shuffle } from "@/lib/utils";
import { Rich } from "./Rich";

export type DeckCard = Flashcard & { topic: LessonId };

export function FlashDeck({ cards, onFinish, title }: { cards: DeckCard[]; onFinish?: () => void; title?: string }) {
  const { gradeCard, progress } = useStudy();
  const [queue, setQueue] = useState<DeckCard[]>(() => shuffle(cards));
  const [flipped, setFlipped] = useState(false);
  const [stats, setStats] = useState({ knew: 0, again: 0 });
  const total = cards.length;
  const card = queue[0];

  const boxes = useMemo(() => {
    const b = [0, 0, 0, 0, 0];
    for (const c of cards) b[(progress.cards[c.id]?.box ?? 1) - 1]++;
    return b;
  }, [cards, progress.cards]);

  const grade = (knew: boolean) => {
    if (!card) return;
    gradeCard(card.id, knew);
    setStats((s) => ({ knew: s.knew + (knew ? 1 : 0), again: s.again + (knew ? 0 : 1) }));
    setFlipped(false);
    // "Again" cards return later in this session (short-term spacing)
    setQueue((q) => {
      const rest = q.slice(1);
      if (knew) return rest;
      const pos = Math.min(rest.length, 3);
      return [...rest.slice(0, pos), card, ...rest.slice(pos)];
    });
    if (knew && queue.length === 1) onFinish?.();
  };

  if (!total) return <div className="rounded-2xl bg-white p-8 text-center text-slate-500">No cards here right now. 🎉</div>;

  return (
    <div>
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2 text-sm text-slate-500">
        <span>{title ?? "Flashcards"} · {queue.length} left</span>
        <span>
          ✓ {stats.knew} · ↺ {stats.again}
        </span>
      </div>
      {card ? (
        <>
          <button onClick={() => setFlipped((f) => !f)} className="flip block w-full text-left" aria-label="Flip card">
            <div className={cx("flip-inner relative min-h-72 md:min-h-80", flipped && "flipped")}>
              <div className="flip-face absolute inset-0 flex flex-col rounded-3xl border border-slate-200 bg-white p-7 shadow-md">
                <span className="text-xs font-bold uppercase tracking-wide text-indigo-500">{TOPIC_LABEL[card.topic]} · Question</span>
                <div className="flex flex-1 items-center justify-center text-center font-display text-2xl font-semibold leading-snug md:text-3xl">
                  <Rich text={card.front} />
                </div>
                <span className="text-center text-sm text-slate-400">Recall the answer, then tap to flip</span>
              </div>
              <div className="flip-face flip-back absolute inset-0 flex flex-col rounded-3xl border border-indigo-200 bg-indigo-50 p-7 shadow-md">
                <span className="text-xs font-bold uppercase tracking-wide text-indigo-500">Answer</span>
                <div className="flex flex-1 items-center justify-center overflow-auto text-center text-lg leading-relaxed md:text-xl">
                  <Rich text={card.back} />
                </div>
              </div>
            </div>
          </button>
          <div className={cx("mt-4 grid grid-cols-2 gap-3 transition", !flipped && "pointer-events-none opacity-30")}>
            <button onClick={() => grade(false)} className="min-h-14 rounded-xl border-2 border-rose-300 bg-white text-lg font-semibold text-rose-700">
              ↺ Again
            </button>
            <button onClick={() => grade(true)} className="min-h-14 rounded-xl bg-emerald-600 text-lg font-semibold text-white">
              ✓ Got it
            </button>
          </div>
        </>
      ) : (
        <div className="rounded-3xl bg-white p-8 text-center">
          <div className="text-4xl">🎉</div>
          <div className="mt-2 font-display text-2xl font-semibold">Deck complete</div>
          <p className="text-slate-600">
            {stats.knew} recalled · {stats.again} repeats. Cards you knew will come back in 1–7 days (Leitner spacing).
          </p>
          <button onClick={() => setQueue(shuffle(cards))} className="mt-4 min-h-12 rounded-xl border border-slate-300 px-5 font-semibold">
            Go again
          </button>
        </div>
      )}
      <div className="mt-5 grid grid-cols-5 gap-2 text-center text-xs text-slate-500">
        {boxes.map((n, i) => (
          <div key={i} className="rounded-lg bg-white p-2 ring-1 ring-slate-200">
            <div className="font-bold text-slate-700">{n}</div>Box {i + 1}
          </div>
        ))}
      </div>
    </div>
  );
}
