import { notFound } from "next/navigation";
import Link from "next/link";
import RevealOnScroll from "@/components/RevealOnScroll";
import BlogCard from "@/components/BlogCard";
import { getBlogBySlug, getBlogs } from "@/lib/blogs";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);
  if (!post) notFound();

  const allPosts = await getBlogs();
  const related = allPosts.filter((p) => p.id !== post.id).slice(0, 2);

  const date = new Date(post.publishedAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="pt-40 pb-28">
      <div className="mx-auto max-w-3xl px-6 sm:px-8">
        <RevealOnScroll>
          <Link href="/blog" className="font-mono mb-8 inline-block text-xs text-brass-bright hover:underline">
            ← All posts
          </Link>
          <div className="mb-5 flex items-center gap-3">
            <span className="tag-pill border-brass text-brass-bright">{post.tag}</span>
            <span className="font-mono text-[11px] text-bone-dim">{date}</span>
          </div>
          <h1 className="font-display mb-6 text-4xl leading-tight sm:text-5xl">{post.title}</h1>
          <p className="font-mono mb-12 text-xs uppercase tracking-wide text-bone-dim">
            By {post.authorName}
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.1} className="flex flex-col gap-5 border-t border-hairline pt-10 text-base leading-relaxed text-bone-dim">
          {post.content.split("\n\n").map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </RevealOnScroll>

        {related.length > 0 && (
          <div className="mt-24">
            <p className="font-mono mb-6 text-xs text-brass-bright">More From the Corner</p>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {related.map((p) => (
                <BlogCard key={p.id} post={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
