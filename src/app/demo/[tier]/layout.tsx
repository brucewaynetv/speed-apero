import { notFound } from "next/navigation";
import { DemoTierProvider } from "@/components/demo/demo-tier-provider";
import { isValidTier, type DemoTier } from "@/lib/demo/tiers";
import { getProductEdition, isClientEdition } from "@/lib/product/edition";

interface DemoTierLayoutProps {
  children: React.ReactNode;
  params: Promise<{ tier: string }>;
}

export default async function DemoTierLayout({
  children,
  params,
}: DemoTierLayoutProps) {
  const { tier } = await params;

  if (!isValidTier(tier)) {
    notFound();
  }

  const client = isClientEdition();
  if (client && tier !== getProductEdition()) {
    notFound();
  }

  return (
    <DemoTierProvider tier={tier as DemoTier} clientEdition={client}>
      {children}
    </DemoTierProvider>
  );
}
