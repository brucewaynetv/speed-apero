import type { DemoTier, TierFeatures } from "@/lib/demo/tiers";
import {
  TIER_FEATURES,
  TIER_LABELS,
  TIER_PRICES,
  isValidTier,
} from "@/lib/demo/tiers";
import type { LucideIcon } from "lucide-react";
import {
  Award,
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
  /** Minimum tier required when feature is set */
  minTier?: DemoTier;
  locked?: boolean;
}

const TIER_RANK: Record<DemoTier, number> = {
  starter: 0,
  pro: 1,
  premium: 2,
};

const FEATURE_MIN_TIER: Partial<Record<keyof TierFeatures, DemoTier>> = {
  kitchenMode: "pro",
  marketingBanners: "pro",
  advancedDashboard: "pro",
  drivers: "premium",
  advancedAnalytics: "premium",
  loyalty: "premium",
};

export function parseAdminTier(tier: string): DemoTier | null {
  return isValidTier(tier) ? tier : null;
}

export function getAdminBasePath(tier: DemoTier): string {
  return `/admin/${tier}`;
}

export function getAdminFeatures(tier: DemoTier): TierFeatures {
  return TIER_FEATURES[tier];
}

function buildNavItems(tier: DemoTier): AdminNavItem[] {
  const base = getAdminBasePath(tier);
  return [
    { href: base, label: "Dashboard", icon: LayoutDashboard },
    { href: `${base}/commandes`, label: "Commandes", icon: ClipboardList },
    { href: `${base}/produits`, label: "Produits", icon: Package },
    {
      href: `${base}/cuisine`,
      label: "Cuisine",
      icon: ChefHat,
      feature: "kitchenMode",
      minTier: "pro",
    },
    {
      href: `${base}/marketing`,
      label: "Marketing",
      icon: Megaphone,
      feature: "marketingBanners",
      minTier: "pro",
    },
    {
      href: `${base}/livreurs`,
      label: "Livreurs",
      icon: Truck,
      feature: "drivers",
      minTier: "premium",
    },
    {
      href: `${base}/fidelite`,
      label: "Fidélité",
      icon: Award,
      feature: "loyalty",
      minTier: "premium",
    },
    {
      href: `${base}/analytics`,
      label: "Analytics",
      icon: BarChart3,
      feature: "advancedAnalytics",
      minTier: "premium",
    },
  ];
}

/** Nav filtrée (uniquement les modules débloqués) */
export function getAdminNav(tier: DemoTier): AdminNavItem[] {
  const features = getAdminFeatures(tier);
  return buildNavItems(tier).filter((item) => !item.feature || features[item.feature]);
}

/** Nav complète avec items verrouillés (teaser upgrade — mode sales uniquement) */
export function getAdminNavWithLocks(tier: DemoTier): AdminNavItem[] {
  const features = getAdminFeatures(tier);
  return buildNavItems(tier).map((item) => {
    if (!item.feature) return { ...item, locked: false };
    const unlocked = Boolean(features[item.feature]);
    return {
      ...item,
      locked: !unlocked,
      minTier: item.minTier ?? FEATURE_MIN_TIER[item.feature] ?? "pro",
    };
  });
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

export function isTierAtLeast(current: DemoTier, required: DemoTier): boolean {
  return TIER_RANK[current] >= TIER_RANK[required];
}

export const ADMIN_TIERS: DemoTier[] = ["starter", "pro", "premium"];
