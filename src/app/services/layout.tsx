import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Growth Services — Lumen Loop",
  description:
    "Full-funnel digital growth services: Semantic SEO, Paid Acquisition, Social & Community, Email & Lifecycle Automation, Content Strategy, and Analytics & CRO. No markup, no lock-in.",
  openGraph: {
    title: "Growth Services — Lumen Loop",
    description:
      "Six growth disciplines, executed with first-party attribution and zero media markup. Discover which services compound fastest for your brand.",
    type: "website",
  },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
