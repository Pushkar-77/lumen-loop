"use client";

import React from "react";
import { Sparkles, Layers, Rocket, Shield, Target, Activity } from "lucide-react";

const sampleClients = [
  { name: "Nexus Cloud", sector: "Enterprise Infra", icon: Layers },
  { name: "Kinetic D2C", sector: "Omnichannel Retail", icon: Rocket },
  { name: "Vertex SaaS", sector: "FinTech Scale-up", icon: Target },
  { name: "Aether AI", sector: "Generative Platform", icon: Sparkles },
  { name: "Scaleflow", sector: "Developer Tooling", icon: Activity },
  { name: "Zenith Health", sector: "Digital Care", icon: Shield },
];

const keywords = [
  "SEMANTIC SEO ARCHITECTURE",
  "MULTI-TOUCH ATTRIBUTION",
  "COMPOUNDING LTV FLYWHEELS",
  "SERVER-SIDE CONVERSIONS",
  "CREATIVE TESTING VELOCITY",
  "FIRST-PARTY RETENTION ENGINE",
  "HIGH-INTENT PIPELINE HARVESTING",
  "DATA-DRIVEN CRO SPRINT",
];

export function DualMarquee() {
  return (
    <section className="w-full py-16 overflow-hidden bg-[#0B0F19] relative z-10 border-y border-white/10 select-none">
      {/* Section Header Label */}
      <div className="max-w-7xl mx-auto px-6 mb-8 flex items-center justify-between text-xs font-mono text-slate-400">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#C8A25A]" />
          <span className="text-[#E8D5A3] uppercase tracking-wider">
            Illustrative Ecosystem & Industry Disciplines
          </span>
        </div>
        <span className="hidden sm:inline-block text-[11px] text-slate-500">
          *All partner trademarks are sample illustrative prototypes
        </span>
      </div>

      {/* Row 1: Client Logo Marquee (Left to Right) */}
      <div className="relative w-full flex overflow-x-hidden group mb-6">
        <div className="flex gap-6 animate-marquee group-hover:[animation-play-state:paused] whitespace-nowrap">
          {[...sampleClients, ...sampleClients, ...sampleClients].map((client, idx) => {
            const Icon = client.icon;
            return (
              <div
                key={`client-a-${idx}`}
                className="flex items-center gap-3.5 px-6 py-3.5 rounded-2xl bg-[#131928]/70 border border-white/10 hover:border-[#C8A25A]/40 transition-colors backdrop-blur-sm shadow-md"
              >
                <div className="w-8 h-8 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-[#60A5FA]">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="font-sans font-bold text-sm text-slate-200">
                    {client.name}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] text-slate-400 font-mono">
                      {client.sector}
                    </span>
                    <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-white/5 text-[#C8A25A] uppercase border border-[#C8A25A]/20">
                      Sample
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Row 2: Strategy Keywords Marquee (Reverse direction) */}
      <div className="relative w-full flex overflow-x-hidden group">
        <div className="flex gap-4 animate-marquee-reverse group-hover:[animation-play-state:paused] whitespace-nowrap">
          {[...keywords, ...keywords, ...keywords].map((keyword, idx) => (
            <div
              key={`kw-${idx}`}
              className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/[0.03] border border-white/5 text-xs font-mono text-slate-400 tracking-wider hover:text-[#E8D5A3] hover:border-[#C8A25A]/30 transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
              <span>{keyword}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
