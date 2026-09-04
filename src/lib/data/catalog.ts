export type {
  CatalogOption,
  CatalogOptionGroup,
  CatalogProduct,
  CatalogCategory,
} from "./catalog-types";

export type { OpeningHour } from "./catalog-hours";

import type { CatalogProduct } from "./catalog-types";
import {
  GENERATED_CATEGORIES,
  GENERATED_PRODUCTS,
} from "./catalog-generated";
import { OPENING_HOURS as STORE_HOURS } from "./catalog-hours";

export const CATALOG_CATEGORIES = GENERATED_CATEGORIES;
export const CATALOG_PRODUCTS = GENERATED_PRODUCTS;
export const OPENING_HOURS = STORE_HOURS;

export const DELIVERY_ZONES = [
  {
    name: "Cavillargues (zone orange)",
    postalCodes: "30330",
    deliveryFeeCents: 0,
    minimumCents: 1500,
    estimatedMinutes: 25,
  },
  {
    name: "Zone étendue (verte)",
    postalCodes: "30200",
    deliveryFeeCents: 1000,
    minimumCents: 0,
    estimatedMinutes: 40,
  },
  {
    name: "Tresques / Gaujac",
    postalCodes: "30330",
    deliveryFeeCents: 0,
    minimumCents: 1500,
    estimatedMinutes: 30,
  },
  {
    name: "Connaux",
    postalCodes: "30340",
    deliveryFeeCents: 1000,
    minimumCents: 0,
    estimatedMinutes: 35,
  },
  {
    name: "Bagnols-sur-Cèze",
    postalCodes: "30200",
    deliveryFeeCents: 1000,
    minimumCents: 0,
    estimatedMinutes: 40,
  },
];

export const UPSELL_PRODUCTS = [
  "frites-tenders",
  "coca-cola",
  "snickers-glace",
];

export function getPopularProducts(): CatalogProduct[] {
  return CATALOG_PRODUCTS.filter((p) => p.isPopular && !p.unavailable);
}

export function getProductBySlug(slug: string): CatalogProduct | undefined {
  return CATALOG_PRODUCTS.find((p) => p.slug === slug);
}

export function getProductsByCategory(categorySlug: string): CatalogProduct[] {
  if (categorySlug === "populaires") {
    return getPopularProducts();
  }
  if (categorySlug === "infos") {
    return CATALOG_PRODUCTS.filter((p) => p.categorySlug === "infos");
  }
  return CATALOG_PRODUCTS.filter((p) => p.categorySlug === categorySlug);
}
