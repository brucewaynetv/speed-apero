"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { getNextStatuses, ORDER_STATUS_LABELS, type OrderStatus } from "@/lib/orders/status";

interface OrderStatusActionsProps {
  orderId: string;
  currentStatus: string;
  orderType: "DELIVERY" | "PICKUP";
  compact?: boolean;
  onUpdated?: () => void;
}

export function OrderStatusActions({
  orderId,
  currentStatus,
  orderType,
  compact,
  onUpdated,
}: OrderStatusActionsProps) {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);

  const nextStatuses = getNextStatuses(currentStatus as OrderStatus, orderType);

  async function updateStatus(status: OrderStatus) {
    setLoading(status);
    try {
      const res = await fetch(`/api/admin/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Erreur");
      }
      toast.success("Statut mis à jour");
      onUpdated?.();
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erreur");
    } finally {
      setLoading(null);
    }
  }

  if (nextStatuses.length === 0) return null;

  return (
    <div className={compact ? "flex flex-wrap gap-1.5" : "flex flex-wrap gap-2"}>
      {nextStatuses.map((status) => (
        <Button
          key={status}
          size={compact ? "sm" : "default"}
          variant={status === "CANCELLED" ? "destructive" : "default"}
          disabled={loading !== null}
          onClick={() => updateStatus(status)}
        >
          {loading === status && <Loader2 className="h-4 w-4 animate-spin" />}
          {status === "CANCELLED" ? "Annuler" : ORDER_STATUS_LABELS[status]}
        </Button>
      ))}
    </div>
  );
}
