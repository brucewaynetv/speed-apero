"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Award,
  Bell,
  Check,
  ChevronRight,
  CreditCard,
  Heart,
  Home,
  MapPin,
  Package,
  Plus,
  Smartphone,
  Star,
  Tag,
  User,
  Wallet,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useDemoTier } from "@/components/demo/demo-tier-provider";
import { CommercialCtaSection } from "@/components/demo/commercial-cta";
import { formatMoney } from "@/lib/pricing/money";
import {
  CREDIT_CENTS,
  CREDIT_HISTORY,
  DEMO_ADDRESSES,
  DEMO_CUSTOMER,
  DEMO_FAVORITES,
  DEMO_ORDERS,
  DEMO_SAVED_PROMOS,
  LOYALTY_NEXT,
  LOYALTY_POINTS,
  LOYALTY_TIERS,
  currentLoyaltyTier,
  orderStatusLabel,
  type DemoAddress,
  type DemoOrder,
} from "@/lib/demo/account-demo";
import { cn } from "@/lib/utils";

type TabId = "overview" | "orders" | "addresses" | "rewards" | "settings";

export function AccountPage() {
  const { features, label, basePath, tier } = useDemoTier();
  const [tab, setTab] = useState<TabId>("overview");
  const [addresses, setAddresses] = useState(DEMO_ADDRESSES);
  const [notifEmail, setNotifEmail] = useState(true);
  const [notifPush, setNotifPush] = useState(tier === "premium");
  const [notifSms, setNotifSms] = useState(false);

  const loyalty = currentLoyaltyTier(LOYALTY_POINTS);
  const loyaltyProgress = Math.min(100, Math.round((LOYALTY_POINTS / LOYALTY_NEXT) * 100));

  const tabs = useMemo(() => {
    const list: { id: TabId; label: string; icon: typeof User; premiumOnly?: boolean }[] = [
      { id: "overview", label: "Aperçu", icon: User },
      { id: "orders", label: "Commandes", icon: Package },
      { id: "addresses", label: "Adresses", icon: MapPin },
    ];
    if (features.loyalty || features.customerCredit) {
      list.push({ id: "rewards", label: "Avantages", icon: Award, premiumOnly: true });
    }
    list.push({ id: "settings", label: "Préfs", icon: Bell });
    return list;
  }, [features.loyalty, features.customerCredit]);

  if (!features.customerAccount) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-brand-anthracite">
          <User className="h-7 w-7 text-brand-cream/40" />
        </div>
        <h1 className="mt-6 font-display text-4xl text-brand-cream">Compte client</h1>
        <p className="mt-3 text-brand-cream/60">
          Historique, adresses, favoris et promos — dès la formule Pro. Vous êtes en démo{" "}
          {label}.
        </p>
        <ul className="mx-auto mt-6 max-w-sm space-y-2 text-left text-sm text-brand-cream/50">
          {[
            "Profil & adresses de livraison",
            "Historique + recommande en 1 clic",
            "Codes promo sauvegardés",
            "Premium : fidélité, crédit, PWA",
          ].map((item) => (
            <li key={item} className="flex gap-2">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-orange" />
              {item}
            </li>
          ))}
        </ul>
        <Button asChild className="mt-8" variant="gold" size="lg">
          <Link href="/demo/pro">Voir la démo Pro</Link>
        </Button>
        <p className="mt-4">
          <Link href={basePath} className="text-sm text-brand-orange hover:underline">
            ← Retour au menu
          </Link>
        </p>
      </div>
    );
  }

  function setDefaultAddress(id: string) {
    setAddresses((prev) =>
      prev.map((a) => ({ ...a, isDefault: a.id === id }))
    );
    toast.success("Adresse par défaut mise à jour");
  }

  function reorder(order: DemoOrder) {
    toast.success(`Panier prérempli · commande #${order.number}`, {
      description: order.items.join(" · "),
      action: {
        label: "Voir le menu",
        onClick: () => {
          window.location.href = `${basePath}#carte`;
        },
      },
    });
  }

  return (
    <div
      className={cn(
        "min-h-screen pb-16",
        tier === "premium" && "bg-gradient-to-b from-brand-gold/5 via-transparent to-transparent"
      )}
    >
      <div className="border-b border-white/5 bg-brand-anthracite/40">
        <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6">
          <Link
            href={basePath}
            className="text-sm text-brand-cream/50 hover:text-brand-orange"
          >
            ← Retour au menu
          </Link>

          <div className="mt-5 flex flex-wrap items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <div
                className={cn(
                  "flex h-14 w-14 items-center justify-center rounded-2xl font-display text-2xl",
                  tier === "premium"
                    ? "bg-brand-gold/20 text-brand-gold ring-1 ring-brand-gold/40"
                    : "bg-brand-orange/20 text-brand-orange ring-1 ring-brand-orange/30"
                )}
              >
                {DEMO_CUSTOMER.avatarInitials}
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="font-display text-3xl tracking-wide text-brand-cream sm:text-4xl">
                    {DEMO_CUSTOMER.firstName} {DEMO_CUSTOMER.lastName}
                  </h1>
                  <Badge variant={tier === "premium" ? "gold" : "orange"}>
                    Démo {label}
                  </Badge>
                </div>
                <p className="mt-1 text-sm text-brand-cream/50">
                  {DEMO_CUSTOMER.email} · client depuis {DEMO_CUSTOMER.memberSince}
                </p>
              </div>
            </div>

            {(features.loyalty || features.customerCredit) && (
              <div className="flex flex-wrap gap-2">
                {features.loyalty && (
                  <div className="rounded-xl border border-brand-gold/30 bg-brand-gold/10 px-3 py-2">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-brand-gold/70">
                      Fidélité {loyalty.name}
                    </p>
                    <p className="font-display text-xl text-brand-gold">{LOYALTY_POINTS} pts</p>
                  </div>
                )}
                {features.customerCredit && (
                  <div className="rounded-xl border border-green-500/30 bg-green-500/10 px-3 py-2">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-green-400/70">
                      Crédit
                    </p>
                    <p className="font-display text-xl text-green-400">
                      {formatMoney(CREDIT_CENTS)}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          <nav className="mt-6 flex gap-1 overflow-x-auto pb-1 scrollbar-hide">
            {tabs.map((t) => {
              const Icon = t.icon;
              const active = tab === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTab(t.id)}
                  className={cn(
                    "inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-2 text-xs font-semibold transition-colors",
                    active
                      ? tier === "premium"
                        ? "border-brand-gold/50 bg-brand-gold/15 text-brand-gold"
                        : "border-brand-orange/50 bg-brand-orange/15 text-brand-orange"
                      : "border-white/10 text-brand-cream/55 hover:border-white/20 hover:text-brand-cream"
                  )}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {t.label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        {tab === "overview" && (
          <OverviewTab
            basePath={basePath}
            tier={tier}
            hasLoyalty={features.loyalty}
            hasCredit={features.customerCredit}
            loyaltyName={loyalty.name}
            loyaltyProgress={loyaltyProgress}
            onGoOrders={() => setTab("orders")}
            onGoRewards={() => setTab("rewards")}
            onReorder={reorder}
          />
        )}
        {tab === "orders" && (
          <OrdersTab basePath={basePath} onReorder={reorder} />
        )}
        {tab === "addresses" && (
          <AddressesTab addresses={addresses} onSetDefault={setDefaultAddress} />
        )}
        {tab === "rewards" && (features.loyalty || features.customerCredit) && (
          <RewardsTab
            hasLoyalty={features.loyalty}
            hasCredit={features.customerCredit}
            loyaltyName={loyalty.name}
            loyaltyProgress={loyaltyProgress}
          />
        )}
        {tab === "settings" && (
          <SettingsTab
            tier={tier}
            isPremium={tier === "premium"}
            notifEmail={notifEmail}
            notifPush={notifPush}
            notifSms={notifSms}
            onNotifEmail={setNotifEmail}
            onNotifPush={setNotifPush}
            onNotifSms={setNotifSms}
          />
        )}

        <div className="mt-12">
          <CommercialCtaSection
            tier={tier}
            title={`Compte ${label} — intéressant pour vos clients ?`}
            subtitle="Historique, fidélité, crédit : le même espace, à votre marque."
          />
        </div>
      </div>
    </div>
  );
}

function OverviewTab({
  basePath,
  tier,
  hasLoyalty,
  hasCredit,
  loyaltyName,
  loyaltyProgress,
  onGoOrders,
  onGoRewards,
  onReorder,
}: {
  basePath: string;
  tier: string;
  hasLoyalty: boolean;
  hasCredit: boolean;
  loyaltyName: string;
  loyaltyProgress: number;
  onGoOrders: () => void;
  onGoRewards: () => void;
  onReorder: (o: DemoOrder) => void;
}) {
  const lastOrder = DEMO_ORDERS[0];

  return (
    <div className="space-y-5">
      {(hasLoyalty || hasCredit) && (
        <button
          type="button"
          onClick={onGoRewards}
          className="w-full rounded-2xl border border-brand-gold/30 bg-gradient-to-br from-brand-gold/15 to-transparent p-5 text-left transition hover:border-brand-gold/50"
        >
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-brand-gold/70">
                Avantages Premium
              </p>
              <p className="mt-1 font-display text-2xl text-brand-cream">
                {hasLoyalty ? `Niveau ${loyaltyName}` : "Crédit client"}
              </p>
            </div>
            <ChevronRight className="h-5 w-5 text-brand-gold" />
          </div>
          {hasLoyalty && (
            <div className="mt-4">
              <div className="mb-1.5 flex justify-between text-xs text-brand-cream/50">
                <span>{LOYALTY_POINTS} pts</span>
                <span>Reward à {LOYALTY_NEXT} pts</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-brand-gold transition-all"
                  style={{ width: `${loyaltyProgress}%` }}
                />
              </div>
            </div>
          )}
        </button>
      )}

      <section className="rounded-2xl border border-white/10 bg-brand-anthracite/60 p-5">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl text-brand-cream">Dernière commande</h2>
          <button
            type="button"
            onClick={onGoOrders}
            className="text-xs font-semibold text-brand-orange hover:underline"
          >
            Tout voir
          </button>
        </div>
        <OrderRow order={lastOrder} onReorder={onReorder} basePath={basePath} />
      </section>

      <section className="rounded-2xl border border-white/10 bg-brand-anthracite/60 p-5">
        <div className="mb-3 flex items-center gap-2">
          <Heart className="h-4 w-4 text-brand-orange" />
          <h2 className="font-display text-xl text-brand-cream">Favoris</h2>
        </div>
        <div className="grid gap-2 sm:grid-cols-3">
          {DEMO_FAVORITES.map((fav) => (
            <Link
              key={fav.name}
              href={`${basePath}#carte`}
              className="rounded-xl border border-white/10 bg-brand-black/40 p-3 transition hover:border-brand-orange/40"
            >
              <p className="text-[10px] uppercase tracking-wider text-brand-cream/40">
                {fav.category}
              </p>
              <p className="mt-1 text-sm font-semibold text-brand-cream">{fav.name}</p>
              <p className="mt-1 text-sm text-brand-orange">{formatMoney(fav.priceCents)}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-white/10 bg-brand-anthracite/60 p-5">
        <div className="mb-3 flex items-center gap-2">
          <Tag className="h-4 w-4 text-brand-orange" />
          <h2 className="font-display text-xl text-brand-cream">Codes promo</h2>
        </div>
        <div className="space-y-2">
          {DEMO_SAVED_PROMOS.map((promo) => (
            <button
              key={promo.code}
              type="button"
              onClick={() => {
                void navigator.clipboard?.writeText(promo.code);
                toast.success(`Code ${promo.code} copié`);
              }}
              className="flex w-full items-center justify-between rounded-xl border border-dashed border-brand-orange/30 bg-brand-orange/5 px-4 py-3 text-left transition hover:border-brand-orange/60"
            >
              <div>
                <p className="font-mono text-sm font-bold text-brand-orange">{promo.code}</p>
                <p className="text-xs text-brand-cream/50">{promo.label}</p>
              </div>
              <span className="text-[10px] text-brand-cream/40">Expire {promo.expires}</span>
            </button>
          ))}
        </div>
        {tier === "pro" && (
          <p className="mt-3 text-xs text-brand-cream/40">
            En Premium : fidélité + crédit s’ajoutent à ces promos.
          </p>
        )}
      </section>
    </div>
  );
}

function OrdersTab({
  basePath,
  onReorder,
}: {
  basePath: string;
  onReorder: (o: DemoOrder) => void;
}) {
  return (
    <div className="space-y-3">
      <h2 className="font-display text-2xl text-brand-cream">Historique</h2>
      <p className="text-sm text-brand-cream/50">
        {DEMO_ORDERS.length} commandes · recommande en un clic
      </p>
      {DEMO_ORDERS.map((order) => (
        <div
          key={order.id}
          className="rounded-2xl border border-white/10 bg-brand-anthracite/60 p-4"
        >
          <OrderRow order={order} onReorder={onReorder} basePath={basePath} detailed />
        </div>
      ))}
    </div>
  );
}

function OrderRow({
  order,
  onReorder,
  basePath,
  detailed,
}: {
  order: DemoOrder;
  onReorder: (o: DemoOrder) => void;
  basePath: string;
  detailed?: boolean;
}) {
  const statusColor =
    order.status === "delivered"
      ? "text-green-400 border-green-500/30 bg-green-500/10"
      : order.status === "cancelled"
        ? "text-brand-cream/40 border-white/10 bg-white/5"
        : "text-brand-orange border-brand-orange/30 bg-brand-orange/10";

  return (
    <div className={cn(!detailed && "mt-4")}>
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <p className="font-semibold text-brand-cream">#{order.number}</p>
          <p className="text-xs text-brand-cream/45">{order.date}</p>
        </div>
        <span
          className={cn(
            "rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase",
            statusColor
          )}
        >
          {orderStatusLabel(order.status)}
        </span>
      </div>
      <p className="mt-2 text-sm text-brand-cream/70">{order.items.join(" · ")}</p>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
        <p className="font-display text-lg text-brand-orange">
          {formatMoney(order.totalCents)}
          <span className="ml-2 text-xs font-body font-normal text-brand-cream/40">
            {order.type === "delivery" ? "Livraison" : "À emporter"}
          </span>
        </p>
        {order.status !== "cancelled" && (
          <div className="flex gap-2">
            {order.status === "preparing" && (
              <Button asChild size="sm" variant="secondary">
                <Link href={`${basePath}/commande/${order.id}`}>Suivre</Link>
              </Button>
            )}
            <Button size="sm" variant="outline" onClick={() => onReorder(order)}>
              Recommander
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

function AddressesTab({
  addresses,
  onSetDefault,
}: {
  addresses: DemoAddress[];
  onSetDefault: (id: string) => void;
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-2xl text-brand-cream">Adresses</h2>
        <Button
          size="sm"
          variant="secondary"
          onClick={() => toast.message("Ajout d'adresse", { description: "Disponible en prod" })}
        >
          <Plus className="h-3.5 w-3.5" />
          Ajouter
        </Button>
      </div>
      {addresses.map((addr) => (
        <div
          key={addr.id}
          className={cn(
            "rounded-2xl border p-4",
            addr.isDefault
              ? "border-brand-orange/40 bg-brand-orange/5"
              : "border-white/10 bg-brand-anthracite/60"
          )}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex gap-3">
              <div className="mt-0.5 rounded-lg bg-white/5 p-2">
                {addr.label === "Bureau" ? (
                  <CreditCard className="h-4 w-4 text-brand-cream/60" />
                ) : (
                  <Home className="h-4 w-4 text-brand-cream/60" />
                )}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-brand-cream">{addr.label}</p>
                  {addr.isDefault && (
                    <Badge variant="orange" className="text-[9px]">
                      Par défaut
                    </Badge>
                  )}
                </div>
                <p className="mt-1 text-sm text-brand-cream/65">{addr.line}</p>
                <p className="text-sm text-brand-cream/45">{addr.city}</p>
              </div>
            </div>
            {!addr.isDefault && (
              <button
                type="button"
                onClick={() => onSetDefault(addr.id)}
                className="text-xs font-semibold text-brand-orange hover:underline"
              >
                Définir par défaut
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function RewardsTab({
  hasLoyalty,
  hasCredit,
  loyaltyName,
  loyaltyProgress,
}: {
  hasLoyalty: boolean;
  hasCredit: boolean;
  loyaltyName: string;
  loyaltyProgress: number;
}) {
  return (
    <div className="space-y-5">
      {hasLoyalty && (
        <section className="rounded-2xl border border-brand-gold/30 bg-brand-gold/5 p-5">
          <div className="flex items-center gap-2">
            <Award className="h-5 w-5 text-brand-gold" />
            <h2 className="font-display text-2xl text-brand-cream">Fidélité</h2>
          </div>
          <p className="mt-2 text-sm text-brand-cream/55">
            Niveau actuel : <span className="font-semibold text-brand-gold">{loyaltyName}</span>
          </p>

          <div className="mt-5 flex items-center justify-center">
            <div className="relative flex h-32 w-32 items-center justify-center">
              <svg className="absolute inset-0 -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  stroke="rgba(255,255,255,0.08)"
                  strokeWidth="8"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  stroke="#f5b51b"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${loyaltyProgress * 2.64} 264`}
                />
              </svg>
              <div className="text-center">
                <p className="font-display text-3xl text-brand-gold">{LOYALTY_POINTS}</p>
                <p className="text-[10px] uppercase tracking-wider text-brand-cream/40">points</p>
              </div>
            </div>
          </div>
          <p className="mt-2 text-center text-xs text-brand-cream/45">
            Encore {LOYALTY_NEXT - LOYALTY_POINTS} pts pour le prochain reward
          </p>

          <div className="mt-6 grid gap-2 sm:grid-cols-3">
            {LOYALTY_TIERS.map((t) => {
              const unlocked = LOYALTY_POINTS >= t.minPoints;
              const current = t.name === loyaltyName;
              return (
                <div
                  key={t.name}
                  className={cn(
                    "rounded-xl border p-3",
                    current
                      ? "border-brand-gold/50 bg-brand-gold/10"
                      : unlocked
                        ? "border-white/15 bg-white/5"
                        : "border-white/5 opacity-40"
                  )}
                >
                  <p className="text-xs font-bold text-brand-cream">{t.name}</p>
                  <p className="text-[10px] text-brand-cream/40">{t.minPoints}+ pts</p>
                  <ul className="mt-2 space-y-0.5">
                    {t.perks.map((p) => (
                      <li key={p} className="text-[11px] text-brand-cream/60">
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          <div className="mt-4 flex items-start gap-2 rounded-xl bg-brand-black/40 p-3 text-xs text-brand-cream/60">
            <Star className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-gold" />
            Prochain reward à 300 pts : dessert offert ou −3 € sur la commande.
          </div>
        </section>
      )}

      {hasCredit && (
        <section className="rounded-2xl border border-green-500/30 bg-green-500/5 p-5">
          <div className="flex items-center gap-2">
            <Wallet className="h-5 w-5 text-green-400" />
            <h2 className="font-display text-2xl text-brand-cream">Crédit</h2>
          </div>
          <p className="mt-3 font-display text-4xl text-green-400">
            {formatMoney(CREDIT_CENTS)}
          </p>
          <p className="text-xs text-brand-cream/45">Disponible au prochain checkout</p>

          <div className="mt-5 space-y-2">
            <p className="text-xs font-bold uppercase tracking-wider text-brand-cream/40">
              Historique
            </p>
            {CREDIT_HISTORY.map((row) => (
              <div
                key={row.label + row.date}
                className="flex items-center justify-between rounded-lg border border-white/5 bg-brand-black/30 px-3 py-2 text-sm"
              >
                <div>
                  <p className="text-brand-cream/80">{row.label}</p>
                  <p className="text-[10px] text-brand-cream/40">{row.date}</p>
                </div>
                <p
                  className={cn(
                    "font-semibold",
                    row.amountCents >= 0 ? "text-green-400" : "text-brand-cream/50"
                  )}
                >
                  {row.amountCents >= 0 ? "+" : ""}
                  {formatMoney(row.amountCents)}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function SettingsTab({
  tier,
  isPremium,
  notifEmail,
  notifPush,
  notifSms,
  onNotifEmail,
  onNotifPush,
  onNotifSms,
}: {
  tier: string;
  isPremium: boolean;
  notifEmail: boolean;
  notifPush: boolean;
  notifSms: boolean;
  onNotifEmail: (v: boolean) => void;
  onNotifPush: (v: boolean) => void;
  onNotifSms: (v: boolean) => void;
}) {
  return (
    <div className="space-y-5">
      <section className="rounded-2xl border border-white/10 bg-brand-anthracite/60 p-5">
        <h2 className="font-display text-xl text-brand-cream">Profil</h2>
        <dl className="mt-4 space-y-3 text-sm">
          {[
            ["Nom", `${DEMO_CUSTOMER.firstName} ${DEMO_CUSTOMER.lastName}`],
            ["Email", DEMO_CUSTOMER.email],
            ["Téléphone", DEMO_CUSTOMER.phone],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between gap-4 border-b border-white/5 pb-2">
              <dt className="text-brand-cream/40">{k}</dt>
              <dd className="text-right text-brand-cream/85">{v}</dd>
            </div>
          ))}
        </dl>
        <Button
          className="mt-4"
          size="sm"
          variant="secondary"
          onClick={() => toast.message("Édition profil", { description: "Disponible en production" })}
        >
          Modifier
        </Button>
      </section>

      <section className="rounded-2xl border border-white/10 bg-brand-anthracite/60 p-5">
        <div className="flex items-center gap-2">
          <Bell className="h-4 w-4 text-brand-orange" />
          <h2 className="font-display text-xl text-brand-cream">Notifications</h2>
        </div>
        <div className="mt-4 space-y-3">
          <ToggleRow
            label="Emails commandes & promos"
            checked={notifEmail}
            onChange={onNotifEmail}
          />
          <ToggleRow
            label="SMS statut livraison"
            checked={notifSms}
            onChange={onNotifSms}
          />
          <ToggleRow
            label="Push (PWA)"
            checked={notifPush}
            onChange={onNotifPush}
            locked={!isPremium}
            lockHint="Premium"
          />
        </div>
      </section>

      {isPremium ? (
        <section className="rounded-2xl border border-brand-gold/30 bg-brand-gold/5 p-5">
          <div className="flex items-center gap-2">
            <Smartphone className="h-4 w-4 text-brand-gold" />
            <h2 className="font-display text-xl text-brand-cream">App installable</h2>
          </div>
          <p className="mt-2 text-sm text-brand-cream/55">
            En Premium, le client peut installer la PWA sur son téléphone — comme une vraie app.
          </p>
          <Button
            className="mt-4"
            variant="gold"
            size="sm"
            onClick={() =>
              toast.success("PWA simulée", {
                description: "En production : prompt d'installation navigateur",
              })
            }
          >
            Installer l&apos;app (démo)
          </Button>
        </section>
      ) : (
        <section className="rounded-2xl border border-white/10 bg-brand-anthracite/40 p-5">
          <p className="text-sm text-brand-cream/50">
            Notifications push & PWA : disponibles en formule Premium.
          </p>
          <Button asChild className="mt-3" size="sm" variant="outline">
            <Link href="/demo/premium">Voir Premium</Link>
          </Button>
        </section>
      )}

      <p className="text-center text-xs text-brand-cream/30">Espace compte · démo {tier}</p>
    </div>
  );
}

function ToggleRow({
  label,
  checked,
  onChange,
  locked,
  lockHint,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  locked?: boolean;
  lockHint?: string;
}) {
  return (
    <label
      className={cn(
        "flex cursor-pointer items-center justify-between gap-3 rounded-xl border border-white/5 px-3 py-2.5",
        locked && "cursor-not-allowed opacity-50"
      )}
    >
      <span className="text-sm text-brand-cream/75">
        {label}
        {locked && lockHint && (
          <span className="ml-2 text-[10px] uppercase text-brand-gold">{lockHint}</span>
        )}
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={locked}
        onClick={() => !locked && onChange(!checked)}
        className={cn(
          "relative h-6 w-11 rounded-full transition-colors",
          checked ? "bg-brand-orange" : "bg-white/15"
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-transform",
            checked && "translate-x-5"
          )}
        />
      </button>
    </label>
  );
}
