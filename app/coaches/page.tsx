import RevealOnScroll from "@/components/RevealOnScroll";
import PageBanner from "@/components/PageBanner";
import CoachCard from "@/components/CoachCard";
import { getCoaches } from "@/lib/coaches";
import { getBlogs } from "@/lib/blogs";

export const metadata = { title: "Coaches — Iron Bell Boxing Club" };

export default async function CoachesPage() {
  const [coaches, blogs] = await Promise.all([getCoaches(), getBlogs()]);

  return (
    <div className="pt-28">
      <PageBanner round="03" tone="red" imageSrc="/banners/coaching.jpg"/>
      <div className="pb-28 pt-14">
      <div className="mx-auto max-w-[1180px] px-6 sm:px-8">
        <RevealOnScroll className="mb-16 max-w-2xl">
          <p className="font-mono mb-4 text-xs text-brass-bright">Round 03 — Coaches</p>
          <h1 className="font-display mb-6 text-5xl leading-tight sm:text-6xl">
            Taught by people who&apos;ve fought.
          </h1>
          <p className="text-lg text-bone-dim">
            Every coach on the floor has competed, and every one of them still trains here.
          </p>
        </RevealOnScroll>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {coaches.map((coach, i) => {
            const hasPost = blogs.some((p) => p.authorId === coach.id);
            return (
              <RevealOnScroll key={coach.id} delay={i * 0.08}>
                <CoachCard coach={coach} href={hasPost ? `/blog?author=${coach.id}` : undefined} />
              </RevealOnScroll>
            );
          })}
        </div>
      </div>
      </div>
    </div>
  );
}