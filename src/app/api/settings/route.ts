import { NextResponse } from "next/server";
import { getSettings, isAdminRequest, saveSettings } from "@/lib/data";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(await getSettings());
}

export async function PUT(request: Request) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const settings = await request.json();
  return NextResponse.json(await saveSettings(settings));
}
