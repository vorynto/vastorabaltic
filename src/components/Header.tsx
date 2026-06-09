import Image from "next/image";
import Link from "next/link";
import { SiteSettings } from "@/lib/defaultContent";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About us" },
  { href: "/solutions", label: "Our Solutions" },
  { href: "/solutions/job-placement", label: "Job Placement" },
  { href: "/contact", label: "Contact us" }
];

export function Header({ settings }: { settings: SiteSettings }) {
  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="Vastorabaltic home">
        <Image src={settings.logoUrl} alt="Vastorabaltic logo" width={54} height={54} />
        <span>{settings.siteName}</span>
      </Link>
      <nav aria-label="Main navigation">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}>
            {item.label}
          </Link>
        ))}
      </nav>
      <Link className="header-cta" href="/contact">
        Enquire
      </Link>
    </header>
  );
}
