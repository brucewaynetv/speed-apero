"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useDemoTier } from "@/components/demo/demo-tier-provider";
import { cn } from "@/lib/utils";

const BANNERS = [
  { title: "Livraison offerte ce soir", message: "Code LIVRAISON0 dès 20 €", bg: "#FF7300" },
  { title: "Menu Smash à 14,90 €", message: "Smash Original + Frites", bg: "#D71920" },
  { title: "Nouveau dessert", message: "Tiramisu Spéculoos maison", bg: "#F5B51B", dark: true },
];

export function MarketingBanner() {
  const { features } = useDemoTier();
  const [index, setIndex] = useState(0);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (!features.marketingBanners || hidden) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % BANNERS.length), 4500);
    return () => clearInterval(id);
  }, [features.marketingBanners, hidden]);

  if (!features.marketingBanners || hidden) return null;

  const banner = BANNERS[index]!;

  return (
    <div
      className="relative flex items-center justify-center gap-3 px-10 py-2.5 text-center transition-colors"
      style={{ backgroundColor: banner.bg }}
    >
      <p className={cn("text-sm font-semibold", banner.dark ? "text-brand-black" : "text-white")}>
        <span className="font-bold">{banner.title}</span>
        <span className="mx-2 opacity-60">·</span>
        <span className="font-normal opacity-90">{banner.message}</span>
      </p>
      <button
        type="button"
        onClick={() => setHidden(true)}
        className={cn(
          "absolute right-3 top-1/2 -translate-y-1/2 rounded p-1",
          banner.dark ? "text-brand-black/70 hover:bg-black/10" : "text-white/80 hover:bg-white/15"
        )}
        aria-label="Fermer la bannière"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
