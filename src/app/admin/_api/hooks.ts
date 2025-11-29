import { useQuery } from '@tanstack/react-query';
import { adminService } from './service';
import type { DashboardStats, DailySalesData } from './entities/admin.entity';

export const useDashboardStats = () => {
  return useQuery<DashboardStats>({
    queryKey: ['admin', 'dashboard', 'stats'],
    queryFn: () => adminService.getDashboardStats(),
    staleTime: 30000, // 30 seconds
  });
};

export const useDailySales = (days: number = 7) => {
  return useQuery<DailySalesData[]>({
    queryKey: ['admin', 'dashboard', 'daily-sales', days],
    queryFn: () => adminService.getDailySales(days),
    staleTime: 60000, // 1 minute
  });
};

