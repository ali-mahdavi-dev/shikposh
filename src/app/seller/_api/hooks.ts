import { useQuery } from '@tanstack/react-query';
import { SellerContainer } from './container';
import type { SellerEntity } from './entities';

const sellerService = SellerContainer.getSellerService();

export const useSeller = (id: string) => {
  return useQuery<SellerEntity>({
    queryKey: ['sellers', id],
    queryFn: () => sellerService.getSellerById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
};

// Note: list/search seller hooks have been removed as they are not used.
