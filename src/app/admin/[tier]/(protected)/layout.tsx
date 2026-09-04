import { notFound, redirect } from "next/navigation";
import { getSession } from "@/lib/auth/session";
import { parseAdminTier } from "@/lib/admin/features";
import { AdminShell } from "@/components/admin/admin-shell";
import type { DemoTier } from "@/lib/demo/tiers";
import { getProductEdition, isClientEdition } from "@/lib/product/edition";

export const dynamic = "force-dynamic";

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ tier: string }>;
}

export default async function TierProtectedAdminLayout({ children, params }: LayoutProps) {
  const { tier: tierParam } = await params;
  const tier = parseAdminTier(tierParam);
  if (!tier) notFound();

  if (isClientEdition() && tier !== getProductEdition()) {
    notFound();
  }

  const session = await getSession();
  if (!session || session.role !== "ADMIN") {
    redirect(`/admin/${tier}/login`);
  }

  return (
    <AdminShell
      tier={tier as DemoTier}
      email={session.email}
      clientEdition={isClientEdition()}
    >
      {children}
    </AdminShell>
  );
}
