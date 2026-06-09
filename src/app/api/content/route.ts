import { NextResponse } from "next/server";
import { getContent, isAdminRequest, saveContent } from "@/lib/data";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(await getContent());
}

export async function PUT(request: Request) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const content = await request.json();
  return NextResponse.json(await saveContent(content));
}
