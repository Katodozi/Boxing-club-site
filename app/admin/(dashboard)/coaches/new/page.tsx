import CoachForm from "@/components/admin/CoachForm";

export const metadata = { title: "Admin — New Coach" };

export default function NewCoachPage() {
  return (
    <div>
      <p className="font-mono mb-2 text-xs text-brass-bright">Admin — Coaches</p>
      <h1 className="font-display mb-10 text-3xl">New Coach</h1>
      <CoachForm />
    </div>
  );
}
