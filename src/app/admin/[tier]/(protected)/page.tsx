import { notFound } from "next/navigation";
import { parseAdminTier } from "@/lib/admin/features";
import { AdminDashboard } from "@/components/admin/admin-dashboard";

interface PageProps {
  params: Promise<{ tier: string }>;
}

export default async function TierAdminHomePage({ params }: PageProps) {
  const { tier: tierParam } = await params;
  const tier = parseAdminTier(tierParam);
  if (!tier) notFound();

  return <AdminDashboard tier={tier} />;
}
