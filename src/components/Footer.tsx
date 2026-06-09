import Link from "next/link";
import { Mail, MapPin } from "lucide-react";
import { SiteSettings } from "@/lib/defaultContent";
import { SocialLinks } from "@/components/SocialIcons";

export function Footer({ settings }: { settings: SiteSettings }) {
  const year = new Date().getFullYear();
  return (
    <>
      <footer className="footer">
        <div className="footer-column">
          <strong>{settings.siteName}</strong>
          <p>Modern recruitment solutions for dependable construction teams in Lithuania and Europe.</p>
          <div className="footer-socials">
            <SocialLinks settings={settings} size={14} className="social-icon-link" />
          </div>
        </div>
        <div className="footer-column footer-links">
          <h3>Pages</h3>
          <Link href="/about">About</Link>
          <Link href="/solutions">Solutions</Link>
          <Link href="/solutions/job-placement">Job Placement</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/admin">Admin</Link>
        </div>
        <div className="footer-column footer-contact">
          <h3>Contact</h3>
          <a className="mail-link" href={`mailto:${settings.email}`}>
            <Mail size={18} />
            {settings.email}
          </a>
          <p>
            <MapPin size={18} />
            Lithuania
          </p>
        </div>
      </footer>
      <div className="footer-credits-bar">
        <span className="footer-copyright">
          &copy; {year}{" "}
          <a href="/">{settings.siteName}</a>
        </span>
        <span className="footer-devby">
          Developed by{" "}
          <a href="https://vorynto.com" rel="noreferrer" target="_blank">
            Vorynto Pvt. Ltd.
          </a>
        </span>
      </div>
    </>
  );
}
