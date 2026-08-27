import { create } from "zustand";
import { persist } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";
import type { CatalogProduct } from "@/lib/data/catalog";
import { sumCents } from "@/lib/pricing/money";

export interface CartOption {
  groupName: string;
  optionName: string;
  priceCents: number;
}

export interface CartItem {
  id: string;
  productSlug: string;
  productName: string;
  quantity: number;
  unitPriceCents: number;
  options: CartOption[];
  image?: string;
}

interface CartState {
  items: CartItem[];
  tier: string;
  addItem: (
    product: CatalogProduct,
    quantity: number,
    options: CartOption[]
  ) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  setTier: (tier: string) => void;
  getSubtotal: () => number;
  getItemCount: () => number;
}

function computeUnitPrice(baseCents: number, options: CartOption[]): number {
  return sumCents(baseCents, ...options.map((o) => o.priceCents));
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      tier: "starter",

      addItem: (product, quantity, options) => {
        const unitPriceCents = computeUnitPrice(product.priceCents, options);
        const newItem: CartItem = {
          id: uuidv4(),
          productSlug: product.slug,
          productName: product.name,
          quantity,
          unitPriceCents,
          options,
          image: product.image,
        };
        set((state) => ({ items: [...state.items, newItem] }));
      },

      removeItem: (id) => {
        set((state) => ({ items: state.items.filter((i) => i.id !== id) }));
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.id === id ? { ...i, quantity } : i
          ),
        }));
      },

      clearCart: () => set({ items: [] }),

      setTier: (tier) => set({ tier }),

      getSubtotal: () =>
        get().items.reduce(
          (acc, item) => acc + item.unitPriceCents * item.quantity,
          0
        ),

      getItemCount: () =>
        get().items.reduce((acc, item) => acc + item.quantity, 0),
    }),
    { name: "speed-apero-cart" }
  )
);
