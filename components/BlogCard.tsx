import Link from "next/link";
import { BlogPost } from "@/lib/types";

export default function BlogCard({ post }: { post: BlogPost }) {
  const date = new Date(post.publishedAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col border border-hairline bg-canvas-alt p-7 transition-all duration-300 hover:-translate-y-1 hover:border-brass"
    >
      <div className="mb-4 flex items-center justify-between">
        <span className="tag-pill border-brass text-brass-bright">{post.tag}</span>
        <span className="font-mono text-[11px] text-bone-dim">{date}</span>
      </div>
      <h3 className="mb-3 text-lg leading-snug transition-colors group-hover:text-brass-bright">
        {post.title}
      </h3>
      <p className="mb-5 flex-1 text-sm text-bone-dim">{post.excerpt}</p>
      <span className="font-mono text-[11px] uppercase tracking-wide text-bone-dim">
        By {post.authorName}
      </span>
    </Link>
  );
}
