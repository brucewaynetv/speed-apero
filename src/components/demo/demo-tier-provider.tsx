"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { DemoTier, TierFeatures } from "@/lib/demo/tiers";
import { TIER_FEATURES, TIER_LABELS, TIER_PRICES } from "@/lib/demo/tiers";

interface DemoTierContextValue {
  tier: DemoTier;
  features: TierFeatures;
  label: string;
  price: number;
  basePath: string;
  /** true = install client mono-édition (pas de switch / teaser) */
  clientEdition: boolean;
}

const DemoTierContext = createContext<DemoTierContextValue | null>(null);

export function DemoTierProvider({
  tier,
  clientEdition = false,
  children,
}: {
  tier: DemoTier;
  clientEdition?: boolean;
  children: ReactNode;
}) {
  const value: DemoTierContextValue = {
    tier,
    features: TIER_FEATURES[tier],
    label: TIER_LABELS[tier],
    price: TIER_PRICES[tier],
    basePath: `/demo/${tier}`,
    clientEdition,
  };

  return (
    <DemoTierContext.Provider value={value}>{children}</DemoTierContext.Provider>
  );
}

export function useDemoTier() {
  const ctx = useContext(DemoTierContext);
  if (!ctx) {
    throw new Error("useDemoTier must be used within DemoTierProvider");
  }
  return ctx;
}

export function useDemoTierOptional() {
  return useContext(DemoTierContext);
}
