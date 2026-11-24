import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Pricing — Lumen Loop",
  description:
    "Transparent, hand-set retainer pricing. Starter ₹24,999 / $299 · Growth ₹59,999 / $699 · Scale ₹1,49,999 / $1,799 per month. 15% quarterly discount. No hidden markups.",
  openGraph: {
    title: "Pricing — Lumen Loop",
    description:
      "Three-tier growth retainers with hand-set INR and USD pricing. No lock-in, no markup, no vanity guarantees.",
    type: "website",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Are retainers bound by long-term contracts?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. All Lumen Loop monthly retainers operate on rolling 30-day agreements with a 30-day notice period. Quarterly commitments receive a 15% discount.",
      },
    },
    {
      "@type": "Question",
      name: "Are media and ad spend budgets included in the retainer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Retainers cover agency strategy, creative production, campaign management, technical SEO, and CRO. You pay ad networks directly through your own ad accounts.",
      },
    },
    {
      "@type": "Question",
      name: "Why do you use hand-set INR and USD pricing?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We hand-set distinct domestic INR rates (Starter ₹24,999, Growth ₹59,999, Scale ₹1,49,999) and international USD rates (Starter $299, Growth $699, Scale $1,799) to reflect localized economic realities without unpredictable currency spikes.",
      },
    },
    {
      "@type": "Question",
      name: "How quickly do we see measurable business traction?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Paid acquisition and CRO campaigns show efficiency trends within 14–21 days. Organic SEO and email CRM compound between 60–120 days.",
      },
    },
    {
      "@type": "Question",
      name: "Do you offer guaranteed ROAS or #1 search rankings?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. We caution against any agency that promises guaranteed vanity outcomes. We guarantee statistical rigor: validated attribution, first-party data tracking, rapid creative testing, and transparent weekly reporting.",
      },
    },
  ],
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {children}
    </>
  );
}
