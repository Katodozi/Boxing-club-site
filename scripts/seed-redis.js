// Usage: npm run seed:redis
//
// Pushes the JSON files in /data into Redis, OVERWRITING whatever is
// currently stored there. Useful for resetting your live site back to the
// repo's default seed data, or for manually seeding Redis the first time
// instead of relying on the automatic lazy-seed-on-first-read behavior in
// lib/db.ts.
//
// Requires UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN (or
// KV_REST_API_URL / KV_REST_API_TOKEN) to be set in .env.local -- e.g. run
// `vercel env pull .env.local` first so your local shell has the same
// credentials your production deployment uses.
const { loadEnvConfig } = require("@next/env");
loadEnvConfig(process.cwd());

const fs = require("fs");
const path = require("path");
const { Redis } = require("@upstash/redis");

const hasRedis = Boolean(
  process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL
);

if (!hasRedis) {
  console.error(
    "No Upstash/KV credentials found in the environment.\n" +
      "Set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN in .env.local first\n" +
      "(or run `vercel env pull .env.local` to pull them from your Vercel project)."
  );
  process.exit(1);
}

const redis = Redis.fromEnv();
const files = ["coaches.json", "blogs.json", "news.json", "registrations.json"];

async function main() {
  for (const file of files) {
    const filePath = path.join(process.cwd(), "data", file);
    const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    const key = `data:${file.replace(/\.json$/, "")}`;
    await redis.set(key, data);
    console.log(`Seeded ${key} (${Array.isArray(data) ? data.length : "?"} records)`);
  }
  console.log("\nDone.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});