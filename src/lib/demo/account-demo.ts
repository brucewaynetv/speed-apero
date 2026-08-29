export interface DemoOrder {
  id: string;
  number: number;
  date: string;
  totalCents: number;
  status: "delivered" | "preparing" | "ready" | "cancelled";
  items: string[];
  type: "delivery" | "pickup";
}

export interface DemoAddress {
  id: string;
  label: string;
  line: string;
  city: string;
  isDefault: boolean;
}

export interface DemoFavorite {
  name: string;
  priceCents: number;
  category: string;
}

export interface LoyaltyTier {
  name: string;
  minPoints: number;
  perks: string[];
}

export const DEMO_CUSTOMER = {
  firstName: "Jean",
  lastName: "Dupont",
  email: "client@speedapero.demo",
  phone: "06 12 34 56 78",
  memberSince: "Mars 2026",
  avatarInitials: "JD",
};

export const DEMO_ORDERS: DemoOrder[] = [
  {
    id: "ord_1042",
    number: 1042,
    date: "27 août 2026 · 20:14",
    totalCents: 2890,
    status: "delivered",
    items: ["Smash Classic", "Loaded Fries Cheddar", "Coca 33cl"],
    type: "delivery",
  },
  {
    id: "ord_1038",
    number: 1038,
    date: "22 août 2026 · 12:40",
    totalCents: 1940,
    status: "delivered",
    items: ["Kebab Maison", "Frites"],
    type: "pickup",
  },
  {
    id: "ord_1031",
    number: 1031,
    date: "15 août 2026 · 19:55",
    totalCents: 3420,
    status: "delivered",
    items: ["Menu Duo Smash", "Tiramisu Speculoos"],
    type: "delivery",
  },
  {
    id: "ord_1025",
    number: 1025,
    date: "8 août 2026 · 21:02",
    totalCents: 1560,
    status: "cancelled",
    items: ["Wrap Spicy"],
    type: "delivery",
  },
];

export const DEMO_ADDRESSES: DemoAddress[] = [
  {
    id: "addr_1",
    label: "Domicile",
    line: "12 rue de la Dark Kitchen",
    city: "30000 Nîmes",
    isDefault: true,
  },
  {
    id: "addr_2",
    label: "Bureau",
    line: "4 avenue des Halles",
    city: "30900 Nîmes",
    isDefault: false,
  },
];

export const DEMO_FAVORITES: DemoFavorite[] = [
  { name: "Smash Classic", priceCents: 990, category: "Burgers" },
  { name: "Loaded Fries Bacon", priceCents: 790, category: "Sides" },
  { name: "Tiramisu Oreo", priceCents: 550, category: "Desserts" },
];

export const DEMO_SAVED_PROMOS = [
  { code: "BIENVENUE10", label: "−10 % première commande", expires: "30 sept. 2026" },
  { code: "LIVRAISON0", label: "Livraison offerte", expires: "15 sept. 2026" },
];

export const LOYALTY_POINTS = 238;
export const LOYALTY_NEXT = 300;
export const CREDIT_CENTS = 500;

export const LOYALTY_TIERS: LoyaltyTier[] = [
  { name: "Bronze", minPoints: 0, perks: ["1 pt / €"] },
  { name: "Argent", minPoints: 200, perks: ["1,5 pt / €", "Boisson offerte / mois"] },
  { name: "Or", minPoints: 500, perks: ["2 pt / €", "Livraison offerte", "Accès early"] },
];

export const CREDIT_HISTORY = [
  { label: "Crédit bienvenue", amountCents: 500, date: "1 mars 2026" },
  { label: "Utilisé commande #1031", amountCents: -300, date: "15 août 2026" },
  { label: "Geste commercial", amountCents: 300, date: "20 août 2026" },
];

export function orderStatusLabel(status: DemoOrder["status"]): string {
  switch (status) {
    case "delivered":
      return "Livrée";
    case "preparing":
      return "En cuisine";
    case "ready":
      return "Prête";
    case "cancelled":
      return "Annulée";
    default: {
      const _exhaustive: never = status;
      return _exhaustive;
    }
  }
}

export function currentLoyaltyTier(points: number): LoyaltyTier {
  let current = LOYALTY_TIERS[0];
  for (const tier of LOYALTY_TIERS) {
    if (points >= tier.minPoints) current = tier;
  }
  return current;
}
