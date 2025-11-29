import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { wishlistRepository } from './repository';

export const WISHLIST_QUERY_KEY = ['wishlist'];

export function useWishlistQuery(options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: WISHLIST_QUERY_KEY,
    queryFn: () => wishlistRepository.getWishlist(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: options?.enabled !== false, // Default to true if not specified
  });
}

export function useToggleWishlistMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId: number) => wishlistRepository.toggleWishlist(productId),
    onSuccess: async () => {
      // Invalidate and refetch wishlist to ensure Redux store is in sync
      await queryClient.invalidateQueries({ queryKey: WISHLIST_QUERY_KEY });
      // Refetch immediately to update the store
      await queryClient.refetchQueries({ queryKey: WISHLIST_QUERY_KEY });
    },
  });
}

export function useSyncWishlistMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productIds: number[]) => wishlistRepository.syncWishlist(productIds),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: WISHLIST_QUERY_KEY });
    },
  });
}
