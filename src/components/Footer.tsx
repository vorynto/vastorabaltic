import Link from "next/link";
import { Mail, MapPin } from "lucide-react";
import { SiteSettings } from "@/lib/defaultContent";

/* ── Inline SVG social icons ─────────────────────────────────────── */
function FacebookIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white" />
    </svg>
  );
}

const socialItems = [
  { key: "facebook" as const, label: "Facebook", Icon: FacebookIcon },
  { key: "instagram" as const, label: "Instagram", Icon: InstagramIcon },
  { key: "linkedin" as const, label: "LinkedIn", Icon: LinkedInIcon },
  { key: "youtube" as const, label: "YouTube", Icon: YouTubeIcon }
];

export function Footer({ settings }: { settings: SiteSettings }) {
  const hasSocials = socialItems.some((s) => !!settings[s.key]);

  return (
    <footer className="footer">
      <div className="footer-column">
        <strong>{settings.siteName}</strong>
        <p>Modern recruitment solutions for dependable construction teams in Lithuania and Europe.</p>
        {hasSocials && (
          <div className="footer-socials">
            {socialItems.map(({ key, label, Icon }) =>
              settings[key] ? (
                <a
                  key={key}
                  href={settings[key]}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={label}
                  className="social-icon-link"
                >
                  <Icon />
                </a>
              ) : null
            )}
          </div>
        )}
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
      <p className="developer-credit">
        Developed by{" "}
        <a href="https://vorynto.com" rel="noreferrer" target="_blank">
          Vorynto Pvt. Ltd.
        </a>
      </p>
    </footer>
  );
}
