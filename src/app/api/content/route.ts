import { NextResponse } from "next/server";
import { getContent, saveContent } from "@/lib/data";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(await getContent());
}

export async function PUT(request: Request) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (user?.app_metadata?.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const content = await request.json();
  return NextResponse.json(await saveContent(content));
}
