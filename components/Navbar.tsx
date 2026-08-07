"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logomark from "./Logomark";
import { ROUNDS, getRoundForPath } from "@/lib/rounds";
import { useJoinModal } from "./JoinModalProvider";

const NAV_LINKS = ROUNDS.filter((r) => r.href !== "/");

export default function Navbar() {
  const pathname = usePathname();
  const { openModal } = useJoinModal();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const activeRound = getRoundForPath(pathname);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 40);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setMobileOpen(false);
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[900] backdrop-blur-md transition-colors duration-300 ${
        scrolled ? "border-b border-hairline bg-canvas/95 shadow-lg shadow-black/30" : "bg-canvas/70"
      }`}
    >
      <div className="mx-auto flex max-w-[1180px] items-center justify-between px-6 py-4 sm:px-8">
        <Link href="/" className="font-display flex items-center gap-2.5 text-xl">
          <Logomark size={26} />
          IRON <span className="text-corner-red">BELL</span>
        </Link>

        <nav className="font-mono hidden items-center gap-8 text-xs text-bone-dim lg:flex">
          {NAV_LINKS.map((r) => (
            <Link
              key={r.href}
              href={r.href}
              className={`relative py-1 transition-colors hover:text-bone ${
                pathname === r.href ? "text-bone" : ""
              }`}
            >
              {r.label}
              {pathname === r.href && (
                <span className="absolute -bottom-0.5 left-0 h-px w-full bg-brass-bright" />
              )}
            </Link>
          ))}
        </nav>

        <button
          onClick={() => openModal("drop-in")}
          className="btn-primary hidden !px-5 !py-2.5 lg:inline-flex"
        >
          Book a Trial
        </button>

        <button
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          className="flex flex-col gap-1.5 p-2 lg:hidden"
        >
          <span className="block h-0.5 w-6 bg-bone" />
          <span className="block h-0.5 w-6 bg-bone" />
          <span className="block h-0.5 w-6 bg-bone" />
        </button>
      </div>

      {/* fight-card round strip */}
      <div className="hidden overflow-x-auto border-t border-hairline bg-canvas-alt/60 sm:block">
        <div className="font-mono mx-auto flex max-w-[1180px] gap-6 px-6 py-2 text-[11px] text-bone-dim sm:px-8">
          {ROUNDS.map((r) => (
            <Link
              key={r.href}
              href={r.href}
              className={`shrink-0 whitespace-nowrap transition-colors hover:text-brass-bright ${
                activeRound?.href === r.href ? "text-brass-bright" : ""
              }`}
            >
              {r.round} {r.label}
            </Link>
          ))}
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-hairline bg-canvas-alt lg:hidden">
          {NAV_LINKS.map((r) => (
            <Link
              key={r.href}
              href={r.href}
              className="font-mono block border-b border-hairline px-6 py-4 text-sm uppercase tracking-wide text-bone-dim"
            >
              {r.round} — {r.label}
            </Link>
          ))}
          <button
            onClick={() => {
              setMobileOpen(false);
              openModal("drop-in");
            }}
            className="font-mono block w-full px-6 py-4 text-left text-sm uppercase tracking-wide text-brass-bright"
          >
            Book a Trial
          </button>
        </div>
      )}
    </header>
  );
}
