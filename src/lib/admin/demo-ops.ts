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
    link: "/demo/pro#carte",
  },
  {
    id: "ban_2",
    title: "Livraison offerte dès 25 €",
    message: "Sur Nîmes centre et alentours",
    bgColor: "#f5b51b",
    isActive: true,
    link: "/demo/pro#livraison",
  },
  {
    id: "ban_3",
    title: "Happy Hour 18h–20h",
    message: "Frites offertes sur menus duo",
    bgColor: "#d71920",
    isActive: false,
    link: "/demo/pro#formules",
  },
];

export const DEMO_PROMOS = [
  {
    id: "promo_1",
    code: "BIENVENUE10",
    type: "PERCENT" as const,
    value: 10,
    usedCount: 48,
    maxUses: 200,
    isActive: true,
    label: "−10 % première commande",
  },
  {
    id: "promo_2",
    code: "LIVRAISON0",
    type: "FREE_DELIVERY" as const,
    value: 0,
    usedCount: 22,
    maxUses: 100,
    isActive: true,
    label: "Livraison offerte",
  },
  {
    id: "promo_3",
    code: "SMASH5",
    type: "FIXED" as const,
    value: 500,
    usedCount: 9,
    maxUses: 50,
    isActive: false,
    label: "−5 € sur smash",
  },
];

export const DEMO_POPUP = {
  enabled: true,
  title: "Bienvenue chez Speed Apéro",
  message: "−10 % sur votre 1ʳᵉ commande avec le code BIENVENUE10",
  cta: "J'en profite",
  code: "BIENVENUE10",
};

export const DEMO_CAMPAIGNS = [
  {
    id: "camp_1",
    name: "Relance panier abandonné",
    channel: "Email",
    status: "active" as const,
    sent: 126,
    openRate: 34,
  },
  {
    id: "camp_2",
    name: "SMS vendredi soir",
    channel: "SMS",
    status: "scheduled" as const,
    sent: 0,
    openRate: 0,
  },
  {
    id: "camp_3",
    name: "Fidélité Or — dessert offert",
    channel: "Push",
    status: "draft" as const,
    sent: 0,
    openRate: 0,
  },
];

export const DEMO_PENDING_DELIVERIES = [
  {
    id: "del_1",
    orderNumber: 1045,
    customer: "Jean Dupont",
    address: "12 rue de la Dark Kitchen",
    zone: "Centre",
    eta: "18 min",
    totalLabel: "28,90 €",
    ready: true,
  },
  {
    id: "del_2",
    orderNumber: 1044,
    customer: "Marie Leroy",
    address: "4 avenue des Halles",
    zone: "Gare",
    eta: "22 min",
    totalLabel: "19,40 €",
    ready: true,
  },
  {
    id: "del_3",
    orderNumber: 1043,
    customer: "Alex Martin",
    address: "8 bd Victor Hugo",
    zone: "Pissevin",
    eta: "28 min",
    totalLabel: "34,20 €",
    ready: false,
  },
];
