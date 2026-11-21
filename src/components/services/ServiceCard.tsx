"use client";

import React, { useState, useRef, useEffect } from "react";
import { ServiceItem } from "@/content/services-data";
import { useBriefStore } from "@/stores/brief";
import { useDelightStore } from "@/stores/delight";
import {
  Search,
  Zap,
  Share2,
  Mail,
  FileText,
  LineChart,
  Check,
  RotateCw,
  Plus,
  ArrowRight,
  Cpu,
  Layers,
  Sparkles,
} from "lucide-react";

interface ServiceCardProps {
  service: ServiceItem;
  isHighlighted?: boolean;
}

export function ServiceCard({ service, isHighlighted = false }: ServiceCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  const frontFlipBtnRef = useRef<HTMLButtonElement>(null);
  const backFlipBtnRef = useRef<HTMLButtonElement>(null);

  const { selectedServices, addService, removeService } = useBriefStore();
  const reduceDelight = useDelightStore((s) => s.reduceDelight);
  const isSelected = selectedServices.includes(service.title);

  const flipToBack = () => {
    setIsFlipped(true);
    setTimeout(() => {
      backFlipBtnRef.current?.focus();
    }, 150);
  };

  const flipToFront = () => {
    setIsFlipped(false);
    setTimeout(() => {
      frontFlipBtnRef.current?.focus();
    }, 150);
  };

  const handleKeyDownToBack = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      flipToBack();
    }
  };

  const handleKeyDownToFront = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      flipToFront();
    }
  };

  // Handle 3D Mouse Tilt on Desktop
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduceDelight || isFlipped) return;
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; // x position within card
    const y = e.clientY - rect.top; // y position within card

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Subtle tilt: max ±8 degrees
    const rotateX = ((y - centerY) / centerY) * -7;
    const rotateY = ((x - centerX) / centerX) * 7;

    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const handleToggleService = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSelected) {
      removeService(service.title);
    } else {
      addService(service.title);
    }
  };

  // Map icon
  const getIcon = (id: string) => {
    switch (id) {
      case "seo":
        return <Search className="w-5 h-5 text-[#C8A25A]" />;
      case "paid-ads":
        return <Zap className="w-5 h-5 text-[#3B82F6]" />;
      case "social":
        return <Share2 className="w-5 h-5 text-[#C8A25A]" />;
      case "email-automation":
        return <Mail className="w-5 h-5 text-[#3B82F6]" />;
      case "content":
        return <FileText className="w-5 h-5 text-[#C8A25A]" />;
      case "analytics-cro":
        return <LineChart className="w-5 h-5 text-[#3B82F6]" />;
      default:
        return <Sparkles className="w-5 h-5 text-[#C8A25A]" />;
    }
  };

  return (
    <div
      id={service.id}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative w-full rounded-2xl perspective-1000 transition-all duration-300 min-h-[500px] ${
        isHighlighted ? "ring-2 ring-[#C8A25A] shadow-[0_0_35px_rgba(200,162,90,0.25)]" : ""
      }`}
      style={{
        perspective: "1200px",
      }}
    >
      <div
        className="w-full h-full relative transition-transform duration-700 preserve-3d"
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateY(${isFlipped ? 180 : 0}deg) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        }}
      >
        {/* ==================== FRONT FACE ==================== */}
        <div
          className={`w-full h-full rounded-2xl p-6 sm:p-7 flex flex-col justify-between backface-hidden bg-gradient-to-b from-[#131928] via-[#0D121F] to-[#0A0E18] border transition-colors ${
            isSelected
              ? "border-[#C8A25A]/60 shadow-[0_0_30px_rgba(200,162,90,0.15)]"
              : "border-white/10 hover:border-white/20"
          }`}
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          {/* Top Bar: Icon, Tag & Stage */}
          <div>
            <div className="flex items-center justify-between gap-3 mb-5">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                  {getIcon(service.id)}
                </div>
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#C8A25A]">
                    {service.tag}
                  </span>
                  <div className="text-[10px] text-slate-400 font-mono">
                    Funnel: {service.funnelStage}
                  </div>
                </div>
              </div>

              {/* Add to Brief Toggle Button */}
              <button
                type="button"
                onClick={handleToggleService}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer ${
                  isSelected
                    ? "bg-[#C8A25A] text-[#0B0F19] font-bold shadow-md"
                    : "bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10"
                }`}
                aria-label={isSelected ? "Remove from Brief" : "Add to Brief"}
              >
                {isSelected ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>In Brief</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add to Brief</span>
                  </>
                )}
              </button>
            </div>

            {/* Title & Tagline */}
            <h3 className="font-sans text-xl sm:text-2xl font-bold text-white tracking-tight mb-2">
              {service.title}
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed mb-5">
              {service.description}
            </p>

            {/* Deliverables Checklist */}
            <div className="space-y-2 mb-6">
              <span className="text-[11px] font-mono text-[#C8A25A] uppercase tracking-wider block mb-2">
                Core Deliverables
              </span>
              {service.deliverables.slice(0, 4).map((d, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                  <div className="w-4 h-4 rounded-full bg-[#3B82F6]/20 border border-[#3B82F6]/40 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-2.5 h-2.5 text-[#60A5FA]" />
                  </div>
                  <span className="leading-snug">{d}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Flip Trigger */}
          <div className="pt-4 border-t border-white/8 flex items-center justify-between">
            <button
              ref={frontFlipBtnRef}
              type="button"
              onClick={flipToBack}
              onKeyDown={handleKeyDownToBack}
              aria-label={`Flip ${service.title} card for technical stack and sample case snapshot`}
              aria-expanded={isFlipped}
              className="flex items-center gap-2 text-xs font-mono text-[#60A5FA] hover:text-[#93C5FD] focus:outline-none focus:ring-2 focus:ring-[#C8A25A] rounded px-1.5 py-1 transition-colors group cursor-pointer"
            >
              <RotateCw className="w-3.5 h-3.5 transition-transform group-hover:rotate-90 duration-300" />
              <span>Flip for Tech Stack & Case Snapshot</span>
            </button>
            <span className="text-[10px] font-mono text-slate-300">
              {service.id.toUpperCase()}
            </span>
          </div>
        </div>

        {/* ==================== BACK FACE ==================== */}
        <div
          className="absolute inset-0 w-full h-full rounded-2xl p-6 sm:p-7 flex flex-col justify-between backface-hidden bg-gradient-to-b from-[#162035] via-[#0E1524] to-[#0A0E18] border border-[#3B82F6]/40 shadow-2xl"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          {/* Back Top: Header & Flip back */}
          <div>
            <div className="flex items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-[#C8A25A]" />
                <span className="text-xs font-mono text-[#E8D5A3] uppercase tracking-wider">
                  Technical Architecture
                </span>
              </div>
              <button
                ref={backFlipBtnRef}
                type="button"
                onClick={flipToFront}
                onKeyDown={handleKeyDownToFront}
                aria-label={`Flip back to ${service.title} overview`}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-slate-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-[#C8A25A] transition-colors cursor-pointer"
              >
                <RotateCw className="w-3 h-3" />
                <span>Flip Back</span>
              </button>
            </div>

            <h4 className="font-sans text-lg font-bold text-white mb-4">
              {service.title}
            </h4>

            {/* Tech Stack Chips */}
            <div className="mb-5">
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-2">
                Tooling & Instrumentation
              </span>
              <div className="grid grid-cols-2 gap-2">
                {service.techStack.map((tool, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-lg bg-[#0B0F19]/80 border border-white/8 flex flex-col"
                  >
                    <span className="font-mono text-xs font-semibold text-[#60A5FA]">
                      {tool.name}
                    </span>
                    <span className="text-[10px] text-slate-400 mt-0.5">
                      {tool.role}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Sample Outcome Metric Card */}
            <div className="p-3.5 rounded-xl bg-gradient-to-r from-[#2563EB]/15 to-[#C8A25A]/15 border border-[#C8A25A]/30 mb-4">
              <div className="flex items-baseline justify-between mb-1">
                <span className="font-mono text-2xl font-extrabold text-[#C8A25A]">
                  {service.sampleOutcome.metric}
                </span>
                <span className="text-[10px] font-mono text-[#E8D5A3] bg-[#C8A25A]/20 px-2 py-0.5 rounded-full border border-[#C8A25A]/40">
                  Sample Case
                </span>
              </div>
              <div className="text-xs font-semibold text-white">
                {service.sampleOutcome.label}
              </div>
              <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                *{service.sampleOutcome.timeframe}
              </div>
            </div>

            {/* Cadence */}
            <div className="text-[11px] text-slate-300 bg-white/5 p-2.5 rounded-lg border border-white/5 font-mono">
              <span className="text-[#C8A25A] block mb-0.5 font-bold">Cadence & Sprint Rhythm:</span>
              {service.cadence}
            </div>
          </div>

          {/* Back Bottom Actions */}
          <div className="pt-4 border-t border-white/8 flex items-center justify-between">
            <button
              type="button"
              onClick={handleToggleService}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-mono transition-all cursor-pointer ${
                isSelected
                  ? "bg-[#C8A25A] text-[#0B0F19] font-bold"
                  : "bg-[#2563EB] hover:bg-[#3B82F6] text-white font-medium"
              }`}
            >
              {isSelected ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
              <span>{isSelected ? "Saved in Brief" : "Add to Growth Stack"}</span>
            </button>

            <button
              type="button"
              onClick={flipToFront}
              onKeyDown={handleKeyDownToFront}
              className="text-xs font-mono text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              Overview →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
