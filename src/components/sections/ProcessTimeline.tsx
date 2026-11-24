"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search, Compass, Sliders, PlayCircle, TrendingUp, Sparkles, Star } from "lucide-react";

interface SerpStep {
  rank: number;
  ctr: string;
  monthlyVisits: string;
  pipelineVal: string;
  label: string;
}

const serpSteps: SerpStep[] = [
  { rank: 10, ctr: "1.2%", monthlyVisits: "160", pipelineVal: "₹25,000", label: "Page 1 Bottom" },
  { rank: 7, ctr: "3.4%", monthlyVisits: "450", pipelineVal: "₹70,000", label: "Mid-Page" },
  { rank: 4, ctr: "8.7%", monthlyVisits: "1,150", pipelineVal: "₹1,80,000", label: "Above Fold" },
  { rank: 2, ctr: "18.2%", monthlyVisits: "2,400", pipelineVal: "₹3,80,000", label: "Top Contender" },
  { rank: 1, ctr: "31.6%", monthlyVisits: "4,200", pipelineVal: "₹6,40,000", label: "Category Leader" },
];

const processStages = [
  {
    step: "01",
    title: "Discover & Audit",
    icon: Compass,
    description:
      "We dissect your existing search footprint, paid ad unit economics, and website conversion leaks to establish a baseline.",
    deliverable: "40-Point Growth Diagnostic",
  },
  {
    step: "02",
    title: "Strategize & Architect",
    icon: Sliders,
    description:
      "We build your unified acquisition roadmap: high-intent keyword clusters, creative testing queues, and clean attribution modeling.",
    deliverable: "Full-Funnel Growth Blueprint",
  },
  {
    step: "03",
    title: "Launch & Calibrate",
    icon: PlayCircle,
    description:
      "We launch coordinated campaigns across search, ads, social and email flows. We run rapid weekly cycles to identify winning combinations.",
    deliverable: "Synchronized Campaign Engine",
  },
  {
    step: "04",
    title: "Compound & Scale",
    icon: TrendingUp,
    description:
      "With baseline metrics proven, we systematically reinvest capital into high-ROAS channels and conversion rate optimization sprints.",
    deliverable: "Self-Sustaining Revenue Flywheel",
  },
];

export function ProcessTimeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedRankIdx, setSelectedRankIdx] = useState<number>(4); // Default to #1 rank
  const [hasManualOverride, setHasManualOverride] = useState<boolean>(false);

  // Scroll-linked rank climber
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Under reduced motion: default to final #1 state
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      const timer = setTimeout(() => {
        setSelectedRankIdx(4);
      }, 0);
      return () => clearTimeout(timer);
    }

    const handleScroll = () => {
      if (hasManualOverride) return;
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Calculate progress through section (0 to 1)
      const totalDist = rect.height + viewportHeight;
      const currentDist = viewportHeight - rect.top;
      const progress = Math.max(0, Math.min(1, currentDist / totalDist));

      // Map progress to rank indices 0..4 (#10 -> #7 -> #4 -> #2 -> #1)
      const rankIdx = Math.min(4, Math.floor(progress * 5));
      setSelectedRankIdx(rankIdx);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasManualOverride]);

  const currentSerp = serpSteps[selectedRankIdx];

  const handleRankSelect = (idx: number) => {
    setHasManualOverride(true);
    setSelectedRankIdx(idx);
  };

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative w-full py-24 bg-[#0B0F19] text-[#F8FAFC] border-t border-white/10 overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#C8A25A]/10 blur-[150px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#E8D5A3] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C8A25A]" />
            <span>Methodology</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-bold tracking-tight text-[#F8FAFC]">
            A predictable framework.<br />
            <span className="font-serif italic text-[#C8A25A] font-normal">Compounding returns at every stage.</span>
          </h2>
          <p className="mt-4 text-slate-300 text-base max-w-2xl font-sans leading-relaxed">
            Sustainable growth is not about random viral spikes. It is the result of continuous, disciplined execution across four proven phases.
          </p>
        </div>

        {/* 4-Stage Horizontal Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {processStages.map((stage) => {
            const Icon = stage.icon;
            return (
              <div
                key={stage.step}
                className="relative rounded-3xl p-7 glass-heavy bg-[#131928]/40 hover:bg-[#131928]/70 border border-white/10 hover:border-[#C8A25A]/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-mono text-2xl font-extrabold text-[#C8A25A]">
                      {stage.step}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#60A5FA]">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-xl font-sans font-bold text-white mb-3">
                    {stage.title}
                  </h3>

                  <p className="text-sm text-slate-300 font-sans leading-relaxed mb-6">
                    {stage.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5">
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block mb-1">
                    Key Deliverable
                  </span>
                  <span className="text-xs font-mono font-medium text-[#E8D5A3]">
                    {stage.deliverable}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* THE SIGNATURE FEATURE: SERP Rank Climber Showcase (Scroll-Linked + Manual Override) */}
        <div className="rounded-3xl p-8 sm:p-10 glass-heavy bg-[#131928]/70 border border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Climber Controls & Narrative */}
            <div className="lg:col-span-5 flex flex-col">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-[#C8A25A] mb-3">
                <Sparkles className="w-4 h-4" />
                <span>Scroll-Linked Simulator · Illustrative example</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-sans font-bold text-white mb-3">
                The SERP Rank Climber
              </h3>

              <p className="text-sm text-slate-300 font-sans leading-relaxed mb-6">
                Organic search compounds because click-through rates skyrocket as you climb Google&apos;s first page. Scroll to watch the rank climb automatically, or click any rank for manual simulation.
              </p>

              {/* Rank Selector Buttons */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-mono text-slate-400">
                    Search Ranking Position:
                  </label>
                  {hasManualOverride && (
                    <button
                      onClick={() => setHasManualOverride(false)}
                      className="text-[10px] font-mono text-[#C8A25A] hover:underline cursor-pointer"
                    >
                      Reset to Scroll-Linked
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {serpSteps.map((step, idx) => {
                    const isSelected = selectedRankIdx === idx;
                    return (
                      <button
                        key={step.rank}
                        onClick={() => handleRankSelect(idx)}
                        className={`py-2.5 px-2 rounded-xl text-center font-mono text-xs transition-all duration-200 cursor-pointer ${
                          isSelected
                            ? "bg-gradient-to-r from-[#C8A25A] to-[#E8D5A3] text-slate-950 font-bold shadow-[0_0_20px_rgba(200,162,90,0.4)]"
                            : "bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10"
                        }`}
                      >
                        #{step.rank}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Dynamic Metrics Readout */}
              <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-black/40 border border-white/10">
                <div>
                  <span className="text-[10px] font-mono text-slate-400 block">Est. CTR</span>
                  <span className="text-base sm:text-lg font-mono font-bold text-[#E8D5A3]">
                    {currentSerp.ctr}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-slate-400 block">Mo. Visits</span>
                  <span className="text-base sm:text-lg font-mono font-bold text-[#60A5FA]">
                    {currentSerp.monthlyVisits}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-slate-400 block">Mo. Pipeline</span>
                  <span className="text-base sm:text-lg font-mono font-bold text-white">
                    {currentSerp.pipelineVal}
                  </span>
                </div>
              </div>
              <span className="text-[10px] font-mono text-slate-500 mt-2 block">
                *Illustrative CTR benchmark curves based on aggregated industry click distributions.
              </span>
            </div>

            {/* Right: Simulated Live Google SERP Card */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <div className="p-6 rounded-2xl bg-[#0B0F19] border border-white/15 shadow-2xl relative">
                {/* Simulated Google Search Bar */}
                <div className="flex items-center gap-3 px-4 py-2.5 rounded-full bg-white/5 border border-white/10 text-xs font-sans text-slate-300 mb-6">
                  <Search className="w-3.5 h-3.5 text-[#C8A25A]" />
                  <span className="font-mono text-white">enterprise software growth solutions pune</span>
                  <span className="ml-auto text-[10px] font-mono text-slate-500">Illustrative search</span>
                </div>

                {/* Simulated Result Card */}
                <div className="p-5 rounded-xl bg-white/[0.03] border border-white/10 transition-all duration-300 relative">
                  {/* Floating Rank Badge */}
                  <div className="absolute -top-3 right-4 px-3 py-1 rounded-full bg-[#131928] border border-[#C8A25A] text-[11px] font-mono font-bold text-[#E8D5A3] shadow-md flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C8A25A] animate-pulse" />
                    <span>SERP Position #{currentSerp.rank}</span>
                    <span className="text-[9px] text-slate-400 font-normal">({currentSerp.label})</span>
                  </div>

                  {/* URL Breadcrumb */}
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-1">
                    <span className="w-4 h-4 rounded-full bg-[#2563EB] text-[9px] text-white flex items-center justify-center font-bold">
                      L
                    </span>
                    <span className="text-slate-300">https://www.lumen-client.in</span>
                    <span>›</span>
                    <span className="text-slate-500">solutions</span>
                  </div>

                  {/* Headline Title Link */}
                  <h4 className="text-base sm:text-lg font-sans font-semibold text-[#60A5FA] hover:underline cursor-pointer mb-2">
                    Enterprise Growth & Revenue Architecture | 2026 Guide
                  </h4>

                  {/* Snippet Description */}
                  <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                    Scale qualified organic pipeline with authoritative keyword clustering, Core Web Vitals optimization, and closed-loop attribution models.
                  </p>

                  {/* Rating / Meta line (No exaggerated claims or verified reviews) */}
                  <div className="mt-3 flex items-center gap-4 text-xs font-mono text-[#E8D5A3]">
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-[#C8A25A] text-[#C8A25A]" />
                      <Star className="w-3 h-3 fill-[#C8A25A] text-[#C8A25A]" />
                      <Star className="w-3 h-3 fill-[#C8A25A] text-[#C8A25A]" />
                      <Star className="w-3 h-3 fill-[#C8A25A] text-[#C8A25A]" />
                      <Star className="w-3 h-3 fill-[#C8A25A] text-[#C8A25A]" />
                    </span>
                    <span className="text-slate-500">·</span>
                    <span className="text-slate-400">Pune, India</span>
                    <span className="text-slate-500">·</span>
                    <span className="text-[#60A5FA]">Illustrative example</span>
                  </div>
                </div>

                {/* Real-time Compounding Impact Note */}
                <div className="mt-4 p-3 rounded-xl bg-[#2563EB]/10 border border-[#2563EB]/20 flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-300">
                    Moving from #10 to #{currentSerp.rank} yields a:
                  </span>
                  <span className="font-bold text-[#E8D5A3]">
                    {selectedRankIdx === 0
                      ? "Baseline Position"
                      : `${(parseFloat(currentSerp.ctr) / 1.2).toFixed(1)}x Traffic Multiplier`}
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
