export default function FighterSilhouette({ className = "" }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none select-none ${className}`}
      style={{
        WebkitMaskImage:
          "linear-gradient(to bottom, black 55%, transparent 96%), linear-gradient(to right, transparent 0%, black 18%, black 100%)",
        WebkitMaskComposite: "source-in",
        maskImage:
          "linear-gradient(to bottom, black 55%, transparent 96%), linear-gradient(to right, transparent 0%, black 18%, black 100%)",
        maskComposite: "intersect",
      }}
    >
      <svg
        viewBox="0 0 460 500"
        className="h-full w-full"
        fill="var(--color-canvas-alt)"
        aria-hidden="true"
      >
        {/* radial glow so the silhouette reads as lit from the corner, not a flat cutout */}
        <defs>
          <radialGradient id="fighterGlow" cx="35%" cy="25%" r="75%">
            <stop offset="0%" stopColor="var(--color-corner-red)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="var(--color-corner-red)" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect x="0" y="0" width="460" height="500" fill="url(#fighterGlow)" />

        {/* torso */}
        <rect x="110" y="140" width="250" height="340" rx="90" />
        {/* head + neck */}
        <line x1="235" y1="112" x2="235" y2="150" stroke="var(--color-canvas-alt)" strokeWidth="40" strokeLinecap="round" />
        <circle cx="235" cy="75" r="42" />

        {/* front / raised guard arm */}
        <line x1="155" y1="178" x2="102" y2="232" stroke="var(--color-canvas-alt)" strokeWidth="50" strokeLinecap="round" />
        <line x1="102" y1="232" x2="142" y2="122" stroke="var(--color-canvas-alt)" strokeWidth="44" strokeLinecap="round" />
        <circle cx="142" cy="118" r="34" />

        {/* rear / cocked arm */}
        <line x1="315" y1="178" x2="350" y2="262" stroke="var(--color-canvas-alt)" strokeWidth="50" strokeLinecap="round" />
        <line x1="350" y1="262" x2="300" y2="322" stroke="var(--color-canvas-alt)" strokeWidth="44" strokeLinecap="round" />
        <circle cx="300" cy="324" r="34" />
      </svg>
    </div>
  );
}
