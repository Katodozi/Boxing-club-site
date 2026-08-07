import Link from "next/link";
import { NewsPost } from "@/lib/types";

const CATEGORY_STYLES: Record<string, string> = {
  Event: "border-corner-blue text-[#7fa3ba]",
  Notice: "border-brass text-brass-bright",
  "Fight Announcement": "border-corner-red text-[#e08279]",
};

export default function NewsCard({ post }: { post: NewsPost }) {
  const date = new Date(post.publishedAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const eventDate = post.eventDate
    ? new Date(post.eventDate).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : null;

  return (
    <Link
      href={`/news/${post.slug}`}
      className="group flex flex-col border border-hairline bg-canvas-alt p-7 transition-all duration-300 hover:-translate-y-1 hover:border-brass"
    >
      <div className="mb-4 flex items-center justify-between">
        <span className={`tag-pill ${CATEGORY_STYLES[post.category] ?? ""}`}>{post.category}</span>
        <span className="font-mono text-[11px] text-bone-dim">{date}</span>
      </div>
      <h3 className="mb-3 text-lg leading-snug transition-colors group-hover:text-brass-bright">
        {post.title}
      </h3>
      <p className="mb-5 flex-1 text-sm text-bone-dim">{post.excerpt}</p>
      {eventDate && (
        <span className="font-mono text-[11px] uppercase tracking-wide text-brass-bright">
          {eventDate}
        </span>
      )}
    </Link>
  );
}
