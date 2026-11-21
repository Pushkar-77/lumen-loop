"use client";

import React, { useState, useMemo } from "react";
import { funnelChannels, stackPresets, FunnelChannel } from "@/content/services-data";
import { useCurrencyStore } from "@/stores/currency";
import { useBriefStore, GrowthStackStages } from "@/stores/brief";
import { TransitionLink } from "@/components/ui/TransitionLink";
import {
  Layers,
  Sparkles,
  ArrowRight,
  Check,
  Plus,
  SlidersHorizontal,
  Flame,
  ShieldCheck,
  TrendingUp,
  RotateCcw,
} from "lucide-react";

export function GrowthStackBuilder() {
  const { currency } = useCurrencyStore();
  const { growthStack, setGrowthStack, setServices } = useBriefStore();

  // Selected channel IDs
  const [selectedIds, setSelectedIds] = useState<string[]>([
    "seo-foundation",
    "google-search-ads",
    "retargeting-engine",
    "cro-landing-pages",
  ]);

  const [activePreset, setActivePreset] = useState<string>("custom");

  // Toggle single channel
  const toggleChannel = (id: string) => {
    setSelectedIds((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      return next;
    });
    setActivePreset("custom");
  };

  // Apply a preset
  const applyPreset = (presetId: string) => {
    const preset = stackPresets.find((p) => p.id === presetId);
    if (preset) {
      setSelectedIds(preset.channelIds);
      setActivePreset(presetId);
    }
  };

  // Reset to default
  const resetStack = () => {
    setSelectedIds(["seo-foundation", "google-search-ads", "cro-landing-pages"]);
    setActivePreset("custom");
  };

  // Filter channels by stage
  const awarenessChannels = useMemo(
    () => funnelChannels.filter((c) => c.stage === "awareness"),
    []
  );
  const considerationChannels = useMemo(
    () => funnelChannels.filter((c) => c.stage === "consideration"),
    []
  );
  const conversionChannels = useMemo(
    () => funnelChannels.filter((c) => c.stage === "conversion"),
    []
  );

  // Calculate pricing & synergy
  const { rawTotal, discountedTotal, synergyDiscountPct } = useMemo(() => {
    const selectedChannels = funnelChannels.filter((c) => selectedIds.includes(c.id));
    const total = selectedChannels.reduce((sum, c) => {
      return sum + (currency === "INR" ? c.monthlyInr : c.monthlyUsd);
    }, 0);

    // Multi-channel synergy discount
    let discountPct = 0;
    if (selectedChannels.length >= 5) {
      discountPct = 15; // 15% multi-channel synergy
    } else if (selectedChannels.length >= 3) {
      discountPct = 10; // 10% multi-channel synergy
    }

    const discounted = Math.round(total * (1 - discountPct / 100));

    return {
      rawTotal: total,
      discountedTotal: discounted,
      synergyDiscountPct: discountPct,
    };
  }, [selectedIds, currency]);

  // Sync to Brief Store on transition
  const handleSaveToBrief = () => {
    const selectedChannels = funnelChannels.filter((c) => selectedIds.includes(c.id));
    const stack: GrowthStackStages = {
      awareness: selectedChannels.filter((c) => c.stage === "awareness").map((c) => c.name),
      consideration: selectedChannels.filter((c) => c.stage === "consideration").map((c) => c.name),
      conversion: selectedChannels.filter((c) => c.stage === "conversion").map((c) => c.name),
    };
    setGrowthStack(stack);
    setServices(selectedChannels.map((c) => c.name));
  };

  const formatPrice = (val: number) => {
    if (currency === "INR") {
      return `₹${val.toLocaleString("en-IN")}`;
    }
    return `$${val.toLocaleString("en-US")}`;
  };

  return (
    <section className="w-full py-16 sm:py-24 border-t border-white/10 bg-[#0B0F19]/90 relative overflow-hidden">
      {/* Background glow accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#2563EB]/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#C8A25A] mb-3">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Interactive Architecture</span>
            </div>
            <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Custom Growth Stack Builder
            </h2>
            <p className="text-slate-300 text-sm sm:text-base max-w-2xl mt-2">
              Select channels across the three growth stages. Our multi-channel architecture
              eliminates silos, compounding every rupee or dollar across search, social, and retention.
            </p>
          </div>

          {/* Preset Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono text-slate-400 mr-1 hidden sm:inline">
              Presets:
            </span>
            {stackPresets.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => applyPreset(preset.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                  activePreset === preset.id
                    ? "bg-[#C8A25A] text-[#0B0F19] font-bold shadow-md"
                    : "bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10"
                }`}
              >
                {preset.name}
              </button>
            ))}
            <button
              type="button"
              onClick={resetStack}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
              title="Reset Stack"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 3-Stage Funnel Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          {/* STAGE 1: Awareness */}
          <div className="p-6 rounded-2xl bg-[#0F1422] border border-white/10 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#3B82F6]/20 border border-[#3B82F6]/40 text-[#60A5FA] font-mono text-xs font-bold flex items-center justify-center">
                    01
                  </span>
                  <h3 className="font-sans text-base font-bold text-white">
                    Awareness & Intent
                  </h3>
                </div>
                <span className="text-[11px] font-mono text-[#60A5FA] bg-[#3B82F6]/10 px-2 py-0.5 rounded border border-[#3B82F6]/30">
                  Top of Funnel
                </span>
              </div>
              <p className="text-xs text-slate-300 mb-4">
                Capture unbranded demand and command high-intent search real estate.
              </p>

              <div className="space-y-3">
                {awarenessChannels.map((channel) => {
                  const isChecked = selectedIds.includes(channel.id);
                  return (
                    <div
                      key={channel.id}
                      onClick={() => toggleChannel(channel.id)}
                      className={`p-3 rounded-xl border transition-all cursor-pointer flex items-start justify-between gap-3 ${
                        isChecked
                          ? "bg-[#2563EB]/15 border-[#3B82F6]/60 shadow-sm"
                          : "bg-white/[0.02] border-white/5 hover:border-white/15"
                      }`}
                    >
                      <div>
                        <div className="font-medium text-xs text-white">
                          {channel.name}
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                          {channel.description}
                        </div>
                        <div className="text-[10px] font-mono text-[#C8A25A] mt-1.5">
                          {currency === "INR"
                            ? `+₹${channel.monthlyInr.toLocaleString("en-IN")}/mo`
                            : `+$${channel.monthlyUsd.toLocaleString("en-US")}/mo`}
                        </div>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 border transition-colors mt-0.5 ${
                          isChecked
                            ? "bg-[#2563EB] border-[#3B82F6] text-white"
                            : "border-white/20 bg-white/5"
                        }`}
                      >
                        {isChecked && <Check className="w-3 h-3" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* STAGE 2: Consideration */}
          <div className="p-6 rounded-2xl bg-[#0F1422] border border-white/10 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#C8A25A]/20 border border-[#C8A25A]/40 text-[#C8A25A] font-mono text-xs font-bold flex items-center justify-center">
                    02
                  </span>
                  <h3 className="font-sans text-base font-bold text-white">
                    Consideration & Trust
                  </h3>
                </div>
                <span className="text-[11px] font-mono text-[#C8A25A] bg-[#C8A25A]/10 px-2 py-0.5 rounded border border-[#C8A25A]/30">
                  Middle of Funnel
                </span>
              </div>
              <p className="text-xs text-slate-300 mb-4">
                Nurture educated prospects with data guides, retargeting and founder proof.
              </p>

              <div className="space-y-3">
                {considerationChannels.map((channel) => {
                  const isChecked = selectedIds.includes(channel.id);
                  return (
                    <div
                      key={channel.id}
                      onClick={() => toggleChannel(channel.id)}
                      className={`p-3 rounded-xl border transition-all cursor-pointer flex items-start justify-between gap-3 ${
                        isChecked
                          ? "bg-[#C8A25A]/15 border-[#C8A25A]/60 shadow-sm"
                          : "bg-white/[0.02] border-white/5 hover:border-white/15"
                      }`}
                    >
                      <div>
                        <div className="font-medium text-xs text-white">
                          {channel.name}
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                          {channel.description}
                        </div>
                        <div className="text-[10px] font-mono text-[#C8A25A] mt-1.5">
                          {currency === "INR"
                            ? `+₹${channel.monthlyInr.toLocaleString("en-IN")}/mo`
                            : `+$${channel.monthlyUsd.toLocaleString("en-US")}/mo`}
                        </div>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 border transition-colors mt-0.5 ${
                          isChecked
                            ? "bg-[#C8A25A] border-[#C8A25A] text-[#0B0F19]"
                            : "border-white/20 bg-white/5"
                        }`}
                      >
                        {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* STAGE 3: Conversion & Retention */}
          <div className="p-6 rounded-2xl bg-[#0F1422] border border-white/10 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#60A5FA]/20 border border-[#60A5FA]/40 text-[#93C5FD] font-mono text-xs font-bold flex items-center justify-center">
                    03
                  </span>
                  <h3 className="font-sans text-base font-bold text-white">
                    Conversion & Retention
                  </h3>
                </div>
                <span className="text-[11px] font-mono text-[#93C5FD] bg-[#60A5FA]/10 px-2 py-0.5 rounded border border-[#60A5FA]/30">
                  Bottom of Funnel
                </span>
              </div>
              <p className="text-xs text-slate-300 mb-4">
                Convert visitors at the checkout, recover drop-offs, and engineer high LTV.
              </p>

              <div className="space-y-3">
                {conversionChannels.map((channel) => {
                  const isChecked = selectedIds.includes(channel.id);
                  return (
                    <div
                      key={channel.id}
                      onClick={() => toggleChannel(channel.id)}
                      className={`p-3 rounded-xl border transition-all cursor-pointer flex items-start justify-between gap-3 ${
                        isChecked
                          ? "bg-[#3B82F6]/20 border-[#60A5FA]/60 shadow-sm"
                          : "bg-white/[0.02] border-white/5 hover:border-white/15"
                      }`}
                    >
                      <div>
                        <div className="font-medium text-xs text-white">
                          {channel.name}
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                          {channel.description}
                        </div>
                        <div className="text-[10px] font-mono text-[#C8A25A] mt-1.5">
                          {currency === "INR"
                            ? `+₹${channel.monthlyInr.toLocaleString("en-IN")}/mo`
                            : `+$${channel.monthlyUsd.toLocaleString("en-US")}/mo`}
                        </div>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 border transition-colors mt-0.5 ${
                          isChecked
                            ? "bg-[#3B82F6] border-[#60A5FA] text-white"
                            : "border-white/20 bg-white/5"
                        }`}
                      >
                        {isChecked && <Check className="w-3 h-3" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Live Calculation & CTA Bar */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#131928] via-[#101626] to-[#0D1220] border border-[#C8A25A]/40 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* Left stats */}
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                Selected Channels:
              </span>
              <span className="font-mono text-sm font-bold text-white px-2.5 py-0.5 rounded-full bg-white/10 border border-white/15">
                {selectedIds.length} Active Channels
              </span>

              {synergyDiscountPct > 0 && (
                <span className="text-xs font-mono text-[#C8A25A] bg-[#C8A25A]/15 px-2.5 py-0.5 rounded-full border border-[#C8A25A]/30 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  <span>{synergyDiscountPct}% Multi-Channel Synergy Discount</span>
                </span>
              )}
            </div>

            <div className="flex items-baseline gap-3">
              <span className="font-mono text-3xl sm:text-4xl font-black text-white tracking-tight">
                {formatPrice(discountedTotal)}
              </span>
              {synergyDiscountPct > 0 && (
                <span className="font-mono text-sm text-slate-400 line-through">
                  {formatPrice(rawTotal)}
                </span>
              )}
              <span className="text-xs text-slate-400 font-mono">/ month retainer</span>
            </div>

            <p className="text-xs text-slate-400 font-mono">
              *Illustrative projection: 3.8x – 5.2x blended ROAS with 90–120 day compounding horizon.
            </p>
          </div>

          {/* Right Action Button */}
          <div className="w-full md:w-auto">
            <TransitionLink
              href="/contact"
              onClick={handleSaveToBrief}
              className="w-full md:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#C8A25A] via-[#E8D5A3] to-[#C8A25A] text-[#0B0F19] font-sans font-bold text-sm tracking-wide shadow-[0_4px_25px_rgba(200,162,90,0.35)] hover:shadow-[0_4px_35px_rgba(200,162,90,0.55)] transition-all transform hover:-translate-y-0.5"
            >
              <span>Attach Stack to Growth Brief</span>
              <ArrowRight className="w-4 h-4" />
            </TransitionLink>
          </div>
        </div>
      </div>
    </section>
  );
}
