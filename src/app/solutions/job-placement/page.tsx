import Link from "next/link";
import {
  ArrowRight,
  Briefcase,
  GraduationCap,
  Globe2,
  Rocket,
  TrendingUp,
  Building2,
  CheckCircle2,
  MapPin,
  Star,
  Users,
  Award
} from "lucide-react";
import { SiteShell } from "@/components/SiteShell";

export const dynamic = "force-dynamic";

const benefits = [
  {
    icon: Globe2,
    title: "Exclusive European Opportunities",
    text: "Access high-demand job openings across top European countries including Germany, Netherlands, Norway, Sweden, Denmark, and more — all curated for skilled graduates."
  },
  {
    icon: Briefcase,
    title: "Attractive Salaries & Growth",
    text: "High-demand openings with attractive salary packages, career growth pathways, and international work exposure — all in one place."
  },
  {
    icon: Building2,
    title: "Trusted Employer Network",
    text: "Turn your degree into a global career with trusted employers across top European countries. We only partner with verified, reputable companies."
  },
  {
    icon: GraduationCap,
    title: "For Students & Graduates",
    text: "Whether you're still studying or already graduated, this is your chance to work, earn, and grow internationally with full support from our team."
  }
];

const steps = [
  {
    number: "01",
    title: "Submit Your Profile",
    text: "Fill out a simple application with your qualifications, preferred industry, and target countries."
  },
  {
    number: "02",
    title: "Profile Matching",
    text: "Our team matches your skills and qualifications with relevant job openings across Europe."
  },
  {
    number: "03",
    title: "Interview Preparation",
    text: "We prepare you for employer interviews and help you understand the role and expectations."
  },
  {
    number: "04",
    title: "Placement & Support",
    text: "Once selected, we assist with paperwork, relocation guidance, and settling into your new role."
  }
];

const sectors = [
  "Engineering & Technical",
  "Information Technology",
  "Healthcare & Nursing",
  "Construction & Trades",
  "Hospitality & Tourism",
  "Logistics & Warehousing",
  "Manufacturing",
  "Finance & Accounting",
  "Sales & Marketing",
  "Administration"
];

const countries = [
  { flag: "🇩🇪", name: "Germany" },
  { flag: "🇳🇱", name: "Netherlands" },
  { flag: "🇳🇴", name: "Norway" },
  { flag: "🇸🇪", name: "Sweden" },
  { flag: "🇩🇰", name: "Denmark" },
  { flag: "🇫🇮", name: "Finland" },
  { flag: "🇦🇹", name: "Austria" },
  { flag: "🇨🇭", name: "Switzerland" }
];

export default function JobPlacementPage() {
  return (
    <SiteShell>
      {/* Hero */}
      <section className="page-hero compact">
        <p className="eyebrow">🔥 Your Dream Job in Europe Starts Here</p>
        <h1>Job Placement for Graduates &amp; Students</h1>
        <p>
          Exclusive job opportunities in Europe for students and graduates ready to build a
          successful future abroad. High-demand openings, attractive salaries, career growth, and
          international work exposure — all in one place.
        </p>
        <div className="hero-actions" style={{ justifyContent: "center", marginTop: "28px" }}>
          <Link className="primary-button" href="/contact">
            Apply Today <ArrowRight size={18} />
          </Link>
          <Link className="secondary-button" href="/solutions">
            All Solutions
          </Link>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="jp-benefits-section">
        <div className="section-heading">
          <p className="eyebrow">Why Choose Us</p>
          <h2>Everything you need to launch your European career</h2>
          <p>
            We bridge the gap between talented graduates and Europe's top employers, making
            international job placement accessible, transparent, and stress-free.
          </p>
        </div>
        <div className="jp-benefits-grid">
          {benefits.map((b) => {
            const Icon = b.icon;
            return (
              <article className="jp-benefit-card" key={b.title}>
                <div className="jp-benefit-icon">
                  <Icon size={26} />
                </div>
                <h3>{b.title}</h3>
                <p>{b.text}</p>
              </article>
            );
          })}
        </div>
      </section>

      {/* Highlight Banner */}
      <section className="jp-highlight-band">
        <div className="jp-highlight-inner">
          <div className="jp-highlight-stat">
            <strong>500+</strong>
            <span>Graduates Placed</span>
          </div>
          <div className="jp-highlight-stat">
            <strong>8+</strong>
            <span>European Countries</span>
          </div>
          <div className="jp-highlight-stat">
            <strong>95%</strong>
            <span>Placement Success Rate</span>
          </div>
          <div className="jp-highlight-stat">
            <strong>150+</strong>
            <span>Partner Employers</span>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="process-section">
        <div className="section-heading">
          <p className="eyebrow">How It Works</p>
          <h2>A clear path from graduation to your European career</h2>
          <p>
            Our streamlined 4-step process ensures every graduate gets personalised attention and
            the best possible job match.
          </p>
        </div>
        <div className="process-grid">
          {steps.map((step) => (
            <article className="process-card" key={step.number}>
              <span>{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Sectors & Countries */}
      <section className="jp-sectors-section">
        <div className="jp-sectors-inner">
          <div className="jp-sectors-col">
            <p className="eyebrow">Job Sectors</p>
            <h2>Industries we place graduates in</h2>
            <div className="jp-sectors-list">
              {sectors.map((s) => (
                <span className="jp-sector-tag" key={s}>
                  <CheckCircle2 size={16} />
                  {s}
                </span>
              ))}
            </div>
          </div>
          <div className="jp-countries-col">
            <p className="eyebrow">🌍 Destinations</p>
            <h2>Top European countries we operate in</h2>
            <div className="jp-countries-grid">
              {countries.map((c) => (
                <div className="jp-country-card" key={c.name}>
                  <span className="jp-flag">{c.flag}</span>
                  <span>{c.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Who Can Apply */}
      <section className="split-section">
        <div>
          <p className="eyebrow">Who Can Apply</p>
          <h2>Open to students and recent graduates</h2>
        </div>
        <div className="copy-stack">
          <p>
            🎓 Whether you are currently studying and looking for an internship or work placement, or
            you have already graduated and want to kick-start your international career — we have
            opportunities tailored for you.
          </p>
          <p>
            ✈️ Our team handles end-to-end coordination: from finding the right role and preparing
            you for the interview, to supporting your relocation and settling-in process in your new
            European country.
          </p>
          <p>
            🚀 Apply today and take the first step toward your European career. Your dream job is
            closer than you think.
          </p>
          <div style={{ marginTop: "8px" }}>
            <Link className="primary-button" href="/contact">
              Start Your Application <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Vastorabaltic */}
      <section className="why-section">
        <div>
          <p className="eyebrow">Why Vastorabaltic</p>
          <h2>Your trusted partner for international job placement</h2>
        </div>
        <div className="why-list">
          {[
            "Verified employer network across 8+ European countries",
            "Dedicated placement counsellors for every candidate",
            "End-to-end support from application to onboarding",
            "No hidden fees — transparent and candidate-first approach",
            "Specialised in graduate and student job placements",
            "Strong track record with 95%+ placement success rate"
          ].map((item) => (
            <div key={item}>
              <CheckCircle2 size={21} />
              <span>{item}</span>
            </div>
          ))}
        </div>
        <Users className="watermark-icon" size={190} aria-hidden />
      </section>
    </SiteShell>
  );
}
