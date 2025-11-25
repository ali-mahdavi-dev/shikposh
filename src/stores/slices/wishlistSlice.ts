import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WishlistState {
  productIds: string[];
  synced: boolean;
}

const initialState: WishlistState = {
  productIds: [],
  synced: false,
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action: PayloadAction<string>) => {
      if (!state.productIds.includes(action.payload)) {
        state.productIds.push(action.payload);
      }
    },
    removeFromWishlist: (state, action: PayloadAction<string>) => {
      state.productIds = state.productIds.filter((id) => id !== action.payload);
    },
    toggleWishlist: (state, action: PayloadAction<string>) => {
      const index = state.productIds.indexOf(action.payload);
      if (index === -1) {
        state.productIds.push(action.payload);
      } else {
        state.productIds.splice(index, 1);
      }
    },
    setWishlist: (state, action: PayloadAction<string[]>) => {
      state.productIds = action.payload;
      state.synced = true;
    },
    setSynced: (state, action: PayloadAction<boolean>) => {
      state.synced = action.payload;
    },
    clearWishlist: (state) => {
      state.productIds = [];
      state.synced = false;
    },
  },
});

export const {
  addToWishlist,
  removeFromWishlist,
  toggleWishlist,
  setWishlist,
  setSynced,
  clearWishlist,
} = wishlistSlice.actions;
export default wishlistSlice.reducer;
