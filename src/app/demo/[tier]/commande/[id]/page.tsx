import Link from "next/link";
import { OrderTracking } from "@/components/storefront/order-tracking";

interface PageProps {
  params: Promise<{ tier: string; id: string }>;
}

export default async function OrderTrackingPage({ params }: PageProps) {
  const { tier, id } = await params;

  return (
    <div className="min-h-screen bg-brand-black">
      <header className="border-b border-white/5 px-4 py-4">
        <Link href={`/demo/${tier}`} className="font-display text-2xl text-brand-orange">
          ← SPEED APÉRO
        </Link>
      </header>
      <div className="mx-auto max-w-lg px-4 py-8">
        <OrderTracking orderId={id} />
        <p className="mt-6 text-center">
          <Link href={`/demo/${tier}`} className="text-sm text-brand-cream/50 hover:text-brand-orange">
            Retour au menu
          </Link>
        </p>
      </div>
    </div>
  );
}
