"use server";

import postgres from "postgres";

interface NumericId {
  id: number;
}

interface User extends NumericId {
  id: number;
  email: string;
}

interface Wisdom extends NumericId {
  content: string;
  likes: number;
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
    if (result.length > 0) return { success: true, error: "" };
    return { success: false, error: "You are not a subscribed human" };
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
  const res = await sql<
    NumericId[]
  >`INSERT INTO wisdom (content) VALUES (${content}) RETURNING id`;
  return res[0];
}

export async function likeWisdom(id: number) {
  const sql = postgres(DATABASE_URL);
  const res = await sql<
    NumericId[]
  >`UPDATE wisdom SET likes = likes + 1 WHERE id = ${id}`;
  return res[0];
}

export async function unlikeWisdom(id: number) {
  const sql = postgres(DATABASE_URL);
  const res = await sql<
    NumericId[]
  >`UPDATE wisdom SET likes = GREATEST(likes - 1, 0) WHERE id = ${id}`;
  return res[0];
}
