"use client";

import React, { useState } from "react";
import { pricingFaqs } from "@/content/pricing-data";
import { ChevronDown, HelpCircle } from "lucide-react";

export function PricingFaq() {
  const [openIds, setOpenIds] = useState<string[]>(["contracts", "ad-spend"]);

  const toggle = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="w-full mt-24 pt-16 border-t border-white/10">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#C8A25A] mb-3">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Transparent Partnership</span>
        </div>
        <h3 className="font-sans text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
          Frequently Answered Questions
        </h3>
        <p className="text-slate-300 text-xs sm:text-sm mt-2">
          Everything you need to know about our contract structures, media budget handling, and compounding philosophy.
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-3">
        {pricingFaqs.map((faq) => {
          const isOpen = openIds.includes(faq.id);
          return (
            <div
              key={faq.id}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                isOpen
                  ? "bg-[#0F1422] border-[#C8A25A]/40 shadow-lg shadow-black/40"
                  : "bg-white/[0.02] border-white/10 hover:border-white/20"
              }`}
            >
              <button
                type="button"
                onClick={() => toggle(faq.id)}
                className="w-full py-5 px-6 flex items-center justify-between text-left gap-4 cursor-pointer"
                aria-expanded={isOpen}
              >
                <span className="font-sans font-bold text-sm sm:text-base text-white">
                  {faq.question}
                </span>
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 border transition-transform duration-300 ${
                    isOpen
                      ? "rotate-180 bg-[#C8A25A] text-[#0B0F19] border-[#C8A25A]"
                      : "bg-white/5 text-slate-400 border-white/10"
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </span>
              </button>

              {isOpen && (
                <div className="px-6 pb-6 pt-1 text-slate-300 text-xs sm:text-sm leading-relaxed border-t border-white/5 font-sans">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
