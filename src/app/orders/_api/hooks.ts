import { useQuery, useMutation, useQueryClient, keepPreviousData } from '@tanstack/react-query';
import { orderContainer } from './container';
import { orderKeys } from '@/lib/react-query/query-keys';
import { handleError } from '@/lib/errors';
import type { OrdersResponse } from './entities';
import type { OrderFilters } from './repository';

const orderService = orderContainer.getService();

export const useOrders = (filters?: OrderFilters) => {
  // Normalize filters to ensure consistent query key
  const normalizedFilters = filters
    ? {
        status: filters.status,
        page: filters.page,
        limit: filters.limit,
      }
    : undefined;

  return useQuery<OrdersResponse>({
    queryKey: orderKeys.list(normalizedFilters),
    queryFn: () => orderService.getOrders(normalizedFilters),
    staleTime: 2 * 60 * 1000, // 2 minutes
    placeholderData: keepPreviousData, // Keep previous data while fetching new data
    retry: 1, // Only retry once on failure
    refetchOnWindowFocus: false, // Don't refetch on window focus to prevent issues
  });
};

export const useCancelOrderMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (orderId: string | number) => orderService.cancelOrder(orderId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: orderKeys.all });
    },
    onError: (error) => {
      // Use enterprise error handling
      const appError = handleError(error);
      if (process.env.NODE_ENV === 'development') {
        console.error('Cancel order error:', appError.toJSON());
      }
    },
  });
};
