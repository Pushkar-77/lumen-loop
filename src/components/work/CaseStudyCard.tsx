"use client";

import React, { useState } from "react";
import { CaseStudyItem, CaseStudyMetric } from "@/content/case-studies";
import { AbstractCover } from "./AbstractCover";
import { useCurrencyStore } from "@/stores/currency";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { ArrowRight, TrendingUp } from "lucide-react";

interface CaseStudyCardProps {
  caseStudy: CaseStudyItem;
}

export function CaseStudyCard({ caseStudy }: CaseStudyCardProps) {
  const [isAfter, setIsAfter] = useState<boolean>(true);
  const { currency } = useCurrencyStore();

  const currentMetrics = isAfter ? caseStudy.metrics.achieved : caseStudy.metrics.baseline;

  // Format currency metrics with Intl.NumberFormat
  const formatMetricValue = (metric: CaseStudyMetric) => {
    if (metric.isMoney && metric.rawInr && metric.rawUsd) {
      if (currency === "INR") {
        return new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "INR",
          maximumFractionDigits: 0,
        }).format(metric.rawInr);
      } else {
        return new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          maximumFractionDigits: 0,
        }).format(metric.rawUsd);
      }
    }
    return metric.value;
  };

  const handleToggle = () => {
    setIsAfter((prev) => !prev);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setIsAfter((prev) => !prev);
    }
  };

  return (
    <div className="w-full rounded-3xl bg-[#0F1422] border border-white/10 hover:border-white/20 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xl group">
      <div>
        {/* Top Abstract Cover */}
        <div className="p-3 pb-0">
          <AbstractCover
            variant={caseStudy.abstractCover.variant}
            primaryColor={caseStudy.abstractCover.primaryColor}
            secondaryColor={caseStudy.abstractCover.secondaryColor}
          />
        </div>

        {/* Card Body */}
        <div className="p-6 sm:p-7">
          {/* Header Row: Category & Sample Badge */}
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="text-[11px] font-mono text-[#C8A25A] uppercase tracking-wider font-semibold">
              {caseStudy.serviceCategory} · {caseStudy.timeline}
            </span>
            <span className="text-[10px] font-mono text-[#E8D5A3] bg-[#C8A25A]/15 px-2.5 py-0.5 rounded-full border border-[#C8A25A]/30">
              Sample Case
            </span>
          </div>

          {/* Client & Industry */}
          <h3 className="font-sans text-xl sm:text-2xl font-bold text-white tracking-tight mb-1 group-hover:text-[#FAF9F6] transition-colors">
            {caseStudy.clientName}
          </h3>
          <p className="text-xs font-mono text-slate-400 mb-4">
            {caseStudy.clientSector}
          </p>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6 line-clamp-2">
            {caseStudy.summary}
          </p>

          {/* Headline Result Callout */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-[#162035] via-[#101726] to-[#0D1220] border border-[#C8A25A]/30 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                  Headline Result
                </span>
                <span className="font-mono text-2xl sm:text-3xl font-extrabold text-[#C8A25A]">
                  {caseStudy.headlineResult}
                </span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-[#C8A25A]/10 border border-[#C8A25A]/30 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-[#C8A25A]" />
              </div>
            </div>
          </div>

          {/* Before / After Interactive Metric Switch */}
          <div className="space-y-3 pt-2 border-t border-white/10">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-slate-300">
                Performance Metrics:
              </span>

              {/* Accessible Switch Toggle */}
              <button
                type="button"
                role="switch"
                aria-checked={isAfter}
                onClick={handleToggle}
                onKeyDown={handleKeyDown}
                className="flex items-center gap-2 p-1 rounded-full bg-[#131928] border border-white/15 focus:outline-none focus:ring-2 focus:ring-[#C8A25A] cursor-pointer"
                aria-label={`Toggle metrics view for ${caseStudy.clientName}. Currently showing ${
                  isAfter ? "achieved results" : "baseline starting metrics"
                }.`}
              >
                <span
                  className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold transition-all ${
                    !isAfter
                      ? "bg-white/15 text-white"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Baseline
                </span>
                <span
                  className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold transition-all ${
                    isAfter
                      ? "bg-[#C8A25A] text-[#0B0F19] shadow-sm"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Achieved
                </span>
              </button>
            </div>

            {/* 3 Metrics Row */}
            <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-white/[0.02] border border-white/5">
              {[currentMetrics.m1, currentMetrics.m2, currentMetrics.m3].map((m, idx) => (
                <div key={idx} className="space-y-1">
                  <span className="text-[10px] font-mono text-slate-400 truncate block">
                    {m.label}
                  </span>
                  <div className="font-mono text-xs sm:text-sm font-bold text-white truncate">
                    {formatMetricValue(m)}
                  </div>
                  {isAfter && m.delta && (
                    <span className="inline-block text-[9px] font-mono font-bold text-[#60A5FA] bg-[#2563EB]/15 px-1.5 py-0.2 rounded border border-[#3B82F6]/30">
                      {m.delta}
                    </span>
                  )}
                  {!isAfter && (
                    <span className="inline-block text-[9px] font-mono text-slate-500">
                      Day 0
                    </span>
                  )}
                </div>
              ))}
            </div>

            <div className="text-[10px] font-mono text-slate-400 text-center">
              *Illustrative figures · Sample benchmark data
            </div>
          </div>
        </div>
      </div>

      {/* Card Footer Link */}
      <div className="p-6 pt-0 sm:p-7 sm:pt-0">
        <TransitionLink
          href={`/work/${caseStudy.slug}`}
          className="w-full py-3 px-5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-xs font-mono text-slate-200 hover:text-white transition-all flex items-center justify-between group-hover:border-[#C8A25A]/40 cursor-pointer"
        >
          <span>Explore Full Case Breakdown</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </TransitionLink>
      </div>
    </div>
  );
}
