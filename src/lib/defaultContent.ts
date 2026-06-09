export type SiteSettings = {
  siteName: string;
  logoUrl: string;
  primaryColor: string;
  accentColor: string;
  backgroundColor: string;
  fontFamily: string;
  email: string;
};

export type SiteContent = {
  heroTitle: string;
  heroSubtitle: string;
  heroCta: string;
  whoWeAre: string;
  whatWeDo: string;
  whyChooseUs: string[];
  trades: string[];
  process: { title: string; text: string }[];
};

export const defaultSettings: SiteSettings = {
  siteName: "Vastorabaltic",
  logoUrl: "/images/vastorabaltic-logo.jpg",
  primaryColor: "#0f5259",
  accentColor: "#10a8df",
  backgroundColor: "#ffffff",
  fontFamily: "Inter, Arial, sans-serif",
  email: "info@vastorabaltic.lt"
};

export const defaultContent: SiteContent = {
  heroTitle: "Reliable construction recruitment for Lithuania and Europe",
  heroSubtitle:
    "Vastorabaltic helps companies build dependable teams through fast sourcing, careful screening, and transparent hiring support for construction and skilled trade roles.",
  heroCta: "Send an enquiry",
  whoWeAre:
    "We are a fast-growing recruitment agency operated in Lithuania. Our work is focused on helping businesses secure reliable people for long-term projects, especially in construction, skilled trades, and overseas workforce requirements.",
  whatWeDo:
    "We source, screen, and coordinate candidates for domestic and overseas hiring. Our process is built for speed, quality, practical experience checks, and clear communication from first enquiry to placement.",
  whyChooseUs: [
    "Fast, startup-driven execution for urgent hiring needs",
    "Quality-focused screening for stronger long-term teams",
    "Honest, transparent operations with clear communication"
  ],
  trades: [
    "Carpenters",
    "Welders",
    "Masons",
    "Electricians",
    "Plasterers",
    "Brick layers"
  ],
  process: [
    {
      title: "Understand",
      text: "We define roles, skills, timelines, project conditions, and compliance needs."
    },
    {
      title: "Source",
      text: "We identify candidates through targeted sourcing and recruitment channels."
    },
    {
      title: "Screen",
      text: "We check experience, availability, motivation, and fit before introducing talent."
    },
    {
      title: "Support",
      text: "We keep communication clear through selection, offer, and onboarding."
    }
  ]
};
