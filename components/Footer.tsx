import Link from "next/link";
import Logomark from "./Logomark";

export default function Footer() {
  return (
    <footer className="border-t border-hairline bg-canvas-alt">
      <div className="mx-auto max-w-[1180px] px-6 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-12 sm:grid-cols-3">
          <div>
            <div className="font-display mb-4 flex items-center gap-2.5 text-xl">
              <Logomark size={24} />
              IRON BELL
            </div>
            <p className="max-w-xs text-sm text-bone-dim">
              A boxing gym in the old garment district of Kathmandu, training beginners and
              fighters under the same roof since 2014.
            </p>
            <div className="mt-5 flex gap-3">
              <a
                href="#"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-hairline text-bone-dim transition-colors hover:border-brass hover:text-brass-bright"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-hairline text-bone-dim transition-colors hover:border-brass hover:text-brass-bright"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M14 21v-7h3l1-4h-4v-2.5c0-1.1.4-1.9 2-1.9h2V2.2C17.6 2.1 16.4 2 15.1 2 12 2 10 3.9 10 7.3V10H7v4h3v7h4z" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="Phone"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-hairline text-bone-dim transition-colors hover:border-brass hover:text-brass-bright"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M6 3h3l2 5-2.5 1.5a12 12 0 0 0 6 6L16 13l5 2v3c0 1.1-.9 2-2 2C10.5 20 4 13.5 4 5c0-1.1.9-2 2-2z" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-mono mb-4 text-xs text-brass-bright">Navigate</h4>
            <div className="flex flex-col gap-3 text-sm text-bone-dim">
              <Link href="/about" className="transition-colors hover:text-bone">About</Link>
              <Link href="/programs" className="transition-colors hover:text-bone">Programs</Link>
              <Link href="/coaches" className="transition-colors hover:text-bone">Coaches</Link>
              <Link href="/schedule" className="transition-colors hover:text-bone">Schedule</Link>
              <Link href="/blog" className="transition-colors hover:text-bone">Blog</Link>
              <Link href="/news" className="transition-colors hover:text-bone">News</Link>
            </div>
          </div>

          <div>
            <h4 className="font-mono mb-4 text-xs text-brass-bright">Visit</h4>
            <div className="flex flex-col gap-3 text-sm text-bone-dim">
              <span>Thamel Marg, Kathmandu 44600, Nepal</span>
              <span>+977 1-455-0192</span>
              <span>Sun–Fri · 4PM–7PM · Sat Closed</span>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-hairline pt-7 text-xs text-bone-dim sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Iron Bell Boxing Club, Kathmandu.</span>
          <span className="italic text-brass-bright">
            Every fighter was once a beginner who kept showing up.
          </span>
        </div>
      </div>
    </footer>
  );
}
