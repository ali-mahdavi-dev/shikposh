import { NotificationService } from './service';
import { appContainer } from '@/lib/di/container';

// Dependency Injection Container (facade over central DI container)
export class NotificationContainer {
  static getNotificationService(): NotificationService {
    return appContainer.resolve(NotificationService);
  }
}
