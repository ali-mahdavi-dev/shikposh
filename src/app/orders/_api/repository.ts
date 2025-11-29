import { apiService } from '@/shared/services/api.service';
import type { OrderEntity, OrdersResponse } from './entities';

export interface OrderFilters {
  status?: string;
  page?: number;
  limit?: number;
}

export interface OrderRepository {
  getOrders(filters?: OrderFilters): Promise<OrdersResponse>;
  getOrderById(orderId: string | number): Promise<OrderEntity>;
  cancelOrder(orderId: string | number): Promise<{ success: boolean; message: string }>;
}

export class HttpOrderRepository implements OrderRepository {
  async getOrders(filters?: OrderFilters): Promise<OrdersResponse> {
    const params = new URLSearchParams();
    if (filters?.status) {
      params.append('status', filters.status);
    }
    if (filters?.page) {
      params.append('page', filters.page.toString());
    }
    if (filters?.limit) {
      params.append('limit', filters.limit.toString());
    }

    const queryString = params.toString();
    const endpoint = `/api/v1/orders${queryString ? `?${queryString}` : ''}`;
    
    const response = await apiService.get<OrdersResponse | OrderEntity[]>(endpoint);
    
    // Handle both response formats
    if (Array.isArray(response)) {
      return {
        orders: response,
        total: response.length,
      };
    }
    
    return response;
  }

  async getOrderById(orderId: string | number): Promise<OrderEntity> {
    return apiService.get<OrderEntity>(`/api/v1/orders/${orderId}`);
  }

  async cancelOrder(orderId: string | number): Promise<{ success: boolean; message: string }> {
    return apiService.post(`/api/v1/orders/${orderId}/cancel`, {});
  }
}

export const orderRepository = new HttpOrderRepository();

