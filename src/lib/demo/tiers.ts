export type DemoTier = "starter" | "pro" | "premium";

export interface TierFeatures {
  customerAccount: boolean;
  promotions: boolean;
  scheduledOrders: boolean;
  advancedDashboard: boolean;
  kitchenMode: boolean;
  loyalty: boolean;
  customerCredit: boolean;
  drivers: boolean;
  orderTracking: boolean;
  pwa: boolean;
  advancedAnalytics: boolean;
  marketingBanners: boolean;
  firstOrderPopup: boolean;
}

export const TIER_PRICES: Record<DemoTier, number> = {
  starter: 500,
  pro: 800,
  premium: 1200,
};

export const TIER_LABELS: Record<DemoTier, string> = {
  starter: "Starter",
  pro: "Pro",
  premium: "Premium",
};

export const TIER_FEATURES: Record<DemoTier, TierFeatures> = {
  starter: {
    customerAccount: false,
    promotions: false,
    scheduledOrders: false,
    advancedDashboard: false,
    kitchenMode: false,
    loyalty: false,
    customerCredit: false,
    drivers: false,
    orderTracking: false,
    pwa: false,
    advancedAnalytics: false,
    marketingBanners: false,
    firstOrderPopup: false,
  },
  pro: {
    customerAccount: true,
    promotions: true,
    scheduledOrders: true,
    advancedDashboard: true,
    kitchenMode: true,
    loyalty: false,
    customerCredit: false,
    drivers: false,
    orderTracking: false,
    pwa: false,
    advancedAnalytics: false,
    marketingBanners: true,
    firstOrderPopup: true,
  },
  premium: {
    customerAccount: true,
    promotions: true,
    scheduledOrders: true,
    advancedDashboard: true,
    kitchenMode: true,
    loyalty: true,
    customerCredit: true,
    drivers: true,
    orderTracking: true,
    pwa: true,
    advancedAnalytics: true,
    marketingBanners: true,
    firstOrderPopup: true,
  },
};

export function isValidTier(tier: string): tier is DemoTier {
  return tier === "starter" || tier === "pro" || tier === "premium";
}

export function getTierBasePath(tier: DemoTier): string {
  return `/demo/${tier}`;
}
