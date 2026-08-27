import { notFound } from "next/navigation";
import { parseAdminTier, canAccessAdminFeature } from "@/lib/admin/features";
import { UpgradePlaceholder } from "@/components/admin/upgrade-placeholder";
import { countTodayOrders, sumTodayRevenue, fetchAdminOrders } from "@/lib/orders/queries";
import { formatMoney } from "@/lib/pricing/money";

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
  const avgBasket =
    recentOrders.length > 0
      ? recentOrders.reduce((s, o) => s + o.totalCents, 0) / recentOrders.length
      : 0;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-4xl text-brand-cream">Analytics</h1>
        <p className="text-brand-cream/50">Vue d&apos;ensemble premium</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Metric label="Commandes aujourd'hui" value={String(todayOrders)} />
        <Metric label="CA du jour" value={formatMoney(todayRevenue)} />
        <Metric label="Panier moyen" value={formatMoney(Math.round(avgBasket))} />
        <Metric label="Taux livraison" value={`${delivered}/${recentOrders.length}`} />
      </div>
      <div className="rounded-2xl border border-white/10 bg-brand-anthracite p-6">
        <h2 className="font-accent text-sm font-bold uppercase text-brand-cream/50">Répartition</h2>
        <ul className="mt-4 space-y-2 text-sm text-brand-cream/70">
          <li>Livrées : {delivered}</li>
          <li>Annulées : {cancelled}</li>
          <li>En cours : {recentOrders.length - delivered - cancelled}</li>
        </ul>
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
