"use client";

import { PrepGlyph } from "@/components/storefront/prep-button";
import { cn } from "@/lib/utils";

/** Mini indicateur cuisine (suivi commande) — pas une section marketing. */
export function PrepLabSection({
  compact = false,
  autoPlay = true,
}: {
  compact?: boolean;
  autoPlay?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-xl border border-brand-orange/25 bg-brand-orange/5 px-3 py-2",
        !compact && "px-4 py-3"
      )}
      aria-live="polite"
    >
      <PrepGlyph kind="stack" busy={autoPlay} />
      <PrepGlyph kind="brew" busy={autoPlay} />
      <div className="min-w-0">
        <p className="font-mono text-[10px] uppercase tracking-widest text-brand-orange">
          kitchen_runtime
        </p>
        <p className="text-xs text-brand-cream/70">Préparation en cours…</p>
      </div>
    </div>
  );
}
