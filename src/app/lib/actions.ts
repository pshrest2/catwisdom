"use server";

import postgres from "postgres";

interface User {
  id: number;
  email: string;
}

interface Wisdom {
  id: number;
  content: string;
  created_at: Date;
}

const DATABASE_URL = process.env.DATABASE_URL!;

export interface FormState {
  success: boolean;
  error: string;
}

/**
 * Users
 */
export async function getSubscribers() {
  const sql = postgres(DATABASE_URL);
  return await sql<User[]>`SELECT * FROM users`;
}

export async function subscribe(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const email = formData.get("email") as string;

  try {
    const sql = postgres(DATABASE_URL);
    const userResult = await sql<
      User[]
    >`SELECT * FROM users u WHERE u.email = ${email} LIMIT 1`;
    if (userResult.length === 0) {
      await sql`INSERT INTO users (email) VALUES (${email})`;
    }
    return { success: true, error: "" };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}

export async function unsubscribe(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const email = formData.get("email") as string;

  try {
    const sql = postgres(DATABASE_URL);
    const result =
      await sql`DELETE FROM users u WHERE u.email = ${email} RETURNING u.id`;
    return { success: result.length > 0, error: "" };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}

/**
 * Wisdom
 */
export async function getLatestWisdom() {
  const sql = postgres(DATABASE_URL);
  const wisdom = await sql<
    Wisdom[]
  >`SELECT * FROM wisdom w ORDER BY w.id DESC LIMIT 1`;
  return wisdom[0];
}

export async function getWisdoms() {
  const sql = postgres(DATABASE_URL);
  const wisdoms = await sql<
    Wisdom[]
  >`SELECT * FROM wisdom w ORDER BY w.id DESC LIMIT 10`;
  return wisdoms;
}

export async function createWisdom(content: string) {
  const sql = postgres(DATABASE_URL);
  await sql`INSERT INTO wisdom (content) VALUES (${content})`;
}
