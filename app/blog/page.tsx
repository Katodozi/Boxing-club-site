import RevealOnScroll from "@/components/RevealOnScroll";
import PageBanner from "@/components/PageBanner";
import Link from "next/link";
import BlogCard from "@/components/BlogCard";
import { getBlogs } from "@/lib/blogs";
import { getCoaches } from "@/lib/coaches";

export const metadata = { title: "Blog — Iron Bell Boxing Club" };

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ author?: string }>;
}) {
  const { author } = await searchParams;
  const [posts, coaches] = await Promise.all([getBlogs(), getCoaches()]);
  const filtered = author ? posts.filter((p) => p.authorId === author) : posts;
  const filterCoach = author ? coaches.find((c) => c.id === author) : undefined;

  return (
    <div className="pt-28">
      <PageBanner round="06" tone="blue" imageSrc="/banners/blogs.jpg"/>
      <div className="pb-28 pt-14">
      <div className="mx-auto max-w-[1180px] px-6 sm:px-8">
        <RevealOnScroll className="mb-16 max-w-2xl">
          <p className="font-mono mb-4 text-xs text-brass-bright">Round 06 — Blog</p>
          <h1 className="font-display mb-6 text-5xl leading-tight sm:text-6xl">
            From the Corner.
          </h1>
          <p className="text-lg text-bone-dim">
            {filterCoach
              ? `Posts by ${filterCoach.name}.`
              : "Thoughts on training, discipline, and the craft — from our coaches and the owner."}
          </p>
          {filterCoach && (
            <Link href="/blog" className="font-mono mt-3 inline-block text-xs text-brass-bright hover:underline">
              ← View all posts
            </Link>
          )}
        </RevealOnScroll>

        {filtered.length === 0 ? (
          <p className="text-bone-dim">No posts yet.</p>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((post, i) => (
              <RevealOnScroll key={post.id} delay={i * 0.06}>
                <BlogCard post={post} />
              </RevealOnScroll>
            ))}
          </div>
        )}
      </div>
      </div>
    </div>
  );
}