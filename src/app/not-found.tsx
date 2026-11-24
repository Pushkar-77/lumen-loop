"use client";

import React from "react";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { Home, Briefcase, Mail } from "lucide-react";

export default function NotFound() {
  return (
    <div className="w-full min-h-screen pt-28 pb-20 bg-[#0B0F19] text-white flex items-center justify-center">
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#2563EB]/8 rounded-full blur-[160px]" />
      </div>

      <div className="max-w-2xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#C8A25A] mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C8A25A]" />
          <span>404 · Page Not Found</span>
        </div>

        <div className="font-mono text-[120px] sm:text-[160px] font-black leading-none bg-gradient-to-b from-white/20 to-white/5 bg-clip-text text-transparent mb-4 select-none" aria-hidden="true">
          404
        </div>

        <h1 className="font-sans text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
          This page doesn&apos;t exist.
        </h1>
        <p className="text-slate-400 text-base leading-relaxed mb-10">
          The URL you followed may be broken, or the page may have moved.
          Use the links below to get back on track.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <TransitionLink
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#C8A25A] text-[#0B0F19] font-bold text-sm font-mono shadow-md hover:scale-105 transition-transform"
          >
            <Home className="w-4 h-4" aria-hidden="true" />
            Go Home
          </TransitionLink>
          <TransitionLink
            href="/services"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold text-sm transition-colors"
          >
            <Briefcase className="w-4 h-4" aria-hidden="true" />
            Our Services
          </TransitionLink>
          <TransitionLink
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold text-sm transition-colors"
          >
            <Mail className="w-4 h-4" aria-hidden="true" />
            Contact
          </TransitionLink>
        </div>
      </div>
    </div>
  );
}
