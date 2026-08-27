import { notFound } from "next/navigation";
import { DemoTierProvider } from "@/components/demo/demo-tier-provider";
import { isValidTier, type DemoTier } from "@/lib/demo/tiers";

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

  return (
    <DemoTierProvider tier={tier as DemoTier}>
      {children}
    </DemoTierProvider>
  );
}
