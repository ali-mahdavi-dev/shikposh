import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { productContainer } from './container';
import { productKeys, categoryKeys } from '@/lib/react-query/query-keys';
import type { ProductEntity, ProductSummary, CategoryEntity } from './entities';
import type { ProductFilters } from './repository';

const productService = productContainer.getService();

// Utility hook for debounced values
export function useDebounced<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Products - Using enterprise query key factories
export const useProducts = () => {
  return useQuery<ProductEntity[]>({
    queryKey: productKeys.all,
    queryFn: () => productService.getAllProducts(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useProduct = (id: string) => {
  return useQuery<ProductEntity>({
    queryKey: productKeys.detail(id),
    queryFn: () => productService.getProductById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
};

export const useFeaturedProducts = () => {
  return useQuery<ProductSummary[]>({
    queryKey: productKeys.featured(),
    queryFn: () => productService.getFeaturedProducts(),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useProductsByCategory = (category: string) => {
  return useQuery<ProductSummary[]>({
    queryKey: productKeys.byCategory(category),
    queryFn: () => productService.getProductsByCategory(category),
    enabled: !!category,
    staleTime: 5 * 60 * 1000,
  });
};

export const useSearchProducts = (query: string) => {
  return useQuery<ProductSummary[]>({
    queryKey: productKeys.search(query),
    queryFn: () => productService.searchProducts(query),
    enabled: !!query && query.trim().length > 0,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

export const useFilteredProducts = (filters: ProductFilters, options?: { enabled?: boolean }) => {
  // Normalize filters to ensure consistent query key serialization
  const normalizedFilters = filters
    ? {
        q: filters.q || undefined,
        category: filters.category || undefined,
        min: filters.min || undefined,
        max: filters.max || undefined,
        rating: filters.rating || undefined,
        featured: filters.featured || undefined,
        tags: filters.tags && filters.tags.length > 0 ? filters.tags : undefined,
        sort: filters.sort || undefined,
      }
    : undefined;

  return useQuery<ProductSummary[]>({
    queryKey: productKeys.list(normalizedFilters),
    queryFn: () => productService.getFilteredProducts(filters),
    staleTime: 2 * 60 * 1000, // 2 minutes
    enabled: options?.enabled ?? true,
  });
};

// Categories - Using enterprise query key factories
export const useCategories = () => {
  return useQuery<CategoryEntity[]>({
    queryKey: categoryKeys.list(),
    queryFn: () => productService.getAllCategories(),
    staleTime: 30 * 60 * 1000, // 30 minutes
  });
};

export const useCategoryBySlug = (slug: string) => {
  return useQuery<CategoryEntity>({
    queryKey: categoryKeys.detail(slug),
    queryFn: () => productService.getCategoryBySlug(slug),
    enabled: !!slug,
    staleTime: 30 * 60 * 1000, // 30 minutes
  });
};

export const useProductsForCart = (productIds: string[]) => {
  return useQuery({
    queryKey: ['products', 'cart', productIds],
    queryFn: () => productService.getProductsForCart(productIds),
    enabled: productIds.length > 0,
    staleTime: 2 * 60 * 1000, // 2 minutes
    retry: 1, // Only retry once on failure
    retryOnMount: false, // Don't retry on mount if query failed
  });
};

// Most Discounted Products (sorted by discount descending)
export const useMostDiscountedProducts = (enabled: boolean = true) => {
  return useQuery<ProductSummary[]>({
    queryKey: [...productKeys.all, 'most-discounted'],
    queryFn: () => productService.getMostDiscountedProducts(),
    staleTime: 10 * 60 * 1000, // 10 minutes
    enabled,
  });
};

// Best Selling Products (sorted by rating as proxy for popularity)
export const useBestSellingProducts = (enabled: boolean = true) => {
  return useQuery<ProductSummary[]>({
    queryKey: [...productKeys.all, 'best-selling'],
    queryFn: () => productService.getBestSellingProducts(),
    staleTime: 10 * 60 * 1000, // 10 minutes
    enabled,
  });
};

// New Arrivals (sorted by newest)
export const useNewArrivals = (enabled: boolean = true) => {
  return useQuery<ProductSummary[]>({
    queryKey: [...productKeys.all, 'new-arrivals'],
    queryFn: () => productService.getNewArrivals(),
    staleTime: 10 * 60 * 1000, // 10 minutes
    enabled,
  });
};
