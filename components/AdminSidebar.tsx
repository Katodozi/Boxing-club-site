"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import Logomark from "./Logomark";

const LINKS = [
  { href: "/admin", label: "Dashboard", exact: true },
  { href: "/admin/blogs", label: "Blogs" },
  { href: "/admin/news", label: "News" },
  { href: "/admin/coaches", label: "Coaches" },
  { href: "/admin/registrations", label: "Registrations" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex w-full shrink-0 flex-col border-hairline bg-canvas-alt sm:h-screen sm:w-60 sm:border-r">
      <div className="border-b border-hairline p-6">
        <Link href="/" className="font-display flex items-center gap-2 text-lg">
          <Logomark size={22} />
          IRON <span className="text-corner-red">BELL</span>
        </Link>
        <p className="font-mono mt-1 text-[10px] text-brass-bright">Admin Panel</p>
      </div>

      <nav className="font-mono flex flex-1 flex-col gap-1 p-4 text-xs uppercase tracking-wide">
        {LINKS.map((link) => {
          const active = link.exact ? pathname === link.href : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-sm px-3 py-2.5 transition-colors ${
                active ? "bg-brass/15 text-brass-bright" : "text-bone-dim hover:text-bone"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-hairline p-4">
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="font-mono w-full px-3 py-2.5 text-left text-xs uppercase tracking-wide text-bone-dim transition-colors hover:text-corner-red"
        >
          Sign Out
        </button>
      </div>
    </aside>
  );
}
