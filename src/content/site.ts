export interface SiteConfig {
  name: string;
  tagline: string;
  description: string;
  location: {
    city: string;
    state: string;
    country: string;
    full: string;
    timezone: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  contact: {
    email: string; // Placeholder contact email
    phone: string; // Placeholder phone number
    address: string;
    hours: string;
    isPlaceholder: true; // Explicitly labelled as placeholder per specification
  };
  socials: {
    twitter: string;
    linkedin: string;
    instagram: string;
    github: string;
  };
  currencies: {
    default: "INR";
    supported: readonly ["INR", "USD"];
    indicativeFxRate: number; // 1 USD in INR (illustrative constant for conversions, no live API)
  };
  navLinks: Array<{
    label: string;
    href: string;
  }>;
  services: Array<{
    title: string;
    slug: string;
    description: string;
    tag: string;
  }>;
}

export const siteConfig: SiteConfig = {
  name: "Lumen Loop",
  tagline: "Marketing that compounds, not just clicks.",
  description:
    "We connect search, paid ads, social and email into one measurable system for ambitious Indian brands, turning every rupee spent into compounding revenue.",
  location: {
    city: "Pune",
    state: "Maharashtra",
    country: "India",
    full: "Pune, Maharashtra, India",
    timezone: "Asia/Kolkata",
    coordinates: {
      lat: 18.5204,
      lng: 73.8567,
    },
  },
  // PLACEHOLDER CONTACT DETAILS (Clearly labelled per specification)
  contact: {
    email: "hello@example.com", // Placeholder
    phone: "+91 00000 00000", // Placeholder
    address: "Studio address (placeholder), Pune",
    hours: "Mon – Fri: 9:30 AM – 6:30 PM IST",
    isPlaceholder: true,
  },
  socials: {
    twitter: "https://twitter.com/example",
    linkedin: "https://linkedin.com/company/example",
    instagram: "https://instagram.com/example",
    github: "https://github.com/example",
  },
  currencies: {
    default: "INR",
    supported: ["INR", "USD"] as const,
    indicativeFxRate: 83.5, // 1 USD ≈ ₹83.50 (indicative benchmark rate, no live API)
  },
  navLinks: [
    { label: "Services", href: "/services" },
    { label: "Work", href: "/work" },
    { label: "ROI Lab", href: "/roi-lab" },
    { label: "Pricing", href: "/pricing" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  services: [
    {
      title: "Search Engine Optimization",
      slug: "seo",
      description: "Technical site architecture, keyword strategy, and authority building that earn top rankings.",
      tag: "Organic Search",
    },
    {
      title: "Performance Paid Ads",
      slug: "paid-ads",
      description: "High-intent search and social campaigns engineered to acquire high-value customers profitably.",
      tag: "Paid Acquisition",
    },
    {
      title: "Social Media & Creative",
      slug: "social",
      description: "Creative testing, authentic content, and community campaigns that build genuine brand loyalty.",
      tag: "Brand Growth",
    },
    {
      title: "Email & Automation",
      slug: "email-automation",
      description: "Lifecycle flows, automated follow-ups, and personalized campaigns that lift customer lifetime value.",
      tag: "Retention CRM",
    },
    {
      title: "Content Marketing",
      slug: "content",
      description: "Research-backed guides, case breakdowns, and editorial content that drive qualified pipeline.",
      tag: "Editorial & Authority",
    },
    {
      title: "Analytics & CRO",
      slug: "analytics-cro",
      description: "Clean tracking, attribution modeling, and conversion rate testing that maximize revenue from every visitor.",
      tag: "Conversion & Data",
    },
  ],
};
