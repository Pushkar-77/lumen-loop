"use client";

import React from "react";
import { siteConfig } from "@/content/site";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { ArrowUpRight, Search, Target, Users, Mail, FileText, LineChart } from "lucide-react";

const serviceIcons = [
  Search,      // SEO
  Target,      // Paid Ads
  Users,       // Social
  Mail,        // Email & Automation
  FileText,    // Content
  LineChart,   // Analytics & CRO
];

const serviceDetails = [
  {
    bullets: ["Technical Core Web Vitals audit", "High-intent keyword architecture", "Authority backlinks & mentions"],
    stat: "+180% Organic Search Traffic",
  },
  {
    bullets: ["High-intent search & shopping ads", "Creative iteration & testing", "First-party data audience matching"],
    stat: "3.8x Blended Return on Spend",
  },
  {
    bullets: ["Brand positioning & visual identity", "High-converting UGC & video hooks", "Community engagement loops"],
    stat: "+4.2x Engagement Velocity",
  },
  {
    bullets: ["Lifecycle automated follow-ups", "Cart & checkout abandonment flows", "Customer segmentation & LTV lift"],
    stat: "+28% Repeat Purchase Rate",
  },
  {
    bullets: ["Research-backed pillar guides", "Customer success case studies", "Data-led organic acquisition"],
    stat: "42+ High-Intent Keywords #1",
  },
  {
    bullets: ["Clean server-side attribution", "Landing page multivariate tests", "Conversion funnel bottleneck fixes"],
    stat: "+45% Funnel Conversion Rate",
  },
];

export function FeaturedServices() {
  return (
    <section id="services" className="relative w-full py-24 bg-[#0B0F19] text-[#F8FAFC] border-t border-white/10 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-[#2563EB]/10 blur-[140px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#E8D5A3] mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C8A25A]" />
              <span>Core Capabilities</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-bold tracking-tight text-[#F8FAFC]">
              Six synchronized engines.<br />
              <span className="font-serif italic text-[#C8A25A] font-normal">One compounding system.</span>
            </h2>
          </div>
          <p className="text-slate-400 text-sm sm:text-base max-w-md font-sans leading-relaxed">
            Most agencies run disconnected campaigns. We connect search, ads, social and retention into a single closed-loop system where each channel feeds the next.
          </p>
        </div>

        {/* 6-Card Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {siteConfig.services.map((service, index) => {
            const Icon = serviceIcons[index] || Search;
            const details = serviceDetails[index] || { bullets: [], stat: "Sample Metric" };

            return (
              <div
                key={service.slug}
                className="group relative rounded-3xl p-7 flex flex-col justify-between glass-heavy bg-[#131928]/50 hover:bg-[#131928]/85 border border-white/10 hover:border-[#C8A25A]/40 transition-all duration-300 hover:shadow-[0_15px_40px_rgba(37,99,235,0.15)]"
              >
                <div>
                  {/* Top Bar: Index & Tag */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-xs text-slate-500 font-semibold">
                      0{index + 1}
                    </span>
                    <span className="font-mono text-[11px] px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[#E8D5A3]">
                      {service.tag}
                    </span>
                  </div>

                  {/* Icon & Title */}
                  <div className="w-12 h-12 rounded-2xl bg-[#2563EB]/15 border border-[#2563EB]/30 flex items-center justify-center text-[#60A5FA] mb-5 group-hover:bg-[#C8A25A]/15 group-hover:border-[#C8A25A]/40 group-hover:text-[#E8D5A3] transition-colors duration-300">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-xl font-sans font-bold text-[#F8FAFC] group-hover:text-white mb-2.5">
                    {service.title}
                  </h3>

                  <p className="text-sm text-slate-300 font-sans leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Deliverable Checkpoints */}
                  <ul className="space-y-2 mb-8 pt-4 border-t border-white/5">
                    {details.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2.5 text-xs text-slate-400 font-sans">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C8A25A] shrink-0 mt-1" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom Bar: Metric Pill & Service Link */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <div className="text-[11px] font-mono text-[#E8D5A3] flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C8A25A]" />
                    <span>{details.stat}</span>
                    <span className="text-[9px] text-slate-500 uppercase">(Sample)</span>
                  </div>

                  <TransitionLink
                    href={`/services#${service.slug}`}
                    className="p-2 rounded-full bg-white/5 group-hover:bg-[#C8A25A] text-slate-300 group-hover:text-slate-950 transition-all duration-300"
                    aria-label={`Learn more about ${service.title}`}
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </TransitionLink>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
