import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Client Work — Lumen Loop",
  description:
    "Sample case studies across SEO, Paid Ads, Social, Email & Automation, Content, and Analytics/CRO. All results are illustrative and labelled Sample.",
  openGraph: {
    title: "Client Work — Lumen Loop",
    description:
      "Browse illustrative case studies showing before/after growth metrics across six marketing disciplines.",
    type: "website",
  },
};

export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
