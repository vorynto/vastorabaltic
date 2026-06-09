import { HomePage } from "@/components/HomePage";
import { SiteShell } from "@/components/SiteShell";
import { getContent, getSettings } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function Page() {
  const [content, settings] = await Promise.all([getContent(), getSettings()]);

  return (
    <SiteShell>
      <HomePage content={content} settings={settings} />
    </SiteShell>
  );
}
