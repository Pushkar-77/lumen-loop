"use client";

import React, { useEffect, useState, useSyncExternalStore } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDelightStore } from "@/stores/delight";

interface Ripple {
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
  const [ripples, setRipples] = useState<Ripple[]>([]);

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

      const ripple: Ripple = {
        id: nextId++,
        x: e.clientX,
        y: e.clientY,
      };

      setRipples((prev) => [...prev.slice(-8), ripple]);

      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== ripple.id));
      }, 750);
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

      {/* Floating "+1 CTR" Click Ripples with normal word spacing */}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            initial={{ opacity: 1, y: ripple.y - 12, x: ripple.x - 18, scale: 0.9 }}
            animate={{ opacity: 0, y: ripple.y - 45, scale: 1.15 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="fixed pointer-events-none z-[9997] select-none font-mono text-[11px] font-bold text-[#E8D5A3] drop-shadow-[0_0_8px_rgba(200,162,90,0.5)] tracking-normal"
          >
            +1 CTR
          </motion.div>
        ))}
      </AnimatePresence>
    </>
  );
}
