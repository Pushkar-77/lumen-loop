import { describe, it, expect } from "vitest";
import { calculateRoi, formatCurrency, ROI_BENCHMARKS } from "../src/lib/roi-engine";

describe("ROI Engine Unit Tests", () => {
  // 1. Zero Budget Test
  it("handles zero budget cleanly with 0 values", () => {
    const res = calculateRoi({
      monthlyBudget: 0,
      averageOrderValue: 2500,
      selectedChannels: ["seo", "google-search"],
      currency: "INR",
    });

    expect(res.totals.totalBudget).toBe(0);
    expect(res.totals.totalClicks).toBe(0);
    expect(res.totals.totalLeads).toBe(0);
    expect(res.totals.totalCustomers).toBe(0);
    expect(res.totals.totalRevenue).toBe(0);
    expect(res.totals.blendedRoas).toBe(0);
    expect(res.totals.netReturn).toBe(0);

    for (const ch of res.channels) {
      expect(ch.allocatedBudget).toBe(0);
      expect(ch.clicks).toBe(0);
      expect(ch.leads).toBe(0);
      expect(ch.customers).toBe(0);
      expect(ch.revenue).toBe(0);
      expect(ch.roas).toBe(0);
    }
  });

  // 2. Single Channel Test
  it("allocates 100% of budget to a single selected channel", () => {
    const res = calculateRoi({
      monthlyBudget: 100000,
      averageOrderValue: 5000,
      selectedChannels: ["seo"],
      currency: "INR",
    });

    expect(res.channels).toHaveLength(1);
    const seo = res.channels[0];
    expect(seo.channelId).toBe("seo");
    expect(seo.allocatedBudget).toBe(100000);
    expect(res.totals.totalBudget).toBe(100000);

    // CPC for SEO in INR is 18
    const expectedClicks = Math.round(100000 / 18);
    expect(seo.clicks).toBe(expectedClicks);

    // Lead conversion rate 4.5%
    const expectedLeads = Math.round(expectedClicks * 0.045);
    expect(seo.leads).toBe(expectedLeads);

    // Sales conversion rate 16%
    const expectedCustomers = Math.round(expectedLeads * 0.16);
    expect(seo.customers).toBe(expectedCustomers);

    // Revenue = customers * AOV
    const expectedRevenue = expectedCustomers * 5000;
    expect(seo.revenue).toBe(expectedRevenue);
    expect(res.totals.totalRevenue).toBe(expectedRevenue);
  });

  // 3. All Channels Test
  it("correctly reconciles budget across all channels with zero leakage", () => {
    const allChannelIds = Object.keys(ROI_BENCHMARKS);
    const monthlyBudget = 250000;

    const res = calculateRoi({
      monthlyBudget,
      averageOrderValue: 3500,
      selectedChannels: allChannelIds,
      currency: "INR",
    });

    expect(res.channels).toHaveLength(allChannelIds.length);

    // The sum of allocated budgets must EXACTLY equal monthlyBudget
    const sumAllocated = res.channels.reduce((sum, ch) => sum + ch.allocatedBudget, 0);
    expect(sumAllocated).toBe(monthlyBudget);
    expect(res.totals.totalBudget).toBe(monthlyBudget);

    // Positive metrics across all channels
    for (const ch of res.channels) {
      expect(ch.allocatedBudget).toBeGreaterThan(0);
      expect(ch.clicks).toBeGreaterThan(0);
      expect(ch.leads).toBeGreaterThan(0);
      expect(ch.customers).toBeGreaterThan(0);
      expect(ch.revenue).toBeGreaterThan(0);
      expect(ch.roas).toBeGreaterThan(0);
    }

    expect(res.totals.blendedRoas).toBeGreaterThan(0);
  });

  // 4. Boundary Values
  describe("boundary values", () => {
    it("handles minimum budget of 1 unit without crashing", () => {
      const res = calculateRoi({
        monthlyBudget: 1,
        averageOrderValue: 100,
        selectedChannels: ["seo", "meta-ads"],
        currency: "USD",
      });

      expect(res.totals.totalBudget).toBe(1);
      const sum = res.channels.reduce((s, c) => s + c.allocatedBudget, 0);
      expect(sum).toBe(1);
    });

    it("handles large scale budgets reliably", () => {
      const res = calculateRoi({
        monthlyBudget: 50000000, // 5 Crore INR
        averageOrderValue: 15000,
        selectedChannels: ["seo", "google-search", "meta-ads", "email-crm"],
        currency: "INR",
      });

      expect(res.totals.totalBudget).toBe(50000000);
      expect(res.totals.totalRevenue).toBeGreaterThan(50000000);
      expect(res.totals.netReturn).toBe(res.totals.totalRevenue - 50000000);
    });

    it("handles zero AOV producing zero revenue and zero ROAS", () => {
      const res = calculateRoi({
        monthlyBudget: 50000,
        averageOrderValue: 0,
        selectedChannels: ["seo", "meta-ads"],
        currency: "INR",
      });

      expect(res.totals.totalLeads).toBeGreaterThan(0);
      expect(res.totals.totalCustomers).toBeGreaterThan(0);
      expect(res.totals.totalRevenue).toBe(0);
      expect(res.totals.blendedRoas).toBe(0);
      expect(res.totals.netReturn).toBe(-50000);
    });

    it("handles empty channels gracefully", () => {
      const res = calculateRoi({
        monthlyBudget: 50000,
        averageOrderValue: 1000,
        selectedChannels: [],
        currency: "INR",
      });

      expect(res.channels).toHaveLength(0);
      expect(res.totals.totalBudget).toBe(0);
      expect(res.totals.totalRevenue).toBe(0);
    });
  });

  // 5. Currency Formatting
  describe("currency formatting", () => {
    it("formats Indian Rupee (INR) numbers in Indian standard notation", () => {
      expect(formatCurrency(24999, "INR")).toBe("₹24,999");
      expect(formatCurrency(150000, "INR")).toBe("₹1,50,000");
      expect(formatCurrency(1000000, "INR")).toBe("₹10,00,000");
    });

    it("formats US Dollars (USD) in standard international notation", () => {
      expect(formatCurrency(299, "USD")).toBe("$299");
      expect(formatCurrency(1799, "USD")).toBe("$1,799");
      expect(formatCurrency(10000, "USD")).toBe("$10,000");
    });
  });

  // 6. Determinism Test
  describe("determinism", () => {
    it("produces identical results across 100 consecutive executions", () => {
      const input = {
        monthlyBudget: 75000,
        averageOrderValue: 3200,
        selectedChannels: ["seo", "google-search", "meta-ads", "cro"],
        currency: "INR" as const,
      };

      const baseline = calculateRoi(input);

      for (let i = 0; i < 100; i++) {
        const result = calculateRoi(input);
        expect(result).toEqual(baseline);
      }
    });
  });
});
