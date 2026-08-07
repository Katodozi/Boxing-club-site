import { readData, writeData } from "./db";
import { Coach } from "./types";

const FILE = "coaches.json";

export async function getCoaches(): Promise<Coach[]> {
  return readData<Coach[]>(FILE);
}

export async function getCoachById(id: string): Promise<Coach | undefined> {
  const coaches = await getCoaches();
  return coaches.find((c) => c.id === id);
}

export async function createCoach(input: Omit<Coach, "id">): Promise<Coach> {
  const coaches = await getCoaches();
  const coach: Coach = { id: `coach-${crypto.randomUUID()}`, ...input };
  coaches.push(coach);
  await writeData(FILE, coaches);
  return coach;
}

export async function updateCoach(
  id: string,
  input: Partial<Omit<Coach, "id">>
): Promise<Coach | null> {
  const coaches = await getCoaches();
  const index = coaches.findIndex((c) => c.id === id);
  if (index === -1) return null;
  coaches[index] = { ...coaches[index], ...input };
  await writeData(FILE, coaches);
  return coaches[index];
}

export async function deleteCoach(id: string): Promise<boolean> {
  const coaches = await getCoaches();
  const next = coaches.filter((c) => c.id !== id);
  if (next.length === coaches.length) return false;
  await writeData(FILE, next);
  return true;
}
