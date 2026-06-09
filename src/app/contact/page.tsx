import { Mail, MapPin, MessageCircle } from "lucide-react";
import { EnquiryForm } from "@/components/EnquiryForm";
import { SiteShell } from "@/components/SiteShell";
import { getSettings } from "@/lib/data";

export const dynamic = "force-dynamic";

/* ── Inline SVG social icons ─────────────────────────────────────── */
function FacebookIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white" />
    </svg>
  );
}

type SocialKey = "facebook" | "instagram" | "linkedin" | "youtube";

const socialItems: { key: SocialKey; label: string; Icon: () => JSX.Element }[] = [
  { key: "facebook", label: "Facebook", Icon: FacebookIcon },
  { key: "instagram", label: "Instagram", Icon: InstagramIcon },
  { key: "linkedin", label: "LinkedIn", Icon: LinkedInIcon },
  { key: "youtube", label: "YouTube", Icon: YouTubeIcon }
];

export default async function ContactPage() {
  const settings = await getSettings();
  const hasSocials = socialItems.some((s) => !!settings[s.key]);

  return (
    <SiteShell>
      <section className="page-hero compact">
        <p className="eyebrow">Contact us</p>
        <h1>Tell us what kind of team you need</h1>
        <p>
          Send your recruitment enquiry and the Vastorabaltic team will respond with the next
          practical steps.
        </p>
      </section>
      <section className="contact-layout">
        <div className="contact-panel">
          <h2>Reach Vastorabaltic</h2>
          <a href={`mailto:${settings.email}`}>
            <Mail size={20} />
            {settings.email}
          </a>
          <p>
            <MapPin size={20} />
            Lithuania
          </p>
          <p>
            <MessageCircle size={20} />
            Recruitment enquiries, construction staffing, and overseas hiring support
          </p>
          {hasSocials && (
            <div className="contact-socials">
              <p className="contact-social-label">Follow us</p>
              <div className="contact-social-icons">
                {socialItems.map(({ key, label, Icon }) =>
                  settings[key] ? (
                    <a
                      key={key}
                      href={settings[key]}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={label}
                      className="social-icon-link contact-social-icon-link"
                    >
                      <Icon />
                    </a>
                  ) : null
                )}
              </div>
            </div>
          )}
          <div className="contact-note">
            <strong>Helpful details to include</strong>
            <span>Role names, number of workers, start date, location, and required experience.</span>
          </div>
        </div>
        <EnquiryForm />
      </section>
    </SiteShell>
  );
}
