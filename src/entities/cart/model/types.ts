export interface CartItem {
  menu_item_id: number;
  quantity: number;
  name?: string;
  price?: number;
  image?: string;
}

export interface CartState {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (menu_item_id: number) => void;
  updateQuantity: (menu_item_id: number, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  getItemsForOrder: () => { menu_item_id: number; quantity: number }[];
}
