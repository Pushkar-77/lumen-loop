"use client";

import React, { useState, useEffect } from "react";
import { siteConfig } from "@/content/site";
import { useBriefStore } from "@/stores/brief";
import { useCurrencyStore } from "@/stores/currency";
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
} from "lucide-react";

export default function ContactPage() {
  const {
    selectedServices,
    selectedPlan,
    growthStack,
    clearBrief,
    init,
  } = useBriefStore();

  const { currency } = useCurrencyStore();

  useEffect(() => {
    init();
  }, [init]);

  // Form Fields
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    website: "",
    budget: "",
    channels: [] as string[],
    notes: "",
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
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionId, setSubmissionId] = useState("");

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate luxury API response
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setSubmissionId(`LL-${Math.floor(100000 + Math.random() * 900000)}`);
    }, 1200);
  };

  const hasBriefAttached =
    Boolean(selectedPlan) ||
    selectedServices.length > 0 ||
    growthStack.awareness.length > 0;

  return (
    <div className="w-full min-h-screen pt-28 sm:pt-36 pb-20 bg-[#0B0F19] text-white">
      {/* Background atmosphere */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#2563EB]/10 rounded-full blur-[160px]" />
        <div className="absolute bottom-10 left-10 w-[450px] h-[450px] bg-[#C8A25A]/5 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Page Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#C8A25A] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C8A25A] animate-pulse" />
            <span>Growth Sprints · Pune Studio</span>
          </div>

          <h1 className="font-sans text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] mb-5">
            Let&apos;s Build Something <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-[#FAF9F6] via-[#E8D5A3] to-[#C8A25A] bg-clip-text text-transparent">
              Measurable.
            </span>
          </h1>

          <p className="font-sans text-base sm:text-lg text-slate-300 leading-relaxed text-balance">
            Share your current growth stage and targets. Our team will review your digital footprint
            and return a technical, illustrative growth audit within 24 hours.
          </p>
        </div>

        {/* Attached Brief Banner (If arrived from Services Stack Builder or Pricing) */}
        {hasBriefAttached && (
          <div className="max-w-4xl mx-auto mb-10 p-5 rounded-2xl bg-gradient-to-r from-[#162035] via-[#101726] to-[#0D1220] border border-[#C8A25A]/40 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#C8A25A]/20 border border-[#C8A25A]/40 text-[#C8A25A] flex items-center justify-center shrink-0 mt-0.5">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-sans font-bold text-sm text-white">
                    Growth Brief Attached
                  </span>
                  <span className="text-[10px] font-mono text-[#C8A25A] bg-[#C8A25A]/15 px-2 py-0.5 rounded border border-[#C8A25A]/30">
                    Pre-filled
                  </span>
                </div>
                <div className="text-xs text-slate-300 mt-1">
                  {selectedPlan && (
                    <span className="mr-3">
                      Selected Plan: <strong className="text-white">{selectedPlan}</strong>
                    </span>
                  )}
                  {selectedServices.length > 0 && (
                    <span>
                      Selected Channels: <strong className="text-white">{selectedServices.length} items</strong>
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-center">
              <TransitionLink
                href="/services"
                className="text-xs font-mono text-slate-400 hover:text-white underline cursor-pointer"
              >
                Edit on Services
              </TransitionLink>
              <button
                type="button"
                onClick={clearBrief}
                className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                title="Clear attached brief"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Main Grid: Form Left, Studio Info Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 max-w-5xl mx-auto items-start">
          {/* Form Container (7 cols) */}
          <div className="lg:col-span-7 rounded-3xl bg-[#0F1422] border border-white/10 p-7 sm:p-9 shadow-2xl">
            {isSubmitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-[#C8A25A]/20 border border-[#C8A25A]/40 text-[#C8A25A] flex items-center justify-center mx-auto mb-5">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-sans text-2xl font-bold text-white mb-2">
                  Growth Audit Requested
                </h3>
                <p className="text-sm text-slate-300 max-w-md mx-auto mb-6">
                  Thank you, <strong className="text-white">{formData.name}</strong>. We have received your brief
                  for <strong className="text-white">{formData.website}</strong>.
                </p>

                <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-left max-w-sm mx-auto mb-6 space-y-1.5 text-slate-300">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Reference ID:</span>
                    <span className="text-[#C8A25A] font-bold">{submissionId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Estimated Review:</span>
                    <span className="text-white">Within 24 Business Hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Studio Timezone:</span>
                    <span className="text-white">Asia/Kolkata (IST)</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({
                      name: "",
                      email: "",
                      website: "",
                      budget: "",
                      channels: [],
                      notes: "",
                    });
                  }}
                  className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/15 text-xs font-mono text-slate-200 transition-colors cursor-pointer"
                >
                  Submit Another Brief
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="border-b border-white/10 pb-4 mb-2">
                  <h3 className="font-sans text-xl font-bold text-white">
                    Request an Illustrative Growth Audit
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    No generic pitch decks. We evaluate your current funnel and show compounding gaps.
                  </p>
                </div>

                {/* Name */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5">
                    Your Name <span className="text-[#C8A25A]">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Aditi Deshmukh"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#C8A25A] focus:outline-none text-sm text-white placeholder-slate-400 transition-colors"
                  />
                  {errors.name && (
                    <span className="text-[11px] text-red-400 mt-1 block">{errors.name}</span>
                  )}
                </div>

                {/* Email & Website Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5">
                      Work Email <span className="text-[#C8A25A]">*</span>
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="aditi@brand.com"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#C8A25A] focus:outline-none text-sm text-white placeholder-slate-400 transition-colors"
                    />
                    {errors.email && (
                      <span className="text-[11px] text-red-400 mt-1 block">{errors.email}</span>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5">
                      Company / Website <span className="text-[#C8A25A]">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                      placeholder="brand.com"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#C8A25A] focus:outline-none text-sm text-white placeholder-slate-400 transition-colors"
                    />
                    {errors.website && (
                      <span className="text-[11px] text-red-400 mt-1 block">{errors.website}</span>
                    )}
                  </div>
                </div>

                {/* Monthly Marketing Budget */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5">
                    Monthly Marketing Budget ({currency})
                  </label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#131928] border border-white/10 focus:border-[#C8A25A] focus:outline-none text-sm text-white transition-colors cursor-pointer"
                  >
                    <option value="">Select expected investment range...</option>
                    {budgetOptions.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Channels of Interest */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
                    Channels of Interest
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {channelOptions.map((ch) => {
                      const isChecked = formData.channels.some((c) =>
                        ch.toLowerCase().includes(c.toLowerCase()) || c.toLowerCase().includes(ch.toLowerCase())
                      );
                      return (
                        <button
                          key={ch}
                          type="button"
                          onClick={() => toggleChannel(ch)}
                          className={`p-2.5 rounded-lg border text-left text-xs transition-all flex items-center justify-between cursor-pointer ${
                            isChecked
                              ? "bg-[#C8A25A]/15 border-[#C8A25A] text-white"
                              : "bg-white/[0.02] border-white/10 text-slate-300 hover:border-white/20"
                          }`}
                        >
                          <span className="leading-tight">{ch}</span>
                          <span
                            className={`w-3.5 h-3.5 rounded flex items-center justify-center shrink-0 border ml-2 ${
                              isChecked
                                ? "bg-[#C8A25A] border-[#C8A25A] text-[#0B0F19]"
                                : "border-white/30"
                            }`}
                          >
                            {isChecked && <CheckCircle2 className="w-3 h-3" />}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Goals / Message */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5">
                    Growth Goals & Current Bottlenecks
                  </label>
                  <textarea
                    rows={3}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Tell us about your current CAC, conversion rate, or growth targets..."
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#C8A25A] focus:outline-none text-sm text-white placeholder-slate-400 transition-colors resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#C8A25A] via-[#E8D5A3] to-[#C8A25A] text-[#0B0F19] font-sans font-bold text-sm tracking-wide shadow-[0_4px_25px_rgba(200,162,90,0.35)] hover:shadow-[0_4px_35px_rgba(200,162,90,0.55)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 rounded-full border-2 border-[#0B0F19] border-t-transparent animate-spin" />
                      <span>Reviewing Site Telemetry...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Growth Audit Brief</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>

                <div className="text-center text-[11px] font-mono text-slate-400">
                  Strict confidentiality · NDA protected upon request
                </div>
              </form>
            )}
          </div>

          {/* Studio Contact Info (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Studio Location Card */}
            <div className="p-7 rounded-3xl bg-[#0F1422] border border-white/10">
              <div className="flex items-center gap-2.5 mb-5 pb-4 border-b border-white/10">
                <Building2 className="w-5 h-5 text-[#C8A25A]" />
                <span className="font-sans font-bold text-base text-white">
                  Pune Growth Studio
                </span>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#C8A25A] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-medium">Studio Location</strong>
                    <span className="text-slate-300 leading-relaxed block mt-0.5">
                      {siteConfig.contact.address}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#C8A25A] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-medium">Studio Hours</strong>
                    <span className="text-slate-300 mt-0.5 block">
                      {siteConfig.contact.hours}
                    </span>
                    <span className="text-[11px] font-mono text-[#60A5FA] block mt-1">
                      Timezone: {siteConfig.location.timezone} (IST)
                    </span>
                  </div>
                </div>

                {/* Explicit Placeholder Notice */}
                <div className="pt-3 border-t border-white/10 space-y-2">
                  <div className="flex items-center gap-2 text-slate-400 text-xs font-mono">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    <span>{siteConfig.contact.email}</span>
                    <span className="text-[9px] text-[#C8A25A] bg-[#C8A25A]/15 px-1.5 py-0.2 rounded border border-[#C8A25A]/30">
                      Sample Email
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400 text-xs font-mono">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    <span>{siteConfig.contact.phone}</span>
                    <span className="text-[9px] text-[#C8A25A] bg-[#C8A25A]/15 px-1.5 py-0.2 rounded border border-[#C8A25A]/30">
                      Sample Phone
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quiet Luxury SLA Note */}
            <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/8 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-[#C8A25A] uppercase tracking-wider font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>Our Partnership Pledge</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                We work with a capped roster of ambitious brands to ensure our senior strategists
                remain directly involved in execution and weekly experimentation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
