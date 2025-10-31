import { apiService } from '@/shared/services/api.service';
import type { NotificationEntity } from './entities';

export interface NotificationRepository {
  getAllNotifications(): Promise<NotificationEntity[]>;
  getNotificationById(id: string): Promise<NotificationEntity>;
  markAsRead(id: string): Promise<NotificationEntity>;
  markAllAsRead(): Promise<void>;
  createNotification(notification: Omit<NotificationEntity, 'id' | 'createdAt' | 'read'>): Promise<NotificationEntity>;
  deleteNotification(id: string): Promise<void>;
}

export class HttpNotificationRepository implements NotificationRepository {
  async getAllNotifications(): Promise<NotificationEntity[]> {
    return apiService.get<NotificationEntity[]>('/notifications');
  }

  async getNotificationById(id: string): Promise<NotificationEntity> {
    return apiService.get<NotificationEntity>(`/notifications/${id}`);
  }

  async markAsRead(id: string): Promise<NotificationEntity> {
    return apiService.patch<NotificationEntity>(`/notifications/${id}`, { read: true });
  }

  async markAllAsRead(): Promise<void> {
    return apiService.patch<void>('/notifications/mark-all-read', {});
  }

  async createNotification(notification: Omit<NotificationEntity, 'id' | 'createdAt' | 'read'>): Promise<NotificationEntity> {
    return apiService.post<NotificationEntity>('/notifications', {
      ...notification,
      read: false,
      createdAt: new Date().toISOString(),
    });
  }

  async deleteNotification(id: string): Promise<void> {
    return apiService.delete<void>(`/notifications/${id}`);
  }
}

