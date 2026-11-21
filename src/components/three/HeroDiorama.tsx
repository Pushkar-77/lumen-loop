"use client";

import React, { useState, useEffect, useRef, useSyncExternalStore } from "react";
import dynamic from "next/dynamic";
import { HeroFallback } from "./HeroFallback";
import { AnimatePresence, motion } from "framer-motion";
import { Zap, TrendingUp, Sparkles } from "lucide-react";

// Dynamic Canvas import with ssr: false so Three.js never runs during SSR
const Canvas = dynamic(
  () => import("@react-three/fiber").then((mod) => mod.Canvas),
  { ssr: false }
);

// Dynamic HeroScene import
const HeroScene = dynamic(
  () => import("./HeroScene").then((mod) => mod.HeroScene),
  { ssr: false }
);

interface HeroDioramaProps {
  isLaunched: boolean;
}

function useMediaQuery(query: string, serverDefault = false) {
  return useSyncExternalStore(
    (callback) => {
      if (typeof window === "undefined") return () => {};
      const match = window.matchMedia(query);
      match.addEventListener("change", callback);
      return () => match.removeEventListener("change", callback);
    },
    () => (typeof window !== "undefined" ? window.matchMedia(query).matches : serverDefault),
    () => serverDefault
  );
}

function useWebGLSupport() {
  return useSyncExternalStore(
    () => () => {},
    () => {
      if (typeof window === "undefined") return true;
      try {
        const canvas = document.createElement("canvas");
        return !!(canvas.getContext("webgl") || canvas.getContext("experimental-webgl"));
      } catch {
        return false;
      }
    },
    () => true
  );
}

export function HeroDiorama({ isLaunched }: HeroDioramaProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [isCanvasReady, setIsCanvasReady] = useState(false);
  const [isIdleReady, setIsIdleReady] = useState(false);

  // Strictly >= 1024px for WebGL 3D diorama
  const isDesktop = useMediaQuery("(min-width: 1024px)", false);
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)", false);
  const hasWebGL = useWebGLSupport();

  // Defer 3D loading until after idle on desktop only
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.innerWidth < 1024) return;

    if ("requestIdleCallback" in window) {
      const handle = (window as unknown as { requestIdleCallback: (cb: () => void, opts?: { timeout: number }) => number }).requestIdleCallback(
        () => setIsIdleReady(true),
        { timeout: 1200 }
      );
      return () => {
        (window as unknown as { cancelIdleCallback: (id: number) => void }).cancelIdleCallback(handle);
      };
    } else {
      const timer = setTimeout(() => setIsIdleReady(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const shouldRender3D = isDesktop && !prefersReducedMotion && hasWebGL && isIdleReady;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[440px] sm:h-[480px] lg:h-[530px] flex items-center justify-center select-none overflow-hidden rounded-2xl"
    >
      {/* Instant vector SVG fallback: shown on mobile and during desktop idle deferral */}
      <div
        className={`absolute inset-0 transition-opacity duration-700 ease-out z-0 flex items-center justify-center ${
          isCanvasReady && shouldRender3D ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <HeroFallback />
      </div>

      {/* 3D WebGL Canvas: only loaded on desktop >=1024px after idle */}
      {shouldRender3D && isVisible && (
        <div
          className={`absolute inset-0 transition-opacity duration-700 ease-out z-10 ${
            isCanvasReady ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <Canvas
            camera={{ position: [0, 0.25, 7.8], fov: 44 }}
            dpr={[1, 1.5]} // DPR strictly capped at 1.5
            frameloop={isVisible ? "always" : "never"}
            gl={{
              antialias: true,
              alpha: true,
              powerPreference: "high-performance",
            }}
            onCreated={() => setIsCanvasReady(true)}
            className="w-full h-full cursor-grab active:cursor-grabbing"
          >
            <HeroScene isLaunched={isLaunched} />
          </Canvas>
        </div>
      )}

      {/* Interactive Drag Hint */}
      {isCanvasReady && shouldRender3D && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 pointer-events-none px-3 py-1 rounded-full bg-[#131928]/90 border border-white/10 backdrop-blur-md text-[10px] font-mono text-slate-400 flex items-center gap-1.5 shadow-lg z-20">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C8A25A]" />
          <span>Drag to rotate diorama · Primitives only</span>
        </div>
      )}

      {/* Floating Campaign Alert Chips (No emoji, pure Lucide icons & gold/sapphire only) */}
      <AnimatePresence>
        {isLaunched && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-30 flex items-center justify-center">
            {/* Chip 1: Leads Surge (Gold) */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.8 }}
              animate={{ opacity: 1, y: -90, scale: 1 }}
              exit={{ opacity: 0, y: -120 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="absolute left-[6%] sm:left-[10%] top-[28%] px-3.5 py-2 rounded-2xl bg-[#131928]/95 border border-[#C8A25A]/60 shadow-[0_0_25px_rgba(200,162,90,0.35)] backdrop-blur-md"
            >
              <div className="font-mono text-xs font-bold text-[#E8D5A3] flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-[#C8A25A]" />
                <span>+312 leads acquired</span>
              </div>
              <span className="text-[9px] font-mono text-slate-500 block uppercase">
                *Illustrative conversion
              </span>
            </motion.div>

            {/* Chip 2: CTR Lift (Sapphire) */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.8 }}
              animate={{ opacity: 1, y: -50, scale: 1 }}
              exit={{ opacity: 0, y: -80 }}
              transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
              className="absolute right-[6%] sm:right-[8%] top-[25%] px-3.5 py-2 rounded-2xl bg-[#131928]/95 border border-[#60A5FA]/60 shadow-[0_0_25px_rgba(37,99,235,0.35)] backdrop-blur-md"
            >
              <div className="font-mono text-xs font-bold text-[#60A5FA] flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-[#60A5FA]" />
                <span>CTR 4.8% (+142%)</span>
              </div>
              <span className="text-[9px] font-mono text-slate-500 block uppercase">
                *Illustrative CTR
              </span>
            </motion.div>

            {/* Chip 3: Compounding ROAS (Champagne Gold) */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.8 }}
              animate={{ opacity: 1, y: -15, scale: 1 }}
              exit={{ opacity: 0, y: -45 }}
              transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
              className="absolute right-[8%] sm:right-[12%] bottom-[22%] px-3.5 py-2 rounded-2xl bg-[#131928]/95 border border-[#C8A25A]/60 shadow-[0_0_25px_rgba(200,162,90,0.35)] backdrop-blur-md"
            >
              <div className="font-mono text-xs font-bold text-[#E8D5A3] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#C8A25A]" />
                <span>ROAS 5.4x Blended</span>
              </div>
              <span className="text-[9px] font-mono text-slate-500 block uppercase">
                *Illustrative ROAS
              </span>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
