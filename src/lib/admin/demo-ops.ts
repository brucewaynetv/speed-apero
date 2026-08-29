/** Données de démo pour charts admin quand le volume réel est faible */

export const DEMO_WEEKLY_REVENUE = [
  { label: "Lun", value: 420 },
  { label: "Mar", value: 380 },
  { label: "Mer", value: 510 },
  { label: "Jeu", value: 460 },
  { label: "Ven", value: 720 },
  { label: "Sam", value: 890 },
  { label: "Dim", value: 640 },
];

export const DEMO_HOURLY_ORDERS = [
  { label: "11h", value: 4 },
  { label: "12h", value: 12 },
  { label: "13h", value: 9 },
  { label: "18h", value: 7 },
  { label: "19h", value: 15 },
  { label: "20h", value: 18 },
  { label: "21h", value: 11 },
];

export const DEMO_TOP_PRODUCTS = [
  { name: "Smash Classic", sold: 42, revenueLabel: "416 €" },
  { name: "Kebab Maison", sold: 31, revenueLabel: "341 €" },
  { name: "Loaded Fries", sold: 28, revenueLabel: "221 €" },
  { name: "Wrap Spicy", sold: 19, revenueLabel: "171 €" },
  { name: "Tiramisu", sold: 16, revenueLabel: "88 €" },
];

export const DEMO_DRIVERS = [
  {
    id: "drv_demo_1",
    name: "Karim B.",
    phone: "06 11 22 33 44",
    status: "AVAILABLE" as const,
    zone: "Centre · Nîmes",
    deliveriesToday: 7,
    rating: 4.9,
  },
  {
    id: "drv_demo_2",
    name: "Sophie M.",
    phone: "06 55 66 77 88",
    status: "DELIVERING" as const,
    zone: "Gare · Pissevin",
    deliveriesToday: 5,
    rating: 4.7,
    currentOrder: "#1042",
    eta: "12 min",
  },
  {
    id: "drv_demo_3",
    name: "Thomas L.",
    phone: "06 99 88 77 66",
    status: "OFFLINE" as const,
    zone: "—",
    deliveriesToday: 0,
    rating: 4.8,
  },
];

export const DEMO_LOYALTY_CUSTOMERS = [
  { name: "Jean Dupont", email: "client@speedapero.demo", points: 238, tier: "Argent", orders: 12 },
  { name: "Marie Leroy", email: "marie@demo.fr", points: 512, tier: "Or", orders: 28 },
  { name: "Alex Martin", email: "alex@demo.fr", points: 94, tier: "Bronze", orders: 4 },
  { name: "Camille R.", email: "camille@demo.fr", points: 310, tier: "Argent", orders: 15 },
];

export const DEMO_BANNERS = [
  {
    id: "ban_1",
    title: "−10 % première commande",
    message: "Code BIENVENUE10 · valable toute la semaine",
    bgColor: "#ff7300",
    isActive: true,
  },
  {
    id: "ban_2",
    title: "Livraison offerte dès 25 €",
    message: "Sur Nîmes centre et alentours",
    bgColor: "#f5b51b",
    isActive: true,
  },
  {
    id: "ban_3",
    title: "Happy Hour 18h–20h",
    message: "Frites offertes sur menus duo",
    bgColor: "#d71920",
    isActive: false,
  },
];
