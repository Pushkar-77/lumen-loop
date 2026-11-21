import { create } from "zustand";

const STORAGE_KEY = "lumen-delight-off";

interface DelightState {
  reduceDelight: boolean;
  toggleReduceDelight: () => void;
  setReduceDelight: (value: boolean) => void;
  init: () => void;
}

export const useDelightStore = create<DelightState>((set) => ({
  reduceDelight: false,
  init: () => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "true") {
        set({ reduceDelight: true });
      }
    }
  },
  toggleReduceDelight: () => {
    set((state) => {
      const next = !state.reduceDelight;
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY, String(next));
      }
      return { reduceDelight: next };
    });
  },
  setReduceDelight: (value) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, String(value));
    }
    set({ reduceDelight: value });
  },
}));
