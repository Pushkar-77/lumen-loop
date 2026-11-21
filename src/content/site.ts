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
    email: string;
    phone: string;
    address: string;
    hours: string;
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
    indicativeFxRate: number; // 1 USD in INR (illustrative constant for conversions)
  };
  navLinks: Array<{
    label: string;
    href: string;
  }>;
}

export const siteConfig: SiteConfig = {
  name: "Lumen Loop",
  tagline: "Marketing that compounds, not just clicks.",
  description:
    "Flagship performance marketing & growth architecture for high-growth tech enterprises, D2C disruptors, and ambitious scale-ups.",
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
  contact: {
    email: "growth@lumenloop.in",
    phone: "+91 (020) 6828 4400",
    address: "Tower 4, World Trade Center, Kharadi, Pune, Maharashtra 411014",
    hours: "Mon – Fri: 9:30 AM – 6:30 PM IST",
  },
  socials: {
    twitter: "https://twitter.com/lumenloop",
    linkedin: "https://linkedin.com/company/lumenloop",
    instagram: "https://instagram.com/lumenloop",
    github: "https://github.com/lumenloop",
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
};
