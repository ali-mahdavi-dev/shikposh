import type { OrderRepository, OrderFilters } from './repository';
import type { OrderEntity, OrdersResponse } from './entities';

export class OrderService {
  constructor(private orderRepository: OrderRepository) {}

  async getOrders(filters?: OrderFilters): Promise<OrdersResponse> {
    return this.orderRepository.getOrders(filters);
  }

  async getOrderById(orderId: string | number): Promise<OrderEntity> {
    if (!orderId) {
      throw new Error('Order ID is required');
    }
    return this.orderRepository.getOrderById(orderId);
  }

  async cancelOrder(orderId: string | number): Promise<{ success: boolean; message: string }> {
    if (!orderId) {
      throw new Error('Order ID is required');
    }
    return this.orderRepository.cancelOrder(orderId);
  }
}

