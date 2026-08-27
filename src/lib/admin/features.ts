import type { DemoTier, TierFeatures } from "@/lib/demo/tiers";
import {
  TIER_FEATURES,
  TIER_LABELS,
  TIER_PRICES,
  isValidTier,
} from "@/lib/demo/tiers";
import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  ChefHat,
  ClipboardList,
  LayoutDashboard,
  Megaphone,
  Package,
  Truck,
} from "lucide-react";

export interface AdminNavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  feature?: keyof TierFeatures;
}

export function parseAdminTier(tier: string): DemoTier | null {
  return isValidTier(tier) ? tier : null;
}

export function getAdminBasePath(tier: DemoTier): string {
  return `/admin/${tier}`;
}

export function getAdminFeatures(tier: DemoTier): TierFeatures {
  return TIER_FEATURES[tier];
}

export function getAdminNav(tier: DemoTier): AdminNavItem[] {
  const base = getAdminBasePath(tier);
  const items: AdminNavItem[] = [
    { href: base, label: "Dashboard", icon: LayoutDashboard },
    { href: `${base}/commandes`, label: "Commandes", icon: ClipboardList },
    { href: `${base}/produits`, label: "Produits", icon: Package },
    { href: `${base}/cuisine`, label: "Mode cuisine", icon: ChefHat, feature: "kitchenMode" },
    { href: `${base}/marketing`, label: "Marketing", icon: Megaphone, feature: "marketingBanners" },
    { href: `${base}/livreurs`, label: "Livreurs", icon: Truck, feature: "drivers" },
    { href: `${base}/analytics`, label: "Analytics", icon: BarChart3, feature: "advancedAnalytics" },
  ];

  const features = getAdminFeatures(tier);
  return items.filter((item) => !item.feature || features[item.feature]);
}

export function canAccessAdminFeature(
  tier: DemoTier,
  feature: keyof TierFeatures
): boolean {
  return TIER_FEATURES[tier][feature];
}

export function getTierMeta(tier: DemoTier) {
  return {
    tier,
    label: TIER_LABELS[tier],
    price: TIER_PRICES[tier],
    features: TIER_FEATURES[tier],
  };
}

export const ADMIN_TIERS: DemoTier[] = ["starter", "pro", "premium"];
