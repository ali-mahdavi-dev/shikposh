import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ProductContainer } from './container';
import type { ProductEntity, ProductSummary, CategoryEntity } from './entities';
import type { ProductFilters } from './repository';

const productService = ProductContainer.getProductService();

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

// Products
export const useProducts = () => {
  return useQuery<ProductEntity[]>({
    queryKey: ['products'],
    queryFn: () => productService.getAllProducts(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useProduct = (id: string) => {
  return useQuery<ProductEntity>({
    queryKey: ['products', id],
    queryFn: () => productService.getProductById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
};

export const useFeaturedProducts = () => {
  return useQuery<ProductSummary[]>({
    queryKey: ['products', 'featured'],
    queryFn: () => productService.getFeaturedProducts(),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useProductsByCategory = (category: string) => {
  return useQuery<ProductSummary[]>({
    queryKey: ['products', 'category', category],
    queryFn: () => productService.getProductsByCategory(category),
    enabled: !!category,
    staleTime: 5 * 60 * 1000,
  });
};

export const useSearchProducts = (query: string) => {
  return useQuery<ProductSummary[]>({
    queryKey: ['products', 'search', query],
    queryFn: () => productService.searchProducts(query),
    enabled: !!query && query.trim().length > 0,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

export const useFilteredProducts = (filters: ProductFilters) => {
  return useQuery<ProductSummary[]>({
    queryKey: ['products', 'filtered', filters],
    queryFn: () => productService.getFilteredProducts(filters),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

// Categories
export const useCategories = () => {
  return useQuery<CategoryEntity[]>({
    queryKey: ['categories'],
    queryFn: () => productService.getAllCategories(),
    staleTime: 30 * 60 * 1000, // 30 minutes
  });
};

export const useCategoryBySlug = (slug: string) => {
  return useQuery<CategoryEntity>({
    queryKey: ['categories', slug],
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
