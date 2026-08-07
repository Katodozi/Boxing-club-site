export interface RoundInfo {
  round: string; // "00" - "07"
  label: string;
  href: string;
}

/**
 * Every main page of the site is treated as a "round" in the fight, in
 * order. This powers both the small eyebrow ("Round 02 — Programs") at the
 * top of each page and the fight-card strip in the navbar.
 */
export const ROUNDS: RoundInfo[] = [
  { round: "00", label: "Home", href: "/" },
  { round: "01", label: "About", href: "/about" },
  { round: "02", label: "Programs", href: "/programs" },
  { round: "03", label: "Coaches", href: "/coaches" },
  { round: "04", label: "Schedule", href: "/schedule" },
  { round: "05", label: "Join", href: "/join" },
  { round: "06", label: "Blog", href: "/blog" },
  { round: "07", label: "News", href: "/news" },
];

export function getRoundForPath(pathname: string): RoundInfo | undefined {
  if (pathname === "/") return ROUNDS[0];
  // Match the top-level segment, e.g. "/blog/some-post" -> "/blog"
  const topLevel = "/" + pathname.split("/").filter(Boolean)[0];
  return ROUNDS.find((r) => r.href === topLevel);
}
