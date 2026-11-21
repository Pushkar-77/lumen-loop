"use client";

import React, { useEffect, useState, useRef, useSyncExternalStore } from "react";
import { motion } from "framer-motion";
import { usePreloaderStore } from "@/stores/preloader";

const subscribe = () => () => {};

export function Preloader() {
  const isClient = useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );
  const { hasSeenPreloader, isReplaying, markAsSeen } = usePreloaderStore();
  const [progress, setProgress] = useState(0);
  const [isSplitting, setIsSplitting] = useState(false);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isClient) return;

    // Skip if prefers reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      markAsSeen();
      return;
    }

    // Check sessionStorage
    const seen = sessionStorage.getItem("lumen-preloader-seen") === "true";
    if (seen && !isReplaying) {
      markAsSeen();
      return;
    }

    // Run the launch sequence (max 2.2 seconds)
    const startTime = performance.now();
    const duration = 2100; // 2.1s duration

    const update = (now: number) => {
      const elapsed = now - startTime;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);

      if (pct < 100) {
        animationFrameRef.current = requestAnimationFrame(update);
      } else {
        // Trigger split animation
        setIsSplitting(true);
        setTimeout(() => {
          markAsSeen();
        }, 500);
      }
    };

    animationFrameRef.current = requestAnimationFrame(update);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isClient, isReplaying, markAsSeen]);

  const handleSkip = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    setIsSplitting(true);
    setTimeout(() => {
      markAsSeen();
    }, 200);
  };

  if (!isClient || (hasSeenPreloader && !isReplaying)) {
    return null;
  }

  // Calculate stepped metric counters (illustrative)
  const impressions = Math.round((progress / 100) * 1200); // in thousands -> 1.2M
  const clicks = Math.round((progress / 100) * 48); // in thousands -> 48K
  const leads = Math.round((progress / 100) * 2100); // 2,100
  const customers = Math.round((progress / 100) * 312); // 312

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-auto overflow-hidden select-none">
      {/* Left Split Curtain */}
      <motion.div
        animate={isSplitting ? { x: "-100%" } : { x: "0%" }}
        transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
        className="absolute top-0 left-0 w-1/2 h-full bg-[#0B0F19] border-r border-[#C8A25A]/20"
      />

      {/* Right Split Curtain */}
      <motion.div
        animate={isSplitting ? { x: "100%" } : { x: "0%" }}
        transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
        className="absolute top-0 right-0 w-1/2 h-full bg-[#0B0F19] border-l border-[#C8A25A]/20"
      />

      {/* Center Funnel & Sequence Stage */}
      <motion.div
        animate={isSplitting ? { opacity: 0, scale: 0.95 } : { opacity: 1, scale: 1 }}
        transition={{ duration: 0.25 }}
        className="relative z-10 w-full h-full flex flex-col items-center justify-center p-6"
      >
        {/* Top Header Label */}
        <div className="flex items-center gap-2 mb-6">
          <span className="w-2 h-2 rounded-full bg-[#C8A25A] animate-ping" />
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#C8A25A]">
            Campaign Launch Sequence
          </span>
        </div>

        {/* Funnel SVG & Data Counters */}
        <div className="relative w-full max-w-[380px] sm:max-w-[440px] flex flex-col items-center">
          {/* Gold Funnel Outline */}
          <svg
            viewBox="0 0 400 320"
            className="w-full h-auto overflow-visible filter drop-shadow-[0_0_25px_rgba(200,162,90,0.2)]"
            fill="none"
          >
            <defs>
              <linearGradient id="funnelFillGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#2563EB" stopOpacity="0.06" />
                <stop offset="60%" stopColor="#C8A25A" stopOpacity="0.10" />
                <stop offset="100%" stopColor="#C8A25A" stopOpacity="0.22" />
              </linearGradient>
            </defs>

            {/* Inner fill revealing with progress */}
            <path
              d="M 40,30 L 360,30 L 250,220 L 250,300 L 150,300 L 150,220 Z"
              fill="url(#funnelFillGrad)"
              opacity={Math.min(1, progress / 70)}
            />

            {/* Outer Funnel Path */}
            <motion.path
              d="M 40,30 L 360,30 L 250,220 L 250,300 L 150,300 L 150,220 Z"
              stroke="#C8A25A"
              strokeWidth="2"
              strokeDasharray="1000"
              initial={{ strokeDashoffset: 1000 }}
              animate={{ strokeDashoffset: Math.max(0, 1000 - progress * 10) }}
              transition={{ ease: "linear", duration: 0.05 }}
            />

            {/* Stage divider lines */}
            <motion.line
              x1="90"
              y1="95"
              x2="310"
              y2="95"
              stroke="rgba(200, 162, 90, 0.25)"
              strokeDasharray="4 4"
            />
            <motion.line
              x1="140"
              y1="160"
              x2="260"
              y2="160"
              stroke="rgba(200, 162, 90, 0.25)"
              strokeDasharray="4 4"
            />
            <motion.line
              x1="150"
              y1="220"
              x2="250"
              y2="220"
              stroke="rgba(200, 162, 90, 0.25)"
              strokeDasharray="4 4"
            />
          </svg>

          {/* Staggered Funnel Readouts inside the SVG frame */}
          <div className="absolute inset-0 flex flex-col justify-between py-6 px-10 pointer-events-none">
            {/* Stage 1: Impressions */}
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400">01. IMPRESSIONS</span>
              <span className="text-[#F8FAFC] font-semibold text-sm">
                {impressions >= 1000 ? `${(impressions / 1000).toFixed(1)}M` : `${impressions}K`}
              </span>
            </div>

            {/* Stage 2: Clicks */}
            <div className="flex items-center justify-between text-xs font-mono pl-4 pr-4">
              <span className="text-slate-400">02. CLICKS</span>
              <span className="text-[#60A5FA] font-semibold text-sm">{clicks}K</span>
            </div>

            {/* Stage 3: Leads */}
            <div className="flex items-center justify-between text-xs font-mono pl-10 pr-10">
              <span className="text-slate-400">03. LEADS</span>
              <span className="text-[#C8A25A] font-semibold text-sm">{leads.toLocaleString()}</span>
            </div>

            {/* Stage 4: Customers */}
            <div className="flex items-center justify-between text-xs font-mono pl-16 pr-16 pb-2">
              <span className="text-slate-400">04. CUSTOMERS</span>
              <span className="text-[#E8D5A3] font-bold text-sm">{customers}</span>
            </div>
          </div>
        </div>

        {/* Progress Percent & Status Caption */}
        <div className="mt-8 flex flex-col items-center gap-2">
          <div className="font-mono text-3xl sm:text-4xl font-bold tracking-tight text-[#F8FAFC]">
            {progress.toString().padStart(2, "0")}
            <span className="text-[#C8A25A] text-lg">%</span>
          </div>
          <p className="font-mono text-xs text-slate-400 tracking-wide">
            Optimizing your funnel...
          </p>
          <span className="text-[10px] text-slate-500 font-mono tracking-wider uppercase mt-1">
            *Illustrative benchmark sequence
          </span>
        </div>

        {/* Skip button */}
        <button
          onClick={handleSkip}
          className="mt-8 px-4 py-1.5 rounded-full text-xs font-mono text-slate-400 hover:text-[#C8A25A] hover:border-[#C8A25A]/40 border border-white/10 transition-colors cursor-pointer"
          aria-label="Skip preloader animation"
        >
          [ Skip Launch Sequence → ]
        </button>
      </motion.div>
    </div>
  );
}
