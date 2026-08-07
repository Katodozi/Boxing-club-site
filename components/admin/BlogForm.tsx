"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { BlogPost, Coach } from "@/lib/types";

const TAGS = ["Technique", "Conditioning", "Mindset", "Nutrition", "Club News"];

export default function BlogForm({
  post,
  coaches,
}: {
  post?: BlogPost;
  coaches: Coach[];
}) {
  const router = useRouter();
  const isEdit = Boolean(post);

  const [form, setForm] = useState({
    title: post?.title ?? "",
    authorId: post?.authorId ?? "owner",
    tag: post?.tag ?? TAGS[0],
    excerpt: post?.excerpt ?? "",
    content: post?.content ?? "",
    publishedAt: post?.publishedAt ?? new Date().toISOString().slice(0, 10),
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function authorName(id: string) {
    if (id === "owner") return "Owner, Iron Bell Boxing Club";
    return coaches.find((c) => c.id === id)?.name ?? id;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const payload = { ...form, authorName: authorName(form.authorId) };
    const res = await fetch(isEdit ? `/api/blogs/${post!.id}` : "/api/blogs", {
      method: isEdit ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();

    setLoading(false);
    if (!res.ok) {
      setError(data.error || "Something went wrong.");
      return;
    }
    router.push("/admin/blogs");
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
          <label className="font-mono mb-2 block text-[11px] uppercase tracking-wide text-bone-dim">Author</label>
          <select
            value={form.authorId}
            onChange={(e) => setForm((f) => ({ ...f, authorId: e.target.value }))}
            className="input"
          >
            <option value="owner">Owner</option>
            {coaches.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="font-mono mb-2 block text-[11px] uppercase tracking-wide text-bone-dim">Tag</label>
          <select
            value={form.tag}
            onChange={(e) => setForm((f) => ({ ...f, tag: e.target.value }))}
            className="input"
          >
            {TAGS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
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
          rows={10}
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
        <button type="button" onClick={() => router.push("/admin/blogs")} className="btn-ghost">
          Cancel
        </button>
      </div>
    </form>
  );
}
