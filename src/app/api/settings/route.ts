import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { getSettings, saveSettings } from "@/lib/data";
import { defaultSettings } from "@/lib/defaultContent";
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

    const body = await request.json();
    const nextSettings = { ...defaultSettings, ...body };

    // Write with the authenticated SSR client — the user's session gives
    // "authenticated" role which the RLS policy allows to write.
    // This avoids relying on the service key to bypass RLS.
    const { error } = await supabase
      .from("site_settings")
      .upsert({ id: "global", settings: nextSettings, updated_at: new Date().toISOString() });

    if (error) {
      console.error("Supabase settings upsert failed, writing local file:", error);
      await saveSettings(body); // local-file fallback (dev only)
    }

    revalidatePath("/", "layout");
    return NextResponse.json(nextSettings);
  } catch (err) {
    console.error("PUT /api/settings error:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
