import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { getProductBySlug } from "@/lib/data/catalog";

interface OrderItemInput {
  productSlug: string;
  productName: string;
  quantity: number;
  unitPriceCents: number;
  options: { groupName: string; optionName: string; priceCents: number }[];
}

interface CreateOrderBody {
  tier: string;
  type: "DELIVERY" | "PICKUP";
  customer: {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    street?: string;
    complement?: string;
    postalCode?: string;
    city?: string;
    instructions?: string;
  };
  items: OrderItemInput[];
  subtotalCents: number;
  deliveryFeeCents: number;
  discountCents?: number;
  totalCents: number;
  promoCode?: string;
  scheduledAt?: string;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as CreateOrderBody;

    if (!body.items?.length) {
      return NextResponse.json({ error: "Panier vide" }, { status: 400 });
    }

    const lastOrder = await prisma.order.findFirst({
      orderBy: { orderNumber: "desc" },
      select: { orderNumber: true },
    });
    const orderNumber = (lastOrder?.orderNumber ?? 1041) + 1;

    const productIds: Record<string, string> = {};
    for (const item of body.items) {
      if (productIds[item.productSlug]) continue;

      const existing = await prisma.product.findUnique({
        where: { slug: item.productSlug },
        select: { id: true },
      });
      if (existing) {
        productIds[item.productSlug] = existing.id;
        continue;
      }

      const catalog = getProductBySlug(item.productSlug);
      if (!catalog) {
        return NextResponse.json(
          { error: `Produit introuvable: ${item.productSlug}` },
          { status: 400 }
        );
      }

      const category = await prisma.category.findUnique({
        where: { slug: catalog.categorySlug },
        select: { id: true },
      });
      if (!category) {
        return NextResponse.json(
          { error: `Catégorie introuvable pour ${item.productSlug}` },
          { status: 400 }
        );
      }

      const created = await prisma.product.create({
        data: {
          categoryId: category.id,
          name: catalog.name,
          slug: catalog.slug,
          description: catalog.description,
          priceCents: catalog.priceCents,
          isPopular: catalog.isPopular ?? false,
          isActive: true,
        },
        select: { id: true },
      });
      productIds[item.productSlug] = created.id;
    }

    const order = await prisma.order.create({
      data: {
        orderNumber,
        status: "NEW",
        type: body.type,
        paymentMethod: body.type === "PICKUP" ? "CASH_ON_PICKUP" : "CASH_ON_DELIVERY",
        paymentStatus: "PENDING",
        subtotalCents: body.subtotalCents,
        deliveryFeeCents: body.deliveryFeeCents,
        discountCents: body.discountCents ?? 0,
        totalCents: body.totalCents,
        promoCode: body.promoCode ?? null,
        scheduledAt: body.scheduledAt ? new Date(body.scheduledAt) : null,
        customerFirstName: body.customer.firstName,
        customerLastName: body.customer.lastName,
        customerPhone: body.customer.phone,
        customerEmail: body.customer.email,
        deliveryStreet: body.customer.street ?? null,
        deliveryComplement: body.customer.complement ?? null,
        deliveryPostalCode: body.customer.postalCode ?? null,
        deliveryCity: body.customer.city ?? null,
        deliveryInstructions: body.customer.instructions ?? null,
        items: {
          create: body.items.map((item) => ({
            productId: productIds[item.productSlug]!,
            productName: item.productName,
            quantity: item.quantity,
            unitPriceCents: item.unitPriceCents,
            totalCents: item.unitPriceCents * item.quantity,
            options: {
              create: item.options.map((opt) => ({
                groupName: opt.groupName,
                optionName: opt.optionName,
                priceCents: opt.priceCents,
              })),
            },
          })),
        },
      },
      select: { id: true, orderNumber: true },
    });

    return NextResponse.json({ orderId: order.id, orderNumber: order.orderNumber });
  } catch (error) {
    console.error("Order creation error:", error);
    return NextResponse.json(
      { error: "Erreur lors de la création de la commande" },
      { status: 500 }
    );
  }
}
