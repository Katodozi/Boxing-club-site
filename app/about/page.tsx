import RevealOnScroll from "@/components/RevealOnScroll";
import PageBanner from "@/components/PageBanner";
import StatCounter from "@/components/StatCounter";
import { getCoaches } from "@/lib/coaches";

export const metadata = { title: "About — MaxX Boxing Club" };

const PILLARS = [
  {
    title: "Discipline",
    body: "Every class starts on time. Every drill is finished, not abandoned. We build the habit before we build the fighter.",
  },
  {
    title: "Technique",
    body: "Power is the last thing we teach, not the first. Footwork, guard, and defense come before anyone throws with real intent.",
  },
  {
    title: "Respect",
    body: "For the craft, for your corner, and for whoever you're paired with — in drills, in pads, and in the ring.",
  },
];

export default async function AboutPage() {
  const coaches = await getCoaches();

  return (
    <div className="pt-28">
      <PageBanner round="01" tone="red" imageSrc="/banners/about.jpg" />
      <div className="pb-28 pt-14">
      <div className="mx-auto max-w-[1180px] px-6 sm:px-8">
        <RevealOnScroll className="mb-16 max-w-2xl">
          <p className="font-mono mb-4 text-xs text-brass-bright">Round 01 — About</p>
          <h1 className="font-display mb-6 text-5xl leading-tight sm:text-6xl">
            This isn&apos;t a fitness trend.
          </h1>
          <p className="text-lg text-bone-dim">
            Iron Bell opened in a repurposed garment warehouse in 2014 with one heavy bag and a
            handwritten schedule taped to the door.
          </p>
        </RevealOnScroll>

        <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr]">
          <RevealOnScroll delay={0.1} className="flex flex-col gap-5 text-bone-dim">
            <p>
              Twelve years later, the bag count is higher, the floor is bigger, and the schedule
              is printed instead of handwritten — but the standard hasn&apos;t moved. We teach
              boxing as a craft: stance before speed, defense before power, discipline before
              everything.
            </p>
            <p>
              Whether you&apos;re here to compete or to finally exhale after a long week, you
              train the same way everyone else does: properly. New members start in Basic, the
              21-day Fundamentals program, before moving up. There are no shortcuts around that,
              regardless of how fit you already are.
            </p>
            <p>
              We&apos;re proud that Iron Bell has produced amateur competitors and, more recently,
              our first Fight Team member stepping into a title bout — but most of the floor on
              any given evening is people who just wanted to learn something real.
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={0.2} className="grid grid-cols-2 gap-px bg-hairline">
            <StatCounter target={12} label="Years Open" />
            <StatCounter target={480} suffix="+" label="Members Trained" />
            <StatCounter target={coaches.length} label="Coaches on Staff" />
            <StatCounter target={24} label="Classes / Week" />
          </RevealOnScroll>
        </div>

        <div className="mt-28">
          <RevealOnScroll className="mb-12 max-w-xl">
            <p className="font-mono mb-4 text-xs text-brass-bright">Our Philosophy</p>
            <h2 className="font-display text-3xl sm:text-4xl">Three things we don&apos;t compromise on.</h2>
          </RevealOnScroll>
          <div className="grid gap-px bg-hairline sm:grid-cols-3">
            {PILLARS.map((pillar, i) => (
              <RevealOnScroll key={pillar.title} delay={i * 0.1} className="bg-canvas-alt p-8">
                <span className="font-mono mb-4 block text-3xl text-brass-bright">
                  0{i + 1}
                </span>
                <h3 className="mb-3 text-lg">{pillar.title}</h3>
                <p className="text-sm text-bone-dim">{pillar.body}</p>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}