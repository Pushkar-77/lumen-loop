"use client";

import React, { useState, useMemo } from "react";
import {
  calculateRoi,
  formatCurrency,
  ROI_BENCHMARKS,
  ROI_DISCLAIMER,
} from "@/lib/roi-engine";
import { useCurrencyStore } from "@/stores/currency";
import { useBriefStore, GrowthStackStages } from "@/stores/brief";
import { RevenueSkyline } from "@/components/three/RevenueSkyline";
import { TransitionLink } from "@/components/ui/TransitionLink";
import {
  ArrowRight,
  Sliders,
  Check,
} from "lucide-react";

export default function RoiLabPage() {
  const { currency, toggleCurrency } = useCurrencyStore();
  const { setGrowthStack, setServices } = useBriefStore();

  // Inputs state
  const isINR = currency === "INR";
  const [monthlyBudget, setMonthlyBudget] = useState<number>(isINR ? 150000 : 2000);
  const [averageOrderValue, setAverageOrderValue] = useState<number>(isINR ? 3500 : 75);
  const [selectedChannels, setSelectedChannels] = useState<string[]>([
    "seo",
    "google-search",
    "meta-ads",
    "email-crm",
  ]);

  // Handle currency toggle input scaling
  const handleToggleCurrency = () => {
    toggleCurrency();
    if (currency === "INR") {
      // Switching to USD
      setMonthlyBudget(2000);
      setAverageOrderValue(75);
    } else {
      // Switching to INR
      setMonthlyBudget(150000);
      setAverageOrderValue(3500);
    }
  };

  const toggleChannel = (id: string) => {
    setSelectedChannels((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Pure, deterministic calculation
  const roiOutput = useMemo(() => {
    return calculateRoi({
      monthlyBudget,
      averageOrderValue,
      selectedChannels,
      currency,
    });
  }, [monthlyBudget, averageOrderValue, selectedChannels, currency]);

  const maxRevenue = useMemo(() => {
    if (roiOutput.channels.length === 0) return 0;
    return Math.max(...roiOutput.channels.map((c) => c.revenue), 1);
  }, [roiOutput.channels]);

  // Send Scenario to Brief Store & Navigate to /contact
  const handleSendToBrief = () => {
    const stack: GrowthStackStages = {
      awareness: roiOutput.channels
        .filter((c) => ["seo", "google-search", "meta-ads"].includes(c.channelId))
        .map((c) => c.channelName),
      consideration: roiOutput.channels
        .filter((c) => ["email-crm"].includes(c.channelId))
        .map((c) => c.channelName),
      conversion: roiOutput.channels
        .filter((c) => ["cro"].includes(c.channelId))
        .map((c) => c.channelName),
    };
    setGrowthStack(stack);
    setServices(roiOutput.channels.map((c) => c.channelName));
  };

  const channelOptions = Object.values(ROI_BENCHMARKS);

  return (
    <div className="w-full min-h-screen pt-28 sm:pt-36 pb-20 bg-[#0B0F19] text-white">
      {/* Background radial lighting */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-[#2563EB]/10 rounded-full blur-[160px]" />
        <div className="absolute top-1/2 right-10 w-[500px] h-[500px] bg-[#C8A25A]/5 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Page Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#C8A25A] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C8A25A] animate-pulse" />
            <span>The ROI Lab</span>
            <span className="text-white/40">·</span>
            <span>Deterministic Scenario Engine</span>
          </div>

          <h1 className="font-sans text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] mb-5">
            Compounding Economics. <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-[#FAF9F6] via-[#E8D5A3] to-[#C8A25A] bg-clip-text text-transparent">
              Not Vanity Projections.
            </span>
          </h1>

          <p className="font-sans text-base sm:text-lg text-slate-300 leading-relaxed text-balance">
            Model how your monthly marketing budget and average order value translate into qualified
            leads, customers, and revenue across unified search, paid ads, and CRM.
          </p>

          {/* Currency Switcher */}
          <div className="mt-6">
            <button
              type="button"
              onClick={handleToggleCurrency}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-slate-300 transition-colors cursor-pointer"
              title="Click to toggle between INR and USD benchmarks"
            >
              <span className="text-slate-400">Benchmarked Currency:</span>
              <span className="font-bold text-[#C8A25A]">{currency}</span>
              <span className="text-[10px] text-slate-400">
                (Click to toggle to {isINR ? "USD" : "INR"})
              </span>
            </button>
          </div>
        </div>

        {/* 2-Column Simulator Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          {/* Controls Column (5 cols) */}
          <div className="lg:col-span-5 p-6 sm:p-7 rounded-3xl bg-[#0F1422] border border-white/10 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2 text-xs font-mono text-[#C8A25A] uppercase tracking-wider font-bold">
                <Sliders className="w-4 h-4" />
                <span>Model Inputs</span>
              </div>
              <span className="text-[10px] font-mono text-slate-400">
                Pure Deterministic
              </span>
            </div>

            {/* Slider 1: Monthly Budget */}
            <div>
              <div className="flex justify-between items-baseline mb-2">
                <span className="text-xs font-mono text-slate-300">
                  Monthly Growth Spend:
                </span>
                <span className="font-mono text-base font-bold text-white">
                  {formatCurrency(monthlyBudget, currency)}
                </span>
              </div>
              <input
                type="range"
                min={isINR ? 25000 : 300}
                max={isINR ? 1000000 : 15000}
                step={isINR ? 25000 : 100}
                value={monthlyBudget}
                onChange={(e) => setMonthlyBudget(Number(e.target.value))}
                className="w-full accent-[#C8A25A] cursor-pointer"
                aria-label="Monthly Growth Spend"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-1">
                <span>{formatCurrency(isINR ? 25000 : 300, currency)}</span>
                <span>{formatCurrency(isINR ? 1000000 : 15000, currency)}</span>
              </div>
            </div>

            {/* Slider 2: Average Order Value (AOV) */}
            <div>
              <div className="flex justify-between items-baseline mb-2">
                <span className="text-xs font-mono text-slate-300">
                  Average Order Value (AOV):
                </span>
                <span className="font-mono text-base font-bold text-[#60A5FA]">
                  {formatCurrency(averageOrderValue, currency)}
                </span>
              </div>
              <input
                type="range"
                min={isINR ? 500 : 10}
                max={isINR ? 50000 : 1000}
                step={isINR ? 500 : 10}
                value={averageOrderValue}
                onChange={(e) => setAverageOrderValue(Number(e.target.value))}
                className="w-full accent-[#3B82F6] cursor-pointer"
                aria-label="Average Order Value"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-1">
                <span>{formatCurrency(isINR ? 500 : 10, currency)}</span>
                <span>{formatCurrency(isINR ? 50000 : 1000, currency)}</span>
              </div>
            </div>

            {/* Channel Selection Chips */}
            <div>
              <span className="text-xs font-mono text-slate-300 uppercase tracking-wider block mb-2.5">
                Active Channels
              </span>
              <div className="space-y-2">
                {channelOptions.map((ch) => {
                  const isChecked = selectedChannels.includes(ch.id);
                  return (
                    <button
                      key={ch.id}
                      type="button"
                      onClick={() => toggleChannel(ch.id)}
                      className={`w-full p-2.5 rounded-xl border text-left text-xs transition-all flex items-center justify-between cursor-pointer ${
                        isChecked
                          ? "bg-[#162035] border-[#3B82F6]/60 text-white"
                          : "bg-white/[0.02] border-white/5 text-slate-400 hover:border-white/15"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span
                          className="w-2.5 h-2.5 rounded-full shrink-0"
                          style={{ backgroundColor: ch.color }}
                        />
                        <span className="font-medium text-xs text-white">
                          {ch.name}
                        </span>
                      </div>
                      <span
                        className={`w-4 h-4 rounded flex items-center justify-center shrink-0 border ${
                          isChecked
                            ? "bg-[#2563EB] border-[#3B82F6] text-white"
                            : "border-white/20 bg-white/5"
                        }`}
                      >
                        {isChecked && <Check className="w-2.5 h-2.5" />}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Send to Brief CTA Button */}
            <div className="pt-2">
              <TransitionLink
                href="/contact"
                onClick={handleSendToBrief}
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#C8A25A] via-[#E8D5A3] to-[#C8A25A] text-[#0B0F19] font-sans font-bold text-sm tracking-wide shadow-md flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform cursor-pointer"
              >
                <span>Send this scenario to my brief</span>
                <ArrowRight className="w-4 h-4" />
              </TransitionLink>
            </div>
          </div>

          {/* 3D Revenue Skyline Stage Column (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {/* Real-time 3D Skyline Stage with Accessible 2D Fallback */}
            <RevenueSkyline
              channels={roiOutput.channels}
              currency={currency}
              maxRevenue={maxRevenue}
            />

            {/* Summary Metrics Bar — grid with gap, tabular nums, wraps on small screens */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-5 rounded-2xl bg-[#0F1422] border border-white/10">
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
                  Total Leads
                </span>
                <div className="font-mono text-lg sm:text-xl font-bold text-white tabular-nums">
                  {roiOutput.totals.totalLeads.toLocaleString()}
                </div>
              </div>

              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
                  Total Customers
                </span>
                <div className="font-mono text-lg sm:text-xl font-bold text-[#60A5FA] tabular-nums">
                  {roiOutput.totals.totalCustomers.toLocaleString()}
                </div>
              </div>

              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
                  Projected Revenue
                </span>
                <div className="font-mono text-lg sm:text-xl font-black text-[#C8A25A] tabular-nums break-all">
                  {formatCurrency(roiOutput.totals.totalRevenue, currency)}
                </div>
              </div>

              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
                  Blended ROAS
                </span>
                <div className="font-mono text-lg sm:text-xl font-bold text-white tabular-nums">
                  {roiOutput.totals.blendedRoas}x
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stacked Lead-Source Distribution Bar */}
        <div className="mb-12 p-6 sm:p-7 rounded-3xl bg-[#0F1422] border border-white/10 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/10">
            <div>
              <span className="text-xs font-mono text-[#C8A25A] uppercase tracking-wider block">
                Acquisition Architecture
              </span>
              <h3 className="font-sans text-lg font-bold text-white">
                Stacked Lead & Revenue Contribution
              </h3>
            </div>
            <span className="text-xs font-mono text-slate-400">
              Total Clicks: {roiOutput.totals.totalClicks.toLocaleString()}
            </span>
          </div>

          {/* Visual Stacked Multi-Channel Bar */}
          <div className="w-full h-5 rounded-full overflow-hidden bg-white/5 flex border border-white/10 p-0.5 gap-0.5">
            {roiOutput.channels.map((ch) => {
              const pct =
                roiOutput.totals.totalRevenue > 0
                  ? (ch.revenue / roiOutput.totals.totalRevenue) * 100
                  : 100 / roiOutput.channels.length;
              return (
                <div
                  key={ch.channelId}
                  title={`${ch.channelName}: ${Math.round(pct)}% of revenue`}
                  className="h-full rounded-sm transition-all duration-500 first:rounded-l-full last:rounded-r-full"
                  style={{
                    width: `${pct}%`,
                    backgroundColor: ch.color,
                  }}
                />
              );
            })}
          </div>

          {/* Channel Legend & Share breakdown */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 pt-2">
            {roiOutput.channels.map((ch) => {
              const share =
                roiOutput.totals.totalRevenue > 0
                  ? Math.round((ch.revenue / roiOutput.totals.totalRevenue) * 100)
                  : 0;
              return (
                <div key={ch.channelId} className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: ch.color }}
                    />
                    <span className="font-medium text-xs text-white truncate">
                      {ch.channelName}
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline font-mono text-[11px]">
                    <span className="text-[#C8A25A] font-bold">{share}% rev</span>
                    <span className="text-slate-400">{ch.leads} leads</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Detailed Channel Breakdown Table */}
        <div className="overflow-x-auto rounded-3xl border border-white/10 bg-[#0F1422] shadow-xl mb-12">
          <table className="w-full text-left border-collapse min-w-[750px]">
            <thead>
              <tr className="border-b border-white/10 bg-[#131928]">
                <th className="py-4 px-6 text-xs font-mono uppercase tracking-wider text-slate-400">
                  Channel
                </th>
                <th className="py-4 px-4 text-xs font-mono uppercase tracking-wider text-slate-300 text-right">
                  Allocated Spend
                </th>
                <th className="py-4 px-4 text-xs font-mono uppercase tracking-wider text-slate-300 text-right">
                  Est. Clicks
                </th>
                <th className="py-4 px-4 text-xs font-mono uppercase tracking-wider text-slate-300 text-right">
                  Est. Leads
                </th>
                <th className="py-4 px-4 text-xs font-mono uppercase tracking-wider text-[#60A5FA] text-right">
                  Customers
                </th>
                <th className="py-4 px-6 text-xs font-mono uppercase tracking-wider text-[#C8A25A] text-right">
                  Gross Revenue
                </th>
                <th className="py-4 px-4 text-xs font-mono uppercase tracking-wider text-slate-300 text-center">
                  ROAS
                </th>
              </tr>
            </thead>
            <tbody>
              {roiOutput.channels.map((ch) => (
                <tr
                  key={ch.channelId}
                  className="border-b border-white/5 hover:bg-white/[0.02] transition-colors"
                >
                  <td className="py-3.5 px-6 text-xs sm:text-sm text-white font-medium flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: ch.color }}
                    />
                    <span>{ch.channelName}</span>
                  </td>
                  <td className="py-3.5 px-4 text-xs font-mono text-slate-300 text-right">
                    {formatCurrency(ch.allocatedBudget, currency)}
                  </td>
                  <td className="py-3.5 px-4 text-xs font-mono text-slate-300 text-right">
                    {ch.clicks.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4 text-xs font-mono text-slate-300 text-right">
                    {ch.leads.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4 text-xs font-mono text-[#60A5FA] font-bold text-right">
                    {ch.customers.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-6 text-xs font-mono text-[#C8A25A] font-bold text-right">
                    {formatCurrency(ch.revenue, currency)}
                  </td>
                  <td className="py-3.5 px-4 text-xs font-mono text-slate-300 text-center">
                    <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10">
                      {ch.roas}x
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Disclaimer Note */}
        <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 text-center text-xs font-mono text-slate-400">
          *{ROI_DISCLAIMER}
        </div>
      </div>
    </div>
  );
}
