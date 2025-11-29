import { useQuery, useMutation, useQueryClient, keepPreviousData } from '@tanstack/react-query';
import { OrderContainer } from './container';
import type { OrderEntity, OrdersResponse, OrderStatus } from './entities';
import type { OrderFilters } from './repository';

const orderService = OrderContainer.getOrderService();

export const ORDERS_QUERY_KEY = ['orders'];

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
    queryKey: [...ORDERS_QUERY_KEY, normalizedFilters],
    queryFn: () => orderService.getOrders(normalizedFilters),
    staleTime: 2 * 60 * 1000, // 2 minutes
    placeholderData: keepPreviousData, // Keep previous data while fetching new data
    retry: 1, // Only retry once on failure
    refetchOnWindowFocus: false, // Don't refetch on window focus to prevent issues
  });
};

export const useOrder = (orderId: string | number | null) => {
  return useQuery<OrderEntity>({
    queryKey: [...ORDERS_QUERY_KEY, orderId],
    queryFn: () => orderService.getOrderById(orderId!),
    enabled: !!orderId,
    staleTime: 2 * 60 * 1000,
  });
};

export const useCancelOrderMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (orderId: string | number) => orderService.cancelOrder(orderId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ORDERS_QUERY_KEY });
    },
  });
};
