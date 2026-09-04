/** Visuels locaux — street food Speed Apéro (public/images/food) */

export const VISUALS = {
  hero: "/images/food/hero.jpg",
  burgerClose: "/images/food/burger-close.jpg",
  fries: "/images/food/fries.jpg",
  kebab: "/images/food/kebab.jpg",
  wrap: "/images/food/food-spread.jpg",
  hotdog: "/images/food/hotdog.jpg",
  dessert: "/images/food/dessert.jpg",
  drink: "/images/food/drink.jpg",
  kitchen: "/images/food/kitchen.jpg",
  delivery: "/images/food/delivery.jpg",
  smash: "/images/food/smash.jpg",
  chicken: "/images/food/chicken.jpg",
  loaded: "/images/food/loaded.jpg",
  ambiance: "/images/food/ambiance.jpg",
  grill: "/images/food/grill.jpg",
  ingredients: "/images/food/ingredients.jpg",
} as const;

export const MOSAIC_IMAGES = [
  { src: VISUALS.burgerClose, alt: "Burger smashé maison", label: "Burgers" },
  { src: VISUALS.kebab, alt: "Kebab maison", label: "Kebabs" },
  { src: VISUALS.fries, alt: "Frites croustillantes", label: "Frites" },
  { src: VISUALS.wrap, alt: "Wrap croustillant", label: "Wraps" },
  { src: VISUALS.loaded, alt: "Loaded fries", label: "Loaded" },
  { src: VISUALS.dessert, alt: "Dessert maison", label: "Desserts" },
] as const;

export const FORMULE_MENUS = [
  {
    slug: "formule-solo-smash",
    name: "Solo Smash",
    price: "14,90 €",
    desc: "Smash + frites + boisson",
    image: VISUALS.smash,
  },
  {
    slug: "formule-duo-street",
    name: "Duo Street",
    price: "27,90 €",
    desc: "2 burgers + frites + 2 boissons",
    image: VISUALS.burgerClose,
  },
  {
    slug: "formule-family-box",
    name: "Family Box",
    price: "49,90 €",
    desc: "4 sandwiches + loaded + desserts",
    image: VISUALS.grill,
  },
] as const;

export const MARQUEE_IMAGES = [
  VISUALS.burgerClose,
  VISUALS.kebab,
  VISUALS.fries,
  VISUALS.hotdog,
  VISUALS.chicken,
  VISUALS.dessert,
  VISUALS.wrap,
  VISUALS.loaded,
] as const;
