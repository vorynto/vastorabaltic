import { Mail, MapPin, MessageCircle } from "lucide-react";
import { EnquiryForm } from "@/components/EnquiryForm";
import { SiteShell } from "@/components/SiteShell";
import { getSettings } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function ContactPage() {
  const settings = await getSettings();

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
