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

/**
 * Users
 */
export async function getSubscribers() {
  const sql = postgres(DATABASE_URL);
  return await sql<User[]>`SELECT * FROM users`;
}

export async function subscribe(email: string) {
  const sql = postgres(DATABASE_URL, { ssl: "require" });
  const userResult = await sql<
    User[]
  >`SELECT * FROM users u WHERE u.email = ${email}`;
  if (userResult.length === 0) {
    await sql`INSERT INTO users (email) VALUES (${email})`;
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

export async function createWisdom(content: string) {
  const sql = postgres(DATABASE_URL);
  await sql`INSERT INTO wisdom (content) VALUES (${content})`;
}
