"use client";

import React, { useState } from "react";
import { caseStudies } from "@/content/case-studies";
import { CaseStudyCard } from "@/components/work/CaseStudyCard";
import { useCurrencyStore } from "@/stores/currency";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { Sparkles } from "lucide-react";

export default function WorkPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const { currency, toggleCurrency } = useCurrencyStore();

  const categories = [
    "All",
    "SEO",
    "Paid Ads",
    "Social",
    "Email & Automation",
    "Content",
    "Analytics/CRO",
  ];

  const filteredCaseStudies =
    selectedCategory === "All"
      ? caseStudies
      : caseStudies.filter((c) => c.serviceCategory === selectedCategory);

  return (
    <div className="w-full min-h-screen pt-28 sm:pt-36 pb-20 bg-[#0B0F19] text-white">
      {/* Background ambient radial atmosphere */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-[#2563EB]/10 rounded-full blur-[160px]" />
        <div className="absolute top-1/2 right-10 w-[500px] h-[500px] bg-[#C8A25A]/5 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Page Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#C8A25A] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C8A25A] animate-pulse" />
            <span>Sample Case Studies</span>
            <span className="text-white/40">·</span>
            <span>Illustrative Outcomes</span>
          </div>

          <h1 className="font-sans text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] mb-5">
            Measurable Systems. <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-[#FAF9F6] via-[#E8D5A3] to-[#C8A25A] bg-clip-text text-transparent">
              Compounding Proof.
            </span>
          </h1>

          <p className="font-sans text-base sm:text-lg text-slate-300 leading-relaxed text-balance">
            Explore sample case breakdowns demonstrating how unified search, performance ads,
            and lifecycle CRM systematically compound revenue across Indian and global brands.
          </p>

          {/* Currency Toggle */}
          <div className="mt-6">
            <button
              type="button"
              onClick={toggleCurrency}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-slate-300 transition-colors cursor-pointer"
              title="Click to toggle currency between INR and USD"
            >
              <span className="text-slate-400">Currency Mode:</span>
              <span className="font-bold text-[#C8A25A]">{currency}</span>
              <span className="text-[10px] text-slate-400">
                (Click to switch to {currency === "INR" ? "USD" : "INR"})
              </span>
            </button>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-4 mb-10 gap-2 no-scrollbar">
          {categories.map((cat) => {
            const count =
              cat === "All"
                ? caseStudies.length
                : caseStudies.filter((c) => c.serviceCategory === cat).length;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-mono whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${selectedCategory === cat
                    ? "bg-[#C8A25A] text-[#0B0F19] font-bold shadow-lg shadow-[#C8A25A]/20"
                    : "bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10"
                  }`}
              >
                <span>{cat}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${selectedCategory === cat
                      ? "bg-[#0B0F19] text-[#E8D5A3]"
                      : "bg-white/10 text-slate-400"
                    }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* 6 Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-20">
          {filteredCaseStudies.map((cs) => (
            <CaseStudyCard key={cs.slug} caseStudy={cs} />
          ))}
        </div>

        {/* Bottom CTA Band */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-[#131928] to-[#0B0F19] border border-white/10 text-center flex flex-col items-center">
          <div className="w-12 h-12 rounded-2xl bg-[#C8A25A]/10 border border-[#C8A25A]/30 flex items-center justify-center mb-5">
            <Sparkles className="w-6 h-6 text-[#C8A25A]" />
          </div>
          <h2 className="font-sans text-2xl sm:text-3xl font-bold text-white mb-3">
            Want to see how this architecture applies to your brand?
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm max-w-lg mb-8 leading-relaxed">
            Our Pune studio reviews your current search rankings, ad spend efficiency, and
            retention metrics to identify high-leverage compounding opportunities upfront.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <TransitionLink
              href="/services"
              className="px-6 py-3 rounded-full bg-[#C8A25A] hover:bg-[#E8D5A3] text-[#0B0F19] font-sans font-bold text-xs font-mono shadow-md transition-all hover:scale-105"
            >
              Build Custom Growth Stack →
            </TransitionLink>
            <TransitionLink
              href="/contact"
              className="px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 text-white border border-white/15 text-xs font-mono transition-all"
            >
              Request Illustrative Audit
            </TransitionLink>
          </div>
        </div>
      </div>
    </div>
  );
}
