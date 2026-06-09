import { redirect } from "next/navigation";
import { AdminPanel } from "@/components/AdminPanel";
import { getContent, getSettings, listEnquiries } from "@/lib/data";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (user?.app_metadata?.role !== "admin") redirect("/admin/login");

  const [content, settings, enquiries] = await Promise.all([
    getContent(),
    getSettings(),
    listEnquiries(supabase)
  ]);

  return <AdminPanel initialContent={content} initialSettings={settings} initialEnquiries={enquiries} />;
}
