import Link from "next/link";
import ParallaxHero from "@/components/ParallaxHero";
import Marquee from "@/components/Marquee";
import RevealOnScroll from "@/components/RevealOnScroll";
import StatCounter from "@/components/StatCounter";
import ProgramCard from "@/components/ProgramCard";
import CoachCard from "@/components/CoachCard";
import BlogCard from "@/components/BlogCard";
import NewsCard from "@/components/NewsCard";
import { GloveIcon, TargetIcon, KettlebellIcon, FistsIcon } from "@/components/ProgramIcons";
import { PROGRAMS } from "@/lib/programs";
import { getCoaches } from "@/lib/coaches";
import { getBlogs } from "@/lib/blogs";
import { getNewsPosts } from "@/lib/news";

const ICONS = {
  glove: <GloveIcon />,
  target: <TargetIcon />,
  kettlebell: <KettlebellIcon />,
  fists: <FistsIcon />,
};

export default async function HomePage() {
  const [coaches, blogs, news] = await Promise.all([getCoaches(), getBlogs(), getNewsPosts()]);

  return (
    <>
      <ParallaxHero />

      <Marquee
        redItems={["JAB", "CROSS", "HOOK", "UPPERCUT", "SLIP", "ROLL", "DUCK", "WEAVE", "CLINCH", "PIVOT"]}
        blueItems={[
          "DISCIPLINE OVER MOTIVATION",
          "RESPECT THE CRAFT",
          "EARN YOUR WRAPS",
          "PROTECT YOURSELF AT ALL TIMES",
          "SHOW UP ON TIME",
        ]}
      />

      {/* ABOUT PREVIEW */}
      <section className="py-24 sm:py-28">
        <div className="mx-auto max-w-[1180px] px-6 sm:px-8">
          <div className="grid items-start gap-14 lg:grid-cols-[1.1fr_0.9fr]">
            <RevealOnScroll>
              <p className="font-mono mb-4 flex items-center gap-3 text-xs text-brass-bright">
                <span className="h-6 w-8 bg-brass-bright/20" /> Round 01 — About
              </p>
              <h2 className="font-display mb-7 text-4xl leading-tight sm:text-5xl">
                This isn&apos;t a fitness trend.
              </h2>
              <p className="mb-4 max-w-xl text-lg text-bone">
                Iron Bell opened in a repurposed garment warehouse in 2014. Twelve years later, the
                standard hasn&apos;t moved: discipline before speed, defense before power.
              </p>
              <Link
                href="/about"
                className="font-mono text-xs uppercase tracking-wide text-brass-bright hover:underline"
              >
                Read our story →
              </Link>
            </RevealOnScroll>

            <RevealOnScroll delay={0.1} className="grid grid-cols-2 gap-px bg-hairline">
              <StatCounter target={12} label="Years Open" />
              <StatCounter target={480} suffix="+" label="Members Trained" />
              <StatCounter target={coaches.length} label="Coaches on Staff" />
              <StatCounter target={24} label="Classes / Week" />
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* PROGRAMS PREVIEW */}
      <section className="bg-canvas-alt py-24 sm:py-28">
        <div className="mx-auto max-w-[1180px] px-6 sm:px-8">
          <RevealOnScroll className="mb-16 max-w-xl">
            <p className="font-mono mb-4 text-xs text-brass-bright">Round 02 — Programs</p>
            <h2 className="font-display mb-4 text-4xl sm:text-5xl">Four ways in. One standard.</h2>
            <p className="text-bone-dim">
              Every program builds on the same fundamentals — you just choose how far to take
              them.
            </p>
          </RevealOnScroll>

          <div className="grid grid-cols-1 gap-px bg-hairline sm:grid-cols-2 lg:grid-cols-4">
            {PROGRAMS.map((p, i) => (
              <RevealOnScroll key={p.id} delay={i * 0.08}>
                <ProgramCard
                  icon={ICONS[p.icon]}
                  title={p.title}
                  level={p.level}
                  duration={p.duration}
                  description={p.description}
                />
              </RevealOnScroll>
            ))}
          </div>

          <div className="mt-10">
            <Link href="/programs" className="font-mono text-xs uppercase tracking-wide text-brass-bright hover:underline">
              See full program details →
            </Link>
          </div>
        </div>
      </section>

      {/* COACHES PREVIEW */}
      <section className="py-24 sm:py-28">
        <div className="mx-auto max-w-[1180px] px-6 sm:px-8">
          <RevealOnScroll className="mb-16 max-w-xl">
            <p className="font-mono mb-4 text-xs text-brass-bright">Round 03 — Coaches</p>
            <h2 className="font-display mb-4 text-4xl sm:text-5xl">Taught by people who&apos;ve fought.</h2>
          </RevealOnScroll>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {coaches.map((coach, i) => (
              <RevealOnScroll key={coach.id} delay={i * 0.08}>
                <CoachCard coach={coach} />
              </RevealOnScroll>
            ))}
          </div>

          <div className="mt-10">
            <Link href="/coaches" className="font-mono text-xs uppercase tracking-wide text-brass-bright hover:underline">
              Meet the full team →
            </Link>
          </div>
        </div>
      </section>

      {/* BLOG + NEWS PREVIEW */}
      <section className="bg-canvas-alt py-24 sm:py-28">
        <div className="mx-auto max-w-[1180px] px-6 sm:px-8">
          <div className="grid gap-16 lg:grid-cols-2">
            <div>
              <RevealOnScroll className="mb-8 flex items-end justify-between">
                <div>
                  <p className="font-mono mb-3 text-xs text-brass-bright">Round 06 — Blog</p>
                  <h2 className="font-display text-3xl">From the Corner</h2>
                </div>
                <Link href="/blog" className="font-mono text-xs text-brass-bright hover:underline">
                  All posts →
                </Link>
              </RevealOnScroll>
              <div className="flex flex-col gap-6">
                {blogs.slice(0, 2).map((post, i) => (
                  <RevealOnScroll key={post.id} delay={i * 0.08}>
                    <BlogCard post={post} />
                  </RevealOnScroll>
                ))}
              </div>
            </div>

            <div>
              <RevealOnScroll className="mb-8 flex items-end justify-between">
                <div>
                  <p className="font-mono mb-3 text-xs text-brass-bright">Round 07 — News</p>
                  <h2 className="font-display text-3xl">Fight Card &amp; Notices</h2>
                </div>
                <Link href="/news" className="font-mono text-xs text-brass-bright hover:underline">
                  All news →
                </Link>
              </RevealOnScroll>
              <div className="flex flex-col gap-6">
                {news.slice(0, 2).map((post, i) => (
                  <RevealOnScroll key={post.id} delay={i * 0.08}>
                    <NewsCard post={post} />
                  </RevealOnScroll>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 sm:py-28">
        <div className="mx-auto max-w-[1180px] px-6 sm:px-8">
          <RevealOnScroll className="flex flex-col items-start gap-6 border border-brass/40 bg-gradient-to-br from-corner-red-dim to-canvas-alt p-10 sm:p-14 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="font-display mb-3 text-4xl leading-tight sm:text-5xl">
                Your first round is free.
              </h2>
              <p className="max-w-md text-bone-dim">
                Show up to any Fundamentals class this week. We&apos;ll lend you gloves and wraps
                — you bring the willingness to get corrected.
              </p>
            </div>
            <Link href="/join" className="btn-primary shrink-0">
              Explore Membership
            </Link>
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}
