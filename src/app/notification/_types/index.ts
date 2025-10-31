import type { AppNotification } from '@/stores/slices/notificationSlice';

export type NotificationItem = AppNotification;

export interface NotificationListProps {
  items: NotificationItem[];
  loading?: boolean;
  onMarkAllRead: () => void;
  onMarkRead: (id: string) => void;
}

