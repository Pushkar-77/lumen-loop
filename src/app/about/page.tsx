"use client";

import React from "react";
import { siteConfig } from "@/content/site";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { Sparkles, MapPin, ShieldCheck, HeartHandshake, Award, ArrowRight } from "lucide-react";

export default function AboutPage() {
  const values = [
    {
      title: "Zero Ephemeral Noise",
      desc: "We prioritize channels that compound equity. If a strategy produces temporary spikes without lifting baseline customer value, we cut it.",
    },
    {
      title: "First-Party Attribution",
      desc: "We don't rely on platform-reported inflated metrics. Every rupee and dollar is audited against clean first-party server-side data.",
    },
    {
      title: "Capped Client Roster",
      desc: "We deliberately limit our active partnership capacity to 12 brands so senior growth leads manage execution, not junior trainees.",
    },
    {
      title: "Quiet Luxury Aesthetic",
      desc: "High-converting marketing doesn't require garish pop-ups or deceptive urgency. We design brand experiences that command premium pricing.",
    },
  ];

  return (
    <div className="w-full min-h-screen pt-28 sm:pt-36 pb-20 bg-[#0B0F19] text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#C8A25A] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C8A25A] animate-pulse" />
            <span>Studio Roots · Pune, India</span>
          </div>

          <h1 className="font-sans text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] mb-5">
            Crafting Growth <br />
            <span className="bg-gradient-to-r from-[#FAF9F6] via-[#E8D5A3] to-[#C8A25A] bg-clip-text text-transparent">
              That Outlasts the Next Algorithm.
            </span>
          </h1>

          <p className="font-sans text-base sm:text-lg text-slate-300 leading-relaxed text-balance">
            Lumen Loop was founded in Pune to challenge the traditional agency retainer model.
            We treat digital marketing as a precision engineering discipline rather than guesswork.
          </p>
        </div>

        {/* Narrative & Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 max-w-5xl mx-auto">
          {values.map((v, idx) => (
            <div
              key={idx}
              className="p-7 rounded-3xl bg-[#0F1422] border border-white/10 flex flex-col justify-between"
            >
              <div>
                <span className="font-mono text-xs text-[#C8A25A] mb-2 block">
                  Principle 0{idx + 1}
                </span>
                <h3 className="font-sans text-xl font-bold text-white mb-2">
                  {v.title}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {v.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Studio Location Card */}
        <div className="max-w-3xl mx-auto p-8 rounded-3xl bg-gradient-to-b from-[#131928] to-[#0B0F19] border border-white/10 text-center flex flex-col items-center mb-16">
          <div className="w-12 h-12 rounded-2xl bg-[#C8A25A]/10 border border-[#C8A25A]/30 flex items-center justify-center mb-4">
            <MapPin className="w-6 h-6 text-[#C8A25A]" />
          </div>
          <h2 className="font-sans text-2xl font-bold text-white mb-2">
            Rooted in Kharadi, Pune
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm max-w-md mb-6 leading-relaxed">
            Operating from Pune's technology corridor, serving high-ambition Indian consumer brands
            and global digital platforms with equal precision.
          </p>
          <div className="flex gap-4">
            <TransitionLink
              href="/contact"
              className="px-6 py-3 rounded-full bg-[#C8A25A] text-[#0B0F19] font-bold text-xs font-mono shadow-md"
            >
              Start a Conversation →
            </TransitionLink>
          </div>
        </div>
      </div>
    </div>
  );
}
