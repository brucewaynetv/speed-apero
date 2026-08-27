import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/require-admin";
import { createSupabaseAdmin } from "@/lib/db/supabase";
import { canTransition, type OrderStatus } from "@/lib/orders/status";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(_request: Request, context: RouteContext) {
  const auth = await requireAdmin();
  if ("error" in auth) return auth.error;

  try {
    const { id } = await context.params;
    const supabase = createSupabaseAdmin();
    const { data, error } = await supabase
      .from("Order")
      .select("*, items:OrderItem(*, options:OrderItemOption(*))")
      .eq("id", id)
      .maybeSingle();

    if (error) throw error;
    if (!data) {
      return NextResponse.json({ error: "Commande introuvable" }, { status: 404 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Admin order fetch error:", error);
    return NextResponse.json({ error: "Erreur" }, { status: 500 });
  }
}

export async function PATCH(request: Request, context: RouteContext) {
  const auth = await requireAdmin();
  if ("error" in auth) return auth.error;

  try {
    const { id } = await context.params;
    const { status } = (await request.json()) as { status?: OrderStatus };

    if (!status) {
      return NextResponse.json({ error: "Statut requis" }, { status: 400 });
    }

    const supabase = createSupabaseAdmin();
    const { data: order, error: fetchError } = await supabase
      .from("Order")
      .select("status")
      .eq("id", id)
      .maybeSingle();

    if (fetchError) throw fetchError;
    if (!order) {
      return NextResponse.json({ error: "Commande introuvable" }, { status: 404 });
    }

    if (!canTransition(order.status as OrderStatus, status)) {
      return NextResponse.json(
        { error: `Transition invalide : ${order.status} → ${status}` },
        { status: 400 }
      );
    }

    const now = new Date().toISOString();
    const { data, error } = await supabase
      .from("Order")
      .update({ status, updatedAt: now })
      .eq("id", id)
      .select("*, items:OrderItem(*, options:OrderItemOption(*))")
      .single();

    if (error) throw error;
    return NextResponse.json(data);
  } catch (error) {
    console.error("Admin order update error:", error);
    return NextResponse.json({ error: "Erreur" }, { status: 500 });
  }
}
