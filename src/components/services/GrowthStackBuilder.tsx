"use client";

import React, { useState, useMemo } from "react";
import { funnelChannels, stackPresets, FunnelChannel } from "@/content/services-data";
import { useCurrencyStore } from "@/stores/currency";
import { useBriefStore, GrowthStackStages } from "@/stores/brief";
import { TransitionLink } from "@/components/ui/TransitionLink";
import {
  Layers,
  Sparkles,
  ArrowRight,
  Check,
  SlidersHorizontal,
  RotateCcw,
  GripVertical,
  ArrowRightLeft,
} from "lucide-react";

type StageKey = "awareness" | "consideration" | "conversion";

export function GrowthStackBuilder() {
  const { currency } = useCurrencyStore();
  const { setGrowthStack, setServices } = useBriefStore();

  // Dynamic stage map allowing channels to be moved between stages via Drag-and-Drop or keyboard
  const [channelStageMap, setChannelStageMap] = useState<Record<string, StageKey>>(() => {
    const initial: Record<string, StageKey> = {};
    funnelChannels.forEach((c) => {
      initial[c.id] = c.stage;
    });
    return initial;
  });

  // Selected channel IDs
  const [selectedIds, setSelectedIds] = useState<string[]>([
    "seo-foundation",
    "google-search-ads",
    "retargeting-engine",
    "cro-landing-pages",
  ]);

  const [activePreset, setActivePreset] = useState<string>("custom");
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dragOverStage, setDragOverStage] = useState<StageKey | null>(null);

  // Toggle single channel selection (Click/Keyboard alternative)
  const toggleChannel = (id: string) => {
    setSelectedIds((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      return next;
    });
    setActivePreset("custom");
  };

  // Move channel to next stage (Accessible keyboard alternative to drag-and-drop)
  const cycleChannelStage = (id: string, e?: React.MouseEvent | React.KeyboardEvent) => {
    if (e) e.stopPropagation();
    const current = channelStageMap[id] || "awareness";
    const nextStage: StageKey =
      current === "awareness"
        ? "consideration"
        : current === "consideration"
        ? "conversion"
        : "awareness";

    setChannelStageMap((prev) => ({ ...prev, [id]: nextStage }));
    if (!selectedIds.includes(id)) {
      setSelectedIds((prev) => [...prev, id]);
    }
    setActivePreset("custom");
  };

  // Drag and Drop handlers
  const handleDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData("text/plain", id);
    e.dataTransfer.effectAllowed = "move";
    setDraggingId(id);
  };

  const handleDragEnd = () => {
    setDraggingId(null);
    setDragOverStage(null);
  };

  const handleDragOver = (e: React.DragEvent, stage: StageKey) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (dragOverStage !== stage) {
      setDragOverStage(stage);
    }
  };

  const handleDragLeave = (e: React.DragEvent, stage: StageKey) => {
    // Only clear if leaving the container itself
    if (e.currentTarget.contains(e.relatedTarget as Node)) return;
    if (dragOverStage === stage) {
      setDragOverStage(null);
    }
  };

  const handleDrop = (e: React.DragEvent, targetStage: StageKey) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("text/plain") || draggingId;
    if (id) {
      setChannelStageMap((prev) => ({
        ...prev,
        [id]: targetStage,
      }));
      // Auto-include dropped item into active stack
      if (!selectedIds.includes(id)) {
        setSelectedIds((prev) => [...prev, id]);
      }
      setActivePreset("custom");
    }
    setDraggingId(null);
    setDragOverStage(null);
  };

  // Apply a preset
  const applyPreset = (presetId: string) => {
    const preset = stackPresets.find((p) => p.id === presetId);
    if (preset) {
      setSelectedIds(preset.channelIds);
      // Reset stages to default
      const resetMap: Record<string, StageKey> = {};
      funnelChannels.forEach((c) => {
        resetMap[c.id] = c.stage;
      });
      setChannelStageMap(resetMap);
      setActivePreset(presetId);
    }
  };

  // Reset to default
  const resetStack = () => {
    setSelectedIds(["seo-foundation", "google-search-ads", "cro-landing-pages"]);
    const resetMap: Record<string, StageKey> = {};
    funnelChannels.forEach((c) => {
      resetMap[c.id] = c.stage;
    });
    setChannelStageMap(resetMap);
    setActivePreset("custom");
  };

  // Filter channels dynamically by their current stage
  const awarenessChannels = useMemo(
    () => funnelChannels.filter((c) => (channelStageMap[c.id] || c.stage) === "awareness"),
    [channelStageMap]
  );
  const considerationChannels = useMemo(
    () => funnelChannels.filter((c) => (channelStageMap[c.id] || c.stage) === "consideration"),
    [channelStageMap]
  );
  const conversionChannels = useMemo(
    () => funnelChannels.filter((c) => (channelStageMap[c.id] || c.stage) === "conversion"),
    [channelStageMap]
  );

  // Calculate pricing & synergy
  const { rawTotal, discountedTotal, synergyDiscountPct } = useMemo(() => {
    const selectedChannels = funnelChannels.filter((c) => selectedIds.includes(c.id));
    const total = selectedChannels.reduce((sum, c) => {
      return sum + (currency === "INR" ? c.monthlyInr : c.monthlyUsd);
    }, 0);

    // Multi-channel synergy discount
    let discountPct = 0;
    if (selectedChannels.length >= 5) {
      discountPct = 15; // 15% multi-channel synergy
    } else if (selectedChannels.length >= 3) {
      discountPct = 10; // 10% multi-channel synergy
    }

    const discounted = Math.round(total * (1 - discountPct / 100));

    return {
      rawTotal: total,
      discountedTotal: discounted,
      synergyDiscountPct: discountPct,
    };
  }, [selectedIds, currency]);

  // Sync to Brief Store on transition
  const handleSaveToBrief = () => {
    const selectedChannels = funnelChannels.filter((c) => selectedIds.includes(c.id));
    const stack: GrowthStackStages = {
      awareness: selectedChannels
        .filter((c) => (channelStageMap[c.id] || c.stage) === "awareness")
        .map((c) => c.name),
      consideration: selectedChannels
        .filter((c) => (channelStageMap[c.id] || c.stage) === "consideration")
        .map((c) => c.name),
      conversion: selectedChannels
        .filter((c) => (channelStageMap[c.id] || c.stage) === "conversion")
        .map((c) => c.name),
    };
    setGrowthStack(stack);
    setServices(selectedChannels.map((c) => c.name));
  };

  const formatPrice = (val: number) => {
    if (currency === "INR") {
      return `₹${val.toLocaleString("en-IN")}`;
    }
    return `$${val.toLocaleString("en-US")}`;
  };

  // Helper to render channel cards with drag-and-drop & keyboard support
  const renderChannelCard = (channel: FunnelChannel, currentStage: StageKey) => {
    const isChecked = selectedIds.includes(channel.id);
    const isDragging = draggingId === channel.id;

    return (
      <div
        key={channel.id}
        draggable
        onDragStart={(e) => handleDragStart(e, channel.id)}
        onDragEnd={handleDragEnd}
        onClick={() => toggleChannel(channel.id)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            toggleChannel(channel.id);
          }
        }}
        tabIndex={0}
        role="checkbox"
        aria-checked={isChecked}
        aria-label={`${channel.name}, ${isChecked ? "selected" : "unselected"}. Drag to reorder stages or press Enter to toggle.`}
        className={`p-3 rounded-xl border transition-all cursor-grab active:cursor-grabbing flex items-start justify-between gap-2.5 focus:outline-none focus:ring-2 focus:ring-[#C8A25A] ${
          isDragging ? "opacity-40 scale-95" : ""
        } ${
          isChecked
            ? "bg-[#18233C] border-[#3B82F6]/60 shadow-sm"
            : "bg-white/[0.02] border-white/5 hover:border-white/15"
        }`}
      >
        <div className="flex items-start gap-2 min-w-0">
          <span
            className="text-slate-400 hover:text-white cursor-grab active:cursor-grabbing mt-0.5 shrink-0"
            title="Drag to move between stages"
          >
            <GripVertical className="w-3.5 h-3.5" />
          </span>

          <div className="min-w-0">
            <div className="font-medium text-xs text-white truncate">
              {channel.name}
            </div>
            <div className="text-[11px] text-slate-300 mt-0.5 leading-snug line-clamp-2">
              {channel.description}
            </div>
            <div className="flex items-center gap-2 mt-1.5">
              <span className="text-[10px] font-mono text-[#C8A25A]">
                {currency === "INR"
                  ? `+₹${channel.monthlyInr.toLocaleString("en-IN")}/mo`
                  : `+$${channel.monthlyUsd.toLocaleString("en-US")}/mo`}
              </span>
              <button
                type="button"
                onClick={(e) => cycleChannelStage(channel.id, e)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    cycleChannelStage(channel.id, e);
                  }
                }}
                className="text-[9px] font-mono text-slate-300 hover:text-white bg-white/5 px-1.5 py-0.5 rounded border border-white/10 flex items-center gap-1 cursor-pointer"
                title="Keyboard action: Move to next funnel stage"
                aria-label={`Move ${channel.name} to next stage`}
              >
                <ArrowRightLeft className="w-2.5 h-2.5" />
                <span>Move</span>
              </button>
            </div>
          </div>
        </div>

        <div
          className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 border transition-colors mt-0.5 ${
            isChecked
              ? "bg-[#2563EB] border-[#3B82F6] text-white"
              : "border-white/20 bg-white/5"
          }`}
        >
          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
        </div>
      </div>
    );
  };

  return (
    <section className="w-full py-16 sm:py-24 border-t border-white/10 bg-[#0B0F19]/90 relative overflow-hidden">
      {/* Background glow accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#2563EB]/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#C8A25A] mb-3">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Interactive Architecture · Drag & Drop</span>
            </div>
            <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Custom Growth Stack Builder
            </h2>
            <p className="text-slate-300 text-sm sm:text-base max-w-2xl mt-2">
              Drag channels between stages or click to toggle. Reallocating channels across
              Awareness, Consideration, and Conversion compounds every rupee or dollar spent.
            </p>
          </div>

          {/* Preset Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono text-slate-400 mr-1 hidden sm:inline">
              Presets:
            </span>
            {stackPresets.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => applyPreset(preset.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                  activePreset === preset.id
                    ? "bg-[#C8A25A] text-[#0B0F19] font-bold shadow-md"
                    : "bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10"
                }`}
              >
                {preset.name}
              </button>
            ))}
            <button
              type="button"
              onClick={resetStack}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
              title="Reset Stack"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 3-Stage Funnel Drag-and-Drop Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          {/* STAGE 1: Awareness */}
          <div
            onDragOver={(e) => handleDragOver(e, "awareness")}
            onDragLeave={(e) => handleDragLeave(e, "awareness")}
            onDrop={(e) => handleDrop(e, "awareness")}
            className={`p-6 rounded-2xl bg-[#0F1422] border transition-all duration-200 flex flex-col justify-between ${
              dragOverStage === "awareness"
                ? "border-[#C8A25A] bg-[#C8A25A]/10 shadow-[0_0_25px_rgba(200,162,90,0.25)]"
                : "border-white/10"
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#3B82F6]/20 border border-[#3B82F6]/40 text-[#60A5FA] font-mono text-xs font-bold flex items-center justify-center">
                    01
                  </span>
                  <h3 className="font-sans text-base font-bold text-white">
                    Awareness & Intent
                  </h3>
                </div>
                <span className="text-[11px] font-mono text-[#60A5FA] bg-[#3B82F6]/10 px-2 py-0.5 rounded border border-[#3B82F6]/30">
                  Top of Funnel
                </span>
              </div>
              <p className="text-xs text-slate-300 mb-4">
                Capture unbranded demand and command high-intent search real estate.
              </p>

              <div className="space-y-3 min-h-[220px]">
                {awarenessChannels.length === 0 ? (
                  <div className="h-32 border-2 border-dashed border-white/10 rounded-xl flex items-center justify-center text-xs font-mono text-slate-500">
                    Drop channels here
                  </div>
                ) : (
                  awarenessChannels.map((c) => renderChannelCard(c, "awareness"))
                )}
              </div>
            </div>
          </div>

          {/* STAGE 2: Consideration */}
          <div
            onDragOver={(e) => handleDragOver(e, "consideration")}
            onDragLeave={(e) => handleDragLeave(e, "consideration")}
            onDrop={(e) => handleDrop(e, "consideration")}
            className={`p-6 rounded-2xl bg-[#0F1422] border transition-all duration-200 flex flex-col justify-between ${
              dragOverStage === "consideration"
                ? "border-[#C8A25A] bg-[#C8A25A]/10 shadow-[0_0_25px_rgba(200,162,90,0.25)]"
                : "border-white/10"
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#C8A25A]/20 border border-[#C8A25A]/40 text-[#C8A25A] font-mono text-xs font-bold flex items-center justify-center">
                    02
                  </span>
                  <h3 className="font-sans text-base font-bold text-white">
                    Consideration & Trust
                  </h3>
                </div>
                <span className="text-[11px] font-mono text-[#C8A25A] bg-[#C8A25A]/10 px-2 py-0.5 rounded border border-[#C8A25A]/30">
                  Middle of Funnel
                </span>
              </div>
              <p className="text-xs text-slate-300 mb-4">
                Nurture educated prospects with data guides, retargeting and founder proof.
              </p>

              <div className="space-y-3 min-h-[220px]">
                {considerationChannels.length === 0 ? (
                  <div className="h-32 border-2 border-dashed border-white/10 rounded-xl flex items-center justify-center text-xs font-mono text-slate-500">
                    Drop channels here
                  </div>
                ) : (
                  considerationChannels.map((c) => renderChannelCard(c, "consideration"))
                )}
              </div>
            </div>
          </div>

          {/* STAGE 3: Conversion & Retention */}
          <div
            onDragOver={(e) => handleDragOver(e, "conversion")}
            onDragLeave={(e) => handleDragLeave(e, "conversion")}
            onDrop={(e) => handleDrop(e, "conversion")}
            className={`p-6 rounded-2xl bg-[#0F1422] border transition-all duration-200 flex flex-col justify-between ${
              dragOverStage === "conversion"
                ? "border-[#C8A25A] bg-[#C8A25A]/10 shadow-[0_0_25px_rgba(200,162,90,0.25)]"
                : "border-white/10"
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#60A5FA]/20 border border-[#60A5FA]/40 text-[#93C5FD] font-mono text-xs font-bold flex items-center justify-center">
                    03
                  </span>
                  <h3 className="font-sans text-base font-bold text-white">
                    Conversion & Retention
                  </h3>
                </div>
                <span className="text-[11px] font-mono text-[#93C5FD] bg-[#60A5FA]/10 px-2 py-0.5 rounded border border-[#60A5FA]/30">
                  Bottom of Funnel
                </span>
              </div>
              <p className="text-xs text-slate-300 mb-4">
                Convert visitors at the checkout, recover drop-offs, and engineer high LTV.
              </p>

              <div className="space-y-3 min-h-[220px]">
                {conversionChannels.length === 0 ? (
                  <div className="h-32 border-2 border-dashed border-white/10 rounded-xl flex items-center justify-center text-xs font-mono text-slate-500">
                    Drop channels here
                  </div>
                ) : (
                  conversionChannels.map((c) => renderChannelCard(c, "conversion"))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Live Calculation & CTA Bar */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#131928] via-[#101626] to-[#0D1220] border border-[#C8A25A]/40 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                Selected Channels:
              </span>
              <span className="font-mono text-sm font-bold text-white px-2.5 py-0.5 rounded-full bg-white/10 border border-white/15">
                {selectedIds.length} Active Channels
              </span>

              {synergyDiscountPct > 0 && (
                <span className="text-xs font-mono text-[#C8A25A] bg-[#C8A25A]/15 px-2.5 py-0.5 rounded-full border border-[#C8A25A]/30 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  <span>{synergyDiscountPct}% Multi-Channel Synergy Discount</span>
                </span>
              )}
            </div>

            <div className="flex items-baseline gap-3">
              <span className="font-mono text-3xl sm:text-4xl font-black text-white tracking-tight">
                {formatPrice(discountedTotal)}
              </span>
              {synergyDiscountPct > 0 && (
                <span className="font-mono text-sm text-slate-400 line-through">
                  {formatPrice(rawTotal)}
                </span>
              )}
              <span className="text-xs text-slate-400 font-mono">/ month retainer</span>
            </div>

            <p className="text-xs text-slate-400 font-mono">
              *Illustrative projection: 3.8x – 5.2x blended ROAS with 90–120 day compounding horizon.
            </p>
          </div>

          <div className="w-full md:w-auto">
            <TransitionLink
              href="/contact"
              onClick={handleSaveToBrief}
              className="w-full md:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#C8A25A] via-[#E8D5A3] to-[#C8A25A] text-[#0B0F19] font-sans font-bold text-sm tracking-wide shadow-[0_4px_25px_rgba(200,162,90,0.35)] hover:shadow-[0_4px_35px_rgba(200,162,90,0.55)] transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <span>Attach Stack to Growth Brief</span>
              <ArrowRight className="w-4 h-4" />
            </TransitionLink>
          </div>
        </div>
      </div>
    </section>
  );
}
