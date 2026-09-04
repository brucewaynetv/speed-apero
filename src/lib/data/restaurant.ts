import type { OpeningHour } from "@/lib/data/catalog-hours";

export const RESTAURANT = {
  name: "Speed Apéro",
  phoneDisplay: "+33 6 18 34 43 73",
  phoneTel: "+33618344373",
  addressLine: "Cavillargues",
  postalCode: "30330",
  city: "Cavillargues",
  fullAddress: "Cavillargues, 30330 Cavillargues",
  mapEmbedUrl:
    "https://maps.google.com/maps?q=Cavillargues%2C%2030330&z=12&output=embed",
  mapLink: "https://maps.google.com/?q=Cavillargues,+30330",
  paymentMethods: [
    "Espèces (livraison)",
    "Carte à la livraison",
  ],
  deliveryNote: "Similaires aux heures d'ouverture",
  cookieNote:
    "Pour un contrôle fiable de l'état de votre commande à l'écran, en temps réel, vos données peuvent être sauvegardées sur cet appareil à l'aide de cookies.",
} as const;

/** Zones affichées sur la fiche infos (couleurs carte) */
export const INFO_DELIVERY_ZONES = [
  {
    id: "zone-proche",
    label: "Zone orange — proximité",
    color: "#f97316",
    minimumCents: 1500,
    deliveryFeeCents: 0,
    description: "Cavillargues et alentours immédiats",
  },
  {
    id: "zone-etendue",
    label: "Zone verte — étendue",
    color: "#22c55e",
    minimumCents: 0,
    deliveryFeeCents: 1000,
    description: "Bagnols-sur-Cèze et communes voisines",
  },
] as const;

export const HOURS_LABELS: { days: string; hours: string }[] = [
  { days: "Lundi – Jeudi", hours: "18:00 – 23:00" },
  { days: "Vendredi – Dimanche", hours: "18:00 – 00:00" },
];

/** Horaires runtime (soirée) — alignés fiche réelle */
export const STORE_OPENING_HOURS: OpeningHour[] = [
  { dayOfWeek: 1, openTime: "18:00", closeTime: "23:00" },
  { dayOfWeek: 2, openTime: "18:00", closeTime: "23:00" },
  { dayOfWeek: 3, openTime: "18:00", closeTime: "23:00" },
  { dayOfWeek: 4, openTime: "18:00", closeTime: "23:00" },
  { dayOfWeek: 5, openTime: "18:00", closeTime: "00:00" },
  { dayOfWeek: 6, openTime: "18:00", closeTime: "00:00" },
  { dayOfWeek: 0, openTime: "18:00", closeTime: "00:00" },
];
