import type { Metadata } from "next";
import "./globals.css";
import { getSettings } from "@/lib/data";

export const metadata: Metadata = {
  title: "Vastorabaltic | Recruitment Agency in Lithuania",
  description:
    "Vastorabaltic provides recruitment and talent solutions for construction and skilled trades in Lithuania and Europe."
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSettings();

  return (
    <html lang="en">
      <body
        style={
          {
            "--primary": settings.primaryColor,
            "--accent": settings.accentColor,
            "--bg": settings.backgroundColor,
            "--site-font": settings.fontFamily
          } as React.CSSProperties
        }
      >
        {children}
      </body>
    </html>
  );
}
