"use client";

import React from "react";
import { siteConfig } from "@/content/site";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { Sparkles, ArrowRight, ExternalLink, TrendingUp, BarChart3 } from "lucide-react";

export default function WorkPage() {
  const sampleCaseStudies = [
    {
      client: "Aura Consumer Labs",
      industry: "D2C Personal Care · Mumbai",
      metric: "4.8x ROAS",
      detail: "Scalable Meta & Google PMax acquisition restructuring with first-party attribution modeling.",
      tag: "Paid Acquisition & CRO",
      tagline: "From volatile ad performance to 120-day compounding CAC stability.",
    },
    {
      client: "Kavach Cyber Defense",
      industry: "Enterprise B2B SaaS · Pune",
      metric: "+210% Pipeline",
      detail: "Technical SEO keyword clustering and comparison guide authority that closed enterprise RFPs.",
      tag: "Organic Search & Content",
      tagline: "Outranking global incumbents across top high-intent security search terms.",
    },
    {
      client: "Vedic Botanics",
      industry: "Luxury Wellness · Bengaluru",
      metric: "38% Repeat LTV",
      detail: "Automated Klaviyo behavioral lifecycle flows and VIP segmentation lifting 90-day repeat frequency.",
      tag: "Retention CRM",
      tagline: "Transforming single-order buyers into loyal brand ambassadors.",
    },
  ];

  return (
    <div className="w-full min-h-screen pt-28 sm:pt-36 pb-20 bg-[#0B0F19] text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#C8A25A] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C8A25A] animate-pulse" />
            <span>Case Snapshots</span>
            <span className="text-white/40">·</span>
            <span>Sample Studies</span>
          </div>

          <h1 className="font-sans text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] mb-5">
            Real Impact. <br />
            <span className="bg-gradient-to-r from-[#FAF9F6] via-[#E8D5A3] to-[#C8A25A] bg-clip-text text-transparent">
              Compounding Evidence.
            </span>
          </h1>

          <p className="font-sans text-base sm:text-lg text-slate-300 leading-relaxed text-balance">
            Explore sample case breakdowns demonstrating how unified search, performance ads,
            and lifecycle CRM systematically compound revenue across Indian and global brands.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {sampleCaseStudies.map((item, idx) => (
            <div
              key={idx}
              className="p-7 rounded-3xl bg-[#0F1422] border border-white/10 flex flex-col justify-between hover:border-white/20 transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-mono text-[#C8A25A] uppercase tracking-wider">
                    {item.tag}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 bg-white/5 px-2 py-0.5 rounded border border-white/10">
                    Sample
                  </span>
                </div>

                <h3 className="font-sans text-xl font-bold text-white mb-1">
                  {item.client}
                </h3>
                <div className="text-xs text-slate-400 font-mono mb-4">
                  {item.industry}
                </div>

                <div className="p-4 rounded-2xl bg-gradient-to-r from-[#2563EB]/15 to-[#C8A25A]/15 border border-[#C8A25A]/30 mb-5">
                  <div className="font-mono text-3xl font-extrabold text-[#C8A25A] mb-1">
                    {item.metric}
                  </div>
                  <div className="text-xs text-slate-300 font-medium">
                    {item.tagline}
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {item.detail}
                </p>
              </div>

              <div className="pt-5 mt-6 border-t border-white/10 flex items-center justify-between">
                <span className="text-[10px] font-mono text-slate-400">
                  Full study available on inquiry
                </span>
                <TransitionLink
                  href="/contact"
                  className="text-xs font-mono text-[#C8A25A] hover:text-[#E8D5A3] flex items-center gap-1 cursor-pointer"
                >
                  <span>Inquire</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </TransitionLink>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-[#131928] to-[#0B0F19] border border-white/10 text-center flex flex-col items-center">
          <h2 className="font-sans text-2xl sm:text-3xl font-bold text-white mb-3">
            Want to see how this applies to your brand?
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm max-w-md mb-6">
            We will review your organic rankings and ad structure to identify compounding revenue opportunities.
          </p>
          <div className="flex gap-4">
            <TransitionLink
              href="/services"
              className="px-6 py-3 rounded-full bg-[#C8A25A] text-[#0B0F19] font-bold text-xs font-mono shadow-md"
            >
              Explore Growth Stack Builder →
            </TransitionLink>
          </div>
        </div>
      </div>
    </div>
  );
}
