"use client";

import { useState } from "react";
import type { Block } from "@/lib/types";
import { useStudy } from "@/lib/store";
import { Rich } from "./Rich";
import { Diagram } from "./Diagrams";
import { QuizItem } from "./QuizItem";

function Label({ icon, text, tone }: { icon: string; text: string; tone: string }) {
  return (
    <div className={`mb-2 inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider ${tone}`}>
      <span aria-hidden>{icon}</span>
      {text}
    </div>
  );
}

function Feynman({ prompt, model }: { prompt: string; model: string }) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  return (
    <div className="rounded-2xl border-2 border-dashed border-violet-300 bg-violet-50/60 p-5">
      <Label icon="🧠" text="Feynman technique: explain it simply" tone="bg-violet-100 text-violet-800" />
      <p className="mb-3 text-lg font-medium">
        <Rich text={prompt} />
      </p>
      <textarea
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        rows={4}
        placeholder="Type (or say it out loud) in your own words before revealing…"
        className="w-full rounded-xl border border-violet-200 bg-white p-3 text-base outline-none focus:ring-2 focus:ring-violet-300"
      />
      <button onClick={() => setOpen((o) => !o)} className="mt-3 min-h-11 rounded-xl bg-violet-600 px-5 font-semibold text-white">
        {open ? "Hide model answer" : "Compare with model answer"}
      </button>
      {open && (
        <div className="mt-3 rounded-xl bg-white p-4 text-base leading-relaxed">
          <Rich text={model} />
          <p className="mt-2 text-sm text-violet-700">Check: did you use the key terms? Could a first-year student follow it? If you got stuck anywhere, that's the gap to review.</p>
        </div>
      )}
    </div>
  );
}

export function BlockView({ b }: { b: Block }) {
  const { recordCheck } = useStudy();
  switch (b.kind) {
    case "hook":
      return (
        <div className="rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 p-5 ring-1 ring-amber-200">
          <Label icon="💡" text={b.title ?? "Hook"} tone="bg-amber-100 text-amber-800" />
          <p className="text-lg leading-relaxed">
            <Rich text={b.text} />
          </p>
        </div>
      );
    case "objectives":
      return (
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <Label icon="🎯" text="By the end you can…" tone="bg-slate-100 text-slate-700" />
          <ul className="space-y-1.5">
            {b.items.map((x, i) => (
              <li key={i} className="flex gap-2 text-base">
                <span className="text-slate-400">☐</span>
                <Rich text={x} />
              </li>
            ))}
          </ul>
        </div>
      );
    case "concept":
      return (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="font-display text-2xl font-semibold text-ink">{b.term}</h3>
          <p className="mt-2 border-l-4 border-indigo-400 bg-indigo-50/60 py-2 pl-4 pr-2 text-lg leading-relaxed text-slate-800">
            <Rich text={b.definition} />
          </p>
          {b.body && (
            <p className="mt-3 text-base leading-relaxed text-slate-700">
              <Rich text={b.body} />
            </p>
          )}
          {b.points && (
            <ul className="mt-3 space-y-1.5">
              {b.points.map((p, i) => (
                <li key={i} className="flex gap-2 text-base text-slate-700">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-400" />
                  <Rich text={p} />
                </li>
              ))}
            </ul>
          )}
        </div>
      );
    case "pillars":
      return (
        <div>
          <div className="mb-2 text-sm font-bold uppercase tracking-wide text-slate-500">{b.title}</div>
          <div className={`grid gap-3 ${b.items.length === 4 ? "sm:grid-cols-2" : b.items.length >= 5 ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-3"}`}>
            {b.items.map((it) => (
              <div key={it.k} className="rounded-xl border border-slate-200 bg-white p-4">
                <div className="font-semibold text-ink">{it.k}</div>
                <div className="mt-1 text-sm text-slate-600">
                  <Rich text={it.v} />
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    case "list":
      return (
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="mb-2 font-semibold">{b.title}</div>
          {b.ordered ? (
            <ol className="list-decimal space-y-1.5 pl-6 text-base">
              {b.items.map((x, i) => (
                <li key={i}>
                  <Rich text={x} />
                </li>
              ))}
            </ol>
          ) : (
            <ul className="list-disc space-y-1.5 pl-6 text-base">
              {b.items.map((x, i) => (
                <li key={i}>
                  <Rich text={x} />
                </li>
              ))}
            </ul>
          )}
        </div>
      );
    case "table":
      return (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <div className="border-b border-slate-200 bg-slate-50 px-4 py-2.5 font-semibold">{b.title}</div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[15px]">
              <thead>
                <tr className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500">
                  {b.head.map((h) => (
                    <th key={h} className="px-4 py-2 font-semibold">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {b.rows.map((r, i) => (
                  <tr key={i} className="border-b border-slate-100 align-top last:border-0">
                    {r.map((c, j) => (
                      <td key={j} className={`px-4 py-2.5 ${j === 0 ? "font-semibold text-ink" : "text-slate-700"}`}>
                        <Rich text={c} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    case "compare":
      return (
        <div>
          <div className="mb-2 text-sm font-bold uppercase tracking-wide text-slate-500">{b.title}</div>
          <div className="grid gap-3 sm:grid-cols-2">
            {[b.left, b.right].map((side, k) => (
              <div key={k} className={`rounded-xl border-2 p-4 ${k === 0 ? "border-emerald-200 bg-emerald-50/60" : "border-rose-200 bg-rose-50/60"}`}>
                <div className={`mb-2 font-bold ${k === 0 ? "text-emerald-800" : "text-rose-800"}`}>{side.label}</div>
                <ul className="space-y-1.5">
                  {side.items.map((x, i) => (
                    <li key={i} className="flex gap-2 text-base">
                      <span>{k === 0 ? "＋" : "－"}</span>
                      <Rich text={x} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      );
    case "analogy":
      return (
        <div className="rounded-2xl bg-sky-50 p-5 ring-1 ring-sky-200">
          <Label icon="🔗" text="Analogy: make it concrete" tone="bg-sky-100 text-sky-800" />
          <p className="text-base leading-relaxed md:text-lg">
            <Rich text={b.text} />
          </p>
        </div>
      );
    case "mnemonic":
      return (
        <div className="rounded-2xl bg-fuchsia-50 p-5 ring-1 ring-fuchsia-200">
          <Label icon="🪄" text="Memory hook" tone="bg-fuchsia-100 text-fuchsia-800" />
          <div className="font-display text-xl font-semibold text-fuchsia-900">{b.title}</div>
          <p className="mt-1 text-base leading-relaxed">
            <Rich text={b.text} />
          </p>
        </div>
      );
    case "code":
      return (
        <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
          <div className="border-b border-slate-700 px-4 py-2 text-sm font-semibold text-slate-200">{b.title}</div>
          <pre className="overflow-x-auto p-4 font-mono text-[13px] leading-relaxed text-emerald-200">{b.code}</pre>
          {b.caption && (
            <div className="border-t border-slate-700 px-4 py-2 text-sm text-slate-300">
              <Rich text={b.caption} />
            </div>
          )}
        </div>
      );
    case "diagram":
      return <Diagram id={b.id} caption={b.caption} />;
    case "check":
      return (
        <div className="rounded-2xl border-2 border-indigo-200 bg-white p-5">
          <Label icon="✍️" text="Quick check: retrieve it" tone="bg-indigo-100 text-indigo-800" />
          <QuizItem q={b.q} onReveal={(c) => recordCheck(b.q.id, c)} />
        </div>
      );
    case "pitfall":
      return (
        <div className="rounded-2xl border-l-4 border-rose-500 bg-rose-50 p-4">
          <Label icon="⚠️" text="Exam trap" tone="bg-rose-100 text-rose-800" />
          <p className="text-base leading-relaxed">
            <Rich text={b.text} />
          </p>
        </div>
      );
    case "connect":
      return (
        <div className="rounded-2xl border-l-4 border-emerald-500 bg-emerald-50 p-4">
          <Label icon="🧩" text="Connect the ideas" tone="bg-emerald-100 text-emerald-800" />
          <p className="text-base leading-relaxed">
            <Rich text={b.text} />
          </p>
        </div>
      );
    case "feynman":
      return <Feynman prompt={b.prompt} model={b.model} />;
    case "callout":
      return (
        <div className="rounded-2xl bg-slate-800 p-5 text-slate-100">
          {b.title && <div className="mb-1 font-display text-lg font-semibold text-white">{b.title}</div>}
          <p className="text-base leading-relaxed [&_strong]:text-amber-300">
            <Rich text={b.text} />
          </p>
        </div>
      );
  }
}

export function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className="space-y-5">
      {blocks.map((b, i) => (
        <BlockView key={i} b={b} />
      ))}
    </div>
  );
}
