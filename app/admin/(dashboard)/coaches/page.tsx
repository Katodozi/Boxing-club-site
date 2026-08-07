import Link from "next/link";
import { getCoaches } from "@/lib/coaches";
import ConfirmDeleteButton from "@/components/admin/ConfirmDeleteButton";

export const metadata = { title: "Admin — Coaches" };

export default async function AdminCoachesPage() {
  const coaches = await getCoaches();

  return (
    <div>
      <div className="mb-10 flex items-center justify-between">
        <div>
          <p className="font-mono mb-2 text-xs text-brass-bright">Admin</p>
          <h1 className="font-display text-3xl">Coaches</h1>
        </div>
        <Link href="/admin/coaches/new" className="btn-primary !px-5 !py-2.5">
          + New Coach
        </Link>
      </div>

      <div className="overflow-x-auto border border-hairline">
        <table className="w-full min-w-[600px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-hairline bg-canvas-alt">
              <th className="font-mono px-4 py-3 text-left text-[10px] uppercase tracking-wide text-brass-bright">Name</th>
              <th className="font-mono px-4 py-3 text-left text-[10px] uppercase tracking-wide text-brass-bright">Role</th>
              <th className="font-mono px-4 py-3 text-left text-[10px] uppercase tracking-wide text-brass-bright">Corner</th>
              <th className="font-mono px-4 py-3 text-right text-[10px] uppercase tracking-wide text-brass-bright">Actions</th>
            </tr>
          </thead>
          <tbody>
            {coaches.map((coach) => (
              <tr key={coach.id} className="border-b border-hairline last:border-0">
                <td className="px-4 py-3.5 text-bone">{coach.name}</td>
                <td className="px-4 py-3.5 text-bone-dim">{coach.role}</td>
                <td className="px-4 py-3.5 text-bone-dim capitalize">{coach.corner}</td>
                <td className="px-4 py-3.5">
                  <div className="flex items-center justify-end gap-4">
                    <Link
                      href={`/admin/coaches/${coach.id}/edit`}
                      className="font-mono text-[11px] uppercase tracking-wide text-brass-bright hover:underline"
                    >
                      Edit
                    </Link>
                    <ConfirmDeleteButton endpoint={`/api/coaches/${coach.id}`} itemLabel="coach" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
