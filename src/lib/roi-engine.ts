export type Currency = "INR" | "USD";

export interface ChannelBenchmark {
  id: string;
  name: string;
  weight: number; // default allocation ratio relative to other channels
  cpcInr: number; // effective cost per click in INR
  cpcUsd: number; // effective cost per click in USD
  leadConversionRate: number; // click-to-lead conversion rate
  salesConversionRate: number; // lead-to-customer conversion rate
  color: string; // brand-compliant visualization color (sapphire, gold, sky)
}

export const ROI_BENCHMARKS: Record<string, ChannelBenchmark> = {
  seo: {
    id: "seo",
    name: "Technical SEO & Search",
    weight: 0.25,
    cpcInr: 18,
    cpcUsd: 0.85,
    leadConversionRate: 0.045, // 4.5%
    salesConversionRate: 0.16, // 16%
    color: "#2563EB", // Royal Sapphire
  },
  "google-search": {
    id: "google-search",
    name: "Google High-Intent Search",
    weight: 0.30,
    cpcInr: 42,
    cpcUsd: 1.75,
    leadConversionRate: 0.052, // 5.2%
    salesConversionRate: 0.18, // 18%
    color: "#60A5FA", // Sky Blue
  },
  "meta-ads": {
    id: "meta-ads",
    name: "Meta Paid Social",
    weight: 0.25,
    cpcInr: 24,
    cpcUsd: 0.95,
    leadConversionRate: 0.038, // 3.8%
    salesConversionRate: 0.14, // 14%
    color: "#C8A25A", // Burnished Gold
  },
  "email-crm": {
    id: "email-crm",
    name: "Lifecycle Email & CRM",
    weight: 0.10,
    cpcInr: 8,
    cpcUsd: 0.35,
    leadConversionRate: 0.085, // 8.5%
    salesConversionRate: 0.22, // 22%
    color: "#E8D5A3", // Warm Alabaster Gold
  },
  cro: {
    id: "cro",
    name: "Conversion Rate Optimization",
    weight: 0.10,
    cpcInr: 14,
    cpcUsd: 0.55,
    leadConversionRate: 0.065, // 6.5%
    salesConversionRate: 0.20, // 20%
    color: "#93C5FD", // Light Sapphire
  },
};

export const ROI_DISCLAIMER =
  "Illustrative benchmark rates based on historical mid-market performance models. Not a financial guarantee.";

export interface RoiEngineInput {
  monthlyBudget: number;
  averageOrderValue: number;
  selectedChannels: string[];
  currency: Currency;
}

export interface ChannelRoiOutput {
  channelId: string;
  channelName: string;
  allocatedBudget: number;
  cpc: number;
  clicks: number;
  leadConversionRate: number;
  leads: number;
  salesConversionRate: number;
  customers: number;
  revenue: number;
  roas: number;
  color: string;
}

export interface RoiEngineOutput {
  channels: ChannelRoiOutput[];
  totals: {
    totalBudget: number;
    totalClicks: number;
    totalLeads: number;
    totalCustomers: number;
    totalRevenue: number;
    blendedRoas: number;
    netReturn: number;
  };
  disclaimer: string;
}

/**
 * Pure, deterministic ROI calculation engine.
 * Maps monthly budget and AOV across chosen channels using benchmark efficiency rates.
 * Guaranteed 100% deterministic with zero randomness.
 */
export function calculateRoi(input: RoiEngineInput): RoiEngineOutput {
  const { monthlyBudget, averageOrderValue, selectedChannels, currency } = input;

  // Filter valid selected benchmarks
  const activeBenchmarks = selectedChannels
    .map((id) => ROI_BENCHMARKS[id])
    .filter((b): b is ChannelBenchmark => Boolean(b));

  // Handle empty or zero scenarios cleanly
  if (monthlyBudget <= 0 || activeBenchmarks.length === 0) {
    const emptyChannels: ChannelRoiOutput[] = activeBenchmarks.map((b) => ({
      channelId: b.id,
      channelName: b.name,
      allocatedBudget: 0,
      cpc: currency === "INR" ? b.cpcInr : b.cpcUsd,
      clicks: 0,
      leadConversionRate: b.leadConversionRate,
      leads: 0,
      salesConversionRate: b.salesConversionRate,
      customers: 0,
      revenue: 0,
      roas: 0,
      color: b.color,
    }));

    return {
      channels: emptyChannels,
      totals: {
        totalBudget: 0,
        totalClicks: 0,
        totalLeads: 0,
        totalCustomers: 0,
        totalRevenue: 0,
        blendedRoas: 0,
        netReturn: 0,
      },
      disclaimer: ROI_DISCLAIMER,
    };
  }

  // Calculate sum of active weights to allocate budget proportionately
  const totalWeight = activeBenchmarks.reduce((sum, b) => sum + b.weight, 0);

  let allocatedSum = 0;
  const channelOutputs: ChannelRoiOutput[] = activeBenchmarks.map((b, idx) => {
    // Determine allocation share
    const share = b.weight / totalWeight;
    // For last item, reconcile rounding difference so sum equals monthlyBudget
    const allocatedBudget =
      idx === activeBenchmarks.length - 1
        ? monthlyBudget - allocatedSum
        : Math.round(monthlyBudget * share);

    allocatedSum += allocatedBudget;

    const cpc = currency === "INR" ? b.cpcInr : b.cpcUsd;
    const clicks = cpc > 0 ? Math.round(allocatedBudget / cpc) : 0;
    const leads = Math.round(clicks * b.leadConversionRate);
    const customers = Math.round(leads * b.salesConversionRate);
    const revenue = averageOrderValue > 0 ? Math.round(customers * averageOrderValue) : 0;
    const roas = allocatedBudget > 0 ? Number((revenue / allocatedBudget).toFixed(2)) : 0;

    return {
      channelId: b.id,
      channelName: b.name,
      allocatedBudget,
      cpc,
      clicks,
      leadConversionRate: b.leadConversionRate,
      leads,
      salesConversionRate: b.salesConversionRate,
      customers,
      revenue,
      roas,
      color: b.color,
    };
  });

  const totalClicks = channelOutputs.reduce((acc, c) => acc + c.clicks, 0);
  const totalLeads = channelOutputs.reduce((acc, c) => acc + c.leads, 0);
  const totalCustomers = channelOutputs.reduce((acc, c) => acc + c.customers, 0);
  const totalRevenue = channelOutputs.reduce((acc, c) => acc + c.revenue, 0);
  const blendedRoas = monthlyBudget > 0 ? Number((totalRevenue / monthlyBudget).toFixed(2)) : 0;
  const netReturn = totalRevenue - monthlyBudget;

  return {
    channels: channelOutputs,
    totals: {
      totalBudget: monthlyBudget,
      totalClicks,
      totalLeads,
      totalCustomers,
      totalRevenue,
      blendedRoas,
      netReturn,
    },
    disclaimer: ROI_DISCLAIMER,
  };
}

/**
 * Deterministic currency formatter for Indian and US localized presentation.
 */
export function formatCurrency(amount: number, currency: Currency): string {
  const rounded = Math.round(amount);
  if (currency === "INR") {
    return `₹${rounded.toLocaleString("en-IN")}`;
  }
  return `$${rounded.toLocaleString("en-US")}`;
}
