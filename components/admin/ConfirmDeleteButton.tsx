"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ConfirmDeleteButton({
  endpoint,
  itemLabel,
}: {
  endpoint: string;
  itemLabel: string;
}) {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    setLoading(true);
    try {
      const res = await fetch(endpoint, { method: "DELETE" });
      if (res.ok) {
        router.refresh();
      } else {
        alert("Failed to delete. Please try again.");
      }
    } finally {
      setLoading(false);
      setConfirming(false);
    }
  }

  if (confirming) {
    return (
      <span className="font-mono inline-flex items-center gap-2 text-[11px]">
        Delete {itemLabel}?
        <button
          onClick={handleDelete}
          disabled={loading}
          className="text-corner-red underline hover:no-underline"
        >
          {loading ? "…" : "Yes"}
        </button>
        <button onClick={() => setConfirming(false)} className="text-bone-dim underline hover:no-underline">
          No
        </button>
      </span>
    );
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      className="font-mono text-[11px] uppercase tracking-wide text-bone-dim transition-colors hover:text-corner-red"
    >
      Delete
    </button>
  );
}
