"use client";

import React from "react";
import { PricingTier } from "@/content/pricing-data";
import { useCurrencyStore } from "@/stores/currency";
import { useBriefStore } from "@/stores/brief";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { Check, Sparkles, ArrowRight, ShieldCheck } from "lucide-react";

interface PricingCardProps {
  tier: PricingTier;
  billingCycle: "monthly" | "quarterly";
}

export function PricingCard({ tier, billingCycle }: PricingCardProps) {
  const { currency } = useCurrencyStore();
  const { setSelectedPlan, selectedPlan } = useBriefStore();

  const isCurrentSelection = selectedPlan === tier.name;
  const isQuarterly = billingCycle === "quarterly";

  const priceData = tier.prices[currency];
  const monthlyDisplay = isQuarterly ? priceData.quarterlyPerMonth : priceData.monthly;
  const totalQuarterlyBilled = priceData.quarterlyPerMonth * 3;

  const formatPrice = (val: number) => {
    if (currency === "INR") {
      return `₹${val.toLocaleString("en-IN")}`;
    }
    return `$${val.toLocaleString("en-US")}`;
  };

  const handleSelect = () => {
    setSelectedPlan(tier.name);
  };

  return (
    <div
      className={`relative w-full rounded-3xl p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
        tier.isPopular
          ? "bg-gradient-to-b from-[#162035] via-[#101726] to-[#0B0F19] border-2 border-[#C8A25A] shadow-[0_0_45px_rgba(200,162,90,0.2)] md:-translate-y-2"
          : "bg-[#0F1422] border border-white/10 hover:border-white/20"
      }`}
    >
      {/* Featured / Most Popular Badge */}
      {tier.badge && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <span
            className={`px-3.5 py-1 rounded-full text-[11px] font-mono tracking-wider uppercase font-bold flex items-center gap-1.5 shadow-md ${
              tier.isPopular
                ? "bg-[#C8A25A] text-[#0B0F19]"
                : "bg-white/10 text-slate-300 border border-white/15"
            }`}
          >
            {tier.isPopular && <Sparkles className="w-3 h-3 text-[#0B0F19]" />}
            <span>{tier.badge}</span>
          </span>
        </div>
      )}

      <div>
        {/* Tier Name & Tagline */}
        <div className="mb-6">
          <h3 className="font-sans text-2xl font-bold text-white tracking-tight mb-2">
            {tier.name}
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 min-h-[38px] leading-relaxed">
            {tier.tagline}
          </p>
        </div>

        {/* Pricing Display */}
        <div className="mb-6 pb-6 border-b border-white/10">
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-4xl sm:text-5xl font-black text-white tracking-tight">
              {formatPrice(monthlyDisplay)}
            </span>
            <span className="text-xs sm:text-sm font-mono text-slate-400">
              / month
            </span>
          </div>

          {/* Quarterly savings callout */}
          <div className="mt-2 text-xs font-mono min-h-[20px]">
            {isQuarterly ? (
              <span className="text-[#C8A25A] flex items-center gap-1">
                <span>Save 15% · Billed quarterly ({formatPrice(totalQuarterlyBilled)})</span>
              </span>
            ) : (
              <span className="text-slate-400">
                Rolling 30-day agreement · 30-day notice
              </span>
            )}
          </div>

          <div className="text-[10px] text-slate-400 font-mono mt-1">
            {priceData.billingNotes}
          </div>
        </div>

        {/* Target Audience */}
        <div className="mb-6 p-3 rounded-xl bg-white/5 border border-white/5 text-xs text-slate-300">
          <span className="text-[#C8A25A] font-mono font-bold block mb-1">
            Best Suited For:
          </span>
          {tier.targetAudience}
        </div>

        {/* Deliverables Checklist */}
        <div className="space-y-3 mb-8">
          <span className="text-[11px] font-mono text-[#C8A25A] uppercase tracking-wider block">
            What's Included
          </span>
          {tier.deliverablesSummary.map((item, idx) => (
            <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
              <div
                className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                  tier.isPopular
                    ? "bg-[#C8A25A]/20 text-[#C8A25A] border border-[#C8A25A]/40"
                    : "bg-[#2563EB]/20 text-[#60A5FA] border border-[#3B82F6]/40"
                }`}
              >
                <Check className="w-2.5 h-2.5" />
              </div>
              <span className="leading-snug">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Button */}
      <div>
        <TransitionLink
          href="/contact"
          onClick={handleSelect}
          className={`w-full py-3.5 px-6 rounded-xl font-sans font-bold text-sm tracking-wide flex items-center justify-center gap-2 transition-all cursor-pointer ${
            tier.isPopular
              ? "bg-[#C8A25A] hover:bg-[#E8D5A3] text-[#0B0F19] shadow-[0_4px_25px_rgba(200,162,90,0.35)] hover:scale-[1.02]"
              : "bg-white/10 hover:bg-white/15 text-white border border-white/15 hover:border-white/30"
          }`}
        >
          <span>{isCurrentSelection ? "Plan Pre-selected in Brief" : tier.ctaLabel}</span>
          <ArrowRight className="w-4 h-4" />
        </TransitionLink>
        <span className="block text-center text-[10px] font-mono text-slate-400 mt-2">
          Includes free 7-day onboarding & analytics audit
        </span>
      </div>
    </div>
  );
}
