"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useJoinModal } from "./JoinModalProvider";

export default function ParallaxHero() {
  const heroRef = useRef<HTMLElement>(null);
  const { openModal } = useJoinModal();

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const yBg = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const yFighter = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const yContent = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={heroRef}
      className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-canvas pt-32 pb-16"
    >
      {/* parallax background glows */}
      <motion.div
        style={{ y: yBg }}
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
      >
        <div className="absolute -top-32 right-0 h-[600px] w-[900px] rounded-full bg-corner-red/15 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-[500px] w-[700px] rounded-full bg-corner-blue/15 blur-3xl" />
      </motion.div>

      {/* faint rope lines */}
      <div className="pointer-events-none absolute inset-0 opacity-40" aria-hidden="true">
        <span className="absolute left-[-5%] right-[-5%] top-[22%] h-px bg-hairline" />
        <span className="absolute left-[-5%] right-[-5%] top-[48%] h-px bg-hairline" />
        <span className="absolute left-[-5%] right-[-5%] top-[74%] h-px bg-hairline" />
      </div>

      {/* fighter photo — desktop only: absolutely positioned on the right, parallaxed, blended via mask */}
      <motion.div
        style={{ y: yFighter }}
        className="
  pointer-events-none
  absolute
  top-20
  bottom-0
  right-0
  mr-8
  hidden
  w-[42%]
  max-w-[560px]
  md:block
  md:mr-28
  lg:mr-36
"
        aria-hidden="true"
      >
        <div
          className="relative h-full w-full"
          style={{
            WebkitMaskImage:
              "linear-gradient(to bottom, black 55%, transparent 96%), linear-gradient(to right, transparent 0%, black 18%, black 100%)",
            WebkitMaskComposite: "source-in",
            maskImage:
              "linear-gradient(to bottom, black 55%, transparent 96%), linear-gradient(to right, transparent 0%, black 18%, black 100%)",
            maskComposite: "intersect",
          }}
        >
          <Image src="/Maxx.png" alt="" fill className="object-contain object-bottom" priority />
        </div>
      </motion.div>

      <motion.div
        style={{ y: yContent, opacity }}
        className="relative z-10 mx-auto w-full max-w-[1180px] px-6 sm:px-8"
      >
        <div className="font-mono mb-7 flex items-center gap-3 text-xs text-brass-bright">
          <span className="h-1.5 w-1.5 rounded-full bg-corner-red" />
          Kathmandu Boxing Gym · Est. 2014
        </div>

        <h1 className="font-display max-w-3xl text-[13vw] leading-[0.92] tracking-tight sm:text-7xl md:text-8xl lg:text-[7rem]">
          Step into
          <br />
          the <span className="text-corner-red">ring.</span>
          <br />
          <span className="text-bone-dim">earn it.</span>
        </h1>

        {/* fighter photo — mobile only: normal in-flow image right after the heading, no parallax */}
        <div className="relative mt-8 aspect-[4/5] w-full max-w-xs md:hidden">
          <div
            className="relative h-full w-full"
            style={{
              WebkitMaskImage: "linear-gradient(to bottom, black 65%, transparent 100%)",
              maskImage: "linear-gradient(to bottom, black 65%, transparent 100%)",
            }}
          >
            <Image src="/Maxx.png" alt="" fill className="object-contain object-bottom" priority />
          </div>
        </div>

        <p className="mt-8 max-w-md text-lg text-bone-dim">
          Fundamentals to fight night — boxing, strength, and controlled sparring, taught by
          coaches who&apos;ve been hit and hit back. No mirrors. No shortcuts.
        </p>

        <div className="mt-11 flex flex-wrap gap-4">
          <button onClick={() => openModal("drop-in")} className="btn-primary">
            Book a Trial Class
          </button>
          <a href="/schedule" className="btn-ghost">
            View Schedule
          </a>
        </div>
      </motion.div>

      <div className="font-mono absolute bottom-10 left-6 hidden items-center gap-2.5 text-xs text-bone-dim sm:left-8 sm:flex">
        <span className="chevron-bob h-3 w-3 border-b border-r border-brass-bright" />
        Scroll — Round 00
      </div>
    </section>
  );
}