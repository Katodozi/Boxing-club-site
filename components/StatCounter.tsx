"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

export default function StatCounter({
  target,
  suffix = "",
  label,
}: {
  target: number;
  suffix?: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 1400;
    const start = performance.now();
    let frame: number;

    function tick(now: number) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) frame = requestAnimationFrame(tick);
    }

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [isInView, target]);

  return (
    <div ref={ref} className="bg-canvas p-6 sm:p-8">
      <span className="font-mono block text-3xl font-bold leading-none text-brass-bright sm:text-4xl">
        {value}
        {suffix}
      </span>
      <span className="mt-2 block text-xs uppercase tracking-wide text-bone-dim">{label}</span>
    </div>
  );
}
