import { createSupabaseAdmin } from "@/lib/db/supabase";
import type { AdminOrder } from "@/lib/orders/types";

export async function fetchAdminOrders(limit = 50): Promise<AdminOrder[]> {
  try {
    const supabase = createSupabaseAdmin();
    const { data, error } = await supabase
      .from("Order")
      .select("*, items:OrderItem(*, options:OrderItemOption(*))")
      .order("createdAt", { ascending: false })
      .limit(limit);

    if (error) {
      console.error("[fetchAdminOrders]", error.message);
      return [];
    }
    return (data ?? []) as AdminOrder[];
  } catch (e) {
    console.error("[fetchAdminOrders]", e);
    return [];
  }
}

export async function fetchAdminOrder(id: string): Promise<AdminOrder | null> {
  try {
    const supabase = createSupabaseAdmin();
    const { data, error } = await supabase
      .from("Order")
      .select("*, items:OrderItem(*, options:OrderItemOption(*))")
      .eq("id", id)
      .maybeSingle();

    if (error) {
      console.error("[fetchAdminOrder]", error.message);
      return null;
    }
    return data as AdminOrder | null;
  } catch (e) {
    console.error("[fetchAdminOrder]", e);
    return null;
  }
}

export async function countActiveOrders(): Promise<number> {
  try {
    const supabase = createSupabaseAdmin();
    const { count, error } = await supabase
      .from("Order")
      .select("*", { count: "exact", head: true })
      .in("status", ["NEW", "CONFIRMED", "PREPARING", "READY", "OUT_FOR_DELIVERY"]);

    if (error) {
      console.error("[countActiveOrders]", error.message);
      return 0;
    }
    return count ?? 0;
  } catch (e) {
    console.error("[countActiveOrders]", e);
    return 0;
  }
}

export async function countTodayOrders(): Promise<number> {
  try {
    const supabase = createSupabaseAdmin();
    const start = new Date();
    start.setHours(0, 0, 0, 0);

    const { count, error } = await supabase
      .from("Order")
      .select("*", { count: "exact", head: true })
      .gte("createdAt", start.toISOString());

    if (error) {
      console.error("[countTodayOrders]", error.message);
      return 0;
    }
    return count ?? 0;
  } catch (e) {
    console.error("[countTodayOrders]", e);
    return 0;
  }
}

export async function sumTodayRevenue(): Promise<number> {
  try {
    const supabase = createSupabaseAdmin();
    const start = new Date();
    start.setHours(0, 0, 0, 0);

    const { data, error } = await supabase
      .from("Order")
      .select("totalCents")
      .gte("createdAt", start.toISOString())
      .not("status", "eq", "CANCELLED");

    if (error) {
      console.error("[sumTodayRevenue]", error.message);
      return 0;
    }
    return (data ?? []).reduce((sum, o) => sum + (o.totalCents ?? 0), 0);
  } catch (e) {
    console.error("[sumTodayRevenue]", e);
    return 0;
  }
}
