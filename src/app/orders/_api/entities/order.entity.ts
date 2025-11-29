export type OrderStatus =
  | 'pending'
  | 'payment_confirmed'
  | 'processing'
  | 'confirmed'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'refunded';

export interface OrderItem {
  id: string | number;
  product_id: string | number;
  product_name: string;
  product_slug?: string;
  product_image?: string;
  quantity: number;
  price: number;
  discount?: number;
  color?: string;
  size?: string;
  variant_id?: string | number;
}

export interface OrderAddress {
  id?: string | number;
  full_name: string;
  phone: string;
  address: string;
  city: string;
  province: string;
  postal_code?: string;
}

export interface OrderEntity {
  id: string | number;
  order_number: string;
  status: OrderStatus;
  total_amount: number;
  discount_amount?: number;
  shipping_cost?: number;
  final_amount: number;
  items: OrderItem[];
  shipping_address?: OrderAddress;
  payment_method?: string;
  payment_status?: 'pending' | 'paid' | 'failed' | 'refunded';
  created_at: string;
  updated_at?: string;
  shipped_at?: string;
  delivered_at?: string;
  tracking_number?: string;
  notes?: string;
}

export interface OrdersResponse {
  orders: OrderEntity[];
  total: number;
  page?: number;
  pages?: number;
}
