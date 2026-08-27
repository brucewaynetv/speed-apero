import Link from "next/link";
import { ChefHat, ClipboardList, Package, TrendingUp } from "lucide-react";
import {
  countActiveOrders,
  countTodayOrders,
  fetchAdminOrders,
  sumTodayRevenue,
} from "@/lib/orders/queries";
import { OrdersList } from "@/components/admin/orders-list";
import { formatMoney } from "@/lib/pricing/money";
import type { DemoTier } from "@/lib/demo/tiers";
import { getAdminBasePath, getAdminFeatures, getTierMeta } from "@/lib/admin/features";

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

  return (
    <div className="space-y-8">
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

      {features.advancedDashboard ? (
        <div className="grid gap-4 sm:grid-cols-3">
          <StatCard icon={<ClipboardList className="h-5 w-5 text-brand-orange" />} label="Commandes actives" value={String(activeCount)} />
          <StatCard icon={<TrendingUp className="h-5 w-5 text-brand-gold" />} label="Aujourd'hui" value={String(todayCount ?? 0)} />
          <StatCard icon={<TrendingUp className="h-5 w-5 text-green-400" />} label="CA du jour" value={formatMoney(todayRevenue ?? 0)} />
        </div>
      ) : (
        <div className="rounded-2xl border border-white/10 bg-brand-anthracite p-6">
          <p className="text-3xl font-display text-brand-orange">{activeCount}</p>
          <p className="text-sm text-brand-cream/50">commande{activeCount !== 1 ? "s" : ""} en cours</p>
          <p className="mt-2 text-xs text-brand-cream/30">
            Dashboard avancé disponible en formule Pro
          </p>
        </div>
      )}

      <div className="flex flex-wrap gap-3">
        <Link href={`${base}/commandes`} className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-sm font-semibold text-brand-cream/80 hover:border-brand-orange/30">
          <ClipboardList className="h-5 w-5" />
          Commandes
        </Link>
        <Link href={`${base}/produits`} className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-sm font-semibold text-brand-cream/80 hover:border-brand-orange/30">
          <Package className="h-5 w-5" />
          Produits
        </Link>
        {features.kitchenMode && (
          <Link href={`${base}/cuisine`} className="inline-flex items-center gap-2 rounded-xl border border-brand-orange/30 bg-brand-orange/10 px-4 py-3 text-sm font-semibold text-brand-orange hover:bg-brand-orange/20">
            <ChefHat className="h-5 w-5" />
            Mode cuisine
          </Link>
        )}
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

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-brand-anthracite p-5">
      <div className="mb-2">{icon}</div>
      <p className="text-xs uppercase tracking-wide text-brand-cream/40">{label}</p>
      <p className="mt-1 font-display text-3xl text-brand-cream">{value}</p>
    </div>
  );
}
