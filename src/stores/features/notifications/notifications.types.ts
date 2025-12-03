export type NotificationType = 'question' | 'review' | 'seller_new_product';

export interface AppNotification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  createdAt: string;
  read: boolean;
  meta?: Record<string, string>;
}

export interface NotificationState {
  items: AppNotification[];
}

