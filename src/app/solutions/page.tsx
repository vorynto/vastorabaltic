import { BriefcaseBusiness, Check, Clock, Construction, FileSearch, Users } from "lucide-react";
import { SiteShell } from "@/components/SiteShell";
import { getContent } from "@/lib/data";

export const dynamic = "force-dynamic";

const solutions = [
  {
    icon: FileSearch,
    title: "Talent sourcing and screening",
    text: "Candidate sourcing, qualification checks, experience review, and shortlist preparation."
  },
  {
    icon: BriefcaseBusiness,
    title: "Domestic and overseas recruitment",
    text: "Hiring support for Lithuania-based employers and European recruitment requirements."
  },
  {
    icon: Clock,
    title: "Fast hiring process",
    text: "Responsive coordination for urgent vacancies without losing focus on candidate quality."
  },
  {
    icon: Users,
    title: "Customized staffing solutions",
    text: "Role-specific recruitment plans for project timelines, skill gaps, and team growth."
  }
];

export default async function SolutionsPage() {
  const content = await getContent();

  return (
    <SiteShell>
      <section className="page-hero compact">
        <p className="eyebrow">Our Solutions</p>
        <h1>Recruitment services for skilled trade teams</h1>
        <p>{content.whatWeDo}</p>
      </section>
      <section className="solution-grid">
        {solutions.map((solution) => {
          const Icon = solution.icon;
          return (
            <article className="solution-card" key={solution.title}>
              <Icon size={28} />
              <h2>{solution.title}</h2>
              <p>{solution.text}</p>
            </article>
          );
        })}
      </section>
      <section className="trade-focus">
        <Construction size={38} />
        <div>
          <p className="eyebrow">Main focus</p>
          <h2>Construction worker recruitment</h2>
        </div>
        <div className="check-grid">
          {content.trades.map((trade) => (
            <span key={trade}>
              <Check size={17} />
              {trade}
            </span>
          ))}
        </div>
      </section>
      <section className="split-section">
        <div>
          <p className="eyebrow">Who we support</p>
          <h2>For employers hiring skilled workers across Europe</h2>
        </div>
        <div className="copy-stack">
          <p>
            Vastorabaltic supports construction companies, contractors, project managers, and
            growing businesses that need dependable workers without a slow hiring cycle.
          </p>
          <p>
            Whether the requirement is one urgent role or a broader team build, we shape the
            recruitment process around your timeline, trade requirements, and working conditions.
          </p>
        </div>
      </section>
    </SiteShell>
  );
}
