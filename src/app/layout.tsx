import type { Metadata } from "next";
import { fontSans, fontSerif, fontMono } from "@/config/fonts";
import { siteConfig } from "@/content/site";
import { AppProviders } from "@/components/providers/AppProviders";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Preloader } from "@/components/layout/Preloader";
import { TransitionCurtains } from "@/components/layout/TransitionCurtains";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { CustomCursor } from "@/components/fun/CustomCursor";
import { AttentionHeatmap } from "@/components/fun/AttentionHeatmap";
import "./globals.css";

export const metadata: Metadata = {
  title: `${siteConfig.name} — ${siteConfig.tagline}`,
  description: siteConfig.description,
  keywords: [
    "Digital Marketing Agency",
    "Pune Marketing Agency",
    "Performance Marketing",
    "Semantic SEO",
    "Growth Engine",
    "CRO",
    "Lumen Loop",
  ],
  authors: [{ name: "Lumen Loop Team", url: "https://lumenloop.in" }],
  openGraph: {
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    type: "website",
    locale: "en_IN",
    siteName: siteConfig.name,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fontSans.variable} ${fontSerif.variable} ${fontMono.variable} dark`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-[#0B0F19] text-[#F8FAFC] antialiased selection:bg-[#2563EB]/40 selection:text-white relative">
        <AppProviders>
          {/* Top Progress Bar */}
          <ScrollProgress />

          {/* Cinematic Preloader (Session gated) */}
          <Preloader />

          {/* Route Transition Curtains */}
          <TransitionCurtains />

          {/* Interactive Custom Cursor with +1 CTR ripples */}
          <CustomCursor />

          {/* Attention Heatmap Canvas */}
          <AttentionHeatmap />

          {/* Floating Glass Pill Navbar */}
          <Navbar />

          {/* Main Page Content */}
          <main className="relative z-10 flex-grow pt-24 sm:pt-28">{children}</main>

          {/* Footer with Portfolio Controls & Live Pune Time */}
          <Footer />
        </AppProviders>
      </body>
    </html>
  );
}
