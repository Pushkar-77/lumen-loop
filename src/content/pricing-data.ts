export interface PricingTier {
  id: string;
  name: string;
  tagline: string;
  badge?: string;
  isPopular?: boolean;
  prices: {
    INR: {
      monthly: number;
      quarterlyPerMonth: number; // 15% discount
      billingNotes: string;
    };
    USD: {
      monthly: number;
      quarterlyPerMonth: number; // 15% discount
      billingNotes: string;
    };
  };
  targetAudience: string;
  deliverablesSummary: string[];
  featuresIncluded: string[];
  ctaLabel: string;
  planKey: string;
}

export const pricingTiers: PricingTier[] = [
  {
    id: "starter",
    name: "Starter Growth",
    planKey: "starter-growth",
    tagline: "For early-stage brands looking to establish predictable customer acquisition.",
    badge: "Seed / Early Growth",
    prices: {
      INR: {
        monthly: 125000,
        quarterlyPerMonth: 106250, // 15% off: ₹1,06,250/mo (billed ₹3,18,750 quarterly)
        billingNotes: "Hand-set Indian domestic retainer. Plus standard GST.",
      },
      USD: {
        monthly: 1800,
        quarterlyPerMonth: 1530, // 15% off: $1,530/mo (billed $4,590 quarterly)
        billingNotes: "Hand-set international tier. Zero cross-border fees.",
      },
    },
    targetAudience: "Brands spending up to ₹3L ($4k) in ad media monthly, seeking their first systematic compounding channel.",
    deliverablesSummary: [
      "2 Core Growth Channels (e.g. SEO + Paid Ads or Ads + CRM)",
      "Bi-weekly sprint check-ins & KPI reviews",
      "Full GA4 & basic attribution tracking setup",
      "Dedicated Growth Strategist point-of-contact",
      "48-hour SLA for async communication",
    ],
    featuresIncluded: [
      "Channel strategy & roadmap",
      "Bi-weekly campaign optimization",
      "Monthly performance retrospective",
      "Ad creative review & guidance",
      "Server-side tracking QA",
    ],
    ctaLabel: "Select Starter Plan",
  },
  {
    id: "scale",
    name: "Scale Engine",
    planKey: "scale-engine",
    tagline: "Our flagship growth partnership for brands scaling past product-market fit.",
    badge: "Most Popular",
    isPopular: true,
    prices: {
      INR: {
        monthly: 275000,
        quarterlyPerMonth: 233750, // 15% off: ₹2,33,750/mo (billed ₹7,01,250 quarterly)
        billingNotes: "Recommended for high-velocity compounding. Plus standard GST.",
      },
      USD: {
        monthly: 3600,
        quarterlyPerMonth: 3060, // 15% off: $3,060/mo (billed $9,180 quarterly)
        billingNotes: "Global scale retainer. Net terms available on quarterly commitments.",
      },
    },
    targetAudience: "Growth-stage companies spending ₹5L–₹25L ($7k–$30k) monthly across search, social, and lifecycle CRM.",
    deliverablesSummary: [
      "4 Integrated Growth Channels (SEO, Paid Ads, CRM & CRO)",
      "Weekly sprint check-ins & real-time Slack/WhatsApp channel",
      "Custom Looker Studio attribution dashboard",
      "Dedicated Growth Lead + Senior Creative Designer",
      "Continuous multivariate landing page A/B experiments",
      "24-hour business day response SLA",
    ],
    featuresIncluded: [
      "Full-funnel cross-channel orchestration",
      "Weekly creative production & ad testing",
      "Landing page CRO teardowns & test deployment",
      "Lifecycle email & SMS flow architecture",
      "First-party attribution & Blended MER tracking",
      "Quarterly executive growth summit",
    ],
    ctaLabel: "Select Scale Engine",
  },
  {
    id: "enterprise",
    name: "Enterprise Velocity",
    planKey: "enterprise-velocity",
    tagline: "For category leaders demanding bespoke marketing operations and custom engineering.",
    badge: "High-Volume Growth",
    prices: {
      INR: {
        monthly: 550000,
        quarterlyPerMonth: 467500, // 15% off: ₹4,67,500/mo (billed ₹14,02,500 quarterly)
        billingNotes: "Custom team allocation & dedicated technical pod. Plus GST.",
      },
      USD: {
        monthly: 7200,
        quarterlyPerMonth: 6120, // 15% off: $6,120/mo (billed $18,360 quarterly)
        billingNotes: "Multi-regional coverage & dedicated growth pod.",
      },
    },
    targetAudience: "Established enterprises and venture-backed category leaders scaling multi-crore ($100k+) media budgets.",
    deliverablesSummary: [
      "All 6 Growth Disciplines unlocked simultaneously",
      "Dedicated cross-functional pod (Growth Lead, Data Eng, 2 Creatives)",
      "Custom BigQuery data warehouse & predictive LTV models",
      "Rapid turnaround engineering & front-end CRO deployments",
      "Executive advisory & board-ready financial attribution",
      "4-hour priority response SLA with direct phone access",
    ],
    featuresIncluded: [
      "Unlimited creative iterations & video production",
      "Custom server-side data pipeline engineering",
      "Conversion rate architecture & headless CMS support",
      "Competitor intelligence & market share telemetry",
      "Bi-annual in-person executive strategy retreat in Pune",
      "Dedicated Slack Connect & shared project board",
    ],
    ctaLabel: "Select Enterprise Plan",
  },
];

export interface ComparisonCategory {
  category: string;
  items: Array<{
    name: string;
    starter: string | boolean;
    scale: string | boolean;
    enterprise: string | boolean;
    tooltip?: string;
  }>;
}

export const comparisonMatrix: ComparisonCategory[] = [
  {
    category: "Strategic Growth & Leadership",
    items: [
      {
        name: "Dedicated Growth Lead",
        starter: "Shared (1:4)",
        scale: "Dedicated (1:2)",
        enterprise: "Full-Time Dedicated Pod",
      },
      {
        name: "Growth Sprints Cadence",
        starter: "Bi-Weekly",
        scale: "Weekly",
        enterprise: "Daily Async + Weekly Live",
      },
      {
        name: "Channels Included",
        starter: "2 Channels",
        scale: "4 Channels",
        enterprise: "All 6 Disciplines",
      },
      {
        name: "Strategic Roadmapping",
        starter: "Quarterly",
        scale: "Monthly",
        enterprise: "Continuous Dynamic",
      },
    ],
  },
  {
    category: "Paid Acquisition & Creative",
    items: [
      {
        name: "Ad Accounts Managed",
        starter: "Up to 2 Accounts",
        scale: "Up to 4 Accounts",
        enterprise: "Unlimited Platforms",
      },
      {
        name: "Net New Creative Variations",
        starter: "4 Assets / mo",
        scale: "12 Assets / mo",
        enterprise: "Unlimited Iterations",
      },
      {
        name: "Video Production (Shorts/Reels)",
        starter: false,
        scale: "4 Assets / mo",
        enterprise: "Bespoke Shoots & Editing",
      },
      {
        name: "Audience Modeling & CAPI",
        starter: "Standard Pixel",
        scale: "Server-Side CAPI",
        enterprise: "Offline Conversion CRM Sync",
      },
    ],
  },
  {
    category: "SEO & Content Marketing",
    items: [
      {
        name: "Technical SEO Audits",
        starter: "Monthly",
        scale: "Bi-Weekly",
        enterprise: "Continuous Automated Crawls",
      },
      {
        name: "In-Depth Editorial Guides",
        starter: "1 Article / mo",
        scale: "3 Deep Guides / mo",
        enterprise: "Comprehensive Editorial Suite",
      },
      {
        name: "Backlink Acquisition",
        starter: "Foundational (2/mo)",
        scale: "Authority (5/mo)",
        enterprise: "Digital PR & Tier-1 Mentions",
      },
    ],
  },
  {
    category: "Analytics, CRO & Engineering",
    items: [
      {
        name: "Reporting Infrastructure",
        starter: "GA4 Looker Dashboard",
        scale: "Custom Real-Time Portal",
        enterprise: "BigQuery + Looker + Model Pipeline",
      },
      {
        name: "Landing Page CRO Testing",
        starter: "Quarterly Audit",
        scale: "Continuous A/B Sprints",
        enterprise: "Full-Funnel Multivariate Suite",
      },
      {
        name: "Front-End Development Support",
        starter: false,
        scale: "Up to 10 hrs / mo",
        enterprise: "Dedicated Technical Dev",
      },
    ],
  },
  {
    category: "Service Level Agreement (SLA)",
    items: [
      {
        name: "Response Time SLA",
        starter: "48 Hours",
        scale: "24 Hours",
        enterprise: "4 Hours Priority",
      },
      {
        name: "Communication Channels",
        starter: "Email & Client Portal",
        scale: "Dedicated Slack Channel",
        enterprise: "Slack Connect + Direct Phone Line",
      },
    ],
  },
];

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const pricingFaqs: FaqItem[] = [
  {
    id: "contracts",
    question: "Are retainers bound by long-term contracts?",
    answer:
      "No. All Lumen Loop monthly retainers operate on rolling 30-day agreements with a simple 30-day notice period. We believe retention is earned every single month through measurable compounding pipeline, not legal lock-in. For quarterly commitments, you receive a guaranteed 15% discount in exchange for three months of strategic runway.",
  },
  {
    id: "ad-spend",
    question: "Are media and ad spend budgets included in the retainer?",
    answer:
      "No. Our retainers cover purely agency growth strategy, creative production, campaign management, technical SEO, and conversion optimization. You pay ad networks (Google, Meta, LinkedIn) directly through your own ad accounts. This guarantees 100% transparency, zero hidden markups, and ensures you retain full ownership of your accounts and audience data forever.",
  },
  {
    id: "hand-set-pricing",
    question: "Why do you use hand-set INR and USD pricing rather than live exchange rates?",
    answer:
      "Currency values fluctuate daily, but our clients budget on fixed predictability. We hand-set distinct INR domestic rates for Indian companies and USD rates for international clients to reflect localized economic realities, dedicated regional bandwidth, and regulatory compliance (like Indian GST) without unpredictable currency spikes.",
  },
  {
    id: "time-to-results",
    question: "How quickly do we see measurable business traction?",
    answer:
      "Paid acquisition campaigns and landing page CRO typically reveal clear efficiency trends within the first 14 to 21 days as bid algorithms stabilize. Organic search and lifecycle email CRM represent compounding investments that exhibit exponential returns between 60 to 120 days. We establish 30-, 60-, and 90-day benchmark milestones during week 1 onboarding.",
  },
  {
    id: "onboarding",
    question: "What does the onboarding process look like?",
    answer:
      "Upon agreement, Day 1 involves a technical audit of your analytics tracking, historical ad data, and search health. By Day 5, we present your 90-Day Compounding Roadmap and align on primary target KPIs. By Day 10, creative variations and updated campaigns enter deployment stage. You have a dedicated Slack channel from Day 1.",
  },
  {
    id: "performance-guarantees",
    question: "Do you offer guaranteed ROAS or #1 search rankings?",
    answer:
      "No, and we caution against any agency that promises guaranteed vanity outcomes. Search algorithms and ad auction dynamics are probabilistic markets. What we do guarantee is statistical rigor: validated attribution, first-party data tracking, rapid creative testing, and transparent weekly reporting. If an experiment underperforms, we pivot swiftly without burning capital.",
  },
];
