"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/content/site";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { useCurrencyStore } from "@/stores/currency";
import { Menu, X, ArrowUpRight, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const pathname = usePathname();
  const { currency, toggleCurrency } = useCurrencyStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);

  // Close mobile drawer on route change during render
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setMobileMenuOpen(false);
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[9000] flex justify-center px-4 sm:px-6 pt-4 sm:pt-6 pointer-events-none">
        <nav
          className={`pointer-events-auto w-full max-w-6xl transition-all duration-300 rounded-full px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between navbar-surface ${
            isScrolled
              ? "shadow-[0_20px_40px_rgba(0,0,0,0.85)] border-white/20"
              : "border-white/12"
          }`}
          aria-label="Main Navigation"
        >
          {/* Brand Wordmark */}
          <TransitionLink
            href="/"
            className="flex items-center gap-2.5 text-left group"
            aria-label={`${siteConfig.name} Homepage`}
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#2563EB] via-[#60A5FA] to-[#C8A25A] p-[1.5px] flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
              <div className="w-full h-full rounded-full bg-[#0B0F19] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-[#C8A25A] transition-transform duration-300 group-hover:rotate-12" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-sans font-bold text-base sm:text-lg tracking-tight text-[#F8FAFC]">
                {siteConfig.name}
              </span>
              <span className="font-mono text-[9px] text-[#C8A25A] uppercase tracking-widest hidden sm:block">
                Pune · Growth Lab
              </span>
            </div>
          </TransitionLink>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {siteConfig.navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <TransitionLink
                  key={link.href}
                  href={link.href}
                  className={`relative px-3.5 py-1.5 text-sm font-medium transition-colors rounded-full ${
                    isActive
                      ? "text-[#F8FAFC]"
                      : "text-slate-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute inset-0 rounded-full bg-white/10 border border-white/15 -z-10 transition-all duration-300" />
                  )}
                </TransitionLink>
              );
            })}
          </div>

          {/* Actions: Currency Toggle + Primary CTA + Mobile Trigger */}
          <div className="flex items-center gap-3">
            {/* Currency Pill Switch */}
            <button
              onClick={toggleCurrency}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono transition-colors text-slate-300 cursor-pointer"
              title="Toggle currency format (INR / USD)"
              aria-label={`Current currency: ${currency}. Click to switch.`}
            >
              <span className="text-[10px] text-slate-400">FX:</span>
              <span
                className={`font-semibold ${
                  currency === "INR" ? "text-[#C8A25A]" : "text-slate-400"
                }`}
              >
                ₹ INR
              </span>
              <span className="text-white/20">|</span>
              <span
                className={`font-semibold ${
                  currency === "USD" ? "text-[#60A5FA]" : "text-slate-400"
                }`}
              >
                $ USD
              </span>
            </button>

            {/* Primary Magnetic CTA Button */}
            <TransitionLink
              href="/contact"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold tracking-wide bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] hover:from-[#3B82F6] hover:to-[#2563EB] text-white shadow-[0_0_20px_rgba(37,99,235,0.35)] hover:shadow-[0_0_25px_rgba(37,99,235,0.5)] border border-blue-400/30 transition-all duration-200 active:scale-95"
            >
              <span>Start Project</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </TransitionLink>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 cursor-pointer"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Slide-down Glass Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop dimming overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-[8998] bg-black/80 backdrop-blur-md lg:hidden"
              aria-hidden="true"
            />

            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="fixed inset-x-4 top-20 z-[8999] lg:hidden p-6 rounded-3xl bg-[#0B0F19] border border-white/20 shadow-[0_25px_60px_rgba(0,0,0,0.8)] flex flex-col gap-4"
            >
            <div className="flex flex-col gap-1 pb-4 border-b border-white/10">
              <span className="font-mono text-xs text-[#C8A25A] uppercase tracking-wider">
                Directory
              </span>
              <span className="text-xs text-slate-400">
                {siteConfig.location.full} · {siteConfig.currencies.default}
              </span>
            </div>

            <div className="flex flex-col gap-2">
              {siteConfig.navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <TransitionLink
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-4 py-3 rounded-2xl text-base font-medium flex items-center justify-between transition-colors ${
                      isActive
                        ? "bg-white/10 text-white font-semibold"
                        : "text-slate-300 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className="w-4 h-4 opacity-50" />
                  </TransitionLink>
                );
              })}
            </div>

            <div className="pt-2 flex flex-col gap-3">
              <TransitionLink
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 rounded-2xl text-center text-sm font-semibold bg-[#2563EB] text-white hover:bg-blue-600 transition-colors shadow-lg"
              >
                Start a Project
              </TransitionLink>
            </div>
          </motion.div>
        </>
        )}
      </AnimatePresence>
    </>
  );
}
