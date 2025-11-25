import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { wishlistRepository } from './repository';

export const WISHLIST_QUERY_KEY = ['wishlist'];

export function useWishlistQuery() {
  return useQuery({
    queryKey: WISHLIST_QUERY_KEY,
    queryFn: () => wishlistRepository.getWishlist(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useToggleWishlistMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId: number) => wishlistRepository.toggleWishlist(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: WISHLIST_QUERY_KEY });
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
