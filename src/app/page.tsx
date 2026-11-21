import { siteConfig } from "@/content/site";
import { Sparkles, ShieldCheck, Zap } from "lucide-react";

export default function HomePage() {
  return (
    <div className="w-full flex flex-col items-center justify-center px-6 sm:px-12 py-16 sm:py-24 max-w-5xl mx-auto text-center">
      {/* Foundation Status Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-heavy bg-[#131928]/80 border-white/15 mb-8 shadow-xl">
        <span className="w-2.5 h-2.5 rounded-full bg-[#C8A25A] animate-pulse" />
        <span className="font-mono text-xs uppercase tracking-widest text-[#E8D5A3]">
          Phase A · Foundation & Core System Active
        </span>
      </div>

      {/* Editorial Headline with Instrument Serif Italic Accent */}
      <h1 className="text-4xl sm:text-6xl lg:text-7xl font-sans font-bold tracking-tight text-[#F8FAFC] max-w-4xl leading-[1.1]">
        Marketing that{" "}
        <span className="font-serif italic text-[#C8A25A] font-normal tracking-normal">
          compounds
        </span>
        , not just clicks.
      </h1>

      <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
        Quiet Luxury meets Modern Tech. Built on Next.js 15, Plus Jakarta Sans, Instrument Serif,
        and JetBrains Mono. Equipped with Lenis smooth scroll, currency toggle (INR/USD),
        interactive custom cursor, and the Campaign Launch Sequence preloader.
      </p>

      {/* Verified Phase A Systems Deck */}
      <div className="mt-14 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
        {/* Card 1: Visual Tokens */}
        <div className="glass-heavy rounded-3xl p-6 flex flex-col gap-3">
          <div className="w-10 h-10 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
            <Sparkles className="w-5 h-5 text-[#60A5FA]" />
          </div>
          <h3 className="font-sans font-bold text-lg text-white">Design Token Matrix</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Deep Midnight Slate (<span className="font-mono text-[#60A5FA]">#0B0F19</span>),
            Royal Sapphire (<span className="font-mono text-blue-400">#2563EB</span>), and
            Champagne Gold (<span className="font-mono text-[#C8A25A]">#C8A25A</span>).
            Strict WCAG AA contrast rules in effect.
          </p>
        </div>

        {/* Card 2: Micro-Interactions */}
        <div className="glass-heavy rounded-3xl p-6 flex flex-col gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#C8A25A]/10 border border-[#C8A25A]/20 flex items-center justify-center text-[#C8A25A]">
            <Zap className="w-5 h-5" />
          </div>
          <h3 className="font-sans font-bold text-lg text-white">Fun Layer & Cursor</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Click anywhere on desktop to generate <span className="font-mono text-[#E8D5A3] font-semibold">+1 CTR</span> ripples.
            Toggle <span className="font-mono text-slate-300">Attention Heatmap</span> or <span className="font-mono text-slate-300">Reduce Delight</span> in the footer.
          </p>
        </div>

        {/* Card 3: Cinematic Launch Sequence */}
        <div className="glass-heavy rounded-3xl p-6 flex flex-col gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-sans font-bold text-lg text-white">Session Preloader</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Gold funnel outline self-drawing with 4 live counters (Impressions to Customers).
            Click <span className="font-mono text-[#C8A25A]">Replay Intro</span> in the footer to test again.
          </p>
        </div>
      </div>

      {/* Typography Preview Strip */}
      <div className="mt-12 w-full p-6 rounded-3xl bg-[#131928]/60 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-col text-left">
          <span className="font-mono text-xs text-[#C8A25A] uppercase tracking-wider">
            Typographic Stack Check
          </span>
          <span className="font-sans text-sm text-slate-200">
            Plus Jakarta Sans (UI) · <span className="font-serif italic text-lg text-[#E8D5A3]">Instrument Serif</span> · <span className="font-mono text-xs text-blue-400">JetBrains Mono 100%</span>
          </span>
        </div>
        <div className="flex items-center gap-2 font-mono text-xs text-slate-400">
          <span>Location:</span>
          <span className="text-white font-semibold">{siteConfig.location.full}</span>
        </div>
      </div>
    </div>
  );
}
