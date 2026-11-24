"use client";

import React, { useMemo } from "react";
import { ChannelRoiOutput, formatCurrency, Currency } from "@/lib/roi-engine";
import { CANONICAL_CHANNEL_ORDER } from "./RevenueSkylineScene";

interface RevenueSkylineFallbackProps {
  channels: ChannelRoiOutput[];
  currency: Currency;
  maxRevenue: number;
}

export function RevenueSkylineFallback({
  channels,
  currency,
}: RevenueSkylineFallbackProps) {
  // Keep channel order identical to 3D scene and legend
  const sortedChannels = useMemo(() => {
    return [...channels].sort((a, b) => {
      const idxA = CANONICAL_CHANNEL_ORDER.indexOf(a.channelId);
      const idxB = CANONICAL_CHANNEL_ORDER.indexOf(b.channelId);
      return (idxA === -1 ? 99 : idxA) - (idxB === -1 ? 99 : idxB);
    });
  }, [channels]);

  const maxActiveRevenue = useMemo(() => {
    if (sortedChannels.length === 0) return 0;
    return Math.max(...sortedChannels.map((c) => c.revenue), 1);
  }, [sortedChannels]);

  return (
    <div
      role="region"
      aria-label="Revenue distribution bar chart"
      className="w-full h-full min-h-[380px] sm:min-h-[440px] flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-[#0F1422] border border-white/10"
    >
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
        <div>
          <span className="text-[11px] font-mono text-[#C8A25A] uppercase tracking-wider block">
            Revenue Skyline
          </span>
          <span className="font-sans font-bold text-sm text-white">
            Channel Revenue Distribution
          </span>
        </div>
        <div className="flex items-center gap-2">
          {maxActiveRevenue > 0 && (
            <span className="text-[10px] font-mono text-slate-300 bg-white/5 px-2.5 py-1 rounded border border-white/10 tabular-nums">
              Tallest bar = <span className="text-[#C8A25A] font-bold">{formatCurrency(maxActiveRevenue, currency)}</span>
            </span>
          )}
          <span className="text-[10px] font-mono text-slate-400 bg-white/5 px-2 py-0.5 rounded border border-white/10">
            2D Accessible Fallback
          </span>
        </div>
      </div>

      {sortedChannels.length === 0 ? (
        <div className="flex-1 flex items-center justify-center text-xs font-mono text-slate-400">
          Select at least one channel to render distribution
        </div>
      ) : (
        <div className="space-y-4 flex-1 flex flex-col justify-center">
          {sortedChannels.map((ch) => {
            const pct = maxActiveRevenue > 0 ? Math.min(100, Math.round((ch.revenue / maxActiveRevenue) * 100)) : 0;
            return (
              <div key={ch.channelId} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: ch.color }}
                    />
                    <span className="font-medium text-white truncate max-w-[180px] sm:max-w-none">
                      {ch.channelName}
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5 font-mono">
                    <span className="text-[#C8A25A] font-bold">
                      {formatCurrency(ch.revenue, currency)}
                    </span>
                    <span className="text-[10px] text-slate-400 bg-white/5 px-1.5 py-0.2 rounded border border-white/10">
                      {ch.roas}x ROAS
                    </span>
                  </div>
                </div>

                {/* Progress bar container */}
                <div className="w-full h-3 rounded-full bg-white/5 border border-white/10 overflow-hidden relative">
                  <div
                    className="h-full rounded-full transition-all duration-500 relative flex items-center justify-end"
                    style={{
                      width: `${Math.max(4, pct)}%`,
                      backgroundColor: ch.color,
                    }}
                  >
                    {/* Gold cap indicator */}
                    <span className="w-1.5 h-full bg-[#C8A25A] rounded-r-full shrink-0" />
                  </div>
                </div>

                <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <span>Leads: {ch.leads.toLocaleString()}</span>
                  <span>Customers: {ch.customers.toLocaleString()}</span>
                  <span>Budget: {formatCurrency(ch.allocatedBudget, currency)}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="pt-3 mt-4 border-t border-white/10 text-[10px] font-mono text-slate-400 text-center">
        *Relative height & bar length reflect calculated scenario revenue.
      </div>
    </div>
  );
}
