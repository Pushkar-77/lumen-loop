import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "About — Lumen Loop",
  description:
    "Lumen Loop is a Pune-based independent growth studio built on four principles: zero ephemeral noise, first-party attribution, a capped client roster, and radical transparency.",
  openGraph: {
    title: "About Lumen Loop",
    description:
      "Studio story, operating principles, approach methodology and the team behind Lumen Loop.",
    type: "website",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
