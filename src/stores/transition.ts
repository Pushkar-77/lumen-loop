import { create } from "zustand";

interface TransitionState {
  isTransitioning: boolean;
  destinationPath: string;
  startTransition: (path: string) => void;
  endTransition: () => void;
}

export const useTransitionStore = create<TransitionState>((set) => ({
  isTransitioning: false,
  destinationPath: "",
  startTransition: (path) => set({ isTransitioning: true, destinationPath: path }),
  endTransition: () => set({ isTransitioning: false, destinationPath: "" }),
}));
