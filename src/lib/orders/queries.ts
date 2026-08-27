import { createSupabaseAdmin } from "@/lib/db/supabase";
import type { AdminOrder } from "@/lib/orders/types";

export async function fetchAdminOrders(limit = 50): Promise<AdminOrder[]> {
  const supabase = createSupabaseAdmin();
  const { data, error } = await supabase
    .from("Order")
    .select("*, items:OrderItem(*, options:OrderItemOption(*))")
    .order("createdAt", { ascending: false })
    .limit(limit);

  if (error) throw error;
  return (data ?? []) as AdminOrder[];
}

export async function fetchAdminOrder(id: string): Promise<AdminOrder | null> {
  const supabase = createSupabaseAdmin();
  const { data, error } = await supabase
    .from("Order")
    .select("*, items:OrderItem(*, options:OrderItemOption(*))")
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;
  return data as AdminOrder | null;
}

export async function countActiveOrders(): Promise<number> {
  const supabase = createSupabaseAdmin();
  const { count, error } = await supabase
    .from("Order")
    .select("*", { count: "exact", head: true })
    .in("status", ["NEW", "CONFIRMED", "PREPARING", "READY", "OUT_FOR_DELIVERY"]);

  if (error) throw error;
  return count ?? 0;
}

export async function countTodayOrders(): Promise<number> {
  const supabase = createSupabaseAdmin();
  const start = new Date();
  start.setHours(0, 0, 0, 0);

  const { count, error } = await supabase
    .from("Order")
    .select("*", { count: "exact", head: true })
    .gte("createdAt", start.toISOString());

  if (error) throw error;
  return count ?? 0;
}

export async function sumTodayRevenue(): Promise<number> {
  const supabase = createSupabaseAdmin();
  const start = new Date();
  start.setHours(0, 0, 0, 0);

  const { data, error } = await supabase
    .from("Order")
    .select("totalCents")
    .gte("createdAt", start.toISOString())
    .not("status", "eq", "CANCELLED");

  if (error) throw error;
  return (data ?? []).reduce((sum, o) => sum + (o.totalCents ?? 0), 0);
}
