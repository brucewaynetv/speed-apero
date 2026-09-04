/**
 * Convertit foodbooking-menu.json → src/lib/data/catalog-generated.ts
 * Source: https://www.foodbooking.com/api/restaurant/{uid}
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const SRC = path.join(__dirname, "foodbooking-menu.json");
const OUT = path.join(ROOT, "src", "lib", "data", "catalog-generated.ts");

const CATEGORY_IMAGES = {
  infos: "/images/food/delivery.jpg",
  menus: "/images/food/food-spread.jpg",
  boxs: "/images/food/feast.jpg",
  burgers: "/images/food/smash.jpg",
  snacks: "/images/food/tenders.jpg",
  wraps: "/images/food/wrap.jpg",
  salades: "/images/food/ingredients.jpg",
  americains: "/images/food/bacon-burger.jpg",
  plats: "/images/food/grill.jpg",
  frites: "/images/food/fries.jpg",
  desserts: "/images/food/dessert.jpg",
  boissons: "/images/food/drink.jpg",
};

const CATEGORY_EMOJI = {
  infos: "📍",
  menus: "🌞",
  boxs: "🔥",
  burgers: "🍔",
  snacks: "🍗",
  wraps: "🌯",
  salades: "🥗",
  americains: "🥖",
  plats: "🍽️",
  frites: "🍟",
  desserts: "🍰",
  boissons: "🥤",
};

function slugify(input) {
  return String(input)
    .replace(/œ/gi, "oe")
    .replace(/æ/gi, "ae")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase()
    .slice(0, 72);
}

function categoryKey(name) {
  const n = name.toLowerCase();
  if (n.includes("livraison") || n.includes("information")) return "infos";
  if (n.includes("été") || n.includes("ete") || n.includes("menus")) return "menus";
  if (n.includes("box")) return "boxs";
  if (n.includes("burger") || n.includes("kebab") || n.includes("taco")) return "burgers";
  if (n.includes("snack")) return "snacks";
  if (n.includes("wrap")) return "wraps";
  if (n.includes("salade")) return "salades";
  if (n.includes("américain") || n.includes("americain")) return "americains";
  if (n.includes("plat")) return "plats";
  if (n.includes("frite")) return "frites";
  if (n.includes("dessert")) return "desserts";
  if (n.includes("boisson") || n.includes("punch") || n.includes("vin")) return "boissons";
  return slugify(name).slice(0, 24) || "autre";
}

function eurosToCents(price) {
  if (price == null || Number.isNaN(Number(price))) return 0;
  return Math.round(Number(price) * 100);
}

function cleanText(s) {
  return String(s || "")
    .replace(/\r\n/g, "\n")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function mapOptionGroup(group) {
  const options = (group.options || [])
    .slice()
    .sort((a, b) => (a.sort ?? 0) - (b.sort ?? 0))
    .map((o) => ({
      name: cleanText(o.name),
      priceCents: eurosToCents(o.price),
      isDefault: Boolean(o.default),
      unavailable: Boolean(o.is_out_of_stock || o.out_of_stock),
    }))
    .filter((o) => o.name);

  const minSelect = Number(group.force_min ?? (group.required ? 1 : 0));
  const maxSelect = Number(group.force_max ?? (group.required ? 1 : Math.max(options.length, 1)));

  return {
    name: cleanText(group.name),
    required: Boolean(group.required) || minSelect > 0,
    minSelect: Math.max(0, minSelect),
    maxSelect: Math.max(1, maxSelect),
    options,
  };
}

function mapItem(item, catKey, usedSlugs) {
  let base = slugify(item.name) || `item-${item.id}`;
  let slug = base;
  let i = 2;
  while (usedSlugs.has(slug)) {
    slug = `${base}-${i++}`;
  }
  usedSlugs.add(slug);

  const optionGroups = (item.groups || [])
    .slice()
    .sort((a, b) => (a.sort ?? 0) - (b.sort ?? 0))
    .map(mapOptionGroup)
    .filter((g) => g.name && g.options.length > 0);

  const desc = cleanText(item.description);
  const popular =
    catKey === "menus" ||
    catKey === "boxs" ||
    /smash|best|chef|été|ete/i.test(item.name);

  return {
    slug,
    name: cleanText(item.name),
    description: desc || cleanText(item.name),
    priceCents: eurosToCents(item.price),
    categorySlug: catKey,
    image: CATEGORY_IMAGES[catKey] || "/images/food/food-spread.jpg",
    isPopular: popular,
    badge: item.is_out_of_stock ? "Indisponible" : undefined,
    optionGroups: optionGroups.length ? optionGroups : undefined,
    unavailable: Boolean(item.is_out_of_stock || item.out_of_stock),
  };
}

const data = JSON.parse(fs.readFileSync(SRC, "utf8"));
const categoriesRaw = (data.menu?.categories || [])
  .filter((c) => c.active !== false)
  .slice()
  .sort((a, b) => (a.sort ?? 0) - (b.sort ?? 0));

const usedCatSlugs = new Set(["populaires"]);
const usedProductSlugs = new Set();
const categories = [{ slug: "populaires", name: "Populaires", emoji: "🔥", sortOrder: 0 }];
const products = [];

let sortOrder = 1;
for (const cat of categoriesRaw) {
  let key = categoryKey(cat.name);
  let slug = key;
  let n = 2;
  while (usedCatSlugs.has(slug)) slug = `${key}-${n++}`;
  usedCatSlugs.add(slug);

  const emoji = CATEGORY_EMOJI[key] || "🍽️";
  const displayName = cleanText(cat.name).replace(/^[^\p{L}\p{N}]+/u, "").trim() || cleanText(cat.name);

  categories.push({
    slug,
    name: displayName,
    emoji,
    sortOrder: sortOrder++,
  });

  const items = (cat.items || [])
    .filter((it) => it.active !== false)
    .slice()
    .sort((a, b) => (a.sort ?? 0) - (b.sort ?? 0));

  for (const item of items) {
    products.push(mapItem(item, slug, usedProductSlugs));
  }
}

const file = `/* eslint-disable */
/** Généré depuis FoodBooking — ne pas éditer à la main.
 *  Source: scripts/foodbooking-menu.json
 *  Régénérer: node scripts/generate-catalog-from-foodbooking.cjs
 */
import type { CatalogCategory, CatalogProduct } from "./catalog-types";

export const GENERATED_CATEGORIES: CatalogCategory[] = ${JSON.stringify(categories, null, 2)};

export const GENERATED_PRODUCTS: CatalogProduct[] = ${JSON.stringify(products, null, 2)};
`;

fs.writeFileSync(OUT, file, "utf8");
console.log(`Wrote ${categories.length} categories, ${products.length} products → ${OUT}`);
