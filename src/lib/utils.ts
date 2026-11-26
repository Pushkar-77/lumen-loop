import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/** Format a phone number string into a clean clickable tel: URI. */
export function formatTelHref(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}
