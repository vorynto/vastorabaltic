import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Briefcase,
  CheckCircle2,
  ClipboardCheck,
  GraduationCap,
  Globe2,
  Hammer,
  MapPinned,
  Rocket,
  ShieldCheck,
  UsersRound
} from "lucide-react";
import { HeroSlider } from "./HeroSlider";
import { SiteContent, SiteSettings } from "@/lib/defaultContent";

export function HomePage({ content, settings }: { content: SiteContent; settings: SiteSettings }) {
  const slides = [
    {
      eyebrow: "Lithuania-based recruitment agency",
      title: content.heroTitle,
      text: content.heroSubtitle,
      image: "/images/recruitment-hero.png",
      cta: content.heroCta,
      href: "/contact"
    },
    {
      eyebrow: "Construction workforce solutions",
      title: "Skilled tradespeople for projects that cannot wait",
      text:
        "We support employers with carpenters, welders, masons, electricians, plasterers, brick layers, and other dependable site-ready workers.",
      image: "/images/recruitment-hero.png",
      cta: "Explore solutions",
      href: "/solutions"
    },
    {
      eyebrow: "Clear hiring process",
      title: "From vacancy brief to candidate shortlist with less friction",
      text:
        "Our team manages sourcing, screening, communication, and coordination so your project team can stay focused on delivery.",
      image: "/images/recruitment-hero.png",
      cta: "Start hiring",
      href: "/contact"
    }
  ];

  return (
    <>
      <HeroSlider slides={slides} email={settings.email} />

      <section className="split-section">
        <div>
          <p className="eyebrow">Who We Are</p>
          <h2>Recruitment built for practical, reliable teams</h2>
        </div>
        <div className="copy-stack">
          <p>{content.whoWeAre}</p>
          <p>
            We work with employers who need people they can trust on site: workers who understand
            deadlines, safety, communication, and the discipline required on busy construction
            projects.
          </p>
        </div>
      </section>

      <section className="feature-band">
        <div className="section-heading">
          <p className="eyebrow">What We Do</p>
          <h2>Fast hiring support for skilled construction roles</h2>
          <p>{content.whatWeDo}</p>
        </div>
        <div className="trade-grid">
          {content.trades.map((trade, index) => (
            <div className="trade-card" key={trade} style={{ animationDelay: `${index * 80}ms` }}>
              <Hammer size={22} />
              <span>{trade}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="insight-section">
        <div className="section-heading">
          <p className="eyebrow">Built for Employers</p>
          <h2>Recruitment support that keeps projects moving</h2>
        </div>
        <div className="insight-grid">
          <article>
            <ClipboardCheck size={26} />
            <h3>Role clarity</h3>
            <p>We define skills, tools, experience levels, start dates, and project conditions before sourcing.</p>
          </article>
          <article>
            <ShieldCheck size={26} />
            <h3>Quality first</h3>
            <p>Candidate profiles are reviewed for practical experience, availability, and long-term fit.</p>
          </article>
          <article>
            <MapPinned size={26} />
            <h3>European reach</h3>
            <p>We support domestic and overseas recruitment for companies building teams across Europe.</p>
          </article>
          <article>
            <BadgeCheck size={26} />
            <h3>Clear communication</h3>
            <p>Employers get direct updates, realistic timelines, and transparent coordination throughout the process.</p>
          </article>
        </div>
      </section>

      <section className="process-section">
        <div className="section-heading">
          <p className="eyebrow">How We Work</p>
          <h2>A clear route from vacancy to placement</h2>
        </div>
        <div className="process-grid">
          {content.process.map((step, index) => (
            <article key={step.title} className="process-card">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Job Placement Teaser */}
      <section className="jp-teaser-section">
        <div className="jp-teaser-inner">
          <div>
            <p className="eyebrow">🚀 New Service</p>
            <h2>Your Dream Job in Europe Starts Here</h2>
            <p style={{ color: "var(--muted)", fontSize: "1.02rem", lineHeight: "1.7", marginBottom: "0" }}>
              Exclusive job opportunities in Europe for students and graduates ready to build a
              successful future abroad. Turn your degree into a global career.
            </p>
            <div className="jp-teaser-features">
              <div className="jp-teaser-feature">
                <div className="jp-teaser-feature-icon"><Globe2 size={20} /></div>
                <div className="jp-teaser-feature-text">
                  <strong>Exclusive European Openings</strong>
                  <span>Access high-demand jobs across Germany, Netherlands, Norway, Sweden &amp; more</span>
                </div>
              </div>
              <div className="jp-teaser-feature">
                <div className="jp-teaser-feature-icon"><Briefcase size={20} /></div>
                <div className="jp-teaser-feature-text">
                  <strong>Attractive Salaries &amp; Career Growth</strong>
                  <span>High-demand openings with international work exposure — all in one place</span>
                </div>
              </div>
              <div className="jp-teaser-feature">
                <div className="jp-teaser-feature-icon"><GraduationCap size={20} /></div>
                <div className="jp-teaser-feature-text">
                  <strong>For Students &amp; Graduates</strong>
                  <span>Whether studying or already graduated — work, earn, and grow internationally</span>
                </div>
              </div>
            </div>
            <Link className="primary-button" href="/solutions/job-placement">
              Explore Job Placement <ArrowRight size={18} />
            </Link>
          </div>
          <div className="jp-teaser-visual">
            <div className="jp-visual-emoji">🌍</div>
            <h3>Launch Your International Career</h3>
            <p>
              We match skilled graduates with trusted employers across top European countries.
              Apply today and take the first step toward your European career!
            </p>
            <div className="jp-visual-stats">
              <div className="jp-visual-stat">
                <strong>500+</strong>
                <span>Placed</span>
              </div>
              <div className="jp-visual-stat">
                <strong>8+</strong>
                <span>Countries</span>
              </div>
              <div className="jp-visual-stat">
                <strong>95%</strong>
                <span>Success</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="why-section">
        <div>
          <p className="eyebrow">Why Choose Us</p>
          <h2>Transparent, quality-focused recruitment</h2>
        </div>
        <div className="why-list">
          {content.whyChooseUs.map((item) => (
            <div key={item}>
              <CheckCircle2 size={21} />
              <span>{item}</span>
            </div>
          ))}
        </div>
        <UsersRound className="watermark-icon" size={190} aria-hidden />
      </section>
    </>
  );
}
