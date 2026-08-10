import RevealOnScroll from "@/components/RevealOnScroll";
import PageBanner from "@/components/PageBanner";
import NewsCard from "@/components/NewsCard";
import { getNewsPosts } from "@/lib/news";

export const metadata = { title: "News — MaxX Boxing Club" };

export default async function NewsPage() {
  const posts = await getNewsPosts();

  return (
    <div className="pt-28">
      <PageBanner round="07" tone="red" imageSrc="/banners/news.jpg"/>
      <div className="pb-28 pt-14">
      <div className="mx-auto max-w-[1180px] px-6 sm:px-8">
        <RevealOnScroll className="mb-16 max-w-2xl">
          <p className="font-mono mb-4 text-xs text-brass-bright">Round 07 — News</p>
          <h1 className="font-display mb-6 text-5xl leading-tight sm:text-6xl">
            Fight card &amp; notices.
          </h1>
          <p className="text-lg text-bone-dim">
            Upcoming fights from our Fight Team, gym notices, and open events.
          </p>
        </RevealOnScroll>

        {posts.length === 0 ? (
          <p className="text-bone-dim">No news posted yet.</p>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, i) => (
              <RevealOnScroll key={post.id} delay={i * 0.06}>
                <NewsCard post={post} />
              </RevealOnScroll>
            ))}
          </div>
        )}
      </div>
      </div>
    </div>
  );
}