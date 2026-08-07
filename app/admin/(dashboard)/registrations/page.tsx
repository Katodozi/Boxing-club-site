import { getRegistrations } from "@/lib/registrations";
import RegistrationRow from "@/components/admin/RegistrationRow";

export const metadata = { title: "Admin — Registrations" };

export default async function AdminRegistrationsPage() {
  const registrations = await getRegistrations();

  return (
    <div>
      <p className="font-mono mb-2 text-xs text-brass-bright">Admin</p>
      <h1 className="font-display mb-2 text-3xl">Registrations</h1>
      <p className="mb-10 text-sm text-bone-dim">
        Submissions from the Join / Book a Trial form. Click a row to expand notes.
      </p>

      {registrations.length === 0 ? (
        <p className="text-sm text-bone-dim">No registrations yet.</p>
      ) : (
        <div className="overflow-x-auto border border-hairline">
          <table className="w-full min-w-[800px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-hairline bg-canvas-alt">
                <th className="font-mono px-4 py-3 text-left text-[10px] uppercase tracking-wide text-brass-bright">Name</th>
                <th className="font-mono px-4 py-3 text-left text-[10px] uppercase tracking-wide text-brass-bright">Email</th>
                <th className="font-mono px-4 py-3 text-left text-[10px] uppercase tracking-wide text-brass-bright">Phone</th>
                <th className="font-mono px-4 py-3 text-left text-[10px] uppercase tracking-wide text-brass-bright">Category</th>
                <th className="font-mono px-4 py-3 text-left text-[10px] uppercase tracking-wide text-brass-bright">Status</th>
                <th className="font-mono px-4 py-3 text-left text-[10px] uppercase tracking-wide text-brass-bright">Date</th>
                <th className="font-mono px-4 py-3 text-left text-[10px] uppercase tracking-wide text-brass-bright">Actions</th>
              </tr>
            </thead>
            <tbody>
              {registrations.map((r) => (
                <RegistrationRow key={r.id} registration={r} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
