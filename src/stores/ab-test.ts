import { create } from "zustand";

export type HeroCopyVariant = "A" | "B";

interface ABTestState {
  variant: HeroCopyVariant;
  toggleVariant: () => void;
  setVariant: (variant: HeroCopyVariant) => void;
}

export const useABTestStore = create<ABTestState>((set) => ({
  variant: "A",
  toggleVariant: () =>
    set((state) => ({
      variant: state.variant === "A" ? "B" : "A",
    })),
  setVariant: (variant) => set({ variant }),
}));
