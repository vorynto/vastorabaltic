import { Footer } from "./Footer";
import { Header } from "./Header";
import { getSettings } from "@/lib/data";

export async function SiteShell({ children }: { children: React.ReactNode }) {
  const settings = await getSettings();

  return (
    <>
      <Header settings={settings} />
      <main className="site-content">{children}</main>
      <Footer settings={settings} />
    </>
  );
}
