import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { createSupabaseAdmin } from "@/lib/db/supabase";
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
  totalCents: number;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as CreateOrderBody;

    if (!body.items?.length) {
      return NextResponse.json({ error: "Panier vide" }, { status: 400 });
    }

    const supabase = createSupabaseAdmin();
    const now = new Date().toISOString();
    const orderId = uuidv4();

    const { data: lastOrder } = await supabase
      .from("Order")
      .select("orderNumber")
      .order("orderNumber", { ascending: false })
      .limit(1)
      .maybeSingle();

    const orderNumber = (lastOrder?.orderNumber ?? 1041) + 1;

    const productIds: Record<string, string> = {};
    for (const item of body.items) {
      if (productIds[item.productSlug]) continue;

      const { data: product } = await supabase
        .from("Product")
        .select("id")
        .eq("slug", item.productSlug)
        .maybeSingle();

      if (product?.id) {
        productIds[item.productSlug] = product.id;
        continue;
      }

      const catalog = getProductBySlug(item.productSlug);
      if (!catalog) {
        return NextResponse.json(
          { error: `Produit introuvable: ${item.productSlug}` },
          { status: 400 }
        );
      }

      const { data: category } = await supabase
        .from("Category")
        .select("id")
        .eq("slug", catalog.categorySlug)
        .maybeSingle();

      if (!category?.id) {
        return NextResponse.json(
          { error: `Catégorie introuvable pour ${item.productSlug}` },
          { status: 400 }
        );
      }

      const newProductId = uuidv4();
      const { error: productError } = await supabase.from("Product").insert({
        id: newProductId,
        categoryId: category.id,
        name: catalog.name,
        slug: catalog.slug,
        description: catalog.description,
        priceCents: catalog.priceCents,
        isPopular: catalog.isPopular ?? false,
        isActive: true,
        updatedAt: now,
      });

      if (productError) throw productError;
      productIds[item.productSlug] = newProductId;
    }

    const { error: orderError } = await supabase.from("Order").insert({
      id: orderId,
      orderNumber,
      status: "NEW",
      type: body.type,
      paymentMethod: body.type === "PICKUP" ? "CASH_ON_PICKUP" : "CASH_ON_DELIVERY",
      paymentStatus: "PENDING",
      subtotalCents: body.subtotalCents,
      deliveryFeeCents: body.deliveryFeeCents,
      discountCents: 0,
      totalCents: body.totalCents,
      customerFirstName: body.customer.firstName,
      customerLastName: body.customer.lastName,
      customerPhone: body.customer.phone,
      customerEmail: body.customer.email,
      deliveryStreet: body.customer.street,
      deliveryComplement: body.customer.complement,
      deliveryPostalCode: body.customer.postalCode,
      deliveryCity: body.customer.city,
      deliveryInstructions: body.customer.instructions,
      updatedAt: now,
    });

    if (orderError) throw orderError;

    for (const item of body.items) {
      const orderItemId = uuidv4();
      const productId = productIds[item.productSlug]!;

      const { error: itemError } = await supabase.from("OrderItem").insert({
        id: orderItemId,
        orderId,
        productId,
        productName: item.productName,
        quantity: item.quantity,
        unitPriceCents: item.unitPriceCents,
        totalCents: item.unitPriceCents * item.quantity,
      });

      if (itemError) throw itemError;

      if (item.options.length > 0) {
        const { error: optionsError } = await supabase.from("OrderItemOption").insert(
          item.options.map((opt) => ({
            id: uuidv4(),
            orderItemId,
            groupName: opt.groupName,
            optionName: opt.optionName,
            priceCents: opt.priceCents,
          }))
        );
        if (optionsError) throw optionsError;
      }
    }

    return NextResponse.json({ orderId, orderNumber });
  } catch (error) {
    console.error("Order creation error:", error);
    return NextResponse.json(
      { error: "Erreur lors de la création de la commande" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const supabase = createSupabaseAdmin();
    const { data, error } = await supabase
      .from("Order")
      .select("*, items:OrderItem(*, options:OrderItemOption(*))")
      .order("createdAt", { ascending: false })
      .limit(50);

    if (error) throw error;
    return NextResponse.json(data ?? []);
  } catch (error) {
    console.error("Orders fetch error:", error);
    return NextResponse.json({ error: "Erreur" }, { status: 500 });
  }
}
