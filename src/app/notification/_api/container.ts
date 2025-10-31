import { NotificationService } from './service';
import { HttpNotificationRepository } from './repository';

// Dependency Injection Container
export class NotificationContainer {
  private static notificationRepository: HttpNotificationRepository;
  private static notificationService: NotificationService;

  static getNotificationRepository(): HttpNotificationRepository {
    if (!this.notificationRepository) {
      this.notificationRepository = new HttpNotificationRepository();
    }
    return this.notificationRepository;
  }

  static getNotificationService(): NotificationService {
    if (!this.notificationService) {
      this.notificationService = new NotificationService(this.getNotificationRepository());
    }
    return this.notificationService;
  }
}

