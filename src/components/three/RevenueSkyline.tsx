"use client";

import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { ChannelRoiOutput, Currency } from "@/lib/roi-engine";
import { RevenueSkylineFallback } from "./RevenueSkylineFallback";
import { useDelightStore } from "@/stores/delight";

// Dynamically import the 3D WebGL scene with ssr: false
const RevenueSkylineScene = dynamic(
  () =>
    import("./RevenueSkylineScene").then((mod) => ({
      default: mod.RevenueSkylineScene,
    })),
  {
    ssr: false,
    loading: () => null,
  }
);

interface RevenueSkylineProps {
  channels: ChannelRoiOutput[];
  currency: Currency;
  maxRevenue: number;
}

export function RevenueSkyline({ channels, currency, maxRevenue }: RevenueSkylineProps) {
  const [isDesktop, setIsDesktop] = useState(false);
  const [isIdleLoaded, setIsIdleLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceDelight = useDelightStore((s) => s.reduceDelight);

  useEffect(() => {
    // Check desktop viewport (>= 1024px)
    const checkWidth = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    checkWidth();
    window.addEventListener("resize", checkWidth);

    // Reduced motion check
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || reduceDelight) {
      return () => window.removeEventListener("resize", checkWidth);
    }

    // IntersectionObserver to pause rendering when off-screen
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    // Schedule 3D scene loading only after idle
    type WindowWithIdle = Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    const win = window as WindowWithIdle;
    if (typeof window !== "undefined" && typeof win.requestIdleCallback === "function") {
      const handle = win.requestIdleCallback(
        () => setIsIdleLoaded(true),
        { timeout: 1500 }
      );
      return () => {
        window.removeEventListener("resize", checkWidth);
        observer.disconnect();
        if (typeof win.cancelIdleCallback === "function") {
          win.cancelIdleCallback(handle);
        }
      };
    } else {
      const timer = setTimeout(() => setIsIdleLoaded(true), 250);
      return () => {
        window.removeEventListener("resize", checkWidth);
        observer.disconnect();
        clearTimeout(timer);
      };
    }
  }, [reduceDelight]);

  const canRender3D = isDesktop && isIdleLoaded && !reduceDelight;

  return (
    <div ref={containerRef} className="w-full relative">
      {/* 2D Accessible Fallback: Shown on mobile, reduced motion, or until 3D is idle-loaded */}
      <div
        className={`w-full transition-opacity duration-700 ${
          canRender3D ? "opacity-0 pointer-events-none absolute inset-0" : "opacity-100"
        }`}
      >
        <RevenueSkylineFallback
          channels={channels}
          currency={currency}
          maxRevenue={maxRevenue}
        />
      </div>

      {/* 3D WebGL Scene: Desktop >=1024px only after idle */}
      {canRender3D && (
        <div className="w-full animate-fadeIn transition-opacity duration-700">
          <RevenueSkylineScene
            channels={channels}
            currency={currency}
            maxRevenue={maxRevenue}
            isVisible={isVisible}
          />
        </div>
      )}
    </div>
  );
}
