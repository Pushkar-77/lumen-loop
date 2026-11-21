"use client";

import React, { useState } from "react";
import { pricingTiers } from "@/content/pricing-data";
import { PricingCard } from "@/components/pricing/PricingCard";
import { PricingComparison } from "@/components/pricing/PricingComparison";
import { PricingFaq } from "@/components/pricing/PricingFaq";
import { useCurrencyStore } from "@/stores/currency";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { Sparkles, ShieldCheck, ArrowRight } from "lucide-react";

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "quarterly">("monthly");
  const { currency, toggleCurrency } = useCurrencyStore();

  return (
    <div className="w-full min-h-screen pt-28 sm:pt-36 pb-20 bg-[#0B0F19] text-white">
      {/* Background ambient lighting */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[850px] h-[450px] bg-[#2563EB]/10 rounded-full blur-[150px]" />
        <div className="absolute top-1/3 right-10 w-[450px] h-[450px] bg-[#C8A25A]/5 rounded-full blur-[130px]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Page Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#C8A25A] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C8A25A] animate-pulse" />
            <span>Transparent Investment</span>
            <span className="text-white/40">·</span>
            <span>Zero Ad-Spend Markup</span>
          </div>

          <h1 className="font-sans text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] mb-5">
            Predictable Retainers. <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-[#FAF9F6] via-[#E8D5A3] to-[#C8A25A] bg-clip-text text-transparent">
              Compounding Pipeline.
            </span>
          </h1>

          <p className="font-sans text-base sm:text-lg text-slate-300 leading-relaxed text-balance">
            We don't take a percentage of your media spend or hold your ad accounts hostage.
            Choose a dedicated growth retainer with hand-set domestic INR or international USD pricing.
          </p>

          {/* Billing Switch & Currency Reminder */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            {/* Monthly vs Quarterly Pill */}
            <div className="p-1 rounded-full bg-[#131928] border border-white/10 flex items-center">
              <button
                type="button"
                onClick={() => setBillingCycle("monthly")}
                className={`px-5 py-2 rounded-full text-xs font-mono transition-all cursor-pointer ${
                  billingCycle === "monthly"
                    ? "bg-[#C8A25A] text-[#0B0F19] font-bold shadow-md"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Monthly Retainer
              </button>
              <button
                type="button"
                onClick={() => setBillingCycle("quarterly")}
                className={`px-5 py-2 rounded-full text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
                  billingCycle === "quarterly"
                    ? "bg-[#C8A25A] text-[#0B0F19] font-bold shadow-md"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <span>Quarterly</span>
                <span className="px-1.5 py-0.2 rounded-full bg-[#0B0F19] text-[#E8D5A3] text-[10px] font-bold">
                  Save 15%
                </span>
              </button>
            </div>

            {/* Currency switcher pill */}
            <button
              type="button"
              onClick={toggleCurrency}
              className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-slate-300 transition-colors cursor-pointer"
              title="Click to toggle between INR and USD tables"
            >
              <span className="text-slate-400">Currency:</span>
              <span className="font-bold text-[#C8A25A]">{currency}</span>
              <span className="text-[10px] text-slate-400">
                (Click to switch to {currency === "INR" ? "USD" : "INR"})
              </span>
            </button>
          </div>
        </div>

        {/* 3 Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch mb-12">
          {pricingTiers.map((tier) => (
            <PricingCard
              key={tier.id}
              tier={tier}
              billingCycle={billingCycle}
            />
          ))}
        </div>

        {/* Trust & Guarantee Callout */}
        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#C8A25A]/10 border border-[#C8A25A]/30 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-[#C8A25A]" />
            </div>
            <div>
              <div className="font-sans font-bold text-sm text-white">
                100% Account Ownership & Data Sovereignty
              </div>
              <div className="text-xs text-slate-400">
                You retain full admin access to all ad accounts, tracking containers, and creative assets. Zero lock-in.
              </div>
            </div>
          </div>
          <TransitionLink
            href="/contact"
            className="text-xs font-mono text-[#C8A25A] hover:text-[#E8D5A3] flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
          >
            <span>Have custom multi-brand requirements? Talk to us</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </TransitionLink>
        </div>

        {/* Deliverables Comparison Table */}
        <PricingComparison />

        {/* FAQ Accordion */}
        <PricingFaq />

        {/* Final Conversion CTA */}
        <div className="pt-20 text-center">
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-[#131928] to-[#0B0F19] border border-white/10 flex flex-col items-center">
            <h2 className="font-sans text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-3">
              Need a tailored growth audit before selecting a tier?
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm max-w-lg mb-6">
              Our Pune team conducts an illustrative audit of your paid campaigns and search
              visibility before onboarding, so you see exact compounding opportunities upfront.
            </p>
            <TransitionLink
              href="/contact"
              className="px-6 py-3 rounded-full bg-[#C8A25A] hover:bg-[#E8D5A3] text-[#0B0F19] font-sans font-bold text-sm tracking-wide transition-all shadow-[0_4px_20px_rgba(200,162,90,0.3)] hover:scale-105"
            >
              Request Free Growth Audit →
            </TransitionLink>
          </div>
        </div>
      </div>
    </div>
  );
}
