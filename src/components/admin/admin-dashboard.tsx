import Link from "next/link";
import {
  ChefHat,
  ClipboardList,
  Lock,
  Package,
  TrendingUp,
  Truck,
  Award,
  Megaphone,
} from "lucide-react";
import {
  countActiveOrders,
  countTodayOrders,
  fetchAdminOrders,
  sumTodayRevenue,
} from "@/lib/orders/queries";
import { OrdersList } from "@/components/admin/orders-list";
import { MiniBarChart, DonutStat } from "@/components/admin/admin-charts";
import { formatMoney } from "@/lib/pricing/money";
import type { DemoTier } from "@/lib/demo/tiers";
import { getAdminBasePath, getAdminFeatures, getTierMeta } from "@/lib/admin/features";
import {
  DEMO_HOURLY_ORDERS,
  DEMO_TOP_PRODUCTS,
  DEMO_WEEKLY_REVENUE,
} from "@/lib/admin/demo-ops";

interface AdminDashboardProps {
  tier: DemoTier;
}

export async function AdminDashboard({ tier }: AdminDashboardProps) {
  const base = getAdminBasePath(tier);
  const features = getAdminFeatures(tier);
  const meta = getTierMeta(tier);
  const orders = await fetchAdminOrders(20);

  const stats = features.advancedDashboard
    ? await Promise.all([countActiveOrders(), countTodayOrders(), sumTodayRevenue()])
    : [await countActiveOrders(), null, null];

  const [activeCount, todayCount, todayRevenue] = stats;
  const deliveryShare =
    orders.length > 0
      ? Math.round(
          (orders.filter((o) => o.type === "DELIVERY").length / orders.length) * 100
        )
      : 68;

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl text-brand-cream">
            Dashboard {meta.label}
          </h1>
          <p className="text-brand-cream/50">
            {tier === "starter"
              ? "Gestion essentielle — commandes et carte"
              : tier === "pro"
                ? "Pilotage complet de votre dark kitchen"
                : "Suite premium — fidélité, livreurs et analytics"}
          </p>
        </div>
        <Link
          href={`/demo/${tier}`}
          className="text-sm font-semibold text-brand-orange hover:underline"
        >
          Ouvrir le storefront →
        </Link>
      </div>

      {features.advancedDashboard ? (
        <div className="grid gap-4 sm:grid-cols-3">
          <StatCard
            icon={<ClipboardList className="h-5 w-5 text-brand-orange" />}
            label="Commandes actives"
            value={String(activeCount)}
          />
          <StatCard
            icon={<TrendingUp className="h-5 w-5 text-brand-gold" />}
            label="Aujourd'hui"
            value={String(todayCount ?? 0)}
          />
          <StatCard
            icon={<TrendingUp className="h-5 w-5 text-green-400" />}
            label="CA du jour"
            value={formatMoney(todayRevenue ?? 0)}
            highlight
          />
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-brand-anthracite p-6">
            <p className="text-3xl font-display text-brand-orange">{activeCount}</p>
            <p className="text-sm text-brand-cream/50">
              commande{activeCount !== 1 ? "s" : ""} en cours
            </p>
          </div>
          <div className="rounded-2xl border border-dashed border-white/15 bg-white/[0.02] p-6">
            <div className="flex items-center gap-2 text-brand-cream/40">
              <Lock className="h-4 w-4" />
              <p className="text-xs font-bold uppercase tracking-wider">Pro</p>
            </div>
            <p className="mt-2 text-sm text-brand-cream/55">
              CA du jour, graphiques 7 jours, top produits et mode cuisine — débloqués en{" "}
              <Link href="/admin/pro/login" className="text-brand-orange hover:underline">
                formule Pro
              </Link>
              .
            </p>
          </div>
        </div>
      )}

      {features.advancedDashboard && (
        <div className="grid gap-4 lg:grid-cols-3">
          <MiniBarChart
            className="lg:col-span-2"
            title="CA 7 jours (indicatif démo)"
            bars={DEMO_WEEKLY_REVENUE}
            accent={tier === "premium" ? "gold" : "orange"}
            formatValue={(v) => `${v}€`}
          />
          <DonutStat
            label="Part livraison"
            percent={deliveryShare}
            detail="Sur les commandes récentes"
            accent={tier === "premium" ? "gold" : "orange"}
          />
        </div>
      )}

      {features.advancedDashboard && (
        <div className="grid gap-4 lg:grid-cols-2">
          <MiniBarChart
            title="Rush horaire (indicatif)"
            bars={DEMO_HOURLY_ORDERS}
            accent="orange"
          />
          <div className="rounded-2xl border border-white/10 bg-brand-anthracite p-5">
            <h3 className="font-accent text-xs font-bold uppercase tracking-wider text-brand-cream/45">
              Top produits
            </h3>
            <ul className="mt-4 space-y-2.5">
              {DEMO_TOP_PRODUCTS.map((p, i) => (
                <li
                  key={p.name}
                  className="flex items-center justify-between gap-3 text-sm"
                >
                  <span className="flex items-center gap-2 text-brand-cream/80">
                    <span className="font-mono text-xs text-brand-cream/35">{i + 1}.</span>
                    {p.name}
                  </span>
                  <span className="text-brand-cream/45">
                    {p.sold} · {p.revenueLabel}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-3">
        <QuickLink href={`${base}/commandes`} icon={<ClipboardList className="h-5 w-5" />} label="Commandes" />
        <QuickLink href={`${base}/produits`} icon={<Package className="h-5 w-5" />} label="Produits" />
        {features.kitchenMode ? (
          <QuickLink
            href={`${base}/cuisine`}
            icon={<ChefHat className="h-5 w-5" />}
            label="Mode cuisine"
            accent
          />
        ) : (
          <LockedChip label="Cuisine" min="Pro" href="/admin/pro/login" />
        )}
        {features.marketingBanners ? (
          <QuickLink href={`${base}/marketing`} icon={<Megaphone className="h-5 w-5" />} label="Marketing" />
        ) : (
          <LockedChip label="Marketing" min="Pro" href="/admin/pro/login" />
        )}
        {features.drivers ? (
          <QuickLink href={`${base}/livreurs`} icon={<Truck className="h-5 w-5" />} label="Livreurs" />
        ) : tier === "pro" ? (
          <LockedChip label="Livreurs" min="Premium" href="/admin/premium/login" />
        ) : null}
        {features.loyalty ? (
          <QuickLink href={`${base}/fidelite`} icon={<Award className="h-5 w-5" />} label="Fidélité" />
        ) : null}
      </div>

      <section>
        <h2 className="mb-4 font-accent text-lg font-bold uppercase tracking-wide text-brand-cream/70">
          Dernières commandes
        </h2>
        <OrdersList tier={tier} initialOrders={orders} />
      </section>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  highlight,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border p-5 ${
        highlight
          ? "border-green-500/25 bg-green-500/5"
          : "border-white/10 bg-brand-anthracite"
      }`}
    >
      <div className="mb-2">{icon}</div>
      <p className="text-xs uppercase tracking-wide text-brand-cream/40">{label}</p>
      <p className="mt-1 font-display text-3xl text-brand-cream">{value}</p>
    </div>
  );
}

function QuickLink({
  href,
  icon,
  label,
  accent,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  accent?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold ${
        accent
          ? "border-brand-orange/30 bg-brand-orange/10 text-brand-orange hover:bg-brand-orange/20"
          : "border-white/10 text-brand-cream/80 hover:border-brand-orange/30"
      }`}
    >
      {icon}
      {label}
    </Link>
  );
}

function LockedChip({
  label,
  min,
  href,
}: {
  label: string;
  min: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 rounded-xl border border-dashed border-white/15 px-4 py-3 text-sm text-brand-cream/35 hover:border-brand-gold/30 hover:text-brand-cream/55"
    >
      <Lock className="h-4 w-4" />
      {label}
      <span className="text-[10px] uppercase text-brand-gold/60">{min}</span>
    </Link>
  );
}
