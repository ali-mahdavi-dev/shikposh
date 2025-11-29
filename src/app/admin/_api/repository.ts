import { apiService } from '@/shared/services/api.service';
import type { DashboardStats, DailySalesData } from './entities/admin.entity';

export interface AdminRepository {
  getDashboardStats(): Promise<DashboardStats>;
  getDailySales(days?: number): Promise<DailySalesData[]>;
}

export class HttpAdminRepository implements AdminRepository {
  async getDashboardStats(): Promise<DashboardStats> {
    const response = await apiService.get<DashboardStats>('/api/v1/admin/dashboard/stats');
    return response;
  }

  async getDailySales(days: number = 7): Promise<DailySalesData[]> {
    const response = await apiService.get<DailySalesData[]>(
      `/api/v1/admin/dashboard/daily-sales?days=${days}`,
    );
    return response;
  }
}

