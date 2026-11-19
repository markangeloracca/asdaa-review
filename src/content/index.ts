import type { Lesson, LessonId } from "@/lib/types";
import L9 from "./l9";
import L10 from "./l10";
import L11 from "./l11";
import L12 from "./l12";
import L13 from "./l13";
import L14 from "./l14";

export { DAYS } from "./days";
export { EXAMS } from "./exams";

export const LESSONS: Record<LessonId, Lesson> = { L9, L10, L11, L12, L13, L14 };

export const TOPIC_LABEL: Record<LessonId, string> = {
  L9: "L9 Refactoring",
  L10: "L10 Technical Debt",
  L11: "L11 Software Quality",
  L12: "L12 Software Testing",
  L13: "L13 Agile",
  L14: "L14 Security",
};

export const TOPIC_COLOR: Record<LessonId, string> = {
  L9: "bg-teal-500",
  L10: "bg-amber-500",
  L11: "bg-sky-500",
  L12: "bg-indigo-500",
  L13: "bg-emerald-500",
  L14: "bg-rose-500",
};

export const ALL_FLASHCARDS = (Object.keys(LESSONS) as LessonId[]).flatMap((id) =>
  LESSONS[id].flashcards.map((f) => ({ ...f, topic: id })),
);
