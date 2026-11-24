"use client";

import React, { useEffect, useState, useSyncExternalStore } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDelightStore } from "@/stores/delight";

interface ClickRing {
  id: number;
  x: number;
  y: number;
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

export function CustomCursor() {
  const reduceDelight = useDelightStore((s) => s.reduceDelight);
  const isTouchDevice = useMediaQuery("(hover: none) or (pointer: coarse)", true);
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)", false);

  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [rings, setRings] = useState<ClickRing[]>([]);

  useEffect(() => {
    if (isTouchDevice || prefersReducedMotion || reduceDelight) return;

    let nextId = 0;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement | null;
      if (target) {
        // Hide custom cursor over native form fields so native text selection / caret takes over
        const isFormField = target.closest("input, textarea, select, [contenteditable='true']");
        if (isFormField) {
          setIsVisible(false);
          return;
        }

        setIsVisible(true);
        const interactive = target.closest("a, button, [role='button'], [tabindex='0']");
        setIsPointer(!!interactive);
      } else {
        setIsVisible(true);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest("input, textarea, select, [contenteditable='true']")) {
        return;
      }

      const ring: ClickRing = {
        id: nextId++,
        x: e.clientX,
        y: e.clientY,
      };

      setRings((prev) => [...prev.slice(-8), ring]);

      setTimeout(() => {
        setRings((prev) => prev.filter((r) => r.id !== ring.id));
      }, 500);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("click", handleClick);
    };
  }, [isTouchDevice, prefersReducedMotion, reduceDelight]);

  if (isTouchDevice || prefersReducedMotion || reduceDelight || !isVisible) {
    return null;
  }

  return (
    <>
      {/* Outer Follower Ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#C8A25A]/50 mix-blend-screen"
        animate={{
          x: position.x,
          y: position.y,
          width: isPointer ? 36 : 22,
          height: isPointer ? 36 : 22,
          backgroundColor: isPointer ? "rgba(200, 162, 90, 0.12)" : "rgba(37, 99, 235, 0.08)",
          borderColor: isPointer ? "#C8A25A" : "rgba(96, 165, 250, 0.4)",
        }}
        transition={{ type: "spring", stiffness: 450, damping: 28, mass: 0.1 }}
      />

      {/* Center Dot */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#C8A25A]"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%)`,
        }}
      />

      {/* Minimal Expanding Click Ring (1px Champagne Gold, expands from ~8px to ~40px, fades to 0 over 450ms) */}
      <AnimatePresence>
        {rings.map((ring) => (
          <motion.div
            key={ring.id}
            initial={{ width: 8, height: 8, x: "-50%", y: "-50%", opacity: 0.6 }}
            animate={{ width: 40, height: 40, x: "-50%", y: "-50%", opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="fixed pointer-events-none z-[8900] rounded-full border border-[#C8A25A]/60 bg-transparent select-none"
            style={{
              left: ring.x,
              top: ring.y,
            }}
          />
        ))}
      </AnimatePresence>
    </>
  );
}
