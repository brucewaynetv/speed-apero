"use client";

import { OPENING_HOURS } from "@/lib/data/catalog";
import { getRestaurantStatus } from "@/lib/opening-hours/status";
import { cn } from "@/lib/utils";

export function RestaurantStatus() {
  const { status, label } = getRestaurantStatus(OPENING_HOURS);

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider sm:text-xs",
        status === "open" && "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30",
        status === "closed" && "bg-brand-red/15 text-red-400 border border-brand-red/30",
        status === "opening_soon" && "bg-brand-orange/15 text-brand-orange border border-brand-orange/30"
      )}
      aria-live="polite"
    >
      <span
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          status === "open" && "bg-emerald-400 animate-pulse",
          status === "closed" && "bg-brand-red",
          status === "opening_soon" && "bg-brand-orange animate-pulse"
        )}
      />
      {label}
    </span>
  );
}
