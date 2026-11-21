"use client";

import React, { useState, useEffect } from "react";
import { servicesData, ServiceItem } from "@/content/services-data";
import { ServiceCard } from "@/components/services/ServiceCard";
import { GrowthStackBuilder } from "@/components/services/GrowthStackBuilder";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { Sparkles, ArrowRight, CheckCircle2, SlidersHorizontal } from "lucide-react";

export default function ServicesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [highlightedId, setHighlightedId] = useState<string | null>(null);

  // Handle deep-linking anchor scrolling & highlighting
  useEffect(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash.replace("#", "");
      if (hash) {
        setHighlightedId(hash);
        const el = document.getElementById(hash);
        if (el) {
          setTimeout(() => {
            el.scrollIntoView({ behavior: "smooth", block: "center" });
          }, 200);
          setTimeout(() => {
            setHighlightedId(null);
          }, 3000);
        }
      }
    }
  }, []);

  const categories = [
    "All",
    "Organic Search",
    "Paid Acquisition",
    "Brand Growth",
    "Retention CRM",
    "Editorial & Authority",
    "Conversion & Data",
  ];

  const filteredServices =
    selectedCategory === "All"
      ? servicesData
      : servicesData.filter((s) => s.category === selectedCategory);

  return (
    <div className="w-full min-h-screen pt-28 sm:pt-36 pb-20 bg-[#0B0F19] text-white">
      {/* Background radial atmosphere */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[#2563EB]/10 rounded-full blur-[160px]" />
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-[#C8A25A]/5 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Page Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#C8A25A] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C8A25A] animate-pulse" />
            <span>Growth Disciplines</span>
            <span className="text-white/40">·</span>
            <span>Pune Growth Studio</span>
          </div>

          <h1 className="font-sans text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] mb-5">
            Six Disciplines. <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-[#FAF9F6] via-[#E8D5A3] to-[#C8A25A] bg-clip-text text-transparent">
              One Measurable System.
            </span>
          </h1>

          <p className="font-sans text-base sm:text-lg text-slate-300 leading-relaxed text-balance">
            We connect search, paid ads, social and email into one measurable system, so every
            rupee you spend makes the next one work harder. Explore each discipline below or
            design your custom growth stack.
          </p>

          {/* Quick anchor jumps */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            <span className="text-xs font-mono text-slate-400 mr-1">Direct Anchors:</span>
            {servicesData.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  setHighlightedId(s.id);
                  const el = document.getElementById(s.id);
                  if (el) {
                    el.scrollIntoView({ behavior: "smooth", block: "center" });
                    setTimeout(() => setHighlightedId(null), 3000);
                  }
                  window.history.pushState(null, "", `#${s.id}`);
                }}
                className="px-2.5 py-1 rounded-md bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] font-mono text-slate-300 hover:text-[#C8A25A] transition-colors"
              >
                #{s.id}
              </a>
            ))}
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-4 mb-10 gap-2 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-mono whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "bg-[#C8A25A] text-[#0B0F19] font-bold shadow-lg shadow-[#C8A25A]/20"
                  : "bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 6 Services Grid with 3D Tilt & Flip */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-20">
          {filteredServices.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              isHighlighted={highlightedId === service.id}
            />
          ))}
        </div>
      </div>

      {/* Interactive Custom Growth Stack Builder */}
      <GrowthStackBuilder />

      {/* Bottom Conversion Band */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-16 sm:pt-24 text-center">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-[#131928] to-[#0B0F19] border border-white/10 flex flex-col items-center">
          <div className="w-12 h-12 rounded-2xl bg-[#C8A25A]/10 border border-[#C8A25A]/30 flex items-center justify-center mb-5">
            <Sparkles className="w-6 h-6 text-[#C8A25A]" />
          </div>
          <h2 className="font-sans text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight mb-3">
            Ready to build a predictable growth engine?
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mb-8">
            Review transparent monthly retainers with hand-set INR and USD pricing, or submit
            your current site for a complimentary technical audit.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <TransitionLink
              href="/pricing"
              className="px-6 py-3 rounded-full bg-[#C8A25A] hover:bg-[#E8D5A3] text-[#0B0F19] font-sans font-bold text-sm tracking-wide transition-all shadow-[0_4px_20px_rgba(200,162,90,0.3)] hover:scale-105"
            >
              View Transparent Pricing →
            </TransitionLink>
            <TransitionLink
              href="/contact"
              className="px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 text-white border border-white/15 text-sm font-medium transition-all"
            >
              Request Growth Audit
            </TransitionLink>
          </div>
        </div>
      </div>
    </div>
  );
}
