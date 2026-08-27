import { cn } from "@/lib/utils";
import {
  ORDER_STATUS_COLORS,
  ORDER_STATUS_LABELS,
  type OrderStatus,
} from "@/lib/orders/status";

interface OrderStatusBadgeProps {
  status: string;
  className?: string;
}

export function OrderStatusBadge({ status, className }: OrderStatusBadgeProps) {
  const key = status as OrderStatus;
  const label = ORDER_STATUS_LABELS[key] ?? status;
  const colors = ORDER_STATUS_COLORS[key] ?? "bg-white/10 text-brand-cream border-white/20";

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide",
        colors,
        className
      )}
    >
      {label}
    </span>
  );
}
