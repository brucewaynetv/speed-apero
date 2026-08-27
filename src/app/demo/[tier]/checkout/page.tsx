"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/hooks/use-cart";
import { formatMoney } from "@/lib/pricing/money";
import { useDemoTier } from "@/components/demo/demo-tier-provider";
import { DELIVERY_ZONES } from "@/lib/data/catalog";

type OrderType = "DELIVERY" | "PICKUP";
type Step = 1 | 2 | 3 | 4;

export default function CheckoutPage() {
  const router = useRouter();
  const { tier, basePath, features } = useDemoTier();
  const { items, getSubtotal, clearCart } = useCartStore();
  const [step, setStep] = useState<Step>(1);
  const [loading, setLoading] = useState(false);
  const [orderType, setOrderType] = useState<OrderType>("DELIVERY");
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
  const zone = DELIVERY_ZONES.find((z) => form.postalCode.startsWith(z.postalCodes.replace("*", "")));
  const deliveryFee = orderType === "DELIVERY" ? (zone?.deliveryFeeCents ?? 350) : 0;
  const total = subtotal + deliveryFee;

  const updateForm = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

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
          totalCents: total,
        }),
      });
      if (!res.ok) throw new Error("Erreur lors de la commande");
      const data = await res.json();
      clearCart();
      setStep(4);
      toast.success("Commande confirmée !");
      if (features.orderTracking) {
        setTimeout(() => router.push(`${basePath}/commande/${data.orderId}`), 2000);
      }
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

  return (
    <div className="min-h-screen bg-brand-black">
      <header className="border-b border-white/5 px-4 py-4">
        <Link href={basePath} className="font-display text-2xl text-brand-orange">
          ← SPEED APÉRO
        </Link>
      </header>

      <div className="mx-auto max-w-lg px-4 py-8">
        <div className="mb-8 flex gap-2">
          {steps.map((label, i) => (
            <div
              key={label}
              className={`flex-1 rounded-lg py-2 text-center text-xs font-bold uppercase ${
                step >= (i + 1)
                  ? "bg-brand-orange text-white"
                  : "bg-brand-anthracite text-brand-cream/40"
              }`}
            >
              {i + 1}. {label}
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
                  <p className="mt-2 font-bold">{type === "DELIVERY" ? "LIVRAISON" : "RETRAIT"}</p>
                </button>
              ))}
            </div>
            <Button className="w-full" size="lg" onClick={() => setStep(2)}>
              Continuer
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h1 className="font-display text-3xl tracking-wide">VOS INFORMATIONS</h1>
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
                  className="w-full rounded-lg border border-white/10 bg-brand-anthracite px-4 py-3 text-brand-cream focus:border-brand-orange focus:outline-none"
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
                      className="w-full rounded-lg border border-white/10 bg-brand-anthracite px-4 py-3 text-brand-cream focus:border-brand-orange focus:outline-none"
                    />
                  </div>
                ))}
              </>
            )}
            <div className="flex gap-3">
              <Button variant="secondary" onClick={() => setStep(1)}>Retour</Button>
              <Button className="flex-1" onClick={() => setStep(3)}>Continuer</Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h1 className="font-display text-3xl tracking-wide">PAIEMENT</h1>
            <p className="text-sm text-brand-cream/60">
              Mode démo — aucun paiement réel. Choisissez votre mode de paiement.
            </p>
            {["CARD", "CASH_ON_DELIVERY", "CASH_ON_PICKUP"].map((method) => (
              <div
                key={method}
                className="rounded-xl border border-white/10 bg-brand-anthracite p-4"
              >
                {method === "CARD" && "💳 Carte bancaire (Stripe — mode test)"}
                {method === "CASH_ON_DELIVERY" && "💵 Espèces à la livraison"}
                {method === "CASH_ON_PICKUP" && "💵 Espèces au retrait"}
              </div>
            ))}
            <div className="rounded-xl bg-brand-black/50 p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Sous-total</span>
                <span>{formatMoney(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Livraison</span>
                <span>{formatMoney(deliveryFee)}</span>
              </div>
              <div className="flex justify-between font-display text-xl border-t border-white/10 pt-2">
                <span>TOTAL</span>
                <span className="text-brand-orange">{formatMoney(total)}</span>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="secondary" onClick={() => setStep(2)}>Retour</Button>
              <Button className="flex-1 font-display text-lg" size="lg" onClick={handleSubmit} disabled={loading}>
                {loading ? "Traitement..." : `CONFIRMER — ${formatMoney(total)}`}
              </Button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="text-center space-y-4 py-8">
            <span className="text-6xl">✅</span>
            <h1 className="font-display text-4xl tracking-wide text-brand-orange">
              COMMANDE CONFIRMÉE !
            </h1>
            <p className="text-brand-cream/70">
              Merci ! Votre commande a été enregistrée et sera préparée rapidement.
            </p>
            <Button asChild size="lg">
              <Link href={basePath}>Retour au menu</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
