import React from "react";
import dynamic from "next/dynamic";
import { HeroSection } from "@/components/sections/HeroSection";

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Lumen Loop",
  url: "https://lumen-loop-alpha.vercel.app",
  logo: "https://lumen-loop-alpha.vercel.app/favicon.ico",
  description:
    "Independent digital growth studio based in Pune, India. Full-funnel marketing — SEO, Paid Acquisition, Social, Email Automation, Content, Analytics & CRO.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Pune",
    addressRegion: "Maharashtra",
    addressCountry: "IN",
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "Customer Support",
    email: "hello@lumenloop.in",
    availableLanguage: ["English", "Hindi"],
  },
  sameAs: [
    "https://twitter.com/lumenloop",
    "https://linkedin.com/company/lumenloop",
    "https://instagram.com/lumenloop",
  ],
};

// Dynamic import with code-splitting for all below-the-fold sections to optimize mobile LCP & JS payload
const DualMarquee = dynamic(
  () => import("@/components/sections/DualMarquee").then((m) => m.DualMarquee),
  { ssr: true }
);

const FeaturedServices = dynamic(
  () => import("@/components/sections/FeaturedServices").then((m) => m.FeaturedServices),
  { ssr: true }
);

const ProcessTimeline = dynamic(
  () => import("@/components/sections/ProcessTimeline").then((m) => m.ProcessTimeline),
  { ssr: true }
);

const Testimonials = dynamic(
  () => import("@/components/sections/Testimonials").then((m) => m.Testimonials),
  { ssr: true }
);

const FinalCtaBand = dynamic(
  () => import("@/components/sections/FinalCtaBand").then((m) => m.FinalCtaBand),
  { ssr: true }
);

export default function HomePage() {
  return (
    <div className="w-full flex flex-col">
      {/* Organization JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />

      {/* 1. Flagship Hero Section (Directly imported for optimal instant LCP & SEO crawlability) */}
      <HeroSection />

      {/* 2. Dual Infinite Marquee */}
      <DualMarquee />

      {/* 3. Featured Services: 6-Card Quiet Luxury Bento */}
      <FeaturedServices />

      {/* 4. Process Timeline: 4-Stage Methodology + Scroll-Linked SERP Rank Climber */}
      <ProcessTimeline />

      {/* 5. Sample Client Reviews with Interactive Lucide Social Reactions */}
      <Testimonials />

      {/* 6. Final Call to Action Band: Complimentary Growth Audit */}
      <FinalCtaBand />
    </div>
  );
}
