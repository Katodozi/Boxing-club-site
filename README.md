# Iron Bell Boxing Club — Next.js Site

A multi-page Next.js 16 site for a boxing club in Kathmandu, with a parallax hero, a seamless
dual-direction marquee, a blog/news system, a Join form with a category-aware registration modal,
and a full admin panel for managing blogs, news, coaches, and registrations.

Verified: this exact project builds cleanly (`npm run build`), passes lint with zero errors, and
every route was smoke-tested before packaging.

## Stack

- **Next.js 16** (App Router) + **React 19** + TypeScript
- **Tailwind CSS v4** (CSS-first config via `@theme` in `app/globals.css` — no `tailwind.config.js`)
- **Framer Motion** for the parallax hero and scroll reveals
- **NextAuth v4** (Credentials provider) for the single-admin login
- **Local JSON files** (`/data/*.json`) as the database, read/written via `lib/db.ts`
- **Zod** for API input validation

## 1. Install

```bash
npm install
```

## 2. Set up environment variables

```bash
cp .env.local.example .env.local
```

Generate a secret for NextAuth:

```bash
openssl rand -base64 32
```

Paste that into `.env.local` as `NEXTAUTH_SECRET`.

Set your admin email in `.env.local` (`ADMIN_EMAIL`), then generate a password hash for your admin
password:

```bash
npm run seed:hash -- "your-real-password-here"
```

Copy the printed **"Paste this exact line"** output into `.env.local` as `ADMIN_PASSWORD_HASH`
— not the raw hash above it.

> **Why this matters:** Next.js expands unescaped `$VAR` references inside `.env*` files. Bcrypt
> hashes are full of `$` characters (e.g. `$2a$10$...`), so pasting one in raw gets silently
> corrupted, and login will fail with a 401 no matter how correct your password is. The script
> escapes every `$` as `\$` in its "paste this" output specifically to avoid that trap.

Your `.env.local` should now look like:

```
NEXTAUTH_SECRET=<generated secret>
NEXTAUTH_URL=http://localhost:3000
ADMIN_EMAIL=you@example.com
ADMIN_PASSWORD_HASH=<generated hash>
```

## 3. Run it

```bash
npm run dev
```

Visit `http://localhost:3000`. Admin panel is at `http://localhost:3000/admin` (redirects to
`/admin/login` until you sign in with the email/password you just set up).

## 4. Production build

```bash
npm run build
npm run start
```

## Project structure

```
app/                      Pages (App Router)
  page.tsx                 Home
  about/ programs/ coaches/ schedule/ join/   Public pages
  blog/  blog/[slug]/      Blog list + detail
  news/  news/[slug]/      News list + detail
  admin/
    login/                 Admin login (no sidebar)
    (dashboard)/           Route group — everything here gets the admin shell + auth check
      page.tsx               Dashboard overview
      blogs/ news/ coaches/ registrations/   CRUD screens
  api/                     Route handlers (REST-ish JSON API)
components/                Shared UI components
components/admin/          Admin-only forms and widgets
lib/                       Data access (JSON read/write), types, auth config, static content config
data/                      The JSON "database" — coaches.json, blogs.json, news.json, registrations.json
scripts/hash-password.js   CLI helper to generate a bcrypt hash for your admin password
```

## How content is managed

- **Coaches, Blogs, News, Registrations** are all editable from `/admin` and persist to the JSON
  files in `/data`. No database setup needed.
- **Programs, Pricing tiers, and the Schedule** are intentionally NOT admin-editable in this build
  — they're defined in `lib/programs.ts`, `lib/pricing.ts`, and `lib/schedule.ts`. Edit those files
  directly if class times or pricing change. (This was a deliberate scope decision — say the word
  and these can be wired into the admin panel too, following the exact same pattern as Coaches.)

## Important: JSON-file storage and deployment

This project stores all admin-managed content in flat JSON files on disk, per your request for
"simple local JSON files the admin panel reads/writes." This works great for:

- Local development
- A traditional VPS / self-hosted server running `npm run start` with a persistent disk

It will **NOT** persist writes if deployed to a serverless platform with a read-only filesystem
(e.g. Vercel's default runtime) — every deploy would reset `/data` back to what's in your Git repo,
and writes between deploys won't survive a cold start on some platforms. If you deploy there,
you'll want to swap `lib/db.ts` for a real database (Postgres, SQLite via Turso, etc.) — the rest
of the app (all the `lib/*.ts` CRUD functions) is already written as a thin data-access layer, so
swapping the storage backend means editing one file rather than the whole app.

## Replacing the fighter silhouette

`components/FighterSilhouette.tsx` renders a stylized SVG silhouette as a placeholder, faded into
the hero background with a CSS mask so there's no hard edge. To swap in a real photo:

1. Drop your PNG (ideally already background-removed) into `/public`, e.g. `/public/fighter.png`.
2. In `components/ParallaxHero.tsx`, replace the `<FighterSilhouette />` usage with a masked
   `<Image>`:

```tsx
import Image from "next/image";

<div
  className="h-full w-full"
  style={{
    WebkitMaskImage: "linear-gradient(to bottom, black 55%, transparent 96%), linear-gradient(to right, transparent 0%, black 18%, black 100%)",
    WebkitMaskComposite: "source-in",
    maskImage: "linear-gradient(to bottom, black 55%, transparent 96%), linear-gradient(to right, transparent 0%, black 18%, black 100%)",
    maskComposite: "intersect",
  }}
>
  <Image src="/fighter.png" alt="" fill className="object-contain object-bottom" />
</div>
```

## Admin credentials reminder

There is exactly one admin account, defined entirely by the two environment variables
`ADMIN_EMAIL` and `ADMIN_PASSWORD_HASH` — there's no user database. To change the password, just
regenerate the hash with `npm run seed:hash -- "new-password"` and update `.env.local`.
