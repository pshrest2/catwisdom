"use server";

import postgres from "postgres";

interface User {
  id: number;
  email: string;
}

export async function subscribe(email: string) {
  const sql = postgres(process.env.DATABASE_URL!, { ssl: "require" });
  const userResult = await sql<User[]>`SELECT * FROM users u WHERE u.email = ${email}`;
  if (userResult.length === 0) {
    await sql`INSERT INTO users (email) VALUES (${email})`;
  }
}
