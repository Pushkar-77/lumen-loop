import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "ROI Lab — Lumen Loop",
  description:
    "Model your projected growth. Adjust budget, AOV and channel mix to see illustrative revenue, leads and ROAS estimates — built on transparent benchmark rates, not black-box algorithms.",
  openGraph: {
    title: "ROI Lab — Lumen Loop",
    description:
      "Interactive growth modelling tool. Illustrative projections per channel with a 3D Revenue Skyline. No black-box algorithms.",
    type: "website",
  },
};

export default function RoiLabLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
