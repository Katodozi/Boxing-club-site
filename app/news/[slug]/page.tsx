import { notFound } from "next/navigation";
import Link from "next/link";
import RevealOnScroll from "@/components/RevealOnScroll";
import { getNewsBySlug } from "@/lib/news";

export default async function NewsPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getNewsBySlug(slug);
  if (!post) notFound();

  const date = new Date(post.publishedAt).toLocaleDateString("en-US", {
    month: "long",
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
    <div className="pt-40 pb-28">
      <div className="mx-auto max-w-3xl px-6 sm:px-8">
        <RevealOnScroll>
          <Link href="/news" className="font-mono mb-8 inline-block text-xs text-brass-bright hover:underline">
            ← All news
          </Link>
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <span className="tag-pill border-brass text-brass-bright">{post.category}</span>
            <span className="font-mono text-[11px] text-bone-dim">Posted {date}</span>
          </div>
          <h1 className="font-display mb-6 text-4xl leading-tight sm:text-5xl">{post.title}</h1>
          {eventDate && (
            <p className="font-mono mb-12 text-xs uppercase tracking-wide text-brass-bright">
              Event date: {eventDate}
            </p>
          )}
        </RevealOnScroll>

        <RevealOnScroll delay={0.1} className="flex flex-col gap-5 border-t border-hairline pt-10 text-base leading-relaxed text-bone-dim">
          {post.content.split("\n\n").map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </RevealOnScroll>
      </div>
    </div>
  );
}
