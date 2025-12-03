import { combineReducers } from '@reduxjs/toolkit';
import { authReducer } from './features/auth';
import { cartReducer } from './features/cart';
import { wishlistReducer } from './features/wishlist';
import { notificationsReducer } from './features/notifications';

/**
 * Root reducer combining all feature reducers
 */
export const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  wishlist: wishlistReducer,
  notifications: notificationsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof rootReducer extends (state: any, action: any) => infer R
  ? R extends Promise<infer U>
    ? U
    : R
  : never;

