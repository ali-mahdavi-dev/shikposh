import { configureStore } from '@reduxjs/toolkit';
import { rootReducer, type RootState } from './root-reducer';

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export type { RootState };
export type AppDispatch = typeof store.dispatch;
