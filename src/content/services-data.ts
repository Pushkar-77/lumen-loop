export interface ServiceItem {
  id: string; // anchor slug (e.g. 'seo', 'paid-ads')
  title: string;
  tag: string;
  category: "Organic Search" | "Paid Acquisition" | "Brand Growth" | "Retention CRM" | "Editorial & Authority" | "Conversion & Data";
  tagline: string;
  description: string;
  deliverables: string[];
  techStack: Array<{ name: string; role: string }>;
  sampleOutcome: {
    metric: string;
    label: string;
    timeframe: string;
  };
  cadence: string;
  funnelStage: "Awareness" | "Consideration" | "Conversion";
  basePriceInr: number; // hand-set monthly allocation in INR
  basePriceUsd: number; // hand-set monthly allocation in USD
}

export const servicesData: ServiceItem[] = [
  {
    id: "seo",
    title: "Search Engine Optimization",
    tag: "Organic Search",
    category: "Organic Search",
    tagline: "Own high-intent search queries that compound without incremental media spend.",
    description:
      "We build resilient technical foundations, semantic content clusters, and authoritative digital references that earn and sustain top Google rankings for high-intent buyer searches.",
    deliverables: [
      "Technical site architecture & Core Web Vitals remediation",
      "Semantic keyword clusters mapped to buyer intent stages",
      "Programmatic internal linking & schema markup graph",
      "High-authority editorial backlink acquisition",
      "Monthly search console telemetry & ranking volatility audits",
    ],
    techStack: [
      { name: "Ahrefs", role: "Competitive Intelligence" },
      { name: "SEMrush", role: "Keyword Clustering" },
      { name: "Screaming Frog", role: "Deep Crawl Auditing" },
      { name: "Google Search Console", role: "First-Party Performance" },
    ],
    sampleOutcome: {
      metric: "+184%",
      label: "Organic Pipeline Growth",
      timeframe: "180-day compounding horizon (Sample)",
    },
    cadence: "Weekly technical sprints · Bi-weekly content deployment · Monthly executive reporting",
    funnelStage: "Awareness",
    basePriceInr: 65000,
    basePriceUsd: 900,
  },
  {
    id: "paid-ads",
    title: "Performance Paid Ads",
    tag: "Paid Acquisition",
    category: "Paid Acquisition",
    tagline: "High-intent customer acquisition calibrated for capital efficiency and profitable ROAS.",
    description:
      "We engineer end-to-end paid acquisition systems across Google Search/Shopping, Meta, YouTube, and LinkedIn. Every dollar is rigorously tied to verified first-party conversion attribution.",
    deliverables: [
      "Multi-platform campaign structure (Google Ads, Meta, LinkedIn)",
      "Ad creative conceptualization, copywriting & dynamic variations",
      "Audience segmentation & first-party custom audience syncing",
      "Daily bid optimization, negative keyword curation & pacing",
      "Blended MER (Marketing Efficiency Ratio) dashboards",
    ],
    techStack: [
      { name: "Google Ads 360", role: "Search & PMax Orchestration" },
      { name: "Meta Ads Manager", role: "Social Demand Gen" },
      { name: "Triple Whale / Northbeam", role: "First-Party Attribution" },
      { name: "Figma", role: "Performance Creative Rapid Testing" },
    ],
    sampleOutcome: {
      metric: "4.6x",
      label: "Blended Return on Ad Spend (ROAS)",
      timeframe: "Scale phase over 90 days (Sample)",
    },
    cadence: "Daily bid management · Weekly creative refresh · Bi-weekly channel reallocation",
    funnelStage: "Awareness",
    basePriceInr: 85000,
    basePriceUsd: 1200,
  },
  {
    id: "social",
    title: "Social Media & Creative",
    tag: "Brand Growth",
    category: "Brand Growth",
    tagline: "Turn attention into brand equity with narrative-led content that commands trust.",
    description:
      "Modern social is not vanity metrics. We produce compelling native video, thought leadership carousels, and founder-led content that establish market authority and build active communities.",
    deliverables: [
      "Narrative brand positioning & monthly editorial calendar",
      "Short-form video production (Reels, Shorts, LinkedIn)",
      "Executive & founder ghostwriting for LinkedIn/Twitter",
      "Active community engagement & proactive social listening",
      "Brand sentiment & organic reach velocity analytics",
    ],
    techStack: [
      { name: "Figma", role: "Visual System & Design System" },
      { name: "Adobe Premiere / CapCut", role: "Short-Form Video Editing" },
      { name: "Buffer / Sprout", role: "Distribution & Scheduling" },
      { name: "Brand24", role: "Sentiment & Mention Tracking" },
    ],
    sampleOutcome: {
      metric: "3.2M+",
      label: "Organic Qualified Impressions",
      timeframe: "Quarterly sprint duration (Sample)",
    },
    cadence: "Bi-weekly video shoots · 4 weekly published assets · Monthly narrative review",
    funnelStage: "Consideration",
    basePriceInr: 60000,
    basePriceUsd: 850,
  },
  {
    id: "email-automation",
    title: "Email & Automation CRM",
    tag: "Retention CRM",
    category: "Retention CRM",
    tagline: "Maximized customer lifetime value through intelligent behavioral lifecycle journeys.",
    description:
      "We design automated email, SMS, and WhatsApp workflows triggered by real customer behaviors. From welcome series to VIP re-engagement, we turn one-time buyers into loyal repeat brand advocates.",
    deliverables: [
      "Full lifecycle flow architecture (Welcome, Browse Abandonment, Winback)",
      "Advanced customer cohort segmentation & RFM modeling",
      "Bespoke responsive email design & modular newsletter templates",
      "Automated transactional & transactional WhatsApp triggers",
      "Deliverability monitoring, inbox placement & SPF/DKIM hardening",
    ],
    techStack: [
      { name: "Klaviyo", role: "Lifecycle Flow Automation" },
      { name: "Customer.io", role: "Behavioral Journey Orchestration" },
      { name: "Postmark", role: "High-Priority Deliverability" },
      { name: "Wati / Interakt", role: "WhatsApp API Messaging" },
    ],
    sampleOutcome: {
      metric: "34%",
      label: "Total Revenue Generated from CRM",
      timeframe: "Sustained baseline after 120 days (Sample)",
    },
    cadence: "Weekly broadcast campaigns · Bi-weekly flow A/B testing · Monthly deliverability audit",
    funnelStage: "Conversion",
    basePriceInr: 55000,
    basePriceUsd: 750,
  },
  {
    id: "content",
    title: "Content Marketing & Authority",
    tag: "Editorial & Authority",
    category: "Editorial & Authority",
    tagline: "In-depth research, comparison guides, and teardowns that buyers read and reference.",
    description:
      "We produce high-conviction editorial content that educates prospects, answers tough technical questions, and systematically eliminates buyer hesitation across the consideration funnel.",
    deliverables: [
      "Comprehensive buyer-intent content roadmap & topic ideation",
      "Deep-dive research papers, industry benchmarks & whitepapers",
      "Product comparison guides & competitor alternative pages",
      "Lead magnet assets & ungated technical teardowns",
      "Distribution repurposing into Twitter threads and LinkedIn posts",
    ],
    techStack: [
      { name: "Notion", role: "Editorial Hub & Asset Repository" },
      { name: "Clearscope / Surfer", role: "Semantic Content Optimization" },
      { name: "Google Docs", role: "Collaborative Review Workflows" },
      { name: "Canva Pro", role: "Editorial Infographics & Charts" },
    ],
    sampleOutcome: {
      metric: "68%",
      label: "Content-Assisted Pipeline Velocity",
      timeframe: "Measured via multi-touch attribution (Sample)",
    },
    cadence: "2 deep-dive guides per month · 4 repurposed short assets · Continuous keyword updates",
    funnelStage: "Consideration",
    basePriceInr: 50000,
    basePriceUsd: 700,
  },
  {
    id: "analytics-cro",
    title: "Analytics & Conversion Rate Optimization",
    tag: "Conversion & Data",
    category: "Conversion & Data",
    tagline: "Turn hard-won traffic into paying clients with statistical experimentation and clean data.",
    description:
      "We audit your conversion funnel, establish server-side tracking, eliminate checkout friction, and run rigorous A/B experiments that mathematically elevate your conversion rate.",
    deliverables: [
      "Server-side GA4, Meta CAPI & Google Ads offline conversion setup",
      "Full-funnel drop-off heatmaps, scroll recordings & friction audits",
      "Hypothesis-driven landing page redesigns & copy overhauls",
      "Statistical A/B multivariate testing with Bayesian significance",
      "Real-time Looker Studio / BigQuery executive performance suite",
    ],
    techStack: [
      { name: "Google Analytics 4", role: "First-Party Behavioral Tracking" },
      { name: "Google Tag Manager Server-Side", role: "Resilient CAPI & Tagging" },
      { name: "Microsoft Clarity", role: "Session Replay & Heatmaps" },
      { name: "BigQuery", role: "Data Warehousing & Custom Attribution" },
    ],
    sampleOutcome: {
      metric: "+42%",
      label: "Storewide Conversion Rate Lift",
      timeframe: "Over 6 validated sprint cycles (Sample)",
    },
    cadence: "Bi-weekly test deployment · Real-time anomaly alerts · Monthly conversion retrospective",
    funnelStage: "Conversion",
    basePriceInr: 70000,
    basePriceUsd: 950,
  },
];

export interface FunnelChannel {
  id: string;
  name: string;
  stage: "awareness" | "consideration" | "conversion";
  description: string;
  impactScore: number; // 1 to 5
  monthlyInr: number;
  monthlyUsd: number;
}

export const funnelChannels: FunnelChannel[] = [
  // Awareness
  {
    id: "seo-foundation",
    name: "Technical SEO & Semantic Search",
    stage: "awareness",
    description: "Capture unbranded search demand with compound indexation.",
    impactScore: 5,
    monthlyInr: 45000,
    monthlyUsd: 600,
  },
  {
    id: "google-search-ads",
    name: "Google Search & Shopping Ads",
    stage: "awareness",
    description: "Capture high-intent in-market prospects at moment of need.",
    impactScore: 5,
    monthlyInr: 55000,
    monthlyUsd: 750,
  },
  {
    id: "meta-video-reach",
    name: "Meta & YouTube Video Reach",
    stage: "awareness",
    description: "Generate cold interest and brand discovery with visual hooks.",
    impactScore: 4,
    monthlyInr: 40000,
    monthlyUsd: 550,
  },
  // Consideration
  {
    id: "retargeting-engine",
    name: "Dynamic Multi-Channel Retargeting",
    stage: "consideration",
    description: "Re-engage site visitors with sequential proof and testimonials.",
    impactScore: 4,
    monthlyInr: 35000,
    monthlyUsd: 500,
  },
  {
    id: "editorial-guides",
    name: "Comparative Guides & Case Studies",
    stage: "consideration",
    description: "Overcome buyer objections with analytical evidence.",
    impactScore: 4,
    monthlyInr: 35000,
    monthlyUsd: 500,
  },
  {
    id: "founder-social",
    name: "Founder & Thought Leadership Social",
    stage: "consideration",
    description: "Build human trust and authority on LinkedIn and Twitter.",
    impactScore: 3,
    monthlyInr: 30000,
    monthlyUsd: 400,
  },
  // Conversion
  {
    id: "cro-landing-pages",
    name: "Landing Page CRO & A/B Testing",
    stage: "conversion",
    description: "Maximize conversion rate per visitor with continuous testing.",
    impactScore: 5,
    monthlyInr: 50000,
    monthlyUsd: 700,
  },
  {
    id: "lifecycle-email-crm",
    name: "Lifecycle Email & SMS Automation",
    stage: "conversion",
    description: "Recover abandoned journeys and drive automated repeat orders.",
    impactScore: 5,
    monthlyInr: 40000,
    monthlyUsd: 550,
  },
  {
    id: "server-side-tracking",
    name: "Server-Side GA4 & Attribution",
    stage: "conversion",
    description: "Accurate tracking bypassing ad-blockers and iOS privacy drop-offs.",
    impactScore: 4,
    monthlyInr: 30000,
    monthlyUsd: 400,
  },
];

export const stackPresets = [
  {
    id: "d2c-growth",
    name: "D2C Velocity Stack",
    tagline: "For modern consumer brands scaling revenue with high repeat purchase rates.",
    channelIds: ["google-search-ads", "meta-video-reach", "retargeting-engine", "cro-landing-pages", "lifecycle-email-crm"],
  },
  {
    id: "b2b-pipeline",
    name: "B2B Demand Engine",
    tagline: "For SaaS & enterprise service firms needing high-ACV qualified opportunities.",
    channelIds: ["seo-foundation", "google-search-ads", "editorial-guides", "founder-social", "cro-landing-pages", "server-side-tracking"],
  },
  {
    id: "organic-compounder",
    name: "Organic Compounder",
    tagline: "Low-media reliance: capture sustainable search authority and lifecycle retention.",
    channelIds: ["seo-foundation", "editorial-guides", "lifecycle-email-crm", "cro-landing-pages"],
  },
];
