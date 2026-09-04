import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/require-admin";
import { prisma } from "@/lib/db/prisma";
import { fetchAdminOrder } from "@/lib/orders/queries";
import { canTransition, type OrderStatus } from "@/lib/orders/status";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(_request: Request, context: RouteContext) {
  const auth = await requireAdmin();
  if ("error" in auth) return auth.error;

  try {
    const { id } = await context.params;
    const data = await fetchAdminOrder(id);
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

    const order = await prisma.order.findUnique({
      where: { id },
      select: { status: true },
    });
    if (!order) {
      return NextResponse.json({ error: "Commande introuvable" }, { status: 404 });
    }

    if (!canTransition(order.status as OrderStatus, status)) {
      return NextResponse.json(
        { error: `Transition invalide : ${order.status} → ${status}` },
        { status: 400 }
      );
    }

    await prisma.order.update({
      where: { id },
      data: { status },
    });

    const data = await fetchAdminOrder(id);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Admin order update error:", error);
    return NextResponse.json({ error: "Erreur" }, { status: 500 });
  }
}
