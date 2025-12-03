import type { IHttpAdapter } from '@/lib/api/adapters/http.adapter';
import { BaseRepository } from '@/lib/api/repositories/base.repository';
import type { IRepository } from '@/lib/api/repositories/interfaces/repository.interface';
import type { NotificationEntity } from './entities';
import { inject, injectable } from 'tsyringe';
import { HTTP_ADAPTER_TOKEN } from '@/lib/di/tokens';

export interface NotificationRepository extends IRepository<NotificationEntity, string> {
  markAsRead(id: string): Promise<NotificationEntity>;
  markAllAsRead(): Promise<void>;
  create(
    notification: Omit<NotificationEntity, 'id' | 'createdAt' | 'read'>,
  ): Promise<NotificationEntity>;
  deleteNotification(id: string): Promise<void>;
}

@injectable()
export class HttpNotificationRepository
  extends BaseRepository<NotificationEntity, string>
  implements NotificationRepository
{
  constructor(@inject(HTTP_ADAPTER_TOKEN) httpAdapter: IHttpAdapter) {
    super(httpAdapter, '/notifications');
  }

  // Custom operations
  async markAsRead(id: string): Promise<NotificationEntity> {
    return await this.httpAdapter.patch<NotificationEntity>(`${this.basePath}/${id}`, {
      read: true,
    });
  }

  async markAllAsRead(): Promise<void> {
    await this.httpAdapter.patch<void>('/notifications/mark-all-read', {});
  }

  // Override delete to match interface
  async deleteNotification(id: string): Promise<void> {
    await this.delete(id);
  }
}
