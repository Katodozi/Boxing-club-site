import fs from "fs/promises";
import path from "path";

const dataDir = path.join(process.cwd(), "data");

/**
 * Reads and parses a JSON file from /data.
 * This project uses flat JSON files as a lightweight, dependency-free
 * database, per project requirements. It's a great fit for a single-admin
 * site running on a normal Node server, but note that on serverless hosts
 * with a read-only filesystem (e.g. Vercel's default runtime) writes will
 * NOT persist between deployments — use a real database there instead.
 */
export async function readData<T>(file: string): Promise<T> {
  const filePath = path.join(dataDir, file);
  const raw = await fs.readFile(filePath, "utf-8");
  return JSON.parse(raw) as T;
}

export async function writeData<T>(file: string, data: T): Promise<void> {
  const filePath = path.join(dataDir, file);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2) + "\n", "utf-8");
}
