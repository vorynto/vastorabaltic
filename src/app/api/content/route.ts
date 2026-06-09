import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { getContent, saveContent } from "@/lib/data";
import { defaultContent } from "@/lib/defaultContent";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(await getContent());
}

export async function PUT(request: Request) {
  try {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user || user.app_metadata?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const nextContent = { ...defaultContent, ...body };

    const { error } = await supabase
      .from("site_content")
      .upsert({ id: "global", content: nextContent, updated_at: new Date().toISOString() });

    if (error) {
      console.error("Supabase content upsert failed, writing local file:", error);
      await saveContent(body);
    }

    revalidatePath("/", "layout");
    return NextResponse.json(nextContent);
  } catch (err) {
    console.error("PUT /api/content error:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
