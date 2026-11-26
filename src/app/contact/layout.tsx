import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Get Your Free Growth Plan — Lumen Loop",
  description:
    "Request a free illustrative growth plan for your business. Receive 3 channel opportunities, recommended channel mix, a 90-day roadmap with illustrative targets, and a reply within 24 business hours.",
  openGraph: {
    title: "Get Your Free Growth Plan — Lumen Loop",
    description:
      "Share your brand and goals for an illustrative growth plan within 24 business hours. No automated sales sequences.",
    type: "website",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
