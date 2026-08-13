import fs from "fs/promises";
import path from "path";
import { Redis } from "@upstash/redis";

const dataDir = path.join(process.cwd(), "data");

// Redis is used automatically when Upstash credentials are present in the
// environment (this is how it runs in production on Vercel, whose
// serverless functions have a read-only filesystem and can't persist
// fs.writeFile calls). Redis.fromEnv() looks for UPSTASH_REDIS_REST_URL /
// UPSTASH_REDIS_REST_TOKEN, falling back to KV_REST_API_URL / KV_REST_API_TOKEN
// automatically, so it works with however the Vercel Marketplace integration
// names them.
//
// When those env vars are NOT present -- which is the default for local
// development -- this falls back to reading/writing the JSON files in /data
// directly, exactly as before. No extra setup is required to run this
// project locally.
const hasRedis = Boolean(
  process.env.UPSTASH_REDIS_REST_URL ||
    process.env.KV_REST_API_URL
);

const redis = hasRedis ? Redis.fromEnv() : null;

function keyFor(file: string): string {
  // "coaches.json" -> "data:coaches"
  return `data:${file.replace(/\.json$/, "")}`;
}

export async function readData<T>(file: string): Promise<T> {
  if (redis) {
    const existing = await redis.get<T>(keyFor(file));
    if (existing !== null && existing !== undefined) {
      return existing;
    }
    // First read ever for this key: Redis is empty (fresh database), so
    // seed it from the JSON file shipped in the repo and use that as the
    // starting data. Every read/write after this goes through Redis.
    const seeded = await readLocalFile<T>(file);
    await redis.set(keyFor(file), seeded);
    return seeded;
  }
  return readLocalFile<T>(file);
}

export async function writeData<T>(file: string, data: T): Promise<void> {
  if (redis) {
    await redis.set(keyFor(file), data);
    return;
  }
  await writeLocalFile(file, data);
}

async function readLocalFile<T>(file: string): Promise<T> {
  const filePath = path.join(dataDir, file);
  const raw = await fs.readFile(filePath, "utf-8");
  return JSON.parse(raw) as T;
}

async function writeLocalFile<T>(file: string, data: T): Promise<void> {
  const filePath = path.join(dataDir, file);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2) + "\n", "utf-8");
}