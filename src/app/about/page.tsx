import Image from "next/image";
import { BadgeCheck, Building2, Globe2 } from "lucide-react";
import { SiteShell } from "@/components/SiteShell";
import { getContent } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function AboutPage() {
  const content = await getContent();

  return (
    <SiteShell>
      <section className="page-hero compact">
        <p className="eyebrow">About us</p>
        <h1>We help businesses build reliable teams</h1>
        <p>{content.whoWeAre}</p>
      </section>
      <section className="about-layout">
        <div className="about-image">
          <Image
            src="/images/recruitment-hero.png"
            alt="Recruitment professionals"
            fill
            sizes="(max-width: 980px) 100vw, 45vw"
          />
        </div>
        <div className="about-copy">
          <h2>Modern recruitment with practical execution</h2>
          <p>
            Vastorabaltic combines fast communication with careful candidate screening. We work
            with employers who need practical hiring support, dependable skilled workers, and a
            recruitment partner that keeps the process direct.
          </p>
          <div className="icon-row">
            <div>
              <Building2 size={24} />
              <span>Lithuania operated</span>
            </div>
            <div>
              <Globe2 size={24} />
              <span>Domestic and overseas hiring</span>
            </div>
            <div>
              <BadgeCheck size={24} />
              <span>Quality-focused screening</span>
            </div>
          </div>
        </div>
      </section>
      <section className="insight-section">
        <div className="section-heading">
          <p className="eyebrow">Our approach</p>
          <h2>Practical recruitment for real project conditions</h2>
          <p>
            We focus on roles where reliability matters every day: site attendance, trade skills,
            communication, safety awareness, and the ability to work as part of a project team.
          </p>
        </div>
        <div className="insight-grid">
          <article>
            <h3>Employer-first planning</h3>
            <p>We begin with the vacancy, project timeline, required skills, and working conditions.</p>
          </article>
          <article>
            <h3>Candidate readiness</h3>
            <p>We look beyond availability and consider experience, motivation, and practical fit.</p>
          </article>
          <article>
            <h3>Transparent coordination</h3>
            <p>We keep communication direct so decisions can move quickly and confidently.</p>
          </article>
          <article>
            <h3>Long-term mindset</h3>
            <p>We aim for placements that support stable teams, not only immediate vacancies.</p>
          </article>
        </div>
      </section>
    </SiteShell>
  );
}
