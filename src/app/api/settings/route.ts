import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { getSettings, saveSettings } from "@/lib/data";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(await getSettings());
}

export async function PUT(request: Request) {
  try {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user || user.app_metadata?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const settings = await request.json();
    const saved = await saveSettings(settings);
    revalidatePath("/", "layout");
    return NextResponse.json(saved);
  } catch (err) {
    console.error("PUT /api/settings error:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
