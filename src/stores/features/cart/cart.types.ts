// Interface for localStorage (only essential data)
export interface CartItemStorage {
  productId: string;
  color: string;
  size: string;
  quantity: number;
}

// Interface for Redux state (includes product details from API)
export interface CartItem {
  productId: string;
  color: string;
  size: string;
  quantity: number;
  price?: number;
  name?: string;
  image?: string;
  discount?: number;
  slug?: string;
}

export interface CartState {
  items: CartItem[];
}

