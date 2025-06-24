import { signOut } from "@/app/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  await signOut();
  return NextResponse.redirect("/");
}
