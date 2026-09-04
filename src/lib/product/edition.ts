import type { DemoTier, TierFeatures } from "@/lib/demo/tiers";
import {
  TIER_FEATURES,
  TIER_LABELS,
  TIER_PRICES,
  isValidTier,
} from "@/lib/demo/tiers";

export type ProductEdition = DemoTier;

/** Mode applicatif : vitrine commerciale vs installation client mono-édition. */
export function getAppMode(): "sales" | "client" {
  const mode = process.env.NEXT_PUBLIC_APP_MODE?.toLowerCase();
  if (mode === "client") return "client";
  if (mode === "sales") return "sales";
  // Si une édition est forcée sans mode, on considère une install client.
  if (process.env.NEXT_PUBLIC_PRODUCT_EDITION) return "client";
  return "sales";
}

export function isClientEdition(): boolean {
  return getAppMode() === "client";
}

export function isSalesMode(): boolean {
  return getAppMode() === "sales";
}

export function getProductEdition(): ProductEdition {
  const raw = process.env.NEXT_PUBLIC_PRODUCT_EDITION?.toLowerCase() ?? "";
  if (isValidTier(raw)) return raw;
  return "starter";
}

export function getEditionFeatures(): TierFeatures {
  return TIER_FEATURES[getProductEdition()];
}

export function getEditionMeta() {
  const edition = getProductEdition();
  return {
    edition,
    label: TIER_LABELS[edition],
    price: TIER_PRICES[edition],
    features: TIER_FEATURES[edition],
    mode: getAppMode(),
  };
}

/** Base path storefront (vide en install client = site à la racine via redirect). */
export function getStorefrontBasePath(edition: ProductEdition = getProductEdition()): string {
  if (isClientEdition()) return `/demo/${edition}`;
  return `/demo/${edition}`;
}

/** Base path admin (toujours /admin/{édition} ; en client les autres éditions sont redirigées). */
export function getEditionAdminBasePath(
  edition: ProductEdition = getProductEdition()
): string {
  return `/admin/${edition}`;
}
