import { AppError } from '@/lib/errors/base/app.error';
import { orderFilterSchema } from '@/lib/validation/schemas/order.schema';
import { ValidatorFactory } from '@/lib/validation/validators/validator.factory';
import type { OrderRepository, OrderFilters } from './repository';
import type { OrderEntity, OrdersResponse } from './entities';

export class OrderService {
  constructor(private orderRepository: OrderRepository) {}

  async getOrders(filters?: OrderFilters): Promise<OrdersResponse> {
    // Use enterprise validation
    if (filters) {
      const validator = ValidatorFactory.createSafeValidator(orderFilterSchema);
      const validationResult = validator(filters);

      if (!validationResult.success) {
        throw AppError.validation('Invalid filter parameters', {
          errors: validationResult.error.errors,
        });
      }

      return await this.orderRepository.getOrders(validationResult.data);
    }

    return await this.orderRepository.getOrders();
  }

  async getOrderById(orderId: string | number): Promise<OrderEntity> {
    if (!orderId) {
      throw AppError.validation('Order ID is required');
    }
    return await this.orderRepository.getOrderById(orderId);
  }

  async cancelOrder(orderId: string | number): Promise<{ success: boolean; message: string }> {
    if (!orderId) {
      throw AppError.validation('Order ID is required');
    }
    return await this.orderRepository.cancelOrder(orderId);
  }
}

