import { ReactNode } from "react";

const LEVEL_STYLES: Record<string, string> = {
  Beginner: "border-corner-blue text-[#7fa3ba]",
  Intermediate: "border-brass text-brass-bright",
  Advanced: "border-corner-red text-[#e08279]",
  "All Levels": "border-hairline text-bone-dim",
};

export default function ProgramCard({
  icon,
  title,
  level,
  duration,
  description,
}: {
  icon: ReactNode;
  title: string;
  level: string;
  duration: string;
  description: string;
}) {
  return (
    <div className="group bg-canvas-alt p-8 transition-colors hover:bg-[#241f16]">
      <div className="mb-6 h-10 w-10 text-brass-bright">{icon}</div>
      <h3 className="mb-3 text-lg tracking-wide">{title}</h3>
      <div className="mb-4 flex gap-2">
        <span className={`tag-pill ${LEVEL_STYLES[level] ?? ""}`}>{level}</span>
        <span className="tag-pill">{duration}</span>
      </div>
      <p className="text-sm text-bone-dim">{description}</p>
    </div>
  );
}
