"use client";

import React, { useState } from "react";
import { useCurrencyStore } from "@/stores/currency";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { Calculator, Sparkles, TrendingUp, ArrowRight, ShieldCheck } from "lucide-react";

export default function RoiLabPage() {
  const { currency, toggleCurrency } = useCurrencyStore();

  const [monthlySpend, setMonthlySpend] = useState<number>(currency === "INR" ? 300000 : 4000);
  const [targetRoas, setTargetRoas] = useState<number>(4.2);
  const [conversionLiftPct, setConversionLiftPct] = useState<number>(25);

  const projectedRevenue = monthlySpend * targetRoas;
  const projectedCroLift = projectedRevenue * (conversionLiftPct / 100);
  const totalCompoundedReturn = projectedRevenue + projectedCroLift;

  const formatPrice = (val: number) => {
    if (currency === "INR") {
      return `₹${Math.round(val).toLocaleString("en-IN")}`;
    }
    return `$${Math.round(val).toLocaleString("en-US")}`;
  };

  return (
    <div className="w-full min-h-screen pt-28 sm:pt-36 pb-20 bg-[#0B0F19] text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#C8A25A] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C8A25A] animate-pulse" />
            <span>Interactive Modeling</span>
            <span className="text-white/40">·</span>
            <span>Predictive Growth</span>
          </div>

          <h1 className="font-sans text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] mb-5">
            The ROI Lab. <br />
            <span className="bg-gradient-to-r from-[#FAF9F6] via-[#E8D5A3] to-[#C8A25A] bg-clip-text text-transparent">
              Compounding Economics.
            </span>
          </h1>

          <p className="font-sans text-base sm:text-lg text-slate-300 leading-relaxed text-balance">
            Model how multi-channel synergy and conversion rate optimization (CRO) compound your
            media investment over a 90-day execution cycle.
          </p>

          <div className="mt-4">
            <button
              onClick={toggleCurrency}
              className="text-xs font-mono text-slate-400 hover:text-[#C8A25A] cursor-pointer"
            >
              Switch Currency: <span className="text-[#C8A25A] font-bold">{currency}</span> (Click to switch)
            </button>
          </div>
        </div>

        {/* Interactive Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl mx-auto mb-16">
          {/* Controls Left (6 cols) */}
          <div className="lg:col-span-6 p-7 sm:p-8 rounded-3xl bg-[#0F1422] border border-white/10 space-y-6">
            <div className="flex items-center gap-2 text-sm font-mono text-[#C8A25A] font-bold uppercase tracking-wider">
              <Calculator className="w-4 h-4" />
              <span>Model Parameters</span>
            </div>

            {/* Slider 1: Spend */}
            <div>
              <div className="flex justify-between items-baseline mb-2">
                <span className="text-xs font-mono text-slate-300">
                  Monthly Ad / Media Spend:
                </span>
                <span className="font-mono text-base font-bold text-white">
                  {formatPrice(monthlySpend)}
                </span>
              </div>
              <input
                type="range"
                min={currency === "INR" ? 50000 : 1000}
                max={currency === "INR" ? 2500000 : 35000}
                step={currency === "INR" ? 50000 : 500}
                value={monthlySpend}
                onChange={(e) => setMonthlySpend(Number(e.target.value))}
                className="w-full accent-[#C8A25A] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-1">
                <span>{formatPrice(currency === "INR" ? 50000 : 1000)}</span>
                <span>{formatPrice(currency === "INR" ? 2500000 : 35000)}</span>
              </div>
            </div>

            {/* Slider 2: Target ROAS */}
            <div>
              <div className="flex justify-between items-baseline mb-2">
                <span className="text-xs font-mono text-slate-300">
                  Target Blended ROAS:
                </span>
                <span className="font-mono text-base font-bold text-[#C8A25A]">
                  {targetRoas.toFixed(1)}x
                </span>
              </div>
              <input
                type="range"
                min={2.0}
                max={8.0}
                step={0.1}
                value={targetRoas}
                onChange={(e) => setTargetRoas(Number(e.target.value))}
                className="w-full accent-[#C8A25A] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-1">
                <span>2.0x (Foundational)</span>
                <span>8.0x (Hyper-Scaled)</span>
              </div>
            </div>

            {/* Slider 3: CRO Lift */}
            <div>
              <div className="flex justify-between items-baseline mb-2">
                <span className="text-xs font-mono text-slate-300">
                  Expected CRO Conversion Lift:
                </span>
                <span className="font-mono text-base font-bold text-[#60A5FA]">
                  +{conversionLiftPct}%
                </span>
              </div>
              <input
                type="range"
                min={5}
                max={60}
                step={5}
                value={conversionLiftPct}
                onChange={(e) => setConversionLiftPct(Number(e.target.value))}
                className="w-full accent-[#3B82F6] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-1">
                <span>+5% (Baseline)</span>
                <span>+60% (Full Redesign)</span>
              </div>
            </div>

            <div className="text-[11px] font-mono text-slate-400 bg-white/5 p-3 rounded-xl border border-white/5">
              *Model reflects historical compounding rates from unified search and CRO sprints. Figures are illustrative.
            </div>
          </div>

          {/* Results Output Right (6 cols) */}
          <div className="lg:col-span-6 p-7 sm:p-8 rounded-3xl bg-gradient-to-b from-[#162035] via-[#101726] to-[#0D1220] border-2 border-[#C8A25A]/40 flex flex-col justify-between shadow-2xl">
            <div>
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                <span className="text-xs font-mono text-[#E8D5A3] uppercase tracking-wider">
                  Projected Compounding Output
                </span>
                <span className="text-[10px] font-mono text-[#C8A25A] bg-[#C8A25A]/15 px-2 py-0.5 rounded border border-[#C8A25A]/30">
                  Illustrative
                </span>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <span className="text-xs font-mono text-slate-400 block mb-1">
                    Direct Ad Attributed Revenue:
                  </span>
                  <div className="font-mono text-2xl font-bold text-white">
                    {formatPrice(projectedRevenue)}
                  </div>
                </div>

                <div>
                  <span className="text-xs font-mono text-[#60A5FA] block mb-1">
                    Additional CRO & Retention Lift:
                  </span>
                  <div className="font-mono text-2xl font-bold text-[#60A5FA]">
                    +{formatPrice(projectedCroLift)}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <span className="text-xs font-mono text-[#C8A25A] uppercase tracking-wider block mb-1 font-bold">
                    Total Compounded Gross Pipeline:
                  </span>
                  <div className="font-mono text-4xl sm:text-5xl font-extrabold text-[#C8A25A]">
                    {formatPrice(totalCompoundedReturn)}
                  </div>
                  <span className="text-[11px] font-mono text-slate-400 mt-1 block">
                    Per 30-day cycle based on selected inputs
                  </span>
                </div>
              </div>
            </div>

            <TransitionLink
              href="/pricing"
              className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#C8A25A] via-[#E8D5A3] to-[#C8A25A] text-[#0B0F19] font-sans font-bold text-sm tracking-wide shadow-md flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform"
            >
              <span>Match With Growth Retainer</span>
              <ArrowRight className="w-4 h-4" />
            </TransitionLink>
          </div>
        </div>
      </div>
    </div>
  );
}
