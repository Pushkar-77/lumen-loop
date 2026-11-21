"use client";

import React, { useState } from "react";
import { comparisonMatrix } from "@/content/pricing-data";
import { Check, Minus, ChevronDown, ChevronUp } from "lucide-react";

export function PricingComparison() {
  const [isExpanded, setIsExpanded] = useState(true);

  const renderValue = (val: string | boolean) => {
    if (typeof val === "boolean") {
      return val ? (
        <div className="w-5 h-5 rounded-full bg-[#C8A25A]/20 text-[#C8A25A] flex items-center justify-center mx-auto">
          <Check className="w-3.5 h-3.5" />
        </div>
      ) : (
        <div className="w-5 h-5 text-slate-300 flex items-center justify-center mx-auto">
          <Minus className="w-3.5 h-3.5" />
        </div>
      );
    }
    return <span className="font-mono text-xs text-slate-200">{val}</span>;
  };

  return (
    <div className="w-full mt-20 pt-16 border-t border-white/10">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-mono text-[#C8A25A] uppercase tracking-wider block mb-1">
            Exhaustive Breakdown
          </span>
          <h3 className="font-sans text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Detailed Deliverables Comparison
          </h3>
          <p className="text-slate-300 text-xs sm:text-sm mt-1">
            Compare capabilities, sprint cadences, and response SLAs across all three retainers.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-slate-300 cursor-pointer"
        >
          <span>{isExpanded ? "Collapse Matrix" : "Expand Matrix"}</span>
          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {isExpanded && (
        <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#0F1422] shadow-xl">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-white/10 bg-[#131928]">
                <th className="py-4 px-6 text-xs font-mono uppercase tracking-wider text-slate-400 w-2/5">
                  Deliverable / Capability
                </th>
                <th className="py-4 px-4 text-xs font-mono uppercase tracking-wider text-slate-300 text-center w-1/5">
                  Starter
                </th>
                <th className="py-4 px-4 text-xs font-mono uppercase tracking-wider text-[#C8A25A] text-center w-1/5 bg-[#C8A25A]/5 border-x border-[#C8A25A]/20">
                  Growth ★
                </th>
                <th className="py-4 px-4 text-xs font-mono uppercase tracking-wider text-slate-300 text-center w-1/5">
                  Scale
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonMatrix.map((cat, catIdx) => (
                <React.Fragment key={catIdx}>
                  <tr className="bg-white/[0.02] border-b border-white/5">
                    <td
                      colSpan={4}
                      className="py-3 px-6 text-xs font-mono font-bold text-[#E8D5A3] uppercase tracking-wider bg-[#0B0F19]"
                    >
                      {cat.category}
                    </td>
                  </tr>
                  {cat.items.map((item, itemIdx) => (
                    <tr
                      key={itemIdx}
                      className="border-b border-white/5 hover:bg-white/[0.02] transition-colors"
                    >
                      <td className="py-3.5 px-6 text-xs sm:text-sm text-slate-200 font-medium">
                        {item.name}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        {renderValue(item.starter)}
                      </td>
                      <td className="py-3.5 px-4 text-center bg-[#C8A25A]/5 border-x border-[#C8A25A]/10">
                        {renderValue(item.growth)}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        {renderValue(item.scale)}
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
