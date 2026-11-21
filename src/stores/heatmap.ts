import { create } from "zustand";

interface HeatmapState {
  isHeatmapActive: boolean;
  toggleHeatmap: () => void;
  setHeatmap: (active: boolean) => void;
}

export const useHeatmapStore = create<HeatmapState>((set) => ({
  isHeatmapActive: false,
  toggleHeatmap: () => set((state) => ({ isHeatmapActive: !state.isHeatmapActive })),
  setHeatmap: (active) => set({ isHeatmapActive: active }),
}));
