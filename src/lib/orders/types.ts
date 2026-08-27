export interface OrderItemOption {
  id: string;
  groupName: string;
  optionName: string;
  priceCents: number;
}

export interface OrderItem {
  id: string;
  productName: string;
  quantity: number;
  unitPriceCents: number;
  totalCents: number;
  options: OrderItemOption[];
}

export interface AdminOrder {
  id: string;
  orderNumber: number;
  status: string;
  type: "DELIVERY" | "PICKUP";
  paymentMethod: string;
  paymentStatus: string;
  subtotalCents: number;
  deliveryFeeCents: number;
  discountCents: number;
  totalCents: number;
  customerFirstName: string;
  customerLastName: string;
  customerPhone: string;
  customerEmail: string;
  deliveryStreet: string | null;
  deliveryComplement: string | null;
  deliveryPostalCode: string | null;
  deliveryCity: string | null;
  deliveryInstructions: string | null;
  createdAt: string;
  updatedAt: string;
  items: OrderItem[];
}
