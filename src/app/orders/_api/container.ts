import { BaseContainer } from '@/lib/api/container-base';
import { OrderService } from './service';
import { HttpOrderRepository, type OrderRepository } from './repository';

// Dependency Injection Container
export class OrderContainer extends BaseContainer<OrderRepository, OrderService> {
  protected createRepository(): OrderRepository {
    return new HttpOrderRepository();
  }

  protected createService(repository: OrderRepository): OrderService {
    return new OrderService(repository);
  }
}

// Export singleton instance
export const orderContainer = new OrderContainer();
