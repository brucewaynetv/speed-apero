import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "orange" | "gold" | "red" | "outline";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide",
        {
          "bg-brand-orange/20 text-brand-orange border border-brand-orange/40":
            variant === "default" || variant === "orange",
          "bg-brand-gold/20 text-brand-gold border border-brand-gold/40":
            variant === "gold",
          "bg-brand-red/20 text-brand-red border border-brand-red/40":
            variant === "red",
          "bg-transparent border border-brand-cream/30 text-brand-cream":
            variant === "outline",
        },
        className
      )}
      {...props}
    />
  );
}

export { Badge };
