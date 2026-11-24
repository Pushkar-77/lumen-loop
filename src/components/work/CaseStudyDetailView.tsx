"use client";

import React from "react";
import { CaseStudyItem, CaseStudyMetric } from "@/content/case-studies";
import { AbstractCover } from "./AbstractCover";
import { useCurrencyStore } from "@/stores/currency";
import { useBriefStore } from "@/stores/brief";
import { TransitionLink } from "@/components/ui/TransitionLink";
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Quote,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface CaseStudyDetailViewProps {
  caseStudy: CaseStudyItem;
  prevCaseStudy: CaseStudyItem;
  nextCaseStudy: CaseStudyItem;
}

export function CaseStudyDetailView({
  caseStudy,
  prevCaseStudy,
  nextCaseStudy,
}: CaseStudyDetailViewProps) {
  const { currency, toggleCurrency } = useCurrencyStore();
  const { addService } = useBriefStore();

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

  const handleRequestSimilarPlan = () => {
    // Add all services used in this case study into the brief store
    caseStudy.servicesUsed.forEach((s) => addService(s));
  };

  // Find max chart value for single-scale normalization
  const maxChartValue = Math.max(
    ...caseStudy.metrics.chartData.map((d) => Math.max(d.baseline, d.achieved)),
    1
  );

  return (
    <div className="w-full min-h-screen pt-28 sm:pt-36 pb-20 bg-[#0B0F19] text-white">
      {/* Background ambient radial atmosphere */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-[#2563EB]/10 rounded-full blur-[160px]" />
        <div className="absolute top-1/2 right-10 w-[500px] h-[500px] bg-[#C8A25A]/5 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Top Breadcrumb & Navigation */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <TransitionLink
            href="/work"
            className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Case Studies</span>
          </TransitionLink>

          {/* Currency Toggle */}
          <button
            type="button"
            onClick={toggleCurrency}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-slate-300 transition-colors cursor-pointer"
            title="Toggle INR / USD currency format"
          >
            <span className="text-slate-400">FX:</span>
            <span className="font-bold text-[#C8A25A]">{currency}</span>
          </button>
        </div>

        {/* Case Study Hero Header */}
        <div className="mb-12">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="text-xs font-mono text-[#C8A25A] uppercase tracking-wider font-semibold">
              {caseStudy.serviceCategory}
            </span>
            <span className="text-white/30">·</span>
            <span className="text-[10px] font-mono text-[#E8D5A3] bg-[#C8A25A]/15 px-2.5 py-0.5 rounded-full border border-[#C8A25A]/30">
              Sample Case Breakdown
            </span>
          </div>

          <h1 className="font-sans text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] mb-4">
            {caseStudy.clientName}
          </h1>

          <p className="font-sans text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            {caseStudy.summary}
          </p>
        </div>

        {/* Hero Abstract Cover Banner */}
        <div className="mb-14">
          <AbstractCover
            variant={caseStudy.abstractCover.variant}
            primaryColor={caseStudy.abstractCover.primaryColor}
            secondaryColor={caseStudy.abstractCover.secondaryColor}
            className="w-full h-56 sm:h-72 lg:h-80 shadow-2xl"
          />
        </div>

        {/* SECTION 1: Snapshot Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 rounded-3xl bg-[#0F1422] border border-white/10 mb-16 shadow-xl">
          <div>
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
              Industry
            </span>
            <div className="font-sans text-sm font-bold text-white">
              {caseStudy.industry}
            </div>
            <div className="text-[11px] text-slate-400 font-mono mt-0.5">
              {caseStudy.clientSector}
            </div>
          </div>

          <div>
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
              Execution Timeline
            </span>
            <div className="font-sans text-sm font-bold text-white">
              {caseStudy.timeline}
            </div>
            <div className="text-[11px] text-slate-400 font-mono mt-0.5">
              Weekly sprint cadence
            </div>
          </div>

          <div>
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
              Headline Outcome
            </span>
            <div className="font-mono text-lg font-extrabold text-[#C8A25A]">
              {caseStudy.headlineResult}
            </div>
            <div className="text-[11px] text-[#60A5FA] font-mono mt-0.5">
              Verified sample metric
            </div>
          </div>

          <div>
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
              Services Deployed
            </span>
            <div className="flex flex-wrap gap-1 mt-1">
              {caseStudy.servicesUsed.map((s, idx) => (
                <span
                  key={idx}
                  className="text-[9px] font-mono text-slate-300 bg-white/5 px-2 py-0.5 rounded border border-white/10"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* SECTION 2: The Challenge */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#0F1422] border border-white/10 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#C8A25A] mb-3">
            <span>01. The Context</span>
          </div>
          <h2 className="font-sans text-2xl sm:text-3xl font-bold text-white tracking-tight mb-4">
            The Challenge
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
            {caseStudy.challenge.overview}
          </p>

          <div className="space-y-3 pt-4 border-t border-white/10">
            <span className="text-xs font-mono text-[#C8A25A] uppercase tracking-wider block">
              Primary Bottlenecks Identified:
            </span>
            {caseStudy.challenge.bulletPoints.map((pt, idx) => (
              <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C8A25A] mt-2 shrink-0" />
                <span>{pt}</span>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 3: The Approach (3 to 4 Steps) */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#0F1422] border border-white/10 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#C8A25A] mb-3">
            <span>02. The Architecture</span>
          </div>
          <h2 className="font-sans text-2xl sm:text-3xl font-bold text-white tracking-tight mb-8">
            The Approach
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {caseStudy.approach.map((step) => (
              <div
                key={step.stepNumber}
                className="p-6 rounded-2xl bg-white/[0.02] border border-white/8 hover:border-white/20 transition-colors flex flex-col justify-between"
              >
                <div>
                  <span className="font-mono text-xl font-bold text-[#C8A25A] block mb-3">
                    {step.stepNumber}
                  </span>
                  <h3 className="font-sans text-base font-bold text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 4: Results & Single-Scale SVG Comparison Chart */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#0F1422] border border-white/10 mb-16 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-white/10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#C8A25A] mb-2">
                <span>03. The Evidence</span>
              </div>
              <h2 className="font-sans text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Empirical Results & Progression
              </h2>
            </div>
            <span className="text-xs font-mono text-slate-400">
              *Illustrative single-scale calibration
            </span>
          </div>

          {/* 3 Metric Cards Comparison */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            {[caseStudy.metrics.achieved.m1, caseStudy.metrics.achieved.m2, caseStudy.metrics.achieved.m3].map(
              (m, idx) => {
                const baselineM = [
                  caseStudy.metrics.baseline.m1,
                  caseStudy.metrics.baseline.m2,
                  caseStudy.metrics.baseline.m3,
                ][idx];
                return (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-gradient-to-b from-[#131928] to-[#0D1220] border border-white/10"
                  >
                    <span className="text-[11px] font-mono text-slate-400 block mb-1">
                      {m.label}
                    </span>
                    <div className="flex items-baseline justify-between mb-2">
                      <span className="font-mono text-2xl font-black text-[#C8A25A]">
                        {formatMetricValue(m)}
                      </span>
                      {m.delta && (
                        <span className="text-xs font-mono font-bold text-[#60A5FA] bg-[#2563EB]/20 px-2 py-0.5 rounded border border-[#3B82F6]/30">
                          {m.delta}
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] font-mono text-slate-400">
                      Baseline: {formatMetricValue(baselineM)}
                    </div>
                  </div>
                );
              }
            )}
          </div>

          {/* Accessible Single-Scale SVG Comparison Chart */}
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/8">
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs font-mono text-slate-300 font-semibold uppercase tracking-wider">
                Progression vs Baseline ({caseStudy.metrics.chartData[0]?.unit})
              </span>
              <div className="flex items-center gap-4 text-xs font-mono">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-sm bg-white/20 border border-white/30" />
                  <span className="text-slate-400">Baseline</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-sm bg-[#C8A25A] shadow-sm" />
                  <span className="text-[#C8A25A] font-bold">Achieved Result</span>
                </div>
              </div>
            </div>

            {/* SVG Chart */}
            <div className="w-full h-48 sm:h-56">
              <svg
                className="w-full h-full overflow-visible"
                viewBox="0 0 600 200"
                preserveAspectRatio="none"
                role="img"
                aria-label={`Comparison chart for ${caseStudy.clientName} showing progression over ${caseStudy.timeline}`}
              >
                {/* Horizontal reference grid lines */}
                {[0.25, 0.5, 0.75, 1.0].map((ratio) => {
                  const y = 180 - ratio * 150;
                  return (
                    <g key={ratio}>
                      <line x1="40" y1={y} x2="580" y2={y} stroke="white" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.15" />
                      <text x="30" y={y + 4} fill="#64748B" fontSize="9" textAnchor="end" fontFamily="monospace">
                        {(maxChartValue * ratio).toFixed(1)}
                      </text>
                    </g>
                  );
                })}

                {/* Bars for each period */}
                {caseStudy.metrics.chartData.map((d, idx) => {
                  const slotWidth = 540 / caseStudy.metrics.chartData.length;
                  const xBase = 60 + idx * slotWidth + slotWidth / 4;
                  const barWidth = 32;

                  const baselineHeight = (d.baseline / maxChartValue) * 150;
                  const achievedHeight = (d.achieved / maxChartValue) * 150;

                  return (
                    <g key={idx}>
                      {/* Baseline Bar */}
                      <rect
                        x={xBase}
                        y={180 - baselineHeight}
                        width={barWidth}
                        height={baselineHeight}
                        rx="4"
                        fill="rgba(255, 255, 255, 0.15)"
                        stroke="rgba(255, 255, 255, 0.25)"
                        strokeWidth="1"
                      />

                      {/* Achieved Bar */}
                      <rect
                        x={xBase + barWidth + 8}
                        y={180 - achievedHeight}
                        width={barWidth}
                        height={achievedHeight}
                        rx="4"
                        fill="#C8A25A"
                        stroke="#E8D5A3"
                        strokeWidth="1"
                      />

                      {/* Period Label */}
                      <text
                        x={xBase + barWidth}
                        y="196"
                        fill="#94A3B8"
                        fontSize="11"
                        textAnchor="middle"
                        fontFamily="monospace"
                      >
                        {d.period}
                      </text>

                      {/* Value label on top of achieved bar */}
                      <text
                        x={xBase + barWidth + 8 + barWidth / 2}
                        y={180 - achievedHeight - 6}
                        fill="#FAF9F6"
                        fontSize="10"
                        fontWeight="bold"
                        textAnchor="middle"
                        fontFamily="monospace"
                      >
                        {d.achieved}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>
        </div>

        {/* SECTION 5: Sample Client Quote */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#162035] via-[#101726] to-[#0D1220] border border-[#C8A25A]/30 mb-16 relative overflow-hidden">
          <Quote className="w-16 h-16 text-[#C8A25A]/15 absolute -top-2 right-6 pointer-events-none" />
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C8A25A]/10 border border-[#C8A25A]/30 text-xs font-mono text-[#E8D5A3] mb-4">
            <span>Sample Client Quote</span>
          </div>

          <blockquote className="font-serif italic text-lg sm:text-xl text-white leading-relaxed mb-6">
            &ldquo;{caseStudy.quote.text}&rdquo;
          </blockquote>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#C8A25A]/20 border border-[#C8A25A]/40 text-[#C8A25A] font-mono font-bold flex items-center justify-center text-sm">
              {caseStudy.quote.author.charAt(0)}
            </div>
            <div>
              <div className="font-sans font-bold text-sm text-white">
                {caseStudy.quote.author}
              </div>
              <div className="text-xs text-slate-400 font-mono">
                {caseStudy.quote.role} · {caseStudy.quote.company}
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 6: Request a Similar Plan */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#0F1422] border border-white/10 mb-16 text-center flex flex-col items-center">
          <div className="w-12 h-12 rounded-2xl bg-[#C8A25A]/10 border border-[#C8A25A]/30 flex items-center justify-center mb-4">
            <Sparkles className="w-6 h-6 text-[#C8A25A]" />
          </div>
          <h2 className="font-sans text-2xl sm:text-3xl font-bold text-white mb-2">
            Want a similar growth engine for your brand?
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm max-w-md mb-6 leading-relaxed">
            Attach the {caseStudy.serviceCategory} roadmap used for {caseStudy.clientName} directly
            to your brief and receive a tailored growth audit within 24 hours.
          </p>

          <TransitionLink
            href="/contact"
            onClick={handleRequestSimilarPlan}
            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#C8A25A] via-[#E8D5A3] to-[#C8A25A] text-[#0B0F19] font-sans font-bold text-xs sm:text-sm tracking-wide shadow-md flex items-center gap-2 hover:scale-[1.02] transition-transform cursor-pointer"
          >
            <span>Request a Similar Plan</span>
            <ArrowRight className="w-4 h-4" />
          </TransitionLink>
        </div>

        {/* SECTION 7: Next / Previous Navigation */}
        <div className="pt-8 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TransitionLink
            href={`/work/${prevCaseStudy.slug}`}
            className="p-5 rounded-2xl bg-white/[0.02] hover:bg-white/5 border border-white/8 hover:border-white/20 transition-all flex items-center gap-3 cursor-pointer group"
          >
            <ChevronLeft className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors shrink-0" />
            <div className="min-w-0">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                Previous Case Study
              </span>
              <span className="font-sans font-bold text-sm text-white truncate block">
                {prevCaseStudy.clientName}
              </span>
            </div>
          </TransitionLink>

          <TransitionLink
            href={`/work/${nextCaseStudy.slug}`}
            className="p-5 rounded-2xl bg-white/[0.02] hover:bg-white/5 border border-white/8 hover:border-white/20 transition-all flex items-center justify-between text-right cursor-pointer group"
          >
            <div className="min-w-0">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                Next Case Study
              </span>
              <span className="font-sans font-bold text-sm text-white truncate block">
                {nextCaseStudy.clientName}
              </span>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors shrink-0 ml-3" />
          </TransitionLink>
        </div>
      </div>
    </div>
  );
}
