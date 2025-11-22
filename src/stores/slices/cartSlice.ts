import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
}

interface CartState {
  items: CartItem[];
}

const CART_STORAGE_KEY = 'shikposh_cart';

// Load cart from localStorage
const loadCartFromStorage = (): CartItem[] => {
  if (typeof window === 'undefined') return [];

  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    if (stored) {
      const items: CartItemStorage[] = JSON.parse(stored);
      // Convert to CartItem format (without product details - will be loaded from API)
      return items.map((item) => ({
        productId: item.productId,
        color: item.color,
        size: item.size,
        quantity: item.quantity,
      }));
    }
  } catch (error) {
    console.error('Failed to load cart from localStorage:', error);
  }
  return [];
};

// Save cart to localStorage (only essential data)
const saveCartToStorage = (items: CartItem[]) => {
  if (typeof window === 'undefined') return;

  try {
    const itemsToStore: CartItemStorage[] = items.map((item) => ({
      productId: item.productId,
      color: item.color,
      size: item.size,
      quantity: item.quantity,
    }));
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(itemsToStore));
  } catch (error) {
    console.error('Failed to save cart to localStorage:', error);
  }
};

const initialState: CartState = {
  items: loadCartFromStorage(),
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(
        (item) =>
          item.productId === action.payload.productId &&
          item.color === action.payload.color &&
          item.size === action.payload.size,
      );

      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        // Only store essential data (productId, color, size, quantity)
        // Product details (price, name, image, discount) will be loaded from API
        state.items.push({
          productId: action.payload.productId,
          color: action.payload.color,
          size: action.payload.size,
          quantity: action.payload.quantity,
        });
      }
      saveCartToStorage(state.items);
    },
    removeFromCart: (
      state,
      action: PayloadAction<{ productId: string; color: string; size: string }>,
    ) => {
      state.items = state.items.filter(
        (item) =>
          !(
            item.productId === action.payload.productId &&
            item.color === action.payload.color &&
            item.size === action.payload.size
          ),
      );
      saveCartToStorage(state.items);
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ productId: string; color: string; size: string; quantity: number }>,
    ) => {
      const item = state.items.find(
        (item) =>
          item.productId === action.payload.productId &&
          item.color === action.payload.color &&
          item.size === action.payload.size,
      );
      if (item) {
        item.quantity = action.payload.quantity;
      }
      saveCartToStorage(state.items);
    },
    clearCart: (state) => {
      state.items = [];
      saveCartToStorage(state.items);
    },
    updateCartItemsWithProductData: (
      state,
      action: PayloadAction<
        Array<{ id: string; name: string; image: string; price: number; discount: number }>
      >,
    ) => {
      const productMap = new Map(action.payload.map((p) => [p.id, p]));
      state.items.forEach((item) => {
        const product = productMap.get(item.productId);
        if (product) {
          item.name = product.name;
          item.image = product.image;
          item.price = product.price;
          item.discount = product.discount;
        }
      });
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  updateCartItemsWithProductData,
} = cartSlice.actions;
export default cartSlice.reducer;
