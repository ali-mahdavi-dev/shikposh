import { apiService } from '@/shared/services/api.service';

export interface CreateOrderRequest {
  items: OrderItemInput[];
  shipping_address?: OrderAddressInput;
  payment_method: string;
  total_amount: number;
  discount_amount?: number;
  shipping_cost?: number;
  final_amount: number;
}

export interface OrderItemInput {
  product_id: number;
  product_name: string;
  product_slug?: string;
  product_image?: string;
  quantity: number;
  price: number;
  discount?: number;
  color?: string;
  size?: string;
  variant_id?: number;
}

export interface OrderAddressInput {
  full_name: string;
  phone: string;
  address: string;
  city: string;
  province: string;
  postal_code?: string;
}

export interface CreateOrderResponse {
  order_id: number;
  order_number: string;
  payment_url: string;
  authority: string;
}

export interface VerifyPaymentRequest {
  authority: string;
  order_id: number;
}

export interface VerifyPaymentResponse {
  order_id: number;
  order_number: string;
  status: string;
  ref_id: number;
  message: string;
}

export class PaymentService {
  async createOrderAndGetPaymentUrl(request: CreateOrderRequest): Promise<CreateOrderResponse> {
    return apiService.post<CreateOrderResponse>('/api/v1/orders', request);
  }

  async verifyPayment(request: VerifyPaymentRequest): Promise<VerifyPaymentResponse> {
    return apiService.post<VerifyPaymentResponse>('/api/v1/payments/zarinpal/verify', request);
  }
}

export const paymentService = new PaymentService();
