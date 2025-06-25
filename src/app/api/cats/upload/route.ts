import { auth } from "@/auth";
import { put } from "@vercel/blob";
import { NextAuthRequest } from "next-auth";
import { NextResponse } from "next/server";

export const POST = auth(async function POST(
  request: Request
): Promise<NextResponse> {
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
    addRandomSuffix: true,
  });

  return NextResponse.json(blob);
});

export const GET = auth(async function GET(req: NextAuthRequest) {
  if (req.auth) return NextResponse.json({ auth: req.auth });
  return NextResponse.json({ message: "Not Authenticated" }, { status: 401 });
});
