/** Visuels Unsplash — street food Speed Apéro */

export const VISUALS = {
  hero: "https://images.unsplash.com/photo-1568901347635-c4030f17a265?w=1920&q=80",
  burgerClose: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=900&q=80",
  fries: "https://images.unsplash.com/photo-1573080496219-9984b4c89425?w=900&q=80",
  kebab: "https://images.unsplash.com/photo-1529006557810-274dbfebf025?w=900&q=80",
  wrap: "https://images.unsplash.com/photo-1626700051175-6818013e5787?w=900&q=80",
  hotdog: "https://images.unsplash.com/photo-1612392062631-94de55327fff?w=900&q=80",
  dessert: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=900&q=80",
  drink: "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=900&q=80",
  kitchen: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1400&q=80",
  delivery: "https://images.unsplash.com/photo-1526367790999-0150786686a2?w=1400&q=80",
  smash: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=900&q=80",
  chicken: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=900&q=80",
  loaded: "https://images.unsplash.com/photo-1630384067228-2c45a57f9254?w=900&q=80",
  ambiance: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1400&q=80",
  grill: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1400&q=80",
  ingredients: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=900&q=80",
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
    name: "Solo Smash",
    price: "14,90 €",
    desc: "Smash + frites + boisson",
    image: VISUALS.smash,
  },
  {
    name: "Duo Street",
    price: "27,90 €",
    desc: "2 burgers + frites + 2 boissons",
    image: VISUALS.burgerClose,
  },
  {
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
