export type LessonId = "L9" | "L10" | "L11" | "L12" | "L13" | "L14";

export type QType = "mcq" | "tf" | "multi";

export interface Question {
  id: string;
  topic: LessonId;
  type: QType;
  q: string;
  options?: string[]; // mcq / multi
  answer: number | number[] | boolean;
  explain: string;
}

export type DiagramId =
  | "evolve-devolve"
  | "refactor-levels"
  | "debt-curve"
  | "review-ladder"
  | "quality-pillars"
  | "testing-timeline"
  | "box-spectrum"
  | "testing-levels"
  | "test-types"
  | "flows"
  | "adhoc-vs-exploratory"
  | "sdlc"
  | "waterfall-vs-iterative"
  | "kanban"
  | "scrum"
  | "cia"
  | "threats"
  | "defense-in-depth";

export type Block =
  | { kind: "hook"; title?: string; text: string }
  | { kind: "objectives"; items: string[] }
  | { kind: "concept"; term: string; definition: string; body?: string; points?: string[] }
  | { kind: "pillars"; title: string; items: { k: string; v: string }[] }
  | { kind: "list"; title: string; items: string[]; ordered?: boolean }
  | { kind: "table"; title: string; head: string[]; rows: string[][] }
  | { kind: "compare"; title: string; left: { label: string; items: string[] }; right: { label: string; items: string[] } }
  | { kind: "analogy"; text: string }
  | { kind: "mnemonic"; title: string; text: string }
  | { kind: "code"; title: string; code: string; caption?: string }
  | { kind: "diagram"; id: DiagramId; caption?: string }
  | { kind: "check"; q: Question }
  | { kind: "pitfall"; text: string }
  | { kind: "connect"; text: string }
  | { kind: "feynman"; prompt: string; model: string }
  | { kind: "callout"; title?: string; text: string };

export interface Section {
  id: string;
  title: string;
  slides: string;
  blocks: Block[];
}

export interface Flashcard {
  id: string;
  front: string;
  back: string;
}

export interface Lesson {
  id: LessonId;
  number: number;
  title: string;
  tagline: string;
  sections: Section[];
  takeaways: string[];
  flashcards: Flashcard[];
}

export interface Day {
  day: number;
  title: string;
  theme: string;
  minutes: number;
  lessons: LessonId[];
  warmupIntro: string;
  warmup: Question[];
  bridge: Block[];
  exitTicket: Question[];
  preview: string;
}

export interface Exam {
  id: number;
  title: string;
  focus: string;
  scheduleDay: number; // 4,5,6
  minutes: number;
  questions: Question[];
}
