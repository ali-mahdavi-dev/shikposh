import { useQuery } from '@tanstack/react-query';
import { SellerContainer } from './container';
import type { SellerEntity, SellerSummary } from './entities';

const sellerService = SellerContainer.getSellerService();

// Sellers
export const useSellers = () => {
  return useQuery<SellerSummary[]>({
    queryKey: ['sellers'],
    queryFn: () => sellerService.getAllSellers(),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useSeller = (id: string) => {
  return useQuery<SellerEntity>({
    queryKey: ['sellers', id],
    queryFn: () => sellerService.getSellerById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
};

export const useSellersByCategory = (category: string) => {
  return useQuery<SellerSummary[]>({
    queryKey: ['sellers', 'category', category],
    queryFn: () => sellerService.getSellersByCategory(category),
    enabled: !!category,
    staleTime: 5 * 60 * 1000,
  });
};

export const useSearchSellers = (query: string) => {
  return useQuery<SellerSummary[]>({
    queryKey: ['sellers', 'search', query],
    queryFn: () => sellerService.searchSellers(query),
    enabled: !!query && query.trim().length > 0,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

export const useSellerByProductId = (productId: string) => {
  return useQuery<SellerEntity>({
    queryKey: ['sellers', 'product', productId],
    queryFn: () => sellerService.getSellerByProductId(productId),
    enabled: !!productId && productId !== 'undefined',
    staleTime: 5 * 60 * 1000,
  });
};
