import { createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit';
import type { NotificationState, AppNotification } from './notifications.types';

const initialState: NotificationState = {
  items: [],
};

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setNotifications: (state, action: PayloadAction<AppNotification[]>) => {
      state.items = action.payload;
    },
    pushNotification: {
      prepare: (notification: Omit<AppNotification, 'id' | 'createdAt' | 'read'>) => ({
        payload: {
          ...notification,
          id: nanoid(),
          createdAt: new Date().toISOString(),
          read: false,
        } as AppNotification,
      }),
      reducer: (state, action: PayloadAction<AppNotification>) => {
        state.items.unshift(action.payload);
      },
    },
    markRead: (state, action: PayloadAction<string>) => {
      const item = state.items.find((n) => n.id === action.payload);
      if (item) item.read = true;
    },
    markAllRead: (state) => {
      state.items.forEach((n) => (n.read = true));
    },
    clearNotifications: (state) => {
      state.items = [];
    },
  },
});

export const { setNotifications, pushNotification, markRead, markAllRead, clearNotifications } =
  notificationSlice.actions;
export default notificationSlice.reducer;

