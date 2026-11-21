import { create } from "zustand";

const SESSION_KEY = "lumen-preloader-seen";

interface PreloaderState {
  hasSeenPreloader: boolean;
  isReplaying: boolean;
  init: () => void;
  markAsSeen: () => void;
  replay: () => void;
  finishReplay: () => void;
}

export const usePreloaderStore = create<PreloaderState>((set) => ({
  hasSeenPreloader: false,
  isReplaying: false,
  init: () => {
    if (typeof window !== "undefined") {
      const seen = sessionStorage.getItem(SESSION_KEY) === "true";
      set({ hasSeenPreloader: seen });
    }
  },
  markAsSeen: () => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem(SESSION_KEY, "true");
    }
    set({ hasSeenPreloader: true, isReplaying: false });
  },
  replay: () => {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem(SESSION_KEY);
    }
    set({ hasSeenPreloader: false, isReplaying: true });
  },
  finishReplay: () => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem(SESSION_KEY, "true");
    }
    set({ hasSeenPreloader: true, isReplaying: false });
  },
}));
