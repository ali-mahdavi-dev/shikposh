import { OrderService } from './service';
import { orderRepository } from './repository';

// Dependency Injection Container
export class OrderContainer {
  private static orderService: OrderService;

  static getOrderService(): OrderService {
    if (!this.orderService) {
      this.orderService = new OrderService(orderRepository);
    }
    return this.orderService;
  }
}
