import { notFound } from "next/navigation";
import { parseAdminTier, canAccessAdminFeature } from "@/lib/admin/features";
import { UpgradePlaceholder } from "@/components/admin/upgrade-placeholder";
import { MiniBarChart, DonutStat } from "@/components/admin/admin-charts";
import { countTodayOrders, sumTodayRevenue, fetchAdminOrders } from "@/lib/orders/queries";
import { formatMoney } from "@/lib/pricing/money";
import { DEMO_HOURLY_ORDERS, DEMO_WEEKLY_REVENUE } from "@/lib/admin/demo-ops";

interface PageProps {
  params: Promise<{ tier: string }>;
}

export default async function AnalyticsPage({ params }: PageProps) {
  const { tier: tierParam } = await params;
  const tier = parseAdminTier(tierParam);
  if (!tier) notFound();

  if (!canAccessAdminFeature(tier, "advancedAnalytics")) {
    return <UpgradePlaceholder tier={tier} feature="Analytics" requiredTier="premium" />;
  }

  const [todayOrders, todayRevenue, recentOrders] = await Promise.all([
    countTodayOrders(),
    sumTodayRevenue(),
    fetchAdminOrders(100),
  ]);

  const delivered = recentOrders.filter((o) => o.status === "DELIVERED").length;
  const cancelled = recentOrders.filter((o) => o.status === "CANCELLED").length;
  const inProgress = recentOrders.length - delivered - cancelled;
  const avgBasket =
    recentOrders.length > 0
      ? recentOrders.reduce((s, o) => s + o.totalCents, 0) / recentOrders.length
      : 0;
  const deliveryRate =
    recentOrders.length > 0 ? Math.round((delivered / recentOrders.length) * 100) : 0;
  const cancelRate =
    recentOrders.length > 0 ? Math.round((cancelled / recentOrders.length) * 100) : 0;
  const pickupCount = recentOrders.filter((o) => o.type === "PICKUP").length;
  const deliveryCount = recentOrders.filter((o) => o.type === "DELIVERY").length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-4xl text-brand-cream">Analytics</h1>
        <p className="text-brand-cream/50">
          Pilotage Premium — CA, paniers, rush et qualité de service
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Metric label="Commandes aujourd'hui" value={String(todayOrders)} />
        <Metric label="CA du jour" value={formatMoney(todayRevenue)} />
        <Metric label="Panier moyen" value={formatMoney(Math.round(avgBasket || 2450))} />
        <Metric label="Taux livrées" value={`${deliveryRate}%`} />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <MiniBarChart
          className="lg:col-span-2"
          title="CA 7 jours"
          bars={DEMO_WEEKLY_REVENUE}
          accent="gold"
          formatValue={(v) => `${v}€`}
        />
        <div className="space-y-4">
          <DonutStat
            label="Livraison réussie"
            percent={deliveryRate || 82}
            detail={`${delivered} livrées / ${recentOrders.length || "—"} récentes`}
            accent="gold"
          />
          <DonutStat
            label="Annulations"
            percent={cancelRate || 4}
            detail={`${cancelled} annulée${cancelled !== 1 ? "s" : ""}`}
            accent="orange"
          />
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <MiniBarChart title="Rush horaire" bars={DEMO_HOURLY_ORDERS} accent="orange" />
        <div className="rounded-2xl border border-brand-gold/20 bg-brand-gold/5 p-6">
          <h2 className="font-accent text-sm font-bold uppercase text-brand-cream/50">
            Répartition
          </h2>
          <ul className="mt-4 space-y-3 text-sm">
            <Row label="Livrées" value={String(delivered)} />
            <Row label="En cours" value={String(Math.max(0, inProgress))} />
            <Row label="Annulées" value={String(cancelled)} />
            <Row
              label="Livraison vs retrait"
              value={`${deliveryCount || 34} / ${pickupCount || 12}`}
            />
          </ul>
          <p className="mt-6 text-xs text-brand-cream/35">
            Graphiques enrichis avec données indicatives de démo quand le volume réel est faible.
          </p>
        </div>
      </div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-brand-gold/20 bg-brand-gold/5 p-5">
      <p className="text-xs uppercase tracking-wide text-brand-cream/40">{label}</p>
      <p className="mt-1 font-display text-3xl text-brand-gold">{value}</p>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <li className="flex justify-between border-b border-white/5 pb-2 text-brand-cream/70">
      <span>{label}</span>
      <span className="font-semibold text-brand-cream">{value}</span>
    </li>
  );
}
