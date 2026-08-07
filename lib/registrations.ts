import { readData, writeData } from "./db";
import { Registration, RegistrationStatus } from "./types";

const FILE = "registrations.json";

export async function getRegistrations(): Promise<Registration[]> {
  const regs = await readData<Registration[]>(FILE);
  return [...regs].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function getRegistrationById(id: string): Promise<Registration | undefined> {
  const regs = await getRegistrations();
  return regs.find((r) => r.id === id);
}

export async function createRegistration(
  input: Omit<Registration, "id" | "status" | "createdAt">
): Promise<Registration> {
  const regs = await readData<Registration[]>(FILE);
  const registration: Registration = {
    id: crypto.randomUUID(),
    status: "new",
    createdAt: new Date().toISOString(),
    ...input,
  };
  regs.push(registration);
  await writeData(FILE, regs);
  return registration;
}

export async function updateRegistrationStatus(
  id: string,
  status: RegistrationStatus
): Promise<Registration | null> {
  const regs = await readData<Registration[]>(FILE);
  const index = regs.findIndex((r) => r.id === id);
  if (index === -1) return null;
  regs[index] = { ...regs[index], status };
  await writeData(FILE, regs);
  return regs[index];
}

export async function deleteRegistration(id: string): Promise<boolean> {
  const regs = await readData<Registration[]>(FILE);
  const next = regs.filter((r) => r.id !== id);
  if (next.length === regs.length) return false;
  await writeData(FILE, next);
  return true;
}
