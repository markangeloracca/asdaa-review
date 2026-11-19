import { notFound } from "next/navigation";
import ExamRunner from "@/components/ExamRunner";

export function generateStaticParams() {
  return [1, 2, 3, 4, 5, 6].map((id) => ({ id: String(id) }));
}

export default async function ExamPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const n = Number(id);
  if (!(n >= 1 && n <= 6)) notFound();
  return <ExamRunner key={n} examId={n} />;
}
