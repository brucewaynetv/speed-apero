"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { PrepButton } from "@/components/storefront/prep-button";
import { useCartStore } from "@/hooks/use-cart";
import { formatMoney } from "@/lib/pricing/money";
import { CommercialCtaSection } from "@/components/demo/commercial-cta";
import { useDemoTier } from "@/components/demo/demo-tier-provider";
import { DELIVERY_ZONES } from "@/lib/data/catalog";

type OrderType = "DELIVERY" | "PICKUP";
type Step = 1 | 2 | 3 | 4;

const PROMO_CODES: Record<string, { type: "percent" | "free_delivery"; value: number }> = {
  BIENVENUE10: { type: "percent", value: 10 },
  LIVRAISON0: { type: "free_delivery", value: 0 },
};

export default function CheckoutPage() {
  const router = useRouter();
  const { tier, basePath, features, label } = useDemoTier();
  const { items, getSubtotal, clearCart } = useCartStore();
  const [step, setStep] = useState<Step>(1);
  const [loading, setLoading] = useState(false);
  const [orderType, setOrderType] = useState<OrderType>("DELIVERY");
  const [orderId, setOrderId] = useState<string | null>(null);
  const [orderNumber, setOrderNumber] = useState<number | null>(null);
  const [promoInput, setPromoInput] = useState("");
  const [promoCode, setPromoCode] = useState<string | null>(null);
  const [scheduled, setScheduled] = useState(false);
  const [scheduledAt, setScheduledAt] = useState("");
  const [useCredit, setUseCredit] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    street: "",
    complement: "",
    postalCode: "",
    city: "",
    instructions: "",
  });

  const subtotal = getSubtotal();
  const zone = DELIVERY_ZONES.find((z) =>
    form.postalCode.startsWith(z.postalCodes.replace("*", ""))
  );
  let deliveryFee = orderType === "DELIVERY" ? (zone?.deliveryFeeCents ?? 350) : 0;
  let discount = 0;

  if (features.promotions && promoCode) {
    const promo = PROMO_CODES[promoCode];
    if (promo?.type === "percent") {
      discount = Math.round(subtotal * (promo.value / 100));
    }
    if (promo?.type === "free_delivery") {
      deliveryFee = 0;
    }
  }

  const creditCents = features.customerCredit && useCredit ? 500 : 0;
  const total = Math.max(0, subtotal - discount - creditCents + deliveryFee);

  const updateForm = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  function applyPromo() {
    const code = promoInput.trim().toUpperCase();
    if (!features.promotions) {
      toast.error("Les codes promo sont disponibles en Pro / Premium");
      return;
    }
    if (!PROMO_CODES[code]) {
      toast.error("Code invalide");
      return;
    }
    setPromoCode(code);
    toast.success(`Code ${code} appliqué`);
  }

  const handleSubmit = async () => {
    if (items.length === 0) {
      toast.error("Votre panier est vide");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tier,
          type: orderType,
          customer: form,
          items: items.map((i) => ({
            productSlug: i.productSlug,
            productName: i.productName,
            quantity: i.quantity,
            unitPriceCents: i.unitPriceCents,
            options: i.options,
          })),
          subtotalCents: subtotal,
          deliveryFeeCents: deliveryFee,
          discountCents: discount + creditCents,
          totalCents: total,
          promoCode: promoCode ?? undefined,
          scheduledAt:
            features.scheduledOrders && scheduled && scheduledAt
              ? new Date(scheduledAt).toISOString()
              : undefined,
        }),
      });
      if (!res.ok) throw new Error("Erreur lors de la commande");
      const data = await res.json();
      clearCart();
      setOrderId(data.orderId);
      setOrderNumber(data.orderNumber);
      setStep(4);
      toast.success("Commande confirmée !");
    } catch {
      toast.error("Impossible de passer la commande");
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0 && step !== 4) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-4">
        <p className="text-brand-cream/60">Votre panier est vide</p>
        <Button asChild className="mt-4">
          <Link href={basePath}>Retour au menu</Link>
        </Button>
      </div>
    );
  }

  const steps = ["Livraison", "Informations", "Paiement", "Confirmation"];
  const inputClass =
    "w-full rounded-lg border border-white/10 bg-brand-anthracite px-4 py-3 text-brand-cream focus:border-brand-orange focus:outline-none";

  return (
    <div className="min-h-screen bg-brand-black">
      <header className="border-b border-white/5 px-4 py-4">
        <Link href={basePath} className="font-display text-2xl text-brand-orange">
          ← SPEED APÉRO
        </Link>
        <p className="mt-1 text-xs text-brand-cream/40">Checkout · démo {label}</p>
      </header>

      <div className="mx-auto max-w-lg px-4 py-8">
        <div className="mb-8 flex gap-2">
          {steps.map((stepLabel, i) => (
            <div
              key={stepLabel}
              className={`flex-1 rounded-lg py-2 text-center text-xs font-bold uppercase ${
                step >= i + 1
                  ? "bg-brand-orange text-white"
                  : "bg-brand-anthracite text-brand-cream/40"
              }`}
            >
              {i + 1}. {stepLabel}
            </div>
          ))}
        </div>

        {step === 1 && (
          <div className="space-y-4">
            <h1 className="font-display text-3xl tracking-wide">MODE DE RÉCUPÉRATION</h1>
            <div className="grid grid-cols-2 gap-3">
              {(["DELIVERY", "PICKUP"] as const).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setOrderType(type)}
                  className={`rounded-xl border p-6 text-center transition-all ${
                    orderType === type
                      ? "border-brand-orange bg-brand-orange/10"
                      : "border-white/10 hover:border-white/20"
                  }`}
                >
                  <span className="text-3xl">{type === "DELIVERY" ? "🛵" : "🥡"}</span>
                  <p className="mt-2 font-bold">
                    {type === "DELIVERY" ? "LIVRAISON" : "RETRAIT"}
                  </p>
                </button>
              ))}
            </div>

            {features.scheduledOrders && (
              <div className="rounded-xl border border-white/10 bg-brand-anthracite p-4">
                <label className="flex items-center gap-2 text-sm font-medium text-brand-cream">
                  <input
                    type="checkbox"
                    checked={scheduled}
                    onChange={(e) => setScheduled(e.target.checked)}
                  />
                  Programmer ma commande (Pro+)
                </label>
                {scheduled && (
                  <input
                    type="datetime-local"
                    className={`${inputClass} mt-3`}
                    value={scheduledAt}
                    onChange={(e) => setScheduledAt(e.target.value)}
                  />
                )}
              </div>
            )}

            <Button className="w-full" size="lg" onClick={() => setStep(2)}>
              Continuer
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h1 className="font-display text-3xl tracking-wide">VOS INFORMATIONS</h1>
            {features.customerAccount && (
              <p className="rounded-lg border border-brand-orange/20 bg-brand-orange/5 px-3 py-2 text-xs text-brand-orange">
                Compte client disponible —{" "}
                <Link href={`${basePath}/compte`} className="underline">
                  se connecter
                </Link>
              </p>
            )}
            {[
              { key: "firstName", label: "Prénom", required: true },
              { key: "lastName", label: "Nom", required: true },
              { key: "phone", label: "Téléphone", required: true, type: "tel" },
              { key: "email", label: "Email", required: true, type: "email" },
            ].map((field) => (
              <div key={field.key}>
                <label htmlFor={field.key} className="mb-1 block text-sm text-brand-cream/70">
                  {field.label}
                </label>
                <input
                  id={field.key}
                  type={field.type ?? "text"}
                  required={field.required}
                  value={form[field.key as keyof typeof form]}
                  onChange={(e) => updateForm(field.key, e.target.value)}
                  className={inputClass}
                />
              </div>
            ))}
            {orderType === "DELIVERY" && (
              <>
                {[
                  { key: "street", label: "Adresse" },
                  { key: "complement", label: "Complément d'adresse" },
                  { key: "postalCode", label: "Code postal" },
                  { key: "city", label: "Ville" },
                  { key: "instructions", label: "Instructions pour le livreur" },
                ].map((field) => (
                  <div key={field.key}>
                    <label htmlFor={field.key} className="mb-1 block text-sm text-brand-cream/70">
                      {field.label}
                    </label>
                    <input
                      id={field.key}
                      value={form[field.key as keyof typeof form]}
                      onChange={(e) => updateForm(field.key, e.target.value)}
                      className={inputClass}
                    />
                  </div>
                ))}
              </>
            )}
            <div className="flex gap-3">
              <Button variant="secondary" onClick={() => setStep(1)}>
                Retour
              </Button>
              <Button className="flex-1" onClick={() => setStep(3)}>
                Continuer
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h1 className="font-display text-3xl tracking-wide">PAIEMENT</h1>
            <p className="text-sm text-brand-cream/60">
              Mode démo — aucun paiement réel.
            </p>

            {features.promotions && (
              <div className="rounded-xl border border-white/10 bg-brand-anthracite p-4">
                <p className="mb-2 text-sm font-medium text-brand-cream">Code promo</p>
                <div className="flex gap-2">
                  <input
                    className={inputClass}
                    placeholder="BIENVENUE10"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                  />
                  <Button type="button" variant="secondary" onClick={applyPromo}>
                    OK
                  </Button>
                </div>
                {promoCode && (
                  <p className="mt-2 text-xs text-brand-gold">Code {promoCode} actif</p>
                )}
              </div>
            )}

            {features.customerCredit && (
              <label className="flex items-center gap-2 rounded-xl border border-green-500/20 bg-green-500/5 p-4 text-sm text-green-400">
                <input
                  type="checkbox"
                  checked={useCredit}
                  onChange={(e) => setUseCredit(e.target.checked)}
                />
                Utiliser mon crédit client (−5,00 €)
              </label>
            )}

            {["CARD", "CASH_ON_DELIVERY", "CASH_ON_PICKUP"].map((method) => (
              <div key={method} className="rounded-xl border border-white/10 bg-brand-anthracite p-4">
                {method === "CARD" && "💳 Carte bancaire (Stripe — mode test)"}
                {method === "CASH_ON_DELIVERY" && "💵 Espèces à la livraison"}
                {method === "CASH_ON_PICKUP" && "💵 Espèces au retrait"}
              </div>
            ))}

            <div className="space-y-2 rounded-xl bg-brand-black/50 p-4">
              <div className="flex justify-between text-sm">
                <span>Sous-total</span>
                <span>{formatMoney(subtotal)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-sm text-brand-gold">
                  <span>Remise</span>
                  <span>−{formatMoney(discount)}</span>
                </div>
              )}
              {creditCents > 0 && (
                <div className="flex justify-between text-sm text-green-400">
                  <span>Crédit</span>
                  <span>−{formatMoney(creditCents)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span>Livraison</span>
                <span>{formatMoney(deliveryFee)}</span>
              </div>
              <div className="flex justify-between border-t border-white/10 pt-2 font-display text-xl">
                <span>TOTAL</span>
                <span className="text-brand-orange">{formatMoney(total)}</span>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="secondary" onClick={() => setStep(2)}>
                Retour
              </Button>
              <PrepButton
                className="flex-1 font-display text-lg"
                size="lg"
                prep="brew"
                busy={loading}
                busyLabel="Brewing…"
                onClick={handleSubmit}
              >
                {`CONFIRMER — ${formatMoney(total)}`}
              </PrepButton>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4 py-8 text-center">
            <span className="text-6xl">✅</span>
            <h1 className="font-display text-4xl tracking-wide text-brand-orange">
              COMMANDE CONFIRMÉE !
            </h1>
            <p className="text-brand-cream/70">
              {orderNumber ? `N° ${orderNumber} · ` : ""}
              Merci ! Votre commande a été enregistrée.
              {scheduled && scheduledAt ? " (programmée)" : ""}
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              {features.orderTracking && orderId && (
                <Button
                  size="lg"
                  onClick={() => router.push(`${basePath}/commande/${orderId}`)}
                >
                  Suivre ma commande
                </Button>
              )}
              <Button asChild size="lg" variant={features.orderTracking ? "secondary" : "default"}>
                <Link href={basePath}>Retour au menu</Link>
              </Button>
            </div>
            <div className="mt-10 text-left">
              <CommercialCtaSection
                tier={tier}
                title={`Vous venez de tester la démo ${label}`}
                subtitle="Si cette expérience vous plaît, on la déploie avec votre branding."
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
