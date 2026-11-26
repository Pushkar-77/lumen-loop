"use client";

import React, { useState, useEffect } from "react";
import { siteConfig } from "@/content/site";
import { formatTelHref } from "@/lib/utils";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { usePreloaderStore } from "@/stores/preloader";
import { useDelightStore } from "@/stores/delight";
import { useHeatmapStore } from "@/stores/heatmap";
import { useABTestStore } from "@/stores/ab-test";
import {
  RotateCcw,
  Sparkles,
  Flame,
  Split,
  MapPin,
  Clock,
  ShieldCheck,
  Check,
  ArrowUpRight,
} from "lucide-react";

export function Footer() {
  const replayPreloader = usePreloaderStore((s) => s.replay);
  const { reduceDelight, toggleReduceDelight } = useDelightStore();
  const { isHeatmapActive, toggleHeatmap } = useHeatmapStore();
  const { variant, toggleVariant } = useABTestStore();

  const [puneTime, setPuneTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      setPuneTime(new Intl.DateTimeFormat("en-IN", options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="w-full bg-[#0B0F19] border-t border-white/10 text-slate-300 pt-16 pb-12 px-6 sm:px-10 lg:px-16 mt-20 relative z-20">
      <div className="max-w-7xl mx-auto">
        {/* Top Grid: Brand & Directory */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-white/10">
          {/* Brand Column */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#2563EB] to-[#C8A25A] p-[1.5px] flex items-center justify-center">
                <div className="w-full h-full rounded-full bg-[#0B0F19] flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-[#C8A25A]" />
                </div>
              </div>
              <span className="font-sans font-bold text-xl text-[#F8FAFC]">
                {siteConfig.name}
              </span>
            </div>

            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              {siteConfig.tagline} {siteConfig.description}
            </p>

            {/* Pune Location & Live Clock */}
            <div className="mt-2 flex flex-col gap-1.5 font-mono text-xs text-slate-400">
              <div className="flex items-center gap-2 text-[#E8D5A3]">
                <MapPin className="w-3.5 h-3.5 text-[#C8A25A]" />
                <span>{siteConfig.location.full}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-blue-400" />
                <span>Pune IST (UTC+5:30): {puneTime || "Loading..."}</span>
              </div>
            </div>
          </div>

          {/* Directory Column */}
          <div className="flex flex-col gap-3">
            <span className="font-mono text-xs uppercase tracking-wider text-[#C8A25A]">
              Navigation
            </span>
            <ul className="flex flex-col gap-2 text-sm">
              {siteConfig.navLinks.map((link) => (
                <li key={link.href}>
                  <TransitionLink
                    href={link.href}
                    className="hover:text-white transition-colors inline-flex items-center gap-1 text-slate-300"
                  >
                    <span>{link.label}</span>
                  </TransitionLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Capabilities: 6 Real Services linking to /services */}
          <div className="flex flex-col gap-3">
            <span className="font-mono text-xs uppercase tracking-wider text-[#C8A25A]">
              Capabilities
            </span>
            <ul className="flex flex-col gap-2 text-sm text-slate-400">
              {siteConfig.services.map((service) => (
                <li key={service.slug}>
                  <TransitionLink
                    href={`/services#${service.slug}`}
                    className="hover:text-white transition-colors flex items-center justify-between group"
                  >
                    <span>{service.title}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-[#C8A25A]" />
                  </TransitionLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Inquiries */}
          <div className="flex flex-col gap-3">
            <span className="font-mono text-xs uppercase tracking-wider text-[#C8A25A]">
              Direct Inquiries
            </span>
            <div className="flex flex-col gap-2 text-sm text-slate-300">
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="hover:text-[#C8A25A] transition-colors inline-flex items-center gap-1.5"
              >
                <span>{siteConfig.contact.email}</span>
              </a>
              <a
                href={formatTelHref(siteConfig.contact.phone)}
                className="hover:text-[#C8A25A] transition-colors inline-flex items-center gap-1.5 text-xs text-slate-300"
              >
                <span>{siteConfig.contact.phone}</span>
              </a>
              <span className="text-xs text-[#E8D5A3] mt-1">{siteConfig.contact.hours}</span>
            </div>
          </div>
        </div>

        {/* Middle Interactive Control Deck (Fun Layer & Stubs) */}
        <div className="py-8 border-b border-white/10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-mono text-xs text-slate-400">
            <Sparkles className="w-3.5 h-3.5 text-[#C8A25A]" />
            <span>Interactive Portfolio Controls:</span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* 1. Replay Intro Sequence */}
            <button
              onClick={replayPreloader}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-slate-300 hover:text-white transition-all cursor-pointer active:scale-95"
              title="Replays the Campaign Launch Sequence"
            >
              <RotateCcw className="w-3 h-3 text-[#C8A25A]" />
              <span>Replay Intro</span>
            </button>

            {/* 2. Reduce Delight Toggle */}
            <button
              onClick={toggleReduceDelight}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-mono transition-all cursor-pointer active:scale-95 ${
                reduceDelight
                  ? "bg-amber-500/20 border-amber-500/40 text-amber-300"
                  : "bg-white/5 hover:bg-white/10 border-white/10 text-slate-300"
              }`}
              title="Kills fun animations & custom cursor"
            >
              {reduceDelight ? (
                <Check className="w-3 h-3 text-amber-400" />
              ) : (
                <ShieldCheck className="w-3 h-3 text-slate-400" />
              )}
              <span>{reduceDelight ? "Delight: Off" : "Reduce Delight"}</span>
            </button>

            {/* 3. Attention Heatmap Toggle (Desktop) */}
            <button
              onClick={toggleHeatmap}
              className={`hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-mono transition-all cursor-pointer active:scale-95 ${
                isHeatmapActive
                  ? "bg-blue-500/20 border-blue-500/40 text-blue-300"
                  : "bg-white/5 hover:bg-white/10 border-white/10 text-slate-300"
              }`}
              title="Toggles canvas heatmap mouse trail"
            >
              <Flame className="w-3 h-3 text-[#2563EB]" />
              <span>{isHeatmapActive ? "Heatmap: Active" : "Attention Heatmap"}</span>
            </button>

            {/* 4. A/B Test Switch */}
            <div className="relative group inline-block">
              <button
                onClick={toggleVariant}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-slate-300 hover:text-white transition-all cursor-pointer active:scale-95"
              >
                <Split className="w-3 h-3 text-[#60A5FA]" />
                <span>CTA Variant: {variant}</span>
              </button>
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:flex px-2.5 py-1 rounded bg-[#131928] border border-white/20 text-[10px] font-mono text-[#E8D5A3] whitespace-nowrap shadow-xl z-50">
                A/B Testing Hero copy: Variant {variant} (click to toggle)
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Sample Transparency & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#C8A25A]" />
            <span className="font-mono text-[#E8D5A3]">
              Sample Portfolio Project · All client logos, metrics & case studies are illustrative sample data.
            </span>
          </div>

          <div className="flex items-center gap-4 font-mono">
            <span>© 2026 {siteConfig.name}</span>
            <span>·</span>
            <span>Pune, MH, IN</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
