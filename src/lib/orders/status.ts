export type OrderStatus =
  | "NEW"
  | "CONFIRMED"
  | "PREPARING"
  | "READY"
  | "OUT_FOR_DELIVERY"
  | "DELIVERED"
  | "CANCELLED";

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  NEW: "Nouvelle",
  CONFIRMED: "Confirmée",
  PREPARING: "En préparation",
  READY: "Prête",
  OUT_FOR_DELIVERY: "En livraison",
  DELIVERED: "Livrée",
  CANCELLED: "Annulée",
};

export const ORDER_STATUS_COLORS: Record<OrderStatus, string> = {
  NEW: "bg-blue-500/20 text-blue-400 border-blue-500/40",
  CONFIRMED: "bg-brand-gold/20 text-brand-gold border-brand-gold/40",
  PREPARING: "bg-brand-orange/20 text-brand-orange border-brand-orange/40",
  READY: "bg-green-500/20 text-green-400 border-green-500/40",
  OUT_FOR_DELIVERY: "bg-purple-500/20 text-purple-400 border-purple-500/40",
  DELIVERED: "bg-white/10 text-brand-cream/60 border-white/20",
  CANCELLED: "bg-brand-red/20 text-brand-red border-brand-red/40",
};

export const KITCHEN_COLUMNS: { key: OrderStatus[]; label: string }[] = [
  { key: ["NEW", "CONFIRMED"], label: "À traiter" },
  { key: ["PREPARING"], label: "En préparation" },
  { key: ["READY"], label: "Prêtes" },
  { key: ["OUT_FOR_DELIVERY"], label: "En livraison" },
];

const TRANSITIONS: Record<OrderStatus, OrderStatus[]> = {
  NEW: ["CONFIRMED", "CANCELLED"],
  CONFIRMED: ["PREPARING", "CANCELLED"],
  PREPARING: ["READY", "CANCELLED"],
  READY: ["OUT_FOR_DELIVERY", "DELIVERED", "CANCELLED"],
  OUT_FOR_DELIVERY: ["DELIVERED", "CANCELLED"],
  DELIVERED: [],
  CANCELLED: [],
};

export function getNextStatuses(
  current: OrderStatus,
  orderType: "DELIVERY" | "PICKUP"
): OrderStatus[] {
  const next = TRANSITIONS[current] ?? [];
  if (orderType === "PICKUP") {
    return next.filter((s) => s !== "OUT_FOR_DELIVERY");
  }
  return next;
}

export function canTransition(from: OrderStatus, to: OrderStatus): boolean {
  return TRANSITIONS[from]?.includes(to) ?? false;
}
