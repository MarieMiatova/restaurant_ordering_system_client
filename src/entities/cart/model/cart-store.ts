import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem } from './types';

interface CartState {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (menu_item_id: number) => void;
  updateQuantity: (menu_item_id: number, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  getItemsForOrder: () => { menu_item_id: number; quantity: number }[];
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        set((state) => {
          const existingIndex = state.items.findIndex(
            (i) => i.menu_item_id === item.menu_item_id
          );

          if (existingIndex >= 0) {
            const newItems = [...state.items];
            newItems[existingIndex] = {
              ...newItems[existingIndex],
              quantity: newItems[existingIndex].quantity + 1,
            };
            return { items: newItems };
          }

          return { items: [...state.items, { ...item, quantity: 1 }] };
        });
      },

      removeItem: (menu_item_id) => {
        set((state) => ({
          items: state.items.filter((i) => i.menu_item_id !== menu_item_id),
        }));
      },

      updateQuantity: (menu_item_id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(menu_item_id);
          return;
        }

        set((state) => ({
          items: state.items.map((i) =>
            i.menu_item_id === menu_item_id ? { ...i, quantity } : i
          ),
        }));
      },

      clearCart: () => {
        set({ items: [] });
      },

      getTotalItems: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },

      getTotalPrice: () => {
        return get().items.reduce(
          (sum, item) => sum + (item.price || 0) * item.quantity,
          0
        );
      },

      getItemsForOrder: () => {
        return get().items.map((item) => ({
          menu_item_id: item.menu_item_id,
          quantity: item.quantity,
        }));
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);
