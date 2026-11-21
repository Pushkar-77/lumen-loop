"use client";

import React, { useState } from "react";
import { siteConfig } from "@/content/site";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { HeroDiorama } from "@/components/three/HeroDiorama";
import { Rocket, ArrowRight, Sparkles, TrendingUp, BarChart2 } from "lucide-react";
import { useABTestStore } from "@/stores/ab-test";

export function HeroSection() {
  const [isLaunched, setIsLaunched] = useState(false);
  const heroVariant = useABTestStore((s) => s.variant);

  const handleLaunchCampaign = () => {
    setIsLaunched(true);
    setTimeout(() => {
      setIsLaunched(false);
    }, 4500); // 4.5 seconds burst
  };

  // Dynamic A/B CTA Copy wired directly to useABTestStore
  const primaryCtaText =
    heroVariant === "A"
      ? isLaunched
        ? "Campaign Accelerating..."
        : "Launch Campaign"
      : isLaunched
      ? "Engine Running at Scale..."
      : "Test Growth Engine";

  const secondaryCtaText =
    heroVariant === "A" ? "Simulate ROI in 3D" : "Calculate Compound Returns";

  return (
    <section className="relative w-full pt-4 pb-16 lg:py-12 overflow-hidden bg-[#0B0F19] text-[#F8FAFC]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-[#2563EB]/15 via-[#60A5FA]/10 to-[#C8A25A]/15 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        {/* At >=1024px: Two columns (copy left, 3D funnel right). Below 1024px: stacked */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          
          {/* Left Column: Copy & CTAs (col-span-7) */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left z-10">
            {/* Stage Pill / Announcement with visible gold dot & subtle pulse */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full glass-heavy bg-[#131928]/90 border border-white/15 shadow-xl mb-6">
              <span className="relative flex h-2.5 w-2.5 items-center justify-center">
                <span className="animate-ping motion-reduce:hidden absolute inline-flex h-full w-full rounded-full bg-[#C8A25A] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C8A25A] shadow-[0_0_8px_#C8A25A]" />
              </span>
              <span className="font-mono text-xs uppercase tracking-wider text-[#E8D5A3]">
                {siteConfig.location.city} · Full-Funnel Growth Studio
              </span>
            </div>

            {/* Real HTML Headline: balanced with explicit word-spacing and non-breaking spaces */}
            <h1
              style={{ wordSpacing: "0.12em" }}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-sans font-extrabold text-[#F8FAFC] leading-[1.14] select-text [text-wrap:balance] tracking-normal"
            >
              Marketing that{" "}
              <span className="font-serif italic text-[#C8A25A] font-normal underline decoration-[#C8A25A]/30 decoration-2 underline-offset-8">
                compounds
              </span>
              ,<br className="hidden sm:inline" />{" "}
              <span className="inline-block whitespace-nowrap">not&nbsp;just&nbsp;clicks.</span>
            </h1>

            {/* Clean, jargon-free subcopy */}
            <p className="mt-5 text-base sm:text-lg lg:text-xl text-slate-300 max-w-2xl leading-relaxed tracking-normal font-sans">
              {heroVariant === "A" ? (
                <>
                  We&apos;re a Pune growth studio that connects search, ads, social and email into
                  one measurable system, so every rupee you spend makes the next one work harder.
                </>
              ) : (
                <>
                  We connect search, paid ads, social and email into one compounding growth engine
                  for Indian brands — turning every rupee spent into predictable, recurring revenue.
                </>
              )}
            </p>

            {/* Dual CTA Actions: dynamically responds to A/B toggle */}
            <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-4">
              {/* Primary Action: Launch Campaign / Test Engine (Gold when active, sapphire default - NO green) */}
              <button
                onClick={handleLaunchCampaign}
                disabled={isLaunched}
                className={`group relative inline-flex items-center gap-2.5 px-6 sm:px-8 py-3.5 rounded-full font-sans font-semibold text-sm sm:text-base transition-all duration-300 cursor-pointer shadow-xl active:scale-95 ${
                  isLaunched
                    ? "bg-gradient-to-r from-[#C8A25A] via-[#E8D5A3] to-[#C8A25A] text-slate-950 shadow-[0_0_35px_rgba(200,162,90,0.6)] border border-[#E8D5A3]"
                    : "bg-gradient-to-r from-[#2563EB] via-[#1D4ED8] to-[#2563EB] hover:from-[#3B82F6] hover:to-[#1D4ED8] text-white shadow-[0_0_30px_rgba(37,99,235,0.4)] border border-blue-400/40"
                }`}
              >
                <Rocket
                  className={`w-4 h-4 transition-transform duration-300 ${
                    isLaunched ? "rotate-45 text-slate-950" : "text-white group-hover:-translate-y-0.5"
                  }`}
                />
                <span>{primaryCtaText}</span>
                <span
                  className={`text-xs font-mono opacity-80 pl-1 border-l ${
                    isLaunched ? "border-slate-800 text-slate-900" : "border-white/20 text-white"
                  }`}
                >
                  {isLaunched ? "Active" : `Var ${heroVariant}`}
                </span>
              </button>

              {/* Secondary Action: Explore Methodology / ROI Lab */}
              <TransitionLink
                href="/roi-lab"
                className="inline-flex items-center gap-2 px-6 sm:px-7 py-3.5 rounded-full font-sans font-medium text-sm sm:text-base text-slate-200 hover:text-white glass-heavy bg-white/5 hover:bg-white/10 border border-white/15 transition-all duration-200"
              >
                <BarChart2 className="w-4 h-4 text-[#C8A25A]" />
                <span>{secondaryCtaText}</span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1" />
              </TransitionLink>
            </div>

            {/* Trust Benchmark Pill Strip with Illustrative Note Directly Below */}
            <div className="mt-8 flex flex-col items-center lg:items-start gap-2.5">
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 text-xs font-mono text-slate-400">
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                  <TrendingUp className="w-3.5 h-3.5 text-[#C8A25A]" />
                  <span className="text-white font-semibold">3.8x</span>
                  <span>Avg Blended ROAS</span>
                </div>

                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                  <Sparkles className="w-3.5 h-3.5 text-[#C8A25A]" />
                  <span className="text-white font-semibold">₹24.8Cr+</span>
                  <span>Pipeline Driven</span>
                </div>

                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                  <span className="w-2 h-2 rounded-full bg-[#60A5FA]" />
                  <span className="text-white font-semibold">94%</span>
                  <span>Client Retention</span>
                </div>
              </div>

              {/* Note placed DIRECTLY under the stat chips */}
              <p className="text-[10px] text-slate-500 font-mono tracking-wider uppercase text-center lg:text-left">
                *Illustrative figures based on representative growth benchmark models
              </p>
            </div>
          </div>

          {/* Right Column: 3D Funnel Diorama Stage (col-span-5) */}
          <div className="lg:col-span-5 w-full flex items-center justify-center mt-4 lg:mt-0">
            <div className="w-full max-w-lg lg:max-w-none rounded-3xl overflow-hidden glass-heavy bg-[#131928]/50 border border-white/15 p-2 sm:p-3 shadow-[0_25px_60px_rgba(0,0,0,0.6)]">
              <HeroDiorama isLaunched={isLaunched} />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
