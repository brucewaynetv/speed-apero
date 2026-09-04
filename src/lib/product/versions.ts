import type { DemoTier, TierFeatures } from "@/lib/demo/tiers";
import { TIER_FEATURES, TIER_LABELS, TIER_PRICES } from "@/lib/demo/tiers";
import { OFFER_PITCHES } from "@/lib/demo/sales";

export type ProductVersion = DemoTier;

export interface ProductModule {
  id: string;
  label: string;
  area: "client" | "admin";
}

/** Modules livrés réellement dans chaque version (storefront + admin). */
export const VERSION_MODULES: Record<ProductVersion, ProductModule[]> = {
  starter: [
    { id: "menu", label: "Carte & panier", area: "client" },
    { id: "checkout", label: "Checkout livraison / à emporter", area: "client" },
    { id: "orders", label: "Admin commandes", area: "admin" },
    { id: "products", label: "Admin produits", area: "admin" },
    { id: "dashboard", label: "Dashboard essentiel", area: "admin" },
  ],
  pro: [
    { id: "menu", label: "Carte & panier", area: "client" },
    { id: "account", label: "Compte client", area: "client" },
    { id: "promos", label: "Codes promo & bannières", area: "client" },
    { id: "schedule", label: "Commande programmée", area: "client" },
    { id: "popup", label: "Popup 1ʳᵉ commande", area: "client" },
    { id: "orders", label: "Admin commandes", area: "admin" },
    { id: "products", label: "Admin produits", area: "admin" },
    { id: "kitchen", label: "Mode cuisine", area: "admin" },
    { id: "marketing", label: "Marketing", area: "admin" },
    { id: "dashboard", label: "Dashboard avancé", area: "admin" },
  ],
  premium: [
    { id: "menu", label: "Carte & panier", area: "client" },
    { id: "account", label: "Compte + fidélité + crédit", area: "client" },
    { id: "promos", label: "Promos & bannières", area: "client" },
    { id: "schedule", label: "Commande programmée", area: "client" },
    { id: "tracking", label: "Suivi commande live", area: "client" },
    { id: "pwa", label: "PWA installable", area: "client" },
    { id: "orders", label: "Admin commandes", area: "admin" },
    { id: "products", label: "Admin produits", area: "admin" },
    { id: "kitchen", label: "Mode cuisine", area: "admin" },
    { id: "marketing", label: "Marketing", area: "admin" },
    { id: "drivers", label: "Livreurs & dispatch", area: "admin" },
    { id: "loyalty", label: "Fidélité", area: "admin" },
    { id: "analytics", label: "Analytics avancées", area: "admin" },
  ],
};

export interface ProductVersionInfo {
  id: ProductVersion;
  label: string;
  price: number;
  promise: string;
  audience: string;
  benefits: string[];
  includesSetup: string;
  features: TierFeatures;
  modules: ProductModule[];
  storefrontPath: string;
  adminPath: string;
  adminLoginPath: string;
  accent: "neutral" | "orange" | "gold";
  recommended?: boolean;
}

export const PRODUCT_VERSIONS: ProductVersionInfo[] = (
  ["starter", "pro", "premium"] as const
).map((id) => {
  const pitch = OFFER_PITCHES[id];
  return {
    id,
    label: TIER_LABELS[id],
    price: TIER_PRICES[id],
    promise: pitch.promise,
    audience: pitch.audience,
    benefits: pitch.benefits,
    includesSetup: pitch.includesSetup,
    features: TIER_FEATURES[id],
    modules: VERSION_MODULES[id],
    storefrontPath: `/demo/${id}`,
    adminPath: `/admin/${id}`,
    adminLoginPath: `/admin/${id}/login`,
    accent: id === "premium" ? "gold" : id === "pro" ? "orange" : "neutral",
    recommended: id === "pro",
  };
});

export function getProductVersion(id: ProductVersion): ProductVersionInfo {
  const found = PRODUCT_VERSIONS.find((v) => v.id === id);
  if (!found) throw new Error(`Version inconnue: ${id}`);
  return found;
}
