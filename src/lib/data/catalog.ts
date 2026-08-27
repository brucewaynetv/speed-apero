export interface CatalogOption {
  name: string;
  priceCents: number;
  isDefault?: boolean;
}

export interface CatalogOptionGroup {
  name: string;
  required: boolean;
  minSelect: number;
  maxSelect: number;
  options: CatalogOption[];
}

export interface CatalogProduct {
  slug: string;
  name: string;
  description: string;
  priceCents: number;
  categorySlug: string;
  allergens?: string;
  badge?: string;
  isPopular?: boolean;
  image: string;
  optionGroups?: CatalogOptionGroup[];
}

export interface CatalogCategory {
  slug: string;
  name: string;
  emoji: string;
  sortOrder: number;
}

export const CATALOG_CATEGORIES: CatalogCategory[] = [
  { slug: "populaires", name: "Populaires", emoji: "🔥", sortOrder: 0 },
  { slug: "burgers", name: "Burgers", emoji: "🍔", sortOrder: 1 },
  { slug: "kebabs", name: "Kebabs", emoji: "🥙", sortOrder: 2 },
  { slug: "wraps", name: "Wraps", emoji: "🌯", sortOrder: 3 },
  { slug: "frites", name: "Frites", emoji: "🍟", sortOrder: 4 },
  { slug: "hot-dogs", name: "Hot Dogs", emoji: "🌭", sortOrder: 5 },
  { slug: "snacks", name: "Snacks", emoji: "🍗", sortOrder: 6 },
  { slug: "desserts", name: "Desserts", emoji: "🍰", sortOrder: 7 },
  { slug: "boissons", name: "Boissons", emoji: "🥤", sortOrder: 8 },
];

const SAUCE_GROUP: CatalogOptionGroup = {
  name: "Sauce",
  required: true,
  minSelect: 1,
  maxSelect: 1,
  options: [
    { name: "Algérienne", priceCents: 0, isDefault: true },
    { name: "Samouraï", priceCents: 0 },
    { name: "Barbecue", priceCents: 0 },
    { name: "Mayonnaise", priceCents: 0 },
    { name: "Ketchup", priceCents: 0 },
    { name: "Biggy", priceCents: 0 },
    { name: "Andalouse", priceCents: 0 },
  ],
};

const SUPPLEMENTS_GROUP: CatalogOptionGroup = {
  name: "Suppléments",
  required: false,
  minSelect: 0,
  maxSelect: 10,
  options: [
    { name: "Cheddar", priceCents: 100 },
    { name: "Bacon", priceCents: 150 },
    { name: "Steak", priceCents: 300 },
    { name: "Poulet", priceCents: 300 },
    { name: "Oignons crispy", priceCents: 100 },
    { name: "Œuf", priceCents: 150 },
    { name: "Raclette", priceCents: 200 },
  ],
};

const MAIN_OPTION_GROUPS = [SAUCE_GROUP, SUPPLEMENTS_GROUP];

export const CATALOG_PRODUCTS: CatalogProduct[] = [
  // Burgers
  {
    slug: "smash-original",
    name: "Smash Original",
    description: "Steak smashé, cheddar fondant, sauce maison, salade, pickles.",
    priceCents: 1290,
    categorySlug: "burgers",
    badge: "🔥 BEST SELLER",
    isPopular: true,
    image: "/images/products/burger-smash.jpg",
    optionGroups: MAIN_OPTION_GROUPS,
  },
  {
    slug: "double-smash",
    name: "Double Smash",
    description: "Deux steaks smashés, cheddar, sauce maison, salade, pickles.",
    priceCents: 1590,
    categorySlug: "burgers",
    badge: "🔥 BEST SELLER",
    isPopular: true,
    image: "/images/products/burger-double.jpg",
    optionGroups: MAIN_OPTION_GROUPS,
  },
  {
    slug: "triple-smash",
    name: "Triple Smash",
    description: "Trois steaks smashés, triple cheddar, sauce signature.",
    priceCents: 1890,
    categorySlug: "burgers",
    image: "/images/products/burger-triple.jpg",
    optionGroups: MAIN_OPTION_GROUPS,
  },
  {
    slug: "chicken-crispy",
    name: "Chicken Crispy",
    description: "Poulet croustillant, salade, sauce blanche, cornichons.",
    priceCents: 1390,
    categorySlug: "burgers",
    image: "/images/products/burger-chicken.jpg",
    optionGroups: MAIN_OPTION_GROUPS,
  },
  {
    slug: "bacon-bbq",
    name: "Bacon BBQ",
    description: "Steak, bacon croustillant, sauce BBQ fumée, oignons frits.",
    priceCents: 1550,
    categorySlug: "burgers",
    image: "/images/products/burger-bbq.jpg",
    optionGroups: MAIN_OPTION_GROUPS,
  },
  // Kebabs
  {
    slug: "kebab-maison",
    name: "Kebab Maison",
    description: "Viande marinée, crudités fraîches, sauce au choix.",
    priceCents: 1190,
    categorySlug: "kebabs",
    isPopular: true,
    image: "/images/products/kebab-maison.jpg",
    optionGroups: MAIN_OPTION_GROUPS,
  },
  {
    slug: "kebab-xl",
    name: "Kebab XL",
    description: "Portion généreuse, double viande, frites dans le pain.",
    priceCents: 1490,
    categorySlug: "kebabs",
    image: "/images/products/kebab-xl.jpg",
    optionGroups: MAIN_OPTION_GROUPS,
  },
  {
    slug: "kebab-raclette",
    name: "Kebab Raclette",
    description: "Viande, raclette fondante, oignons, sauce poivre.",
    priceCents: 1590,
    categorySlug: "kebabs",
    badge: "⭐ NOUVEAU",
    image: "/images/products/kebab-raclette.jpg",
    optionGroups: MAIN_OPTION_GROUPS,
  },
  // Wraps
  {
    slug: "wrap-chicken",
    name: "Wrap Chicken",
    description: "Poulet tendre, salade, tomates, sauce blanche.",
    priceCents: 1150,
    categorySlug: "wraps",
    image: "/images/products/wrap-chicken.jpg",
    optionGroups: MAIN_OPTION_GROUPS,
  },
  {
    slug: "wrap-crispy",
    name: "Wrap Crispy",
    description: "Poulet crispy, cheddar, salade iceberg, sauce biggy.",
    priceCents: 1250,
    categorySlug: "wraps",
    image: "/images/products/wrap-crispy.jpg",
    optionGroups: MAIN_OPTION_GROUPS,
  },
  {
    slug: "wrap-spicy",
    name: "Wrap Spicy",
    description: "Poulet épicé, piments, oignons, sauce samouraï.",
    priceCents: 1290,
    categorySlug: "wraps",
    image: "/images/products/wrap-spicy.jpg",
    optionGroups: MAIN_OPTION_GROUPS,
  },
  // Frites
  {
    slug: "frites-maison",
    name: "Frites Maison",
    description: "Pommes de terre fraîches, croustillantes, sel de Guérande.",
    priceCents: 450,
    categorySlug: "frites",
    isPopular: true,
    image: "/images/products/frites-maison.jpg",
  },
  {
    slug: "loaded-fries-cheddar",
    name: "Loaded Fries Cheddar",
    description: "Frites, sauce cheddar fondante, persil frais.",
    priceCents: 890,
    categorySlug: "frites",
    image: "/images/products/loaded-cheddar.jpg",
  },
  {
    slug: "loaded-fries-bacon",
    name: "Loaded Fries Bacon",
    description: "Frites, cheddar, bacon croustillant, sauce biggy.",
    priceCents: 990,
    categorySlug: "frites",
    image: "/images/products/loaded-bacon.jpg",
  },
  {
    slug: "loaded-fries-chicken",
    name: "Loaded Fries Chicken",
    description: "Frites, poulet mariné, sauce algérienne, oignons frits.",
    priceCents: 1090,
    categorySlug: "frites",
    image: "/images/products/loaded-chicken.jpg",
  },
  // Hot Dogs
  {
    slug: "classic-dog",
    name: "Classic Dog",
    description: "Saucisse de qualité, oignons, moutarde, ketchup.",
    priceCents: 990,
    categorySlug: "hot-dogs",
    image: "/images/products/hotdog-classic.jpg",
    optionGroups: [SAUCE_GROUP],
  },
  {
    slug: "crispy-dog",
    name: "Crispy Dog",
    description: "Saucisse, oignons crispy, sauce cheddar.",
    priceCents: 1090,
    categorySlug: "hot-dogs",
    image: "/images/products/hotdog-crispy.jpg",
    optionGroups: [SAUCE_GROUP],
  },
  {
    slug: "bbq-bacon-dog",
    name: "BBQ Bacon Dog",
    description: "Saucisse, bacon, sauce BBQ, oignons frits.",
    priceCents: 1190,
    categorySlug: "hot-dogs",
    image: "/images/products/hotdog-bbq.jpg",
    optionGroups: [SAUCE_GROUP],
  },
  // Snacks
  {
    slug: "tenders",
    name: "Tenders",
    description: "5 tenders de poulet croustillants, sauce au choix.",
    priceCents: 790,
    categorySlug: "snacks",
    image: "/images/products/tenders.jpg",
    optionGroups: [SAUCE_GROUP],
  },
  {
    slug: "nuggets",
    name: "Nuggets",
    description: "8 nuggets croustillants, sauce au choix.",
    priceCents: 650,
    categorySlug: "snacks",
    image: "/images/products/nuggets.jpg",
    optionGroups: [SAUCE_GROUP],
  },
  {
    slug: "mozzarella-sticks",
    name: "Mozzarella Sticks",
    description: "6 bâtonnets de mozzarella panée, sauce tomate.",
    priceCents: 690,
    categorySlug: "snacks",
    image: "/images/products/mozzarella.jpg",
  },
  {
    slug: "onion-rings",
    name: "Onion Rings",
    description: "Rondelles d'oignon croustillantes, sauce barbecue.",
    priceCents: 590,
    categorySlug: "snacks",
    image: "/images/products/onion-rings.jpg",
  },
  // Desserts
  {
    slug: "tiramisu-speculoos",
    name: "Tiramisu Spéculoos",
    description: "Crème mascarpone, spéculoos émiettés, café.",
    priceCents: 590,
    categorySlug: "desserts",
    image: "/images/products/tiramisu-speculoos.jpg",
  },
  {
    slug: "tiramisu-oreo",
    name: "Tiramisu Oreo",
    description: "Crème onctueuse, biscuits Oreo, chocolat.",
    priceCents: 590,
    categorySlug: "desserts",
    image: "/images/products/tiramisu-oreo.jpg",
  },
  {
    slug: "cheesecake-maison",
    name: "Cheesecake maison",
    description: "Cheesecake crémeux, coulis de fruits rouges.",
    priceCents: 650,
    categorySlug: "desserts",
    image: "/images/products/cheesecake.jpg",
  },
  // Boissons
  {
    slug: "coca-cola",
    name: "Coca-Cola",
    description: "33cl — bien frais.",
    priceCents: 250,
    categorySlug: "boissons",
    image: "/images/products/coca.jpg",
  },
  {
    slug: "coca-zero",
    name: "Coca-Cola Zero",
    description: "33cl — zéro sucre.",
    priceCents: 250,
    categorySlug: "boissons",
    image: "/images/products/coca-zero.jpg",
  },
  {
    slug: "oasis-tropical",
    name: "Oasis Tropical",
    description: "33cl — fruits exotiques.",
    priceCents: 250,
    categorySlug: "boissons",
    image: "/images/products/oasis.jpg",
  },
  {
    slug: "eau-minerale",
    name: "Eau Minérale",
    description: "50cl — source naturelle.",
    priceCents: 200,
    categorySlug: "boissons",
    image: "/images/products/eau.jpg",
  },
];

export const DELIVERY_ZONES = [
  { name: "Tresques", postalCodes: "30330", deliveryFeeCents: 250, minimumCents: 1500, estimatedMinutes: 25 },
  { name: "Gaujac", postalCodes: "30330", deliveryFeeCents: 250, minimumCents: 1500, estimatedMinutes: 25 },
  { name: "Connaux", postalCodes: "30340", deliveryFeeCents: 300, minimumCents: 1500, estimatedMinutes: 30 },
  { name: "Bagnols-sur-Cèze", postalCodes: "30200", deliveryFeeCents: 350, minimumCents: 1800, estimatedMinutes: 35 },
  { name: "Communes voisines", postalCodes: "30*", deliveryFeeCents: 450, minimumCents: 2000, estimatedMinutes: 40 },
];

export interface OpeningHour {
  dayOfWeek: number;
  openTime: string;
  closeTime: string;
}

export const OPENING_HOURS: OpeningHour[] = [
  { dayOfWeek: 1, openTime: "11:00", closeTime: "13:00" },
  { dayOfWeek: 1, openTime: "16:00", closeTime: "23:00" },
  { dayOfWeek: 2, openTime: "11:00", closeTime: "13:00" },
  { dayOfWeek: 2, openTime: "16:00", closeTime: "23:00" },
  { dayOfWeek: 3, openTime: "16:00", closeTime: "23:00" },
  { dayOfWeek: 4, openTime: "11:00", closeTime: "13:00" },
  { dayOfWeek: 4, openTime: "16:00", closeTime: "23:00" },
  { dayOfWeek: 5, openTime: "11:00", closeTime: "13:00" },
  { dayOfWeek: 5, openTime: "16:00", closeTime: "23:00" },
  { dayOfWeek: 6, openTime: "11:00", closeTime: "13:00" },
  { dayOfWeek: 6, openTime: "16:00", closeTime: "00:00" },
  { dayOfWeek: 0, openTime: "11:00", closeTime: "13:00" },
  { dayOfWeek: 0, openTime: "16:00", closeTime: "00:00" },
];

export const UPSELL_PRODUCTS = ["frites-maison", "coca-cola", "tiramisu-speculoos"];

export function getPopularProducts(): CatalogProduct[] {
  return CATALOG_PRODUCTS.filter((p) => p.isPopular);
}

export function getProductBySlug(slug: string): CatalogProduct | undefined {
  return CATALOG_PRODUCTS.find((p) => p.slug === slug);
}

export function getProductsByCategory(categorySlug: string): CatalogProduct[] {
  if (categorySlug === "populaires") {
    return getPopularProducts();
  }
  return CATALOG_PRODUCTS.filter((p) => p.categorySlug === categorySlug);
}
