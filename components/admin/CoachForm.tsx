"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Coach, Corner } from "@/lib/types";

export default function CoachForm({ coach }: { coach?: Coach }) {
  const router = useRouter();
  const isEdit = Boolean(coach);

  const [form, setForm] = useState({
    name: coach?.name ?? "",
    role: coach?.role ?? "",
    corner: coach?.corner ?? ("red" as Corner),
    initials: coach?.initials ?? "",
    bio: coach?.bio ?? "",
    quote: coach?.quote ?? "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch(isEdit ? `/api/coaches/${coach!.id}` : "/api/coaches", {
      method: isEdit ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();

    setLoading(false);
    if (!res.ok) {
      setError(data.error || "Something went wrong.");
      return;
    }
    router.push("/admin/coaches");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="flex max-w-2xl flex-col gap-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label className="font-mono mb-2 block text-[11px] uppercase tracking-wide text-bone-dim">Name</label>
          <input
            required
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            className="input"
          />
        </div>
        <div>
          <label className="font-mono mb-2 block text-[11px] uppercase tracking-wide text-bone-dim">
            Initials (max 3 chars)
          </label>
          <input
            required
            maxLength={3}
            value={form.initials}
            onChange={(e) => setForm((f) => ({ ...f, initials: e.target.value.toUpperCase() }))}
            className="input"
          />
        </div>
      </div>

      <div>
        <label className="font-mono mb-2 block text-[11px] uppercase tracking-wide text-bone-dim">Role</label>
        <input
          required
          placeholder="e.g. Head Coach · Former National Amateur Finalist"
          value={form.role}
          onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
          className="input"
        />
      </div>

      <div>
        <label className="font-mono mb-2 block text-[11px] uppercase tracking-wide text-bone-dim">Corner</label>
        <select
          value={form.corner}
          onChange={(e) => setForm((f) => ({ ...f, corner: e.target.value as Corner }))}
          className="input"
        >
          <option value="red">Red</option>
          <option value="blue">Blue</option>
        </select>
      </div>

      <div>
        <label className="font-mono mb-2 block text-[11px] uppercase tracking-wide text-bone-dim">Bio</label>
        <textarea
          required
          rows={4}
          value={form.bio}
          onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))}
          className="input"
        />
      </div>

      <div>
        <label className="font-mono mb-2 block text-[11px] uppercase tracking-wide text-bone-dim">Quote</label>
        <textarea
          required
          rows={2}
          value={form.quote}
          onChange={(e) => setForm((f) => ({ ...f, quote: e.target.value }))}
          className="input"
        />
      </div>

      {error && <p className="text-sm text-corner-red">{error}</p>}

      <div className="flex gap-4">
        <button type="submit" disabled={loading} className="btn-primary">
          {loading ? "Saving…" : isEdit ? "Save Changes" : "Add Coach"}
        </button>
        <button type="button" onClick={() => router.push("/admin/coaches")} className="btn-ghost">
          Cancel
        </button>
      </div>
    </form>
  );
}
