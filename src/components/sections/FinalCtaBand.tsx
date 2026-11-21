"use client";

import React from "react";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { ArrowRight, Sparkles, BarChart2, ShieldCheck, Clock, MapPin } from "lucide-react";
import { siteConfig } from "@/content/site";

export function FinalCtaBand() {
  return (
    <section className="relative w-full py-24 bg-[#0B0F19] text-[#F8FAFC] border-t border-white/10 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-[#2563EB]/15 via-[#60A5FA]/10 to-[#C8A25A]/15 blur-[150px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="relative rounded-3xl p-8 sm:p-14 lg:p-16 glass-heavy bg-gradient-to-b from-[#131928]/90 via-[#0E1422]/95 to-[#131928]/90 border border-white/15 shadow-[0_25px_70px_rgba(0,0,0,0.6)] text-center flex flex-col items-center">
          
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/15 text-xs font-mono text-[#E8D5A3] mb-6">
            <Sparkles className="w-3.5 h-3.5 text-[#C8A25A]" />
            <span>Growth Audit & Strategy Session</span>
          </div>

          {/* Headline */}
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-sans font-extrabold tracking-tight text-[#F8FAFC] max-w-4xl leading-[1.15]">
            Turn every marketing rupee into a{" "}
            <span className="font-serif italic text-[#C8A25A] font-normal underline decoration-[#C8A25A]/30 decoration-2 underline-offset-8">
              compounding asset
            </span>
            .
          </h2>

          {/* Subcopy */}
          <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-2xl font-sans leading-relaxed">
            Book a complimentary 40-point growth audit. We&apos;ll dissect your search visibility,
            paid ad economics, and retention funnels — with zero pitch pressure and actionable takeaways you can keep.
          </p>

          {/* Dual Action Buttons */}
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <TransitionLink
              href="/contact"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full font-sans font-semibold text-sm sm:text-base bg-gradient-to-r from-[#2563EB] via-[#1D4ED8] to-[#2563EB] hover:from-[#3B82F6] hover:to-[#1D4ED8] text-white shadow-[0_0_35px_rgba(37,99,235,0.45)] border border-blue-400/40 transition-all duration-300 active:scale-95 group"
            >
              <span>Book Growth Audit</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </TransitionLink>

            <TransitionLink
              href="/roi-lab"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-full font-sans font-medium text-sm sm:text-base text-slate-200 hover:text-white glass-heavy bg-white/5 hover:bg-white/10 border border-white/15 transition-all duration-200"
            >
              <BarChart2 className="w-4 h-4 text-[#C8A25A]" />
              <span>Simulate ROI in 3D</span>
            </TransitionLink>
          </div>

          {/* Trust Guarantees Strip */}
          <div className="mt-12 pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-mono text-slate-400">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#C8A25A]" />
              <span>HQ in {siteConfig.location.city}, India</span>
            </div>

            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#60A5FA]" />
              <span>48-Hour Audit Turnaround</span>
            </div>

            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#C8A25A]" />
              <span>Confidentiality Guaranteed (NDA)</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
