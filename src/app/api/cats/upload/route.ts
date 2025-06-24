import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  if (!request.body) {
    return NextResponse.json(
      { error: "request body not found" },
      { status: 400 }
    );
  }

  const filename =
    searchParams.get("filename") ?? `${crypto.randomUUID().split("-")[0]}.txt`;

  const blob = await put(filename, request.body, {
    access: "public",
  });

  return NextResponse.json(blob);
}
