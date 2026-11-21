"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTransitionStore } from "@/stores/transition";

export function TransitionCurtains() {
  const { isTransitioning, destinationPath } = useTransitionStore();

  return (
    <AnimatePresence>
      {isTransitioning && (
        <div className="fixed inset-0 z-[9990] pointer-events-none flex">
          {/* Left Curtain - Midnight Slate */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "0%" }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="w-1/2 h-full bg-[#0B0F19] border-r border-[#C8A25A]/20"
          />

          {/* Right Curtain - Midnight Slate with subtle gold sheen */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: "0%" }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="w-1/2 h-full bg-[#0B0F19] border-l border-[#C8A25A]/20"
          />

          {/* Center Route Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25, delay: 0.15 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <div className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#131928]/90 border border-[#C8A25A]/40 backdrop-blur-md shadow-2xl">
              <span className="w-2 h-2 rounded-full bg-[#C8A25A] animate-pulse" />
              <span className="font-mono text-xs text-[#E8D5A3] tracking-wider uppercase">
                {destinationPath || "/"}
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
