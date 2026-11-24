import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Start a Conversation — Lumen Loop",
  description:
    "Tell us about your brand and growth goals. We review every submission personally and respond within 48 hours. No automated sales sequences.",
  openGraph: {
    title: "Start a Conversation — Lumen Loop",
    description:
      "Submit your brief and get a personalised response within 48 hours. No spam, no automated sequences.",
    type: "website",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
