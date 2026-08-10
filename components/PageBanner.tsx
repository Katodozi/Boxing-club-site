"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

type PageBannerProps = {
  round: string;
  tone?: "red" | "blue";
  imageSrc?: string;
};

export default function PageBanner({
  round,
  tone = "red",
  imageSrc,
}: PageBannerProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 90]);

  const glow =
    tone === "red" ? "bg-corner-red/20" : "bg-corner-blue/20";

  return (
    <div
      ref={ref}
      className="relative h-screen w-full overflow-hidden border-b border-hairline"
    >
      {imageSrc ? (
        <motion.div
          style={{ y }}
          className="absolute inset-x-0 -top-16 h-[calc(100vh+4rem)]"
        >
          <Image
            src={imageSrc}
            alt=""
            fill
            priority
            className="object-cover"
          />

          <div className="absolute inset-0 bg-canvas/35" />
        </motion.div>
      ) : (
        <motion.div
          style={{ y }}
          className="grain absolute inset-x-0 -top-16 h-[calc(100vh+4rem)] bg-canvas-alt"
        >
          <div
            className={`absolute -top-24 right-[-8%] h-[420px] w-[560px] rounded-full ${glow} blur-3xl`}
          />

          <div
            className={`absolute -bottom-32 left-[-8%] h-[320px] w-[460px] rounded-full ${
              tone === "red"
                ? "bg-corner-blue/10"
                : "bg-corner-red/10"
            } blur-3xl`}
          />

          <span
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-8 right-4 select-none font-display text-[9rem] leading-none text-bone/5 sm:text-[12rem]"
          >
            {round}
          </span>

          <span className="absolute inset-x-[-5%] top-1/2 h-px -translate-y-1/2 bg-hairline" />
        </motion.div>
      )}

      {/* Fade into the page background */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-b from-transparent to-canvas" />
    </div>
  );
}