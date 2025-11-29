// Admin API entities

export interface DashboardStats {
  total_orders: number;
  total_users: number;
  total_products: number;
  total_revenue: number;
}

export interface DailySalesData {
  date: string;
  sales: number;
  orders: number;
}

