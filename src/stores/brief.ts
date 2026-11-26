import { create } from "zustand";

const SESSION_KEY = "lumen-brief-state";

export interface GrowthStackStages {
  awareness: string[];
  consideration: string[];
  conversion: string[];
}

export interface RoiScenarioSummary {
  monthlyBudget: number;
  averageOrderValue: number;
  currency: "INR" | "USD";
  totalLeads: number;
  totalCustomers: number;
  totalRevenue: number;
  blendedRoas: number;
  channels: string[];
}

interface BriefState {
  selectedServices: string[];
  selectedPlan: string | null;
  growthStack: GrowthStackStages;
  roiScenario: RoiScenarioSummary | null;
  addService: (service: string) => void;
  removeService: (service: string) => void;
  setServices: (services: string[]) => void;
  setSelectedPlan: (plan: string | null) => void;
  setGrowthStack: (stack: GrowthStackStages) => void;
  setRoiScenario: (scenario: RoiScenarioSummary | null) => void;
  clearBrief: () => void;
  init: () => void;
}

const defaultStack: GrowthStackStages = {
  awareness: [],
  consideration: [],
  conversion: [],
};

export const useBriefStore = create<BriefState>((set, get) => ({
  selectedServices: [],
  selectedPlan: null,
  growthStack: defaultStack,
  roiScenario: null,
  init: () => {
    if (typeof window !== "undefined") {
      try {
        const stored = sessionStorage.getItem(SESSION_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          set({
            selectedServices: parsed.selectedServices || [],
            selectedPlan: parsed.selectedPlan || null,
            growthStack: parsed.growthStack || defaultStack,
            roiScenario: parsed.roiScenario || null,
          });
        }
      } catch (e) {
        console.error("Failed to parse brief from sessionStorage", e);
      }
    }
  },
  addService: (service) => {
    const current = get().selectedServices;
    if (!current.includes(service)) {
      const next = [...current, service];
      set({ selectedServices: next });
      saveToSession({ ...get(), selectedServices: next });
    }
  },
  removeService: (service) => {
    const next = get().selectedServices.filter((s) => s !== service);
    set({ selectedServices: next });
    saveToSession({ ...get(), selectedServices: next });
  },
  setServices: (services) => {
    set({ selectedServices: services });
    saveToSession({ ...get(), selectedServices: services });
  },
  setSelectedPlan: (plan) => {
    set({ selectedPlan: plan });
    saveToSession({ ...get(), selectedPlan: plan });
  },
  setGrowthStack: (stack) => {
    set({ growthStack: stack });
    saveToSession({ ...get(), growthStack: stack });
  },
  setRoiScenario: (scenario) => {
    set({ roiScenario: scenario });
    saveToSession({ ...get(), roiScenario: scenario });
  },
  clearBrief: () => {
    set({
      selectedServices: [],
      selectedPlan: null,
      growthStack: defaultStack,
      roiScenario: null,
    });
    if (typeof window !== "undefined") {
      sessionStorage.removeItem(SESSION_KEY);
    }
  },
}));

function saveToSession(state: {
  selectedServices: string[];
  selectedPlan: string | null;
  growthStack: GrowthStackStages;
  roiScenario: RoiScenarioSummary | null;
}) {
  if (typeof window !== "undefined") {
    try {
      sessionStorage.setItem(
        SESSION_KEY,
        JSON.stringify({
          selectedServices: state.selectedServices,
          selectedPlan: state.selectedPlan,
          growthStack: state.growthStack,
          roiScenario: state.roiScenario,
        })
      );
    } catch {
      // ignore quota exceeded or disabled storage
    }
  }
}
