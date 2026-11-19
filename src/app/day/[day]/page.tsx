import { notFound } from "next/navigation";
import DayRunner from "@/components/DayRunner";

export function generateStaticParams() {
  return [{ day: "1" }, { day: "2" }, { day: "3" }];
}

export default async function DayPage({ params }: { params: Promise<{ day: string }> }) {
  const { day } = await params;
  const n = Number(day);
  if (![1, 2, 3].includes(n)) notFound();
  return <DayRunner key={n} day={n} />;
}
