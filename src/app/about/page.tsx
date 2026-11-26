"use client";

import React from "react";
import { siteConfig } from "@/content/site";
import { formatTelHref } from "@/lib/utils";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { MapPin, Users, Zap, Shield, Eye, ArrowRight, Mail, Phone } from "lucide-react";

const PRINCIPLES = [
  {
    num: "01",
    title: "Zero Ephemeral Noise",
    desc: "We prioritise channels that compound equity. If a strategy produces temporary spikes without lifting baseline customer value, we cut it.",
    icon: Zap,
  },
  {
    num: "02",
    title: "First-Party Attribution",
    desc: "We don\u0027t rely on platform-reported inflated metrics. Every rupee and dollar is audited against clean first-party server-side data.",
    icon: Shield,
  },
  {
    num: "03",
    title: "Capped Client Roster",
    desc: "We deliberately limit our active partnership capacity to 12 brands so senior growth leads manage execution, not junior trainees.",
    icon: Users,
  },
  {
    num: "04",
    title: "Quiet Luxury Aesthetic",
    desc: "High-converting marketing doesn\u0027t require garish pop-ups or deceptive urgency. We design brand experiences that command premium pricing.",
    icon: Eye,
  },
];

const APPROACH_STEPS = [
  {
    num: "1",
    title: "Deep Diagnostic",
    desc: "We start with a technical audit of your existing funnel — tracking, attribution, keyword coverage, creative health and customer lifecycle gaps.",
  },
  {
    num: "2",
    title: "Architecture Design",
    desc: "We map a unified channel architecture specific to your CAC targets, AOV profile, and growth velocity goals — no generic playbooks.",
  },
  {
    num: "3",
    title: "Precision Execution",
    desc: "Senior specialists manage each channel with weekly reporting, weekly creative refreshes, and fortnightly strategy reviews.",
  },
  {
    num: "4",
    title: "Compounding Measurement",
    desc: "Every sprint closes with a data review. We measure customer lifetime value, payback period, and share of search — not just surface clicks.",
  },
];

// Sample team — clearly labelled as Sample
const TEAM = [
  { name: "Arjun Mehta", role: "Growth Strategy Lead", initials: "AM", accent: "#2563EB" },
  { name: "Priya Nair", role: "Paid Acquisition Lead", initials: "PN", accent: "#C8A25A" },
  { name: "Rohit Sharma", role: "SEO & Content Lead", initials: "RS", accent: "#60A5FA" },
  { name: "Aisha Desai", role: "CRO & Analytics Lead", initials: "AD", accent: "#E8D5A3" },
];

export default function AboutPage() {
  return (
    <div className="w-full min-h-screen pt-28 sm:pt-36 pb-20 bg-[#0B0F19] text-white">
      {/* Background atmosphere */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#2563EB]/8 rounded-full blur-[160px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#C8A25A]/4 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#C8A25A] mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C8A25A] animate-pulse" aria-hidden="true" />
            <span>Studio Roots · Pune, India</span>
          </div>

          <h1 className="font-sans text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] mb-6">
            Crafting Growth <br />
            <span className="bg-gradient-to-r from-[#FAF9F6] via-[#E8D5A3] to-[#C8A25A] bg-clip-text text-transparent">
              That Outlasts the Next Algorithm.
            </span>
          </h1>

          <p className="font-sans text-base sm:text-lg text-slate-300 leading-relaxed text-balance">
            Lumen Loop was founded in Pune to challenge the traditional agency retainer model.
            We treat digital marketing as a precision engineering discipline — measurable, compounding, and built on first-party data.
          </p>
        </div>

        {/* Studio Story */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div>
              <span className="text-xs font-mono text-[#C8A25A] uppercase tracking-widest block mb-3">The Studio Story</span>
              <h2 className="font-sans text-2xl sm:text-3xl font-bold text-white mb-4 leading-snug">
                Built from frustration with agency mediocrity.
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                Most agencies sell packages. We sell outcomes. The founding insight was simple:
                Indian brands with serious ambitions deserve the same rigour that global direct-to-consumer
                giants apply — first-party data, server-side attribution, and creative that earns attention
                rather than buying it.
              </p>
              <p className="text-slate-300 text-sm leading-relaxed">
                We deliberately cap our client roster, work in retained growth sprints rather than
                one-off campaigns, and measure success on customer lifetime value — not vanity impressions.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-[#0F1422] border border-white/10 space-y-5">
              <div className="flex items-center gap-4">
                <span className="font-mono text-3xl font-black text-[#C8A25A]">12</span>
                <div>
                  <div className="text-sm font-bold text-white">Max Active Brands</div>
                  <div className="text-xs text-slate-400">Intentionally capped for senior attention</div>
                </div>
              </div>
              <div className="border-t border-white/5" />
              <div className="flex items-center gap-4">
                <span className="font-mono text-3xl font-black text-[#60A5FA]">100%</span>
                <div>
                  <div className="text-sm font-bold text-white">First-Party Attribution</div>
                  <div className="text-xs text-slate-400">No platform-reported vanity metrics</div>
                </div>
              </div>
              <div className="border-t border-white/5" />
              <div className="flex items-center gap-4">
                <span className="font-mono text-3xl font-black text-white">0%</span>
                <div>
                  <div className="text-sm font-bold text-white">Ad-Spend Markup</div>
                  <div className="text-xs text-slate-400">Transparent fixed retainer model</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Operating Principles */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <span className="text-xs font-mono text-[#C8A25A] uppercase tracking-widest block mb-2">How We Operate</span>
            <h2 className="font-sans text-2xl sm:text-3xl font-bold text-white">Four Non-Negotiable Principles</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PRINCIPLES.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.num}
                  className="p-7 rounded-3xl bg-[#0F1422] border border-white/10 flex flex-col gap-4"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#C8A25A]/10 border border-[#C8A25A]/20 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-[#C8A25A]" aria-hidden="true" />
                    </div>
                    <div>
                      <span className="font-mono text-xs text-[#C8A25A] block mb-1">Principle {p.num}</span>
                      <h3 className="font-sans text-lg font-bold text-white">{p.title}</h3>
                    </div>
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed">{p.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Approach */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <span className="text-xs font-mono text-[#C8A25A] uppercase tracking-widest block mb-2">The Lumen Loop Method</span>
            <h2 className="font-sans text-2xl sm:text-3xl font-bold text-white">A Repeatable Growth Architecture</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {APPROACH_STEPS.map((step) => (
              <div key={step.num} className="p-6 rounded-2xl bg-[#0F1422] border border-white/10 flex flex-col gap-3">
                <span className="font-mono text-3xl font-black text-white/15 leading-none select-none" aria-hidden="true">
                  {step.num}
                </span>
                <h3 className="font-sans text-base font-bold text-white">{step.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Sample Team */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-slate-400 mb-4">
              Sample — illustrative team profiles
            </div>
            <h2 className="font-sans text-2xl sm:text-3xl font-bold text-white">The Leads Behind the Work</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {TEAM.map((member) => (
              <div key={member.name} className="p-6 rounded-2xl bg-[#0F1422] border border-white/10 text-center flex flex-col items-center gap-3">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center font-mono font-black text-lg text-[#0B0F19]"
                  style={{ backgroundColor: member.accent }}
                  aria-hidden="true"
                >
                  {member.initials}
                </div>
                <div>
                  <div className="font-sans font-bold text-sm text-white">{member.name}</div>
                  <div className="text-xs font-mono text-slate-400 mt-0.5">{member.role}</div>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/5 text-slate-500">
                  Sample Profile
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Location card */}
        <div className="max-w-3xl mx-auto p-8 rounded-3xl bg-gradient-to-b from-[#131928] to-[#0B0F19] border border-white/10 text-center flex flex-col items-center mb-16">
          <div className="w-12 h-12 rounded-2xl bg-[#C8A25A]/10 border border-[#C8A25A]/30 flex items-center justify-center mb-4">
            <MapPin className="w-6 h-6 text-[#C8A25A]" aria-hidden="true" />
          </div>
          <h2 className="font-sans text-2xl font-bold text-white mb-2">Rooted in Pune, India</h2>
          <p className="text-slate-300 text-xs sm:text-sm max-w-md mb-5 leading-relaxed">
            Operating from Pune, Maharashtra (Studio address placeholder), serving high-ambition Indian consumer brands
            and global digital platforms with equal precision.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-slate-300 mb-6">
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="inline-flex items-center gap-1.5 hover:text-[#C8A25A] transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-[#C8A25A]" aria-hidden="true" />
              <span>{siteConfig.contact.email}</span>
            </a>
            <span className="text-white/20" aria-hidden="true">·</span>
            <a
              href={formatTelHref(siteConfig.contact.phone)}
              className="inline-flex items-center gap-1.5 hover:text-[#C8A25A] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#C8A25A]" aria-hidden="true" />
              <span>{siteConfig.contact.phone}</span>
            </a>
          </div>
          <TransitionLink
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#C8A25A] text-[#0B0F19] font-bold text-sm font-mono shadow-md hover:scale-105 transition-transform"
          >
            Get your free growth plan
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </TransitionLink>
        </div>
      </div>
    </div>
  );
}
