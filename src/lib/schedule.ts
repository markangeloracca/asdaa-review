import { addDays, diffDays, todayISO } from "./utils";

export const PLAN = [
  { day: 1, kind: "review" as const },
  { day: 2, kind: "review" as const },
  { day: 3, kind: "review" as const },
  { day: 4, kind: "exam" as const, exams: [1, 2] },
  { day: 5, kind: "exam" as const, exams: [3, 4] },
  { day: 6, kind: "exam" as const, exams: [5, 6] },
];

export function dateForDay(start: string | null, day: number): string | null {
  return start ? addDays(start, day - 1) : null;
}

/** Which plan day is "today" (1..6), 0 if before start, 7 if after the plan. */
export function currentPlanDay(start: string | null): number {
  if (!start) return 1;
  const d = diffDays(start, todayISO()) + 1;
  if (d < 1) return 0;
  return Math.min(d, 7);
}

export type DayStatus = "past" | "today" | "upcoming";
export function dayStatus(start: string | null, day: number): DayStatus {
  const cur = currentPlanDay(start);
  if (cur === day) return "today";
  return day < cur ? "past" : "upcoming";
}
