"use client";

import React, { useState, useEffect } from "react";
import { siteConfig } from "@/content/site";
import { useBriefStore } from "@/stores/brief";
import { useCurrencyStore } from "@/stores/currency";
import { formatTelHref } from "@/lib/utils";
import { TransitionLink } from "@/components/ui/TransitionLink";
import {
  Sparkles,
  Send,
  CheckCircle2,
  MapPin,
  Clock,
  Mail,
  Phone,
  X,
  ShieldCheck,
  Building2,
  ChevronDown,
  AlertCircle,
} from "lucide-react";

interface DeliveryResponse {
  delivered: boolean;
  mode: "resend" | "demo";
  refId: string;
  timestamp: string;
}

const DELIVERABLES = [
  {
    title: "3 specific opportunities for your channels",
    detail: "Practical fixes and quick improvements based on your search, ad accounts, and website.",
  },
  {
    title: "A recommended channel mix and starting budget range",
    detail: "Illustrative budget allocation across channels that suit your stage and order value.",
  },
  {
    title: "A 90-day roadmap with targets",
    detail: "Illustrative month-by-month milestones for planning (targets only, not guaranteed results).",
  },
  {
    title: "A reply within 24 business hours",
    detail: "Our team reviews your submission directly and follows up by email or phone.",
  },
];

function formatScenarioMoney(amount: number, currency: "INR" | "USD"): string {
  return new Intl.NumberFormat(currency === "INR" ? "en-IN" : "en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function ContactPage() {
  const {
    selectedServices,
    selectedPlan,
    growthStack,
    roiScenario,
    clearBrief,
    init,
  } = useBriefStore();

  const { currency } = useCurrencyStore();

  useEffect(() => {
    init();
  }, [init]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    website: "",
    budget: "",
    channels: [] as string[],
    goals: "",
  });

  // Hydrate channels from brief store on first load if available
  useEffect(() => {
    if (selectedServices.length > 0) {
      const timer = setTimeout(() => {
        setFormData((prev) => ({
          ...prev,
          channels: Array.from(new Set([...prev.channels, ...selectedServices])),
        }));
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [selectedServices]);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deliveryResult, setDeliveryResult] = useState<DeliveryResponse | null>(null);
  const [submitError, setSubmitError] = useState("");
  const [showDevPayload, setShowDevPayload] = useState(false);
  const [submittedPayload, setSubmittedPayload] = useState<Record<string, unknown> | null>(null);

  const isDemoMode =
    process.env.NEXT_PUBLIC_DEMO_MODE === "true" ||
    process.env.NODE_ENV === "development";

  const channelOptions = [
    "Search Engine Optimization (SEO)",
    "Performance Paid Ads (Google / Meta)",
    "Social Media & Creative Content",
    "Email & CRM Automation",
    "Content Marketing & Authority",
    "Analytics & Conversion Rate Optimization (CRO)",
  ];

  const inrBudgets = [
    "Under ₹1,50,000 / mo",
    "₹1,50,000 – ₹3,00,000 / mo",
    "₹3,00,000 – ₹6,00,000 / mo",
    "₹6,00,000 – ₹15,00,000 / mo",
    "₹15,00,000+ / mo",
  ];

  const usdBudgets = [
    "Under $2,000 / mo",
    "$2,000 – $4,000 / mo",
    "$4,000 – $8,000 / mo",
    "$8,000 – $20,000 / mo",
    "$20,000+ / mo",
  ];

  const budgetOptions = currency === "INR" ? inrBudgets : usdBudgets;

  const toggleChannel = (channel: string) => {
    setFormData((prev) => {
      const exists = prev.channels.includes(channel);
      return {
        ...prev,
        channels: exists
          ? prev.channels.filter((c) => c !== channel)
          : [...prev.channels, channel],
      };
    });
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Full name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Work email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid work email";
    }
    if (!formData.website.trim()) newErrors.website = "Company or website URL is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitError("");

    const hasStack =
      growthStack.awareness.length > 0 ||
      growthStack.consideration.length > 0 ||
      growthStack.conversion.length > 0;

    const payload = {
      name: formData.name,
      email: formData.email,
      website: formData.website,
      budget: formData.budget,
      channels: formData.channels,
      goals: formData.goals,
      selectedPlan: selectedPlan ?? undefined,
      selectedServices: selectedServices.length > 0 ? selectedServices : undefined,
      growthStack: hasStack ? growthStack : undefined,
      roiScenario: roiScenario ?? undefined,
      _hp: "", // honeypot
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setSubmitError(
          data.error ?? `We couldn't send your request. Please email ${siteConfig.contact.email} directly.`
        );
        setIsSubmitting(false);
        return;
      }

      setSubmittedPayload(payload);
      setDeliveryResult({
        delivered: Boolean(data.delivered),
        mode: data.mode === "resend" ? "resend" : "demo",
        refId: data.refId,
        timestamp: data.timestamp || new Date().toISOString(),
      });

      // Confetti burst when request actually delivered (skipped under reduced motion)
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (!prefersReducedMotion && data.delivered) {
        import("canvas-confetti").then(({ default: confetti }) => {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
            colors: ["#C8A25A", "#2563EB", "#FAF9F6", "#60A5FA"],
          });
        });
      }
    } catch {
      setSubmitError(
        `We couldn't send your request. Your form details are safe — please try again or email ${siteConfig.contact.email} directly.`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const hasStackAttached =
    growthStack.awareness.length > 0 ||
    growthStack.consideration.length > 0 ||
    growthStack.conversion.length > 0;

  const hasBriefAttached =
    Boolean(selectedPlan) ||
    selectedServices.length > 0 ||
    hasStackAttached ||
    Boolean(roiScenario);

  return (
    <div className="w-full min-h-screen pt-28 sm:pt-36 pb-20 bg-[#0B0F19] text-white">
      {/* Background atmosphere */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#2563EB]/10 rounded-full blur-[160px]" />
        <div className="absolute bottom-10 left-10 w-[450px] h-[450px] bg-[#C8A25A]/5 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Page Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#C8A25A] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C8A25A] animate-pulse" aria-hidden="true" />
            <span>Free Growth Plan · Pune Studio</span>
          </div>

          <h1 className="font-sans text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] mb-5">
            Get your{" "}
            <span className="bg-gradient-to-r from-[#FAF9F6] via-[#E8D5A3] to-[#C8A25A] bg-clip-text text-transparent">
              free growth plan
            </span>
          </h1>

          <p className="font-sans text-base sm:text-lg text-slate-300 leading-relaxed text-balance">
            Tell us a little about your business and marketing goals. Our team will look over your
            channels and share an illustrative plan within 24 business hours.
          </p>
        </div>

        {/* Attached Brief Banner */}
        {hasBriefAttached && (
          <div className="max-w-4xl mx-auto mb-10 p-5 rounded-2xl bg-gradient-to-r from-[#162035] via-[#101726] to-[#0D1220] border border-[#C8A25A]/40 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-[#C8A25A] shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <span className="text-xs font-mono text-[#C8A25A] font-bold uppercase tracking-wider block mb-1">
                  Attached to Your Request
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedPlan && (
                    <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-[#C8A25A]/10 border border-[#C8A25A]/30 text-[#C8A25A]">
                      Plan: {selectedPlan}
                    </span>
                  )}
                  {roiScenario && (
                    <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-[#C8A25A]/10 border border-[#C8A25A]/30 text-[#E8D5A3]">
                      ROI Lab (Illustrative): {formatScenarioMoney(roiScenario.monthlyBudget, roiScenario.currency)}/mo · {roiScenario.blendedRoas}x est.
                    </span>
                  )}
                  {selectedServices.slice(0, 3).map((s) => (
                    <span key={s} className="text-xs font-mono px-2.5 py-1 rounded-full bg-[#2563EB]/10 border border-[#2563EB]/30 text-[#60A5FA]">
                      {s}
                    </span>
                  ))}
                  {selectedServices.length > 3 && (
                    <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-slate-400">
                      +{selectedServices.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={clearBrief}
              className="flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-white transition-colors shrink-0 cursor-pointer"
              aria-label="Clear attached brief"
            >
              <X className="w-3.5 h-3.5" aria-hidden="true" />
              Clear brief
            </button>
          </div>
        )}

        {/* Confirmation View */}
        {deliveryResult ? (
          <div className="max-w-2xl mx-auto">
            <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-[#131928] to-[#0D1220] border border-[#C8A25A]/40 shadow-2xl text-center">
              <div className="w-14 h-14 rounded-2xl bg-[#C8A25A]/10 border border-[#C8A25A]/30 flex items-center justify-center mx-auto mb-6">
                {deliveryResult.delivered ? (
                  <CheckCircle2 className="w-7 h-7 text-[#C8A25A]" aria-hidden="true" />
                ) : (
                  <AlertCircle className="w-7 h-7 text-[#C8A25A]" aria-hidden="true" />
                )}
              </div>

              {deliveryResult.delivered ? (
                <>
                  <div className="font-mono text-xs text-[#C8A25A] uppercase tracking-widest mb-2">
                    Request Sent
                  </div>
                  <h2 className="font-sans text-2xl sm:text-3xl font-extrabold text-white mb-3">
                    We&apos;ve sent your request to our team.
                  </h2>
                  <p className="text-slate-300 text-sm leading-relaxed mb-6">
                    We will email or call you with your free growth plan within 24 business hours.
                    Look out for a note sent to <span className="text-white font-semibold">{formData.email}</span>.
                  </p>
                </>
              ) : (
                <>
                  <div className="font-mono text-xs text-[#C8A25A] uppercase tracking-widest mb-2">
                    Demo Mode · Not Emailed
                  </div>
                  <h2 className="font-sans text-2xl sm:text-3xl font-extrabold text-white mb-3">
                    Saved in demo preview only.
                  </h2>
                  <p className="text-slate-300 text-sm leading-relaxed mb-6">
                    Email delivery is not enabled on this server yet (<span className="font-mono text-xs">RESEND_API_KEY</span> is missing),
                    so this form was <span className="text-white font-semibold">not sent to our team</span>.
                    To get your growth plan directly, email{" "}
                    <a
                      href={`mailto:${siteConfig.contact.email}`}
                      className="text-[#C8A25A] underline hover:text-white"
                    >
                      {siteConfig.contact.email}
                    </a>{" "}
                    or call{" "}
                    <a
                      href={formatTelHref(siteConfig.contact.phone)}
                      className="text-[#C8A25A] underline hover:text-white"
                    >
                      {siteConfig.contact.phone}
                    </a>
                    .
                  </p>
                </>
              )}

              {/* Boarding pass reference */}
              <div className="p-4 rounded-2xl bg-[#0B0F19] border border-white/10 mb-6 text-left space-y-3">
                <div className="flex justify-between items-center border-b border-white/5 pb-3">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Reference ID</span>
                  <span className="font-mono text-sm font-bold text-[#C8A25A]">{deliveryResult.refId}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Name</span>
                  <span className="font-mono text-xs text-white">{formData.name}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Company / Site</span>
                  <span className="font-mono text-xs text-white truncate max-w-[260px]">{formData.website}</span>
                </div>
                {selectedPlan && (
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Plan</span>
                    <span className="font-mono text-xs text-[#60A5FA]">{selectedPlan}</span>
                  </div>
                )}
                {roiScenario && (
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">ROI Scenario (Illustrative)</span>
                    <span className="font-mono text-xs text-[#E8D5A3]">
                      {formatScenarioMoney(roiScenario.monthlyBudget, roiScenario.currency)}/mo · {roiScenario.blendedRoas}x est.
                    </span>
                  </div>
                )}
                {formData.channels.length > 0 && (
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Channels</span>
                    <div className="flex flex-wrap gap-1.5">
                      {formData.channels.map((c) => (
                        <span key={c} className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#2563EB]/10 border border-[#2563EB]/20 text-[#60A5FA]">
                          {c.split(" (")[0]}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                <div className="flex justify-between items-center border-t border-white/5 pt-3">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Next Step</span>
                  <span className="font-mono text-xs text-white">
                    {deliveryResult.delivered
                      ? "Email or call within 24 business hrs"
                      : "Demo log only (email directly above)"}
                  </span>
                </div>
              </div>

              <div className="text-xs text-slate-400 mb-6">
                All channel figures and roadmap targets we share are illustrative planning estimates, not guaranteed results.
              </div>

              <TransitionLink
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#C8A25A] text-[#0B0F19] font-bold text-sm font-mono shadow-md hover:scale-105 transition-transform"
              >
                Return Home
              </TransitionLink>

              {/* Dev payload drawer — only shown in dev or NEXT_PUBLIC_DEMO_MODE */}
              {isDemoMode && submittedPayload && (
                <div className="mt-6 text-left">
                  <button
                    type="button"
                    onClick={() => setShowDevPayload((v) => !v)}
                    className="flex items-center gap-2 text-xs font-mono text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
                    aria-expanded={showDevPayload}
                    aria-controls="dev-payload-drawer"
                  >
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform ${showDevPayload ? "rotate-180" : ""}`}
                      aria-hidden="true"
                    />
                    Dev payload (JSON)
                  </button>
                  {showDevPayload && (
                    <pre
                      id="dev-payload-drawer"
                      className="mt-3 p-4 rounded-xl bg-[#0B0F19] border border-white/10 text-[10px] font-mono text-slate-300 overflow-x-auto text-left"
                    >
                      {JSON.stringify(
                        {
                          refId: deliveryResult.refId,
                          timestamp: deliveryResult.timestamp,
                          delivered: deliveryResult.delivered,
                          mode: deliveryResult.mode,
                          payload: submittedPayload,
                        },
                        null,
                        2
                      )}
                    </pre>
                  )}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 max-w-6xl mx-auto">
            {/* Form Column */}
            <div className="lg:col-span-8 space-y-6">
              {/* What You'll Get Card */}
              <div className="p-6 rounded-2xl bg-[#0F1422] border border-white/10">
                <div className="flex items-center justify-between gap-2 mb-4">
                  <h2 className="font-sans text-base font-bold text-white">What you&apos;ll get</h2>
                  <span className="text-[10px] font-mono text-[#C8A25A] uppercase tracking-wider">
                    All figures illustrative
                  </span>
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {DELIVERABLES.map((item) => (
                    <li key={item.title} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#C8A25A] shrink-0 mt-0.5" aria-hidden="true" />
                      <div>
                        <div className="text-xs font-semibold text-white">{item.title}</div>
                        <p className="text-xs text-slate-400 leading-relaxed mt-0.5">{item.detail}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                {/* Hidden honeypot */}
                <input
                  type="text"
                  name="_hp"
                  tabIndex={-1}
                  autoComplete="off"
                  className="absolute opacity-0 w-0 h-0 pointer-events-none"
                  aria-hidden="true"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name */}
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-mono text-slate-300 mb-2">
                      Full Name <span className="text-[#C8A25A]" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      autoComplete="name"
                      value={formData.name}
                      onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                      className={`w-full px-4 py-3 rounded-xl bg-[#0F1422] border text-white text-sm font-sans placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/50 transition-colors ${errors.name ? "border-red-500/60" : "border-white/10 hover:border-white/20"}`}
                      placeholder="Your full name"
                      aria-required="true"
                      aria-describedby={errors.name ? "name-error" : undefined}
                    />
                    {errors.name && (
                      <p id="name-error" className="mt-1.5 text-xs text-red-400 font-mono" role="alert">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-mono text-slate-300 mb-2">
                      Work Email <span className="text-[#C8A25A]" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      autoComplete="email"
                      value={formData.email}
                      onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                      className={`w-full px-4 py-3 rounded-xl bg-[#0F1422] border text-white text-sm font-sans placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/50 transition-colors ${errors.email ? "border-red-500/60" : "border-white/10 hover:border-white/20"}`}
                      placeholder="you@company.com"
                      aria-required="true"
                      aria-describedby={errors.email ? "email-error" : undefined}
                    />
                    {errors.email && (
                      <p id="email-error" className="mt-1.5 text-xs text-red-400 font-mono" role="alert">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Website / Company */}
                <div>
                  <label htmlFor="contact-website" className="block text-xs font-mono text-slate-300 mb-2">
                    Company / Website URL <span className="text-[#C8A25A]" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="contact-website"
                    type="text"
                    autoComplete="url"
                    value={formData.website}
                    onChange={(e) => setFormData((p) => ({ ...p, website: e.target.value }))}
                    className={`w-full px-4 py-3 rounded-xl bg-[#0F1422] border text-white text-sm font-sans placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/50 transition-colors ${errors.website ? "border-red-500/60" : "border-white/10 hover:border-white/20"}`}
                    placeholder="Acme Brands or https://yourcompany.com"
                    aria-required="true"
                    aria-describedby={errors.website ? "website-error" : undefined}
                  />
                  {errors.website && (
                    <p id="website-error" className="mt-1.5 text-xs text-red-400 font-mono" role="alert">
                      {errors.website}
                    </p>
                  )}
                </div>

                {/* Budget */}
                <div>
                  <label htmlFor="contact-budget" className="block text-xs font-mono text-slate-300 mb-2">
                    Monthly Marketing Budget
                  </label>
                  <select
                    id="contact-budget"
                    value={formData.budget}
                    onChange={(e) => setFormData((p) => ({ ...p, budget: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl bg-[#0F1422] border border-white/10 hover:border-white/20 text-white text-sm font-sans focus:outline-none focus:ring-2 focus:ring-[#2563EB]/50 transition-colors cursor-pointer appearance-none"
                  >
                    <option value="" className="bg-[#0F1422]">Select a range (optional)</option>
                    {budgetOptions.map((b) => (
                      <option key={b} value={b} className="bg-[#0F1422]">{b}</option>
                    ))}
                  </select>
                </div>

                {/* Channels */}
                <div>
                  <span className="block text-xs font-mono text-slate-300 mb-3">
                    Channels of Interest
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {channelOptions.map((ch) => {
                      const isChecked = formData.channels.includes(ch);
                      return (
                        <button
                          key={ch}
                          type="button"
                          onClick={() => toggleChannel(ch)}
                          role="checkbox"
                          aria-checked={isChecked}
                          className={`px-4 py-2.5 rounded-xl border text-left text-xs font-sans transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#C8A25A]/40 ${
                            isChecked
                              ? "bg-[#162035] border-[#3B82F6]/60 text-white"
                              : "bg-white/[0.02] border-white/5 text-slate-400 hover:border-white/15"
                          }`}
                        >
                          {ch}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Goals */}
                <div>
                  <label htmlFor="contact-goals" className="block text-xs font-mono text-slate-300 mb-2">
                    Your Goals &amp; Current Bottlenecks
                  </label>
                  <textarea
                    id="contact-goals"
                    rows={4}
                    value={formData.goals}
                    onChange={(e) => setFormData((p) => ({ ...p, goals: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl bg-[#0F1422] border border-white/10 hover:border-white/20 text-white text-sm font-sans placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/50 transition-colors resize-y"
                    placeholder="Share your 3-month goals, what channels you run today, or what feels stuck..."
                  />
                </div>

                {/* Error banner */}
                {submitError && (
                  <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs font-mono leading-relaxed" role="alert">
                    {submitError}
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-8 rounded-xl bg-gradient-to-r from-[#C8A25A] via-[#E8D5A3] to-[#C8A25A] text-[#0B0F19] font-bold text-sm font-sans tracking-wide shadow-lg flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] transition-transform disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                  aria-busy={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="inline-block w-4 h-4 border-2 border-[#0B0F19]/40 border-t-[#0B0F19] rounded-full animate-spin" aria-hidden="true" />
                      Sending your request...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" aria-hidden="true" />
                      Send me my growth plan
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Contact Details Column */}
            <div className="lg:col-span-4 space-y-5">
              <div className="p-6 rounded-2xl bg-[#0F1422] border border-white/10 space-y-5">
                <h3 className="font-sans text-base font-bold text-white">Studio Details</h3>

                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#C8A25A] shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <span className="text-xs font-mono text-slate-400 block mb-0.5">Location</span>
                    <span className="text-sm text-white">{siteConfig.contact.address}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#C8A25A] shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <span className="text-xs font-mono text-slate-400 block mb-0.5">Studio Hours</span>
                    <span className="text-sm text-white">{siteConfig.contact.hours}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#C8A25A] shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <span className="text-xs font-mono text-slate-400 block mb-0.5">Email</span>
                    <a
                      href={`mailto:${siteConfig.contact.email}`}
                      className="text-sm text-white hover:text-[#C8A25A] transition-colors break-all"
                    >
                      {siteConfig.contact.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#C8A25A] shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <span className="text-xs font-mono text-slate-400 block mb-0.5">Phone</span>
                    <a
                      href={formatTelHref(siteConfig.contact.phone)}
                      className="text-sm text-white hover:text-[#C8A25A] transition-colors"
                    >
                      {siteConfig.contact.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Building2 className="w-4 h-4 text-[#C8A25A] shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <span className="text-xs font-mono text-slate-400 block mb-0.5">Reply Window</span>
                    <span className="text-sm text-white">Within 24 business hours</span>
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#0F1422] border border-white/10">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-4 h-4 text-[#C8A25A] shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <span className="text-xs font-mono text-[#C8A25A] font-bold block mb-1">Plain &amp; Honest Terms</span>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      We review every submission personally and reply within 24 business hours by email or phone.
                      All plan projections are illustrative planning targets, not guaranteed financial outcomes.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
