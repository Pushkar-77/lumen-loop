"use client";

import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import { MotionConfig } from "framer-motion";
import { LenisProvider } from "./LenisProvider";
import { useDelightStore } from "@/stores/delight";
import { usePreloaderStore } from "@/stores/preloader";
import { useBriefStore } from "@/stores/brief";

// Dynamic imports with ssr: false in client component so they never block initial server paint
const CustomCursor = dynamic(
  () => import("@/components/fun/CustomCursor").then((m) => m.CustomCursor),
  { ssr: false }
);

const AttentionHeatmap = dynamic(
  () => import("@/components/fun/AttentionHeatmap").then((m) => m.AttentionHeatmap),
  { ssr: false }
);

export function AppProviders({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Hydrate client-side stores from storage
    useDelightStore.getState().init();
    usePreloaderStore.getState().init();
    useBriefStore.getState().init();
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <LenisProvider>
        {/* Desktop-only custom cursor with +1 CTR ripples */}
        <CustomCursor />

        {/* Attention heatmap layer */}
        <AttentionHeatmap />

        {children}
      </LenisProvider>
    </MotionConfig>
  );
}
