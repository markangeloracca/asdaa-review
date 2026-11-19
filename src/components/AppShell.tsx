"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { useStudy } from "@/lib/store";
import { cx } from "@/lib/utils";
import { currentPlanDay } from "@/lib/schedule";

const SyncDot = () => {
  const { sync } = useStudy();
  const map: Record<string, [string, string]> = {
    local: ["bg-slate-400", "On this device"],
    "signed-out": ["bg-amber-400", "Not syncing"],
    syncing: ["bg-sky-400 animate-pulse", "Syncing…"],
    synced: ["bg-emerald-500", "Synced"],
    error: ["bg-rose-500", "Sync error"],
  };
  const [c, l] = map[sync];
  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-slate-500">
      <span className={cx("h-2 w-2 rounded-full", c)} />
      {l}
    </span>
  );
};

export function AppShell({ children }: { children: ReactNode }) {
  const path = usePathname();
  const { ready, progress } = useStudy();
  const nextDay = [1, 2, 3].find((d) => !progress.daysDone[d]) ?? Math.min(3, Math.max(1, currentPlanDay(progress.startDate)));

  const nav = [
    { href: "/", label: "Plan", icon: "🗓️", match: (p: string) => p === "/" },
    { href: "/day/1", label: "Day 1 · Refactoring & Debt", short: "Day 1", icon: "①", match: (p: string) => p === "/day/1" },
    { href: "/day/2", label: "Day 2 · Quality & Testing", short: "Day 2", icon: "②", match: (p: string) => p === "/day/2" },
    { href: "/day/3", label: "Day 3 · Agile & Security", short: "Day 3", icon: "③", match: (p: string) => p === "/day/3" },
    { href: "/exams", label: "Mock Exams", icon: "📝", match: (p: string) => p.startsWith("/exams") },
    { href: "/flashcards", label: "Flashcards", icon: "🃏", match: (p: string) => p.startsWith("/flashcards") },
    { href: "/account", label: "Sync & Settings", icon: "☁️", match: (p: string) => p.startsWith("/account") },
  ];
  const tabs = [
    nav[0],
    { href: `/day/${nextDay}`, label: "Review", icon: "📖", match: (p: string) => p.startsWith("/day") },
    nav[4],
    nav[5],
    { ...nav[6], label: "Sync" },
  ];

  return (
    <div className="min-h-dvh lg:flex">
      {/* Sidebar: iPad landscape & desktop */}
      <aside className="sticky top-0 hidden h-dvh w-72 shrink-0 flex-col border-r border-slate-200 bg-white/70 px-4 py-6 backdrop-blur lg:flex">
        <Link href="/" className="mb-6 px-2">
          <div className="font-display text-2xl font-bold leading-tight text-ink">ENSF 607</div>
          <div className="text-sm text-slate-500">3-Day Review + 6 Mock Exams</div>
        </Link>
        <nav className="flex flex-1 flex-col gap-1">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={cx(
                "flex min-h-11 items-center gap-3 rounded-xl px-3 text-[15px] font-medium transition",
                n.match(path) ? "bg-ink text-white" : "text-slate-700 hover:bg-slate-100",
              )}
            >
              <span className="w-5 text-center">{n.icon}</span>
              <span className="flex-1">{n.label}</span>
              {n.href.startsWith("/day/") && progress.daysDone[Number(n.href.slice(5))] && <span className="text-emerald-500">✓</span>}
            </Link>
          ))}
        </nav>
        <div className="px-2">
          <SyncDot />
        </div>
      </aside>

      {/* Top bar: portrait / phone */}
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-slate-200 bg-paper/90 px-5 pb-3 pt-[max(0.75rem,env(safe-area-inset-top))] backdrop-blur lg:hidden">
        <Link href="/" className="font-display text-xl font-bold text-ink">
          ENSF 607 <span className="font-sans text-sm font-normal text-slate-500">Review</span>
        </Link>
        <SyncDot />
      </header>

      <main className="min-w-0 flex-1 pb-28 lg:pb-10">
        {ready ? children : <div className="p-10 text-center text-slate-400">Loading your progress…</div>}
      </main>

      {/* Bottom tabs: portrait / phone */}
      <nav className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-5 border-t border-slate-200 bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden">
        {tabs.map((t) => (
          <Link key={t.label} href={t.href} className={cx("flex min-h-16 flex-col items-center justify-center gap-0.5 text-xs font-medium", t.match(path) ? "text-indigo-600" : "text-slate-500")}>
            <span className="text-xl leading-none">{t.icon}</span>
            {t.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
