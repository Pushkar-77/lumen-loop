import { create } from "zustand";
import Cookies from "js-cookie";

export type Currency = "INR" | "USD";

const COOKIE_KEY = "lumen-currency";

interface CurrencyState {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  toggleCurrency: () => void;
}

export const useCurrencyStore = create<CurrencyState>((set) => ({
  // Initialize with fallback "INR", then hydrate from cookie on mount
  currency: (typeof window !== "undefined" && (Cookies.get(COOKIE_KEY) as Currency)) || "INR",
  setCurrency: (currency) => {
    Cookies.set(COOKIE_KEY, currency, { expires: 365, sameSite: "lax" });
    set({ currency });
  },
  toggleCurrency: () => {
    set((state) => {
      const next: Currency = state.currency === "INR" ? "USD" : "INR";
      Cookies.set(COOKIE_KEY, next, { expires: 365, sameSite: "lax" });
      return { currency: next };
    });
  },
}));
