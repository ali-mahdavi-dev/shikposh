import type { NotificationRepository } from './repository';
import type { NotificationEntity } from './entities';

export class NotificationService {
  constructor(private notificationRepository: NotificationRepository) {}

  async getAllNotifications(): Promise<NotificationEntity[]> {
    return this.notificationRepository.getAllNotifications();
  }

  async getNotificationById(id: string): Promise<NotificationEntity> {
    if (!id) {
      throw new Error('Notification ID is required');
    }
    return this.notificationRepository.getNotificationById(id);
  }

  async markAsRead(id: string): Promise<NotificationEntity> {
    if (!id) {
      throw new Error('Notification ID is required');
    }
    return this.notificationRepository.markAsRead(id);
  }

  async markAllAsRead(): Promise<void> {
    return this.notificationRepository.markAllAsRead();
  }

  async createNotification(notification: Omit<NotificationEntity, 'id' | 'createdAt' | 'read'>): Promise<NotificationEntity> {
    if (!notification.title || !notification.message) {
      throw new Error('Title and message are required');
    }
    return this.notificationRepository.createNotification(notification);
  }

  async deleteNotification(id: string): Promise<void> {
    if (!id) {
      throw new Error('Notification ID is required');
    }
    return this.notificationRepository.deleteNotification(id);
  }
}

