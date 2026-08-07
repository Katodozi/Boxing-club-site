export default function Marquee({
  redItems,
  blueItems,
}: {
  redItems: string[];
  blueItems: string[];
}) {
  return (
    <div className="relative z-10 border-y border-hairline">
      <div className="overflow-hidden whitespace-nowrap bg-corner-red py-4">
        <div className="marquee-track">
          {[...redItems, ...redItems].map((item, i) => (
            <span
              key={i}
              className="font-display flex shrink-0 items-center gap-6 px-6 text-xl text-bone sm:text-2xl"
            >
              {item} <span className="font-mono text-sm normal-case text-bone/60">•</span>
            </span>
          ))}
        </div>
      </div>
      <div className="overflow-hidden whitespace-nowrap border-t border-black/20 bg-corner-blue py-4">
        <div className="marquee-track marquee-track-reverse">
          {[...blueItems, ...blueItems].map((item, i) => (
            <span
              key={i}
              className="font-display flex shrink-0 items-center gap-6 px-6 text-xl text-bone sm:text-2xl"
            >
              {item} <span className="font-mono text-sm normal-case text-bone/60">•</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
