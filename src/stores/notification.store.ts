import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { store, type RootState } from '@/stores/store';
import { AppNotification, markAllRead, markRead, pushNotification, clearNotifications } from '@/stores/slices/notificationSlice';
import { NotificationContainer } from '@/app/notification/_api';

export type Notification = AppNotification;

const notificationService = NotificationContainer.getNotificationService();

// Show notification - creates in API and syncs to store
export async function showNotification(notification: Omit<AppNotification, 'id' | 'createdAt' | 'read'>) {
  try {
    // Create in API
    const created = await notificationService.createNotification({
      type: notification.type,
      title: notification.title,
      message: notification.message,
      meta: notification.meta,
    });
    
    // Sync to Redux store
    store.dispatch(pushNotification(created as any));
    return created;
  } catch (error) {
    console.error('Failed to create notification in API:', error);
    // Fallback to local only
    store.dispatch(pushNotification(notification as any));
    throw error;
  }
}

// Dismiss notification - marks as read in API and syncs to store
export async function dismissNotification(id: string) {
  try {
    await notificationService.markAsRead(id);
    store.dispatch(markRead(id));
  } catch (error) {
    console.error('Failed to mark notification as read in API:', error);
    // Fallback to local only
    store.dispatch(markRead(id));
  }
}

// Dismiss all notifications - marks all as read in API and syncs to store
export async function dismissAllNotifications() {
  try {
    await notificationService.markAllAsRead();
    store.dispatch(markAllRead());
  } catch (error) {
    console.error('Failed to mark all notifications as read in API:', error);
    // Fallback to local only
    store.dispatch(markAllRead());
  }
}

export function clearAllNotifications() {
  store.dispatch(clearNotifications());
}

export function useNotifications() {
  const notifications = useSelector((s: RootState) => s.notifications.items);
  return useMemo(() => ({ notifications }), [notifications]);
}

