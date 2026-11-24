export interface CaseStudyMetric {
  label: string;
  value: string;
  delta?: string;
  isMoney?: boolean;
  rawInr?: number;
  rawUsd?: number;
}

export interface CaseStudyChartPoint {
  period: string; // e.g. "Month 1", "Month 3", "Month 6"
  baseline: number;
  achieved: number;
  unit: string;
}

export interface CaseStudyItem {
  slug: string;
  clientName: string; // Fictional sample client
  clientSector: string;
  industry: string;
  serviceCategory: "SEO" | "Paid Ads" | "Social" | "Email & Automation" | "Content" | "Analytics/CRO";
  serviceSlug: string;
  servicesUsed: string[];
  timeline: string;
  headlineResult: string;
  summary: string;
  challenge: {
    overview: string;
    bulletPoints: string[];
  };
  approach: Array<{
    stepNumber: string;
    title: string;
    description: string;
  }>;
  metrics: {
    baseline: {
      m1: CaseStudyMetric;
      m2: CaseStudyMetric;
      m3: CaseStudyMetric;
    };
    achieved: {
      m1: CaseStudyMetric;
      m2: CaseStudyMetric;
      m3: CaseStudyMetric;
    };
    chartData: CaseStudyChartPoint[];
  };
  quote: {
    text: string;
    author: string;
    role: string;
    company: string;
    isSample: true;
  };
  abstractCover: {
    variant: "rings" | "matrix" | "waves" | "conduit" | "radial" | "facets";
    primaryColor: string;
    secondaryColor: string;
  };
  isSample: true;
}

export const caseStudies: CaseStudyItem[] = [
  {
    slug: "aura-consumer-labs",
    clientName: "Aura Consumer Labs",
    clientSector: "D2C Personal Care & Wellness",
    industry: "Consumer Goods",
    serviceCategory: "Paid Ads",
    serviceSlug: "paid-ads",
    servicesUsed: ["Google Ads 360", "Meta Paid Social", "First-Party Attribution", "Creative Rapid Testing"],
    timeline: "90-Day Execution Cycle",
    headlineResult: "4.8x Blended ROAS",
    summary:
      "Restructured customer acquisition across Meta and Google Search with first-party attribution modeling, scaling monthly revenue while cutting customer acquisition cost by 38%.",
    challenge: {
      overview:
        "Aura faced severe ad account volatility following iOS tracking privacy updates. Platform-reported ROAS had degraded from 3.2x to 1.7x, resulting in unprofitable customer acquisition and ad fatigue across cold audiences.",
      bulletPoints: [
        "Ad spend was fragmented across 14 unfocused ad sets without statistical significance.",
        "Over-reliance on platform-reported pixel conversions caused blind bidding.",
        "Creative creative fatigue occurred every 10 days without a structured modular testing engine.",
      ],
    },
    approach: [
      {
        stepNumber: "01",
        title: "Server-Side Attribution Architecture",
        description:
          "Deployed server-side Google Tag Manager and Meta Conversions API (CAPI), recovering 28% of previously unmeasured conversion signals.",
      },
      {
        stepNumber: "02",
        title: "Consolidated Account Restructuring",
        description:
          "Restructured ad accounts into high-liquidity campaigns, feeding the bid algorithm concentrated first-party conversion data.",
      },
      {
        stepNumber: "03",
        title: "High-Velocity Creative Modular Engine",
        description:
          "Introduced a weekly 4-part modular asset sprint (Hook, Problem, Proof, Offer), identifying 3 evergreen winning angles.",
      },
    ],
    metrics: {
      baseline: {
        m1: { label: "Blended ROAS", value: "1.7x" },
        m2: { label: "Monthly Ad Revenue", value: "₹18,50,000", isMoney: true, rawInr: 1850000, rawUsd: 22150 },
        m3: { label: "Blended CAC", value: "₹1,420", isMoney: true, rawInr: 1420, rawUsd: 17 },
      },
      achieved: {
        m1: { label: "Blended ROAS", value: "4.8x", delta: "+182%" },
        m2: { label: "Monthly Ad Revenue", value: "₹54,20,000", delta: "+193%", isMoney: true, rawInr: 5420000, rawUsd: 64910 },
        m3: { label: "Blended CAC", value: "₹880", delta: "-38%", isMoney: true, rawInr: 880, rawUsd: 10.5 },
      },
      chartData: [
        { period: "Month 1", baseline: 1.7, achieved: 2.1, unit: "ROAS" },
        { period: "Month 2", baseline: 1.7, achieved: 3.4, unit: "ROAS" },
        { period: "Month 3", baseline: 1.7, achieved: 4.8, unit: "ROAS" },
      ],
    },
    quote: {
      text: "Lumen Loop turned our paid media from an unpredictable capital drain into our most reliable growth channel. Their first-party data reporting brought total clarity to our board.",
      author: "Vikram Singhania",
      role: "VP of Growth (Sample)",
      company: "Aura Consumer Labs",
      isSample: true,
    },
    abstractCover: {
      variant: "rings",
      primaryColor: "#2563EB",
      secondaryColor: "#C8A25A",
    },
    isSample: true,
  },
  {
    slug: "kavach-cyber-defense",
    clientName: "Kavach Cyber Defense",
    clientSector: "Enterprise Cybersecurity SaaS",
    industry: "B2B Software",
    serviceCategory: "SEO",
    serviceSlug: "seo",
    servicesUsed: ["Technical SEO", "Semantic Keyword Clusters", "Programmatic Internal Graph", "Authority Backlinks"],
    timeline: "6-Month Sprint Cycle",
    headlineResult: "+184% Organic Pipeline",
    summary:
      "Executed technical architecture remediation and buyer-intent keyword clustering that captured top-3 Google rankings for high-intent enterprise security queries.",
    challenge: {
      overview:
        "Despite building a top-tier zero-trust security product, Kavach was invisible on search engines. Global legacy competitors dominated every high-intent commercial query, forcing Kavach into unsustainable B2B Google Ads bidding.",
      bulletPoints: [
        "Massive crawl budget waste caused by 40,000 orphaned faceted URLs.",
        "Core Web Vitals failed completely on mobile due to bloated client-side JavaScript.",
        "Thin content architecture that failed Google's information gain threshold.",
      ],
    },
    approach: [
      {
        stepNumber: "01",
        title: "Technical Foundation & Core Web Vitals",
        description:
          "Purged crawl bloat, pruned low-value URLs, and optimized Largest Contentful Paint (LCP) from 4.8s down to 1.1s.",
      },
      {
        stepNumber: "02",
        title: "Semantic Buyer-Intent Clustering",
        description:
          "Engineered 12 authoritative content hubs mapping technical compliance queries directly to enterprise demo booking pages.",
      },
      {
        stepNumber: "03",
        title: "Tier-1 Technical Authority Building",
        description:
          "Secured authoritative editorial citations from prominent developer portals and cybersecurity publications.",
      },
    ],
    metrics: {
      baseline: {
        m1: { label: "Top 3 Rankings", value: "4 Keywords" },
        m2: { label: "Monthly Organic Demos", value: "18 Demos" },
        m3: { label: "Organic Pipeline", value: "₹45,00,000", isMoney: true, rawInr: 4500000, rawUsd: 53890 },
      },
      achieved: {
        m1: { label: "Top 3 Rankings", value: "48 Keywords", delta: "+1,100%" },
        m2: { label: "Monthly Organic Demos", value: "62 Demos", delta: "+244%" },
        m3: { label: "Organic Pipeline", value: "₹1,28,00,000", delta: "+184%", isMoney: true, rawInr: 12800000, rawUsd: 153290 },
      },
      chartData: [
        { period: "Month 1", baseline: 18, achieved: 22, unit: "Demos" },
        { period: "Month 3", baseline: 18, achieved: 41, unit: "Demos" },
        { period: "Month 6", baseline: 18, achieved: 62, unit: "Demos" },
      ],
    },
    quote: {
      text: "The technical depth Lumen Loop brought to our SEO roadmap was unlike any agency we worked with before. They understand developer-led sales cycles and technical rigor.",
      author: "Rajeshwar Sen",
      role: "Co-Founder & CTO (Sample)",
      company: "Kavach Cyber Defense",
      isSample: true,
    },
    abstractCover: {
      variant: "matrix",
      primaryColor: "#60A5FA",
      secondaryColor: "#C8A25A",
    },
    isSample: true,
  },
  {
    slug: "vedic-botanics",
    clientName: "Vedic Botanics",
    clientSector: "Luxury Ayurvedic Formulations",
    industry: "Health & Beauty",
    serviceCategory: "Email & Automation",
    serviceSlug: "email-automation",
    servicesUsed: ["Klaviyo Flow Architecture", "RFM Cohort Modeling", "WhatsApp API Automation", "VIP Retention Hub"],
    timeline: "120-Day Implementation",
    headlineResult: "38% Repeat LTV Lift",
    summary:
      "Designed behavioral lifecycle flows and predictive replenishment triggers that turned one-time beauty buyers into high-value repeat brand subscribers.",
    challenge: {
      overview:
        "Vedic Botanics was acquiring customers profitably but losing 82% of buyers after their first order. Email consisted solely of manual one-off discount blasts, eroding brand prestige and leaving customer lifetime value untapped.",
      bulletPoints: [
        "Zero automated post-purchase onboarding or educational follow-up.",
        "High churn rates between 30 and 60 days following initial order delivery.",
        "List deliverability issues with emails landing in promotional tabs.",
      ],
    },
    approach: [
      {
        stepNumber: "01",
        title: "Predictive Replenishment Triggers",
        description:
          "Mapped customer consumption cycles to trigger timely refill reminders right as bottles reached 15% remaining capacity.",
      },
      {
        stepNumber: "02",
        title: "Luxury Unboxing Educational Journeys",
        description:
          "Built interactive 7-day post-delivery email routines detailing clinical ingredient efficacy and Ayurvedic rituals.",
      },
      {
        stepNumber: "03",
        title: "VIP Loyalty & WhatsApp Concierge",
        description:
          "Introduced tier-based VIP early access and automated WhatsApp re-order prompts for repeat order cohorts.",
      },
    ],
    metrics: {
      baseline: {
        m1: { label: "CRM Share of Revenue", value: "9.2%" },
        m2: { label: "60-Day Repeat Rate", value: "14.5%" },
        m3: { label: "90-Day Customer LTV", value: "₹2,100", isMoney: true, rawInr: 2100, rawUsd: 25 },
      },
      achieved: {
        m1: { label: "CRM Share of Revenue", value: "34.8%", delta: "+278%" },
        m2: { label: "60-Day Repeat Rate", value: "31.2%", delta: "+115%" },
        m3: { label: "90-Day Customer LTV", value: "₹2,900", delta: "+38%", isMoney: true, rawInr: 2900, rawUsd: 34.7 },
      },
      chartData: [
        { period: "Month 1", baseline: 9.2, achieved: 16.4, unit: "% Share" },
        { period: "Month 2", baseline: 9.2, achieved: 26.8, unit: "% Share" },
        { period: "Month 4", baseline: 9.2, achieved: 34.8, unit: "% Share" },
      ],
    },
    quote: {
      text: "Lumen Loop helped us articulate luxury while building an automated retention machine. Our repeat customer cohort now drives over a third of monthly company revenue.",
      author: "Pooja Kulkarni",
      role: "Brand Director (Sample)",
      company: "Vedic Botanics",
      isSample: true,
    },
    abstractCover: {
      variant: "waves",
      primaryColor: "#C8A25A",
      secondaryColor: "#2563EB",
    },
    isSample: true,
  },
  {
    slug: "zenith-wealth",
    clientName: "Zenith Wealth Systems",
    clientSector: "Digital Wealth & Advisory",
    industry: "FinTech",
    serviceCategory: "Analytics/CRO",
    serviceSlug: "analytics-cro",
    servicesUsed: ["Server-Side GA4", "Full-Funnel CRO Audit", "Landing Page Redesign", "Bayesian A/B Testing"],
    timeline: "90-Day Experimentation Sprints",
    headlineResult: "+42% Checkout Conversion",
    summary:
      "Diagnosed onboarding drop-offs and rebuilt the digital portfolio sign-up experience through 6 iterative multivariate split tests.",
    challenge: {
      overview:
        "Zenith had strong inbound user intent from financial comparison portals but suffered a steep 68% drop-off on step 3 of their investor risk profiling questionnaire, driving up customer acquisition costs.",
      bulletPoints: [
        "Unclear value communication on lengthy 8-step compliance forms.",
        "Mobile viewport friction causing mobile bounce rates over 72%.",
        "Untracked custom onboarding events masking exact drop-off steps.",
      ],
    },
    approach: [
      {
        stepNumber: "01",
        title: "Granular Funnel Event Telemetry",
        description:
          "Instrumented micro-interaction telemetry tracking time-to-complete and validation friction across every input field.",
      },
      {
        stepNumber: "02",
        title: "Progressive Disclosure KYC Overhaul",
        description:
          "Redesigned the onboarding questionnaire into a 3-stage progressive disclosure interface with inline validation.",
      },
      {
        stepNumber: "03",
        title: "Bayesian Significance A/B Testing",
        description:
          "Tested value-reinforcement sidebars and security assurance badges against the legacy onboarding layout.",
      },
    ],
    metrics: {
      baseline: {
        m1: { label: "Onboarding Completion", value: "3.8%" },
        m2: { label: "Mobile Bounce Rate", value: "71.4%" },
        m3: { label: "Cost Per Account Funded", value: "₹3,400", isMoney: true, rawInr: 3400, rawUsd: 40.7 },
      },
      achieved: {
        m1: { label: "Onboarding Completion", value: "5.4%", delta: "+42%" },
        m2: { label: "Mobile Bounce Rate", value: "48.2%", delta: "-32%" },
        m3: { label: "Cost Per Account Funded", value: "₹2,380", delta: "-30%", isMoney: true, rawInr: 2380, rawUsd: 28.5 },
      },
      chartData: [
        { period: "Sprint 1", baseline: 3.8, achieved: 4.1, unit: "% Conv" },
        { period: "Sprint 3", baseline: 3.8, achieved: 4.8, unit: "% Conv" },
        { period: "Sprint 6", baseline: 3.8, achieved: 5.4, unit: "% Conv" },
      ],
    },
    quote: {
      text: "Every percentage point in conversion directly moves our bottom line. Lumen Loop's structured A/B testing transformed our onboarding funnel in less than three months.",
      author: "Anand Raghunath",
      role: "Head of Digital Products (Sample)",
      company: "Zenith Wealth Systems",
      isSample: true,
    },
    abstractCover: {
      variant: "facets",
      primaryColor: "#2563EB",
      secondaryColor: "#93C5FD",
    },
    isSample: true,
  },
  {
    slug: "strata-cloud",
    clientName: "Strata Cloud Infrastructure",
    clientSector: "Developer Cloud Orchestration",
    industry: "Enterprise Technology",
    serviceCategory: "Content",
    serviceSlug: "content",
    servicesUsed: ["Technical Teardowns", "Competitor Comparison Pages", "Developer Editorial Hub", "Ungated Benchmarks"],
    timeline: "5-Month Editorial Sprint",
    headlineResult: "68% Content-Assisted ARR",
    summary:
      "Authored research-backed cloud migration benchmarks and architectural teardowns that established authority with engineering decision-makers.",
    challenge: {
      overview:
        "Strata struggled to connect with senior cloud architects. Generic SEO blog posts attracted low-intent search traffic with high bounce rates and zero influence on enterprise sales cycles.",
      bulletPoints: [
        "Superficial content that failed scrutiny by Principal Systems Engineers.",
        "Missing comparison assets when buyers evaluated alternatives to AWS/GCP.",
        "Zero attribution mapping content consumption to enterprise sales pipeline.",
      ],
    },
    approach: [
      {
        stepNumber: "01",
        title: "Hands-On Technical Architecture Guides",
        description:
          "Collaborated with cloud engineers to produce rigorous benchmark teardowns comparing distributed cache latencies.",
      },
      {
        stepNumber: "02",
        title: "High-Conviction Competitor Alternatives",
        description:
          "Published balanced, unvarnished architectural comparison guides targeting high-ACV migration queries.",
      },
      {
        stepNumber: "03",
        title: "Technical Multi-Touch Attribution",
        description:
          "Implemented first-party attribution tracking content interaction journeys of accounts entering the sales pipeline.",
      },
    ],
    metrics: {
      baseline: {
        m1: { label: "Enterprise Inbound RFPs", value: "3 / mo" },
        m2: { label: "Average Time on Page", value: "1m 12s" },
        m3: { label: "Content-Assisted ARR", value: "₹22,00,000", isMoney: true, rawInr: 2200000, rawUsd: 26350 },
      },
      achieved: {
        m1: { label: "Enterprise Inbound RFPs", value: "11 / mo", delta: "+266%" },
        m2: { label: "Average Time on Page", value: "4m 45s", delta: "+295%" },
        m3: { label: "Content-Assisted ARR", value: "₹37,00,000", delta: "+68%", isMoney: true, rawInr: 3700000, rawUsd: 44310 },
      },
      chartData: [
        { period: "Month 1", baseline: 3, achieved: 4, unit: "RFPs" },
        { period: "Month 3", baseline: 3, achieved: 8, unit: "RFPs" },
        { period: "Month 5", baseline: 3, achieved: 11, unit: "RFPs" },
      ],
    },
    quote: {
      text: "Lumen Loop produces content that developers and CTOs actually respect. They don't write generic marketing copy; they craft engineering authority.",
      author: "Eshaan Verma",
      role: "VP of Enterprise Sales (Sample)",
      company: "Strata Cloud Infrastructure",
      isSample: true,
    },
    abstractCover: {
      variant: "conduit",
      primaryColor: "#60A5FA",
      secondaryColor: "#E8D5A3",
    },
    isSample: true,
  },
  {
    slug: "pulse-mobility",
    clientName: "Pulse EV Urban Mobility",
    clientSector: "Electric Vehicles & Urban Transit",
    industry: "Automotive & Mobility",
    serviceCategory: "Social",
    serviceSlug: "social",
    servicesUsed: ["Founder-Led LinkedIn Narrative", "Short-Form Video Production", "Community Advocates", "Social Listening"],
    timeline: "90-Day Brand Sprint",
    headlineResult: "3.2M Qualified Reach",
    summary:
      "Turned urban mobility technology into compelling short-form video stories and founder thought leadership, generating 2,400 test-drive reservations.",
    challenge: {
      overview:
        "Pulse had launched their second-generation electric scooter but was overshadowed by large legacy conglomerates with multi-crore television advertising budgets.",
      bulletPoints: [
        "Low consumer brand awareness outside early adopter technology communities.",
        "Vanity follower counts that generated zero pre-booking deposits.",
        "Lack of human narrative connecting the battery engineering with daily commuter convenience.",
      ],
    },
    approach: [
      {
        stepNumber: "01",
        title: "Founder Engineering Video Logs",
        description:
          "Produced authentic behind-the-scenes teardowns showing stress testing, battery durability, and software features.",
      },
      {
        stepNumber: "02",
        title: "Commuter Challenge Narrative",
        description:
          "Ran native short-form Reels and Shorts contrasting real rush-hour transit costs in Pune, Mumbai, and Bengaluru.",
      },
      {
        stepNumber: "03",
        title: "Localized Test-Drive Micro-Campaigns",
        description:
          "Paired hyper-targeted social distribution with seamless WhatsApp reservation confirmations.",
      },
    ],
    metrics: {
      baseline: {
        m1: { label: "Monthly Organic Impressions", value: "380K" },
        m2: { label: "Test-Drive Bookings", value: "185 / mo" },
        m3: { label: "Direct Web Inquiries", value: "420 / mo" },
      },
      achieved: {
        m1: { label: "Monthly Organic Impressions", value: "3.2M", delta: "+742%" },
        m2: { label: "Test-Drive Bookings", value: "810 / mo", delta: "+337%" },
        m3: { label: "Direct Web Inquiries", value: "1,640 / mo", delta: "+290%" },
      },
      chartData: [
        { period: "Month 1", baseline: 185, achieved: 320, unit: "Bookings" },
        { period: "Month 2", baseline: 185, achieved: 560, unit: "Bookings" },
        { period: "Month 3", baseline: 185, achieved: 810, unit: "Bookings" },
      ],
    },
    quote: {
      text: "Lumen Loop helped us punch above our weight class. Their narrative video execution made our brand feel modern, authentic, and undeniably credible.",
      author: "Nisha Kapoor",
      role: "Chief Commercial Officer (Sample)",
      company: "Pulse EV Urban Mobility",
      isSample: true,
    },
    abstractCover: {
      variant: "radial",
      primaryColor: "#C8A25A",
      secondaryColor: "#60A5FA",
    },
    isSample: true,
  },
];
