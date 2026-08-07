import { notFound } from "next/navigation";
import CoachForm from "@/components/admin/CoachForm";
import { getCoachById } from "@/lib/coaches";

export const metadata = { title: "Admin — Edit Coach" };

export default async function EditCoachPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const coach = await getCoachById(id);
  if (!coach) notFound();

  return (
    <div>
      <p className="font-mono mb-2 text-xs text-brass-bright">Admin — Coaches</p>
      <h1 className="font-display mb-10 text-3xl">Edit Coach</h1>
      <CoachForm coach={coach} />
    </div>
  );
}
