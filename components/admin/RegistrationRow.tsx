"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Registration, RegistrationStatus } from "@/lib/types";
import ConfirmDeleteButton from "./ConfirmDeleteButton";

const STATUS_STYLES: Record<RegistrationStatus, string> = {
  new: "border-corner-red text-[#e08279]",
  contacted: "border-brass text-brass-bright",
  enrolled: "border-corner-blue text-[#7fa3ba]",
};

const CATEGORY_LABELS: Record<string, string> = {
  "drop-in": "Drop-In",
  monthly: "Monthly",
  "fight-team": "Fight Team",
};

export default function RegistrationRow({ registration }: { registration: Registration }) {
  const router = useRouter();
  const [status, setStatus] = useState<RegistrationStatus>(registration.status);
  const [expanded, setExpanded] = useState(false);
  const [saving, setSaving] = useState(false);

  async function updateStatus(next: RegistrationStatus) {
    setStatus(next);
    setSaving(true);
    await fetch(`/api/registrations/${registration.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: next }),
    });
    setSaving(false);
    router.refresh();
  }

  return (
    <>
      <tr
        className="cursor-pointer border-b border-hairline last:border-0 hover:bg-brass/5"
        onClick={() => setExpanded((v) => !v)}
      >
        <td className="px-4 py-3.5 text-bone">{registration.name}</td>
        <td className="px-4 py-3.5 text-bone-dim">{registration.email}</td>
        <td className="px-4 py-3.5 text-bone-dim">{registration.phone}</td>
        <td className="px-4 py-3.5 text-bone-dim">
          {CATEGORY_LABELS[registration.category] ?? registration.category}
        </td>
        <td className="px-4 py-3.5" onClick={(e) => e.stopPropagation()}>
          <select
            value={status}
            disabled={saving}
            onChange={(e) => updateStatus(e.target.value as RegistrationStatus)}
            className={`font-mono border bg-canvas px-2 py-1.5 text-[11px] uppercase tracking-wide ${STATUS_STYLES[status]}`}
          >
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="enrolled">Enrolled</option>
          </select>
        </td>
        <td className="px-4 py-3.5 text-bone-dim">
          {new Date(registration.createdAt).toLocaleDateString()}
        </td>
        <td className="px-4 py-3.5" onClick={(e) => e.stopPropagation()}>
          <ConfirmDeleteButton endpoint={`/api/registrations/${registration.id}`} itemLabel="entry" />
        </td>
      </tr>
      {expanded && (registration.experience || registration.message) && (
        <tr className="border-b border-hairline bg-canvas-alt/60 last:border-0">
          <td colSpan={7} className="px-4 py-4 text-sm text-bone-dim">
            {registration.experience && (
              <p className="mb-2">
                <span className="font-mono mr-2 text-[10px] uppercase text-brass-bright">Experience:</span>
                {registration.experience}
              </p>
            )}
            {registration.message && (
              <p>
                <span className="font-mono mr-2 text-[10px] uppercase text-brass-bright">Message:</span>
                {registration.message}
              </p>
            )}
          </td>
        </tr>
      )}
    </>
  );
}
