"use client";

import React, { useEffect } from "react";
import { MotionConfig } from "framer-motion";
import { LenisProvider } from "./LenisProvider";
import { useDelightStore } from "@/stores/delight";
import { usePreloaderStore } from "@/stores/preloader";
import { useBriefStore } from "@/stores/brief";

export function AppProviders({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Hydrate client-side stores from storage
    useDelightStore.getState().init();
    usePreloaderStore.getState().init();
    useBriefStore.getState().init();
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <LenisProvider>{children}</LenisProvider>
    </MotionConfig>
  );
}
