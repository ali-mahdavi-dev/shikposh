import type { AppNotification } from '@/stores/features/notifications';

export type NotificationItem = AppNotification;

export interface NotificationListProps {
  items: NotificationItem[];
  loading?: boolean;
  onMarkAllRead: () => void;
  onMarkRead: (id: string) => void;
}
