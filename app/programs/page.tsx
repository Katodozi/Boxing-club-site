import RevealOnScroll from "@/components/RevealOnScroll";
import PageBanner from "@/components/PageBanner";
import { GloveIcon, TargetIcon, KettlebellIcon, FistsIcon } from "@/components/ProgramIcons";
import { PROGRAMS } from "@/lib/programs";

export const metadata = { title: "Programs — Iron Bell Boxing Club" };

const ICONS = {
  glove: <GloveIcon />,
  target: <TargetIcon />,
  kettlebell: <KettlebellIcon />,
  fists: <FistsIcon />,
};

const LEVEL_STYLES: Record<string, string> = {
  Beginner: "border-corner-blue text-[#7fa3ba]",
  Intermediate: "border-brass text-brass-bright",
  Advanced: "border-corner-red text-[#e08279]",
  "All Levels": "border-hairline text-bone-dim",
};

export default function ProgramsPage() {
  return (
    <div className="pt-28">
      <PageBanner round="02" tone="blue" imageSrc="/banners/program.jpg"/>
      <div className="pb-28 pt-14">
      <div className="mx-auto max-w-[1180px] px-6 sm:px-8">
        <RevealOnScroll className="mb-16 max-w-2xl">
          <p className="font-mono mb-4 text-xs text-brass-bright">Round 02 — Programs</p>
          <h1 className="font-display mb-6 text-5xl leading-tight sm:text-6xl">
            Four ways in. One standard.
          </h1>
          <p className="text-lg text-bone-dim">
            Every program builds on the same fundamentals — you just choose how far to take them.
            Most members move through them in order: Fundamentals → Technique → Sparring, with
            conditioning running alongside all three.
          </p>
        </RevealOnScroll>

        <div className="flex flex-col gap-px bg-hairline">
          {PROGRAMS.map((program, i) => (
            <RevealOnScroll
              key={program.id}
              delay={i * 0.08}
              className="grid grid-cols-1 gap-6 bg-canvas-alt p-8 sm:p-10 lg:grid-cols-[auto_1fr_1fr]"
            >
              <div className="h-12 w-12 text-brass-bright">{ICONS[program.icon]}</div>
              <div>
                <div className="mb-3 flex flex-wrap items-center gap-3">
                  <h2 className="font-display text-2xl">{program.title}</h2>
                  <span className={`tag-pill ${LEVEL_STYLES[program.level]}`}>{program.level}</span>
                  <span className="tag-pill">{program.duration}</span>
                </div>
                <p className="text-sm text-bone-dim">{program.longDescription}</p>
              </div>
              <div className="border-t border-hairline pt-5 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
                <p className="font-mono mb-2 text-[11px] text-brass-bright">Ideal For</p>
                <p className="text-sm text-bone-dim">{program.idealFor}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
      </div>
    </div>
  );
}