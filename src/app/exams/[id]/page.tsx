import { notFound } from "next/navigation";
import ExamRunner from "@/components/ExamRunner";
import { EXAMS } from "@/content";

export function generateStaticParams() {
  return EXAMS.map((e) => ({ id: String(e.id) }));
}

export default async function ExamPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const n = Number(id);
  if (!EXAMS.some((e) => e.id === n)) notFound();
  return <ExamRunner key={n} examId={n} />;
}
