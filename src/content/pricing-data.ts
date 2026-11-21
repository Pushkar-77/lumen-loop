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
    name: "Starter",
    planKey: "starter",
    tagline: "For early-stage brands looking to establish predictable customer acquisition.",
    badge: "Foundational",
    prices: {
      INR: {
        monthly: 24999,
        quarterlyPerMonth: 21249, // 15% off: ₹21,249/mo (billed ₹63,747 quarterly)
        billingNotes: "Hand-set Indian domestic retainer. Plus standard GST.",
      },
      USD: {
        monthly: 299,
        quarterlyPerMonth: 254, // 15% off: $254/mo (billed $762 quarterly)
        billingNotes: "Hand-set international tier. Zero cross-border fees.",
      },
    },
    targetAudience: "Brands spending up to ₹1.5L ($2k) in ad media monthly, seeking their first systematic compounding channel.",
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
    id: "growth",
    name: "Growth",
    planKey: "growth",
    tagline: "Our flagship growth partnership for brands scaling past product-market fit.",
    badge: "Most Popular",
    isPopular: true,
    prices: {
      INR: {
        monthly: 59999,
        quarterlyPerMonth: 50999, // 15% off: ₹50,999/mo (billed ₹1,52,997 quarterly)
        billingNotes: "Recommended for high-velocity compounding. Plus standard GST.",
      },
      USD: {
        monthly: 699,
        quarterlyPerMonth: 594, // 15% off: $594/mo (billed $1,782 quarterly)
        billingNotes: "Global scale retainer. Net terms available on quarterly commitments.",
      },
    },
    targetAudience: "Growth-stage companies spending ₹2L–₹8L ($3k–$10k) monthly across search, social, and lifecycle CRM.",
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
    ctaLabel: "Select Growth Plan",
  },
  {
    id: "scale",
    name: "Scale",
    planKey: "scale",
    tagline: "For category leaders demanding bespoke marketing operations and custom engineering.",
    badge: "High-Volume",
    prices: {
      INR: {
        monthly: 149999,
        quarterlyPerMonth: 127499, // 15% off: ₹1,27,499/mo (billed ₹3,82,497 quarterly)
        billingNotes: "Custom team allocation & dedicated technical pod. Plus GST.",
      },
      USD: {
        monthly: 1799,
        quarterlyPerMonth: 1529, // 15% off: $1,529/mo (billed $4,587 quarterly)
        billingNotes: "Multi-regional coverage & dedicated growth pod.",
      },
    },
    targetAudience: "Established enterprises and category leaders scaling ₹10L+ ($15k+) media budgets.",
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
    ctaLabel: "Select Scale Plan",
  },
];

export interface ComparisonCategory {
  category: string;
  items: Array<{
    name: string;
    starter: string | boolean;
    growth: string | boolean;
    scale: string | boolean;
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
        growth: "Dedicated (1:2)",
        scale: "Full-Time Dedicated Pod",
      },
      {
        name: "Growth Sprints Cadence",
        starter: "Bi-Weekly",
        growth: "Weekly",
        scale: "Daily Async + Weekly Live",
      },
      {
        name: "Channels Included",
        starter: "2 Channels",
        growth: "4 Channels",
        scale: "All 6 Disciplines",
      },
      {
        name: "Strategic Roadmapping",
        starter: "Quarterly",
        growth: "Monthly",
        scale: "Continuous Dynamic",
      },
    ],
  },
  {
    category: "Paid Acquisition & Creative",
    items: [
      {
        name: "Ad Accounts Managed",
        starter: "Up to 2 Accounts",
        growth: "Up to 4 Accounts",
        scale: "Unlimited Platforms",
      },
      {
        name: "Net New Creative Variations",
        starter: "4 Assets / mo",
        growth: "12 Assets / mo",
        scale: "Unlimited Iterations",
      },
      {
        name: "Video Production (Shorts/Reels)",
        starter: false,
        growth: "4 Assets / mo",
        scale: "Bespoke Shoots & Editing",
      },
      {
        name: "Audience Modeling & CAPI",
        starter: "Standard Pixel",
        growth: "Server-Side CAPI",
        scale: "Offline Conversion CRM Sync",
      },
    ],
  },
  {
    category: "SEO & Content Marketing",
    items: [
      {
        name: "Technical SEO Audits",
        starter: "Monthly",
        growth: "Bi-Weekly",
        scale: "Continuous Automated Crawls",
      },
      {
        name: "In-Depth Editorial Guides",
        starter: "1 Article / mo",
        growth: "3 Deep Guides / mo",
        scale: "Comprehensive Editorial Suite",
      },
      {
        name: "Backlink Acquisition",
        starter: "Foundational (2/mo)",
        growth: "Authority (5/mo)",
        scale: "Digital PR & Tier-1 Mentions",
      },
    ],
  },
  {
    category: "Analytics, CRO & Engineering",
    items: [
      {
        name: "Reporting Infrastructure",
        starter: "GA4 Looker Dashboard",
        growth: "Custom Real-Time Portal",
        scale: "BigQuery + Looker + Model Pipeline",
      },
      {
        name: "Landing Page CRO Testing",
        starter: "Quarterly Audit",
        growth: "Continuous A/B Sprints",
        scale: "Full-Funnel Multivariate Suite",
      },
      {
        name: "Front-End Development Support",
        starter: false,
        growth: "Up to 10 hrs / mo",
        scale: "Dedicated Technical Dev",
      },
    ],
  },
  {
    category: "Service Level Agreement (SLA)",
    items: [
      {
        name: "Response Time SLA",
        starter: "48 Hours",
        growth: "24 Hours",
        scale: "4 Hours Priority",
      },
      {
        name: "Communication Channels",
        starter: "Email & Client Portal",
        growth: "Dedicated Slack Channel",
        scale: "Slack Connect + Direct Phone Line",
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
      "No. All Lumen Loop monthly retainers (Starter at ₹24,999 / $299, Growth at ₹59,999 / $699, Scale at ₹1,49,999 / $1,799) operate on rolling 30-day agreements with a simple 30-day notice period. We believe retention is earned every single month through measurable compounding pipeline, not legal lock-in. For quarterly commitments, you receive a guaranteed 15% discount in exchange for three months of strategic runway.",
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
      "Currency values fluctuate daily, but our clients budget on fixed predictability. We hand-set distinct domestic INR rates (Starter ₹24,999, Growth ₹59,999, Scale ₹1,49,999) and international USD rates (Starter $299, Growth $699, Scale $1,799) to reflect localized economic realities and regulatory compliance without unpredictable currency spikes.",
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
