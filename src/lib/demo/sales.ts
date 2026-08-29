import type { DemoTier } from "@/lib/demo/tiers";
import { TIER_LABELS, TIER_PRICES } from "@/lib/demo/tiers";

/** Override via Netlify env: NEXT_PUBLIC_SALES_WHATSAPP=33612345678 */
export function getSalesWhatsapp(): string {
  return process.env.NEXT_PUBLIC_SALES_WHATSAPP?.replace(/\D/g, "") || "33600000000";
}

export function getSalesEmail(): string {
  return process.env.NEXT_PUBLIC_SALES_EMAIL || "contact@speed-apero.fr";
}

export function whatsappUrl(message: string): string {
  const phone = getSalesWhatsapp();
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export function interestMessage(tier?: DemoTier): string {
  if (tier) {
    return `Bonjour, je suis intéressé par la formule ${TIER_LABELS[tier]} (${TIER_PRICES[tier]} €) de Speed Apéro. Pouvez-vous me recontacter ?`;
  }
  return "Bonjour, je souhaite en savoir plus sur les formules Speed Apéro. Pouvez-vous me recontacter ?";
}

export interface OfferPitch {
  promise: string;
  audience: string;
  benefits: string[];
  includesSetup: string;
}

export const OFFER_PITCHES: Record<DemoTier, OfferPitch> = {
  starter: {
    promise: "Prendre des commandes sans commission",
    audience: "Pour démarrer ou tester la vente directe",
    benefits: [
      "Votre menu en ligne, livré ou à emporter",
      "Zéro commission type Uber Eats / Deliveroo",
      "Admin produits & commandes simples",
    ],
    includesSetup: "Mise en ligne + formation de base",
  },
  pro: {
    promise: "Remplir le frigo le midi et relancer vos clients",
    audience: "Pour une dark kitchen qui veut croître",
    benefits: [
      "Compte client, promos et bannières marketing",
      "Commandes programmées pour lisser le rush",
      "Mode cuisine + dashboard avancé",
    ],
    includesSetup: "Setup + formation équipe + templates promos",
  },
  premium: {
    promise: "Fidéliser et livrer comme une vraie app",
    audience: "Pour une expérience client premium",
    benefits: [
      "Fidélité, crédit client et suivi en direct",
      "Gestion livreurs + analytics avancées",
      "PWA installable sur le téléphone",
    ],
    includesSetup: "Setup complet + accompagnement lancement",
  },
};

export const TRUST_BADGES = [
  { label: "Sans commission", detail: "Paiement unique, pas de % par commande" },
  { label: "Mise en ligne rapide", detail: "Votre marque, votre menu, votre zone" },
  { label: "Support inclus", detail: "Accompagnement au démarrage" },
  { label: "100 % personnalisable", detail: "Couleurs, logo, textes, zones" },
];

export const TESTIMONIALS = [
  {
    quote:
      "On a sorti une partie du volume des apps de livraison. Les marges sont redevenues saines.",
    author: "Karim",
    role: "Gérant dark kitchen · Lille",
    result: "Commandes directes en hausse",
  },
  {
    quote:
      "Les codes promo et la commande programmée ont calmé le rush du vendredi soir. L’équipe respire.",
    author: "Sophie",
    role: "Responsable cuisine · Lyon",
    result: "Rush mieux lissé",
  },
  {
    quote:
      "Le suivi et la fidélité font revenir les clients. On a enfin une vraie relation, pas un numéro de ticket.",
    author: "Thomas",
    role: "Fondateur · Bordeaux",
    result: "Clients qui reviennent",
  },
];

/** Commission moyenne approximative plateformes livraison (indicatif démo). */
export const PLATFORM_COMMISSION_RATE = 0.3;
