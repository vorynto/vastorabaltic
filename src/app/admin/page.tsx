import { AdminPanel } from "@/components/AdminPanel";
import { getContent, getSettings } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const [content, settings] = await Promise.all([getContent(), getSettings()]);

  return <AdminPanel initialContent={content} initialSettings={settings} initialEnquiries={[]} />;
}
