"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { useTransitionStore } from "@/stores/transition";
import { useDelightStore } from "@/stores/delight";

interface TransitionLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export function TransitionLink({
  href,
  children,
  className,
  onClick,
  ...props
}: TransitionLinkProps) {
  const router = useRouter();
  const currentPath = usePathname();
  const { startTransition, endTransition, isTransitioning } = useTransitionStore();
  const reduceDelight = useDelightStore((s) => s.reduceDelight);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) onClick(e);

    // If default prevented or modified click (cmd/ctrl for new tab) or external, let native handler take it
    if (
      e.defaultPrevented ||
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey ||
      e.altKey ||
      href.startsWith("http") ||
      href.startsWith("mailto:") ||
      href.startsWith("tel:") ||
      href.startsWith("#")
    ) {
      return;
    }

    e.preventDefault();

    // If clicking same route, do nothing
    if (href === currentPath || isTransitioning) {
      return;
    }

    // Check reduced motion or reduced delight
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion || reduceDelight) {
      router.push(href);
      return;
    }

    // Orchestrated curtain transition
    startTransition(href);
    setTimeout(() => {
      router.push(href);
      setTimeout(() => {
        endTransition();
      }, 350);
    }, 450);
  };

  return (
    <a href={href} onClick={handleClick} className={className} {...props}>
      {children}
    </a>
  );
}
