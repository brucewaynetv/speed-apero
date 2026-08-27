import { redirect } from "next/navigation";
import Link from "next/link";
import { ChefHat, ClipboardList, TrendingUp } from "lucide-react";
import { getSession } from "@/lib/auth/session";
import {
  countActiveOrders,
  countTodayOrders,
  fetchAdminOrders,
  sumTodayRevenue,
} from "@/lib/orders/queries";
import { OrdersList } from "@/components/admin/orders-list";
import { formatMoney } from "@/lib/pricing/money";

export default async function AdminDashboardPage() {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const [orders, activeCount, todayCount, todayRevenue] = await Promise.all([
    fetchAdminOrders(20),
    countActiveOrders(),
    countTodayOrders(),
    sumTodayRevenue(),
  ]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-4xl text-brand-cream">Dashboard</h1>
        <p className="text-brand-cream/50">Gestion des commandes Speed Apéro</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard
          icon={<ClipboardList className="h-5 w-5 text-brand-orange" />}
          label="Commandes actives"
          value={String(activeCount)}
        />
        <StatCard
          icon={<TrendingUp className="h-5 w-5 text-brand-gold" />}
          label="Aujourd'hui"
          value={String(todayCount)}
        />
        <StatCard
          icon={<TrendingUp className="h-5 w-5 text-green-400" />}
          label="CA du jour"
          value={formatMoney(todayRevenue)}
        />
      </div>

      <div className="flex flex-wrap gap-3">
        <Link
          href="/admin/cuisine"
          className="inline-flex items-center gap-2 rounded-xl border border-brand-orange/30 bg-brand-orange/10 px-4 py-3 text-sm font-semibold text-brand-orange transition-colors hover:bg-brand-orange/20"
        >
          <ChefHat className="h-5 w-5" />
          Ouvrir le mode cuisine
        </Link>
        <Link
          href="/admin/commandes"
          className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-sm font-semibold text-brand-cream/80 transition-colors hover:border-white/20"
        >
          <ClipboardList className="h-5 w-5" />
          Toutes les commandes
        </Link>
      </div>

      <section>
        <h2 className="mb-4 font-accent text-lg font-bold uppercase tracking-wide text-brand-cream/70">
          Dernières commandes
        </h2>
        <OrdersList initialOrders={orders} />
      </section>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-brand-anthracite p-5">
      <div className="mb-2">{icon}</div>
      <p className="text-xs uppercase tracking-wide text-brand-cream/40">{label}</p>
      <p className="mt-1 font-display text-3xl text-brand-cream">{value}</p>
    </div>
  );
}
