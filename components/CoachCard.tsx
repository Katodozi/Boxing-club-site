import Link from "next/link";
import { Coach } from "@/lib/types";

export default function CoachCard({ coach, href }: { coach: Coach; href?: string }) {
  const cornerLabel = coach.corner === "red" ? "Red Corner" : "Blue Corner";
  const cornerClasses =
    coach.corner === "red" ? "bg-corner-red" : "bg-corner-blue";

  return (
    <div className="group relative overflow-hidden border border-hairline bg-canvas p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-brass">
      <div
        className={`font-mono absolute right-0 top-0 px-3 py-1.5 text-[10px] uppercase tracking-wide text-bone ${cornerClasses}`}
      >
        {cornerLabel}
      </div>

      <div className="font-display mb-5 flex h-16 w-16 items-center justify-center rounded-full border-2 border-brass text-xl text-brass-bright">
        {coach.initials}
      </div>

      <h3 className="mb-1 text-lg">{coach.name}</h3>
      <p className="font-mono mb-4 text-[11px] tracking-wide text-bone-dim">{coach.role}</p>
      <p className="border-l-2 border-hairline pl-3.5 text-sm italic text-bone-dim">
        &ldquo;{coach.quote}&rdquo;
      </p>

      {href && (
        <Link
          href={href}
          className="font-mono mt-5 inline-block text-[11px] uppercase tracking-wide text-brass-bright hover:underline"
        >
          Read {coach.name.split(" ")[0]}&apos;s posts →
        </Link>
      )}
    </div>
  );
}
