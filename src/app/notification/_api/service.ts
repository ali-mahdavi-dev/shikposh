import { AppError } from '@/lib/errors/base/app.error';
import type { NotificationRepository } from './repository';
import { HttpNotificationRepository } from './repository';
import type { NotificationEntity } from './entities';
import { BaseService } from '@/lib/api';
import { inject, injectable } from 'tsyringe';

@injectable()
export class NotificationService extends BaseService<NotificationEntity, string> {
  private notificationRepo: NotificationRepository;

  constructor(@inject(HttpNotificationRepository) notificationRepository: NotificationRepository) {
    super(notificationRepository);
    this.notificationRepo = notificationRepository;
  }

  // Custom operations
  async markAsRead(id: string): Promise<NotificationEntity> {
    if (!id) {
      throw AppError.validation('Notification ID is required');
    }
    return await this.notificationRepo.markAsRead(id);
  }

  async markAllAsRead(): Promise<void> {
    return await this.notificationRepo.markAllAsRead();
  }
}
