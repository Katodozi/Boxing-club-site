"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { NewsPost, NewsCategory } from "@/lib/types";

const CATEGORIES: NewsCategory[] = ["Event", "Notice", "Fight Announcement"];

export default function NewsForm({ post }: { post?: NewsPost }) {
  const router = useRouter();
  const isEdit = Boolean(post);

  const [form, setForm] = useState({
    title: post?.title ?? "",
    category: post?.category ?? CATEGORIES[0],
    excerpt: post?.excerpt ?? "",
    content: post?.content ?? "",
    eventDate: post?.eventDate ?? "",
    publishedAt: post?.publishedAt ?? new Date().toISOString().slice(0, 10),
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch(isEdit ? `/api/news/${post!.id}` : "/api/news", {
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
    router.push("/admin/news");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="flex max-w-2xl flex-col gap-5">
      <div>
        <label className="font-mono mb-2 block text-[11px] uppercase tracking-wide text-bone-dim">Title</label>
        <input
          required
          value={form.title}
          onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
          className="input"
        />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div>
          <label className="font-mono mb-2 block text-[11px] uppercase tracking-wide text-bone-dim">Category</label>
          <select
            value={form.category}
            onChange={(e) => setForm((f) => ({ ...f, category: e.target.value as NewsCategory }))}
            className="input"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="font-mono mb-2 block text-[11px] uppercase tracking-wide text-bone-dim">
            Event Date (optional)
          </label>
          <input
            type="date"
            value={form.eventDate}
            onChange={(e) => setForm((f) => ({ ...f, eventDate: e.target.value }))}
            className="input"
          />
        </div>
        <div>
          <label className="font-mono mb-2 block text-[11px] uppercase tracking-wide text-bone-dim">Published</label>
          <input
            required
            type="date"
            value={form.publishedAt}
            onChange={(e) => setForm((f) => ({ ...f, publishedAt: e.target.value }))}
            className="input"
          />
        </div>
      </div>

      <div>
        <label className="font-mono mb-2 block text-[11px] uppercase tracking-wide text-bone-dim">Excerpt</label>
        <textarea
          required
          rows={2}
          value={form.excerpt}
          onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))}
          className="input"
        />
      </div>

      <div>
        <label className="font-mono mb-2 block text-[11px] uppercase tracking-wide text-bone-dim">
          Content — separate paragraphs with a blank line
        </label>
        <textarea
          required
          rows={8}
          value={form.content}
          onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
          className="input"
        />
      </div>

      {error && <p className="text-sm text-corner-red">{error}</p>}

      <div className="flex gap-4">
        <button type="submit" disabled={loading} className="btn-primary">
          {loading ? "Saving…" : isEdit ? "Save Changes" : "Publish Post"}
        </button>
        <button type="button" onClick={() => router.push("/admin/news")} className="btn-ghost">
          Cancel
        </button>
      </div>
    </form>
  );
}
