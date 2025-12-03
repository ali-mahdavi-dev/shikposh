import '@/lib/di/init'; // Ensure reflect-metadata is loaded before decorators

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AdminProductService } from './service';
import { appContainer } from '@/lib/di/container';
import { revalidateProductPages, generateSlug } from './revalidation';
import type {
  CreateProductRequest,
  Category,
  Color,
  Size,
  Tag,
  AdminProduct,
} from './entities/product.entity';

const adminProductService = appContainer.resolve(AdminProductService);

export const useProducts = () => {
  return useQuery<AdminProduct[]>({
    queryKey: ['admin', 'products'],
    queryFn: () => adminProductService.getProducts(),
    staleTime: 0, // Always consider data stale, refetch on mount
    refetchOnMount: true, // Always refetch when component mounts
    refetchOnWindowFocus: false, // Don't refetch on window focus to avoid unnecessary requests
  });
};

export const useProduct = (id: number | string | undefined) => {
  return useQuery<AdminProduct>({
    queryKey: ['admin', 'products', id],
    queryFn: () => adminProductService.getProductById(id!),
    enabled: !!id,
    staleTime: 1 * 60 * 1000, // 1 minute
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateProductRequest) => adminProductService.createProduct(data),
    onSuccess: async (_, variables) => {
      // Invalidate and refetch React Query cache
      queryClient.invalidateQueries({ queryKey: ['admin', 'products'] });
      await queryClient.refetchQueries({ queryKey: ['admin', 'products'] });

      // Revalidate SSG pages
      const slug = variables.slug || generateSlug(variables.title);
      await revalidateProductPages({ slug });
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number | string; data: Partial<CreateProductRequest> }) =>
      adminProductService.updateProduct(id, data),
    onSuccess: async (_, variables) => {
      // Invalidate and refetch React Query cache
      queryClient.invalidateQueries({ queryKey: ['admin', 'products'] });
      queryClient.invalidateQueries({ queryKey: ['admin', 'products', variables.id] });
      await queryClient.refetchQueries({ queryKey: ['admin', 'products'] });

      // Revalidate SSG pages
      try {
        const product = await adminProductService.getProductById(variables.id);
        await revalidateProductPages({ slug: product?.slug });
      } catch (error) {
        // If we can't get product, still revalidate all products
        await revalidateProductPages();
      }
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, softDelete }: { id: number | string; softDelete?: boolean }) => {
      // Get product before deletion to get slug for revalidation
      let slug: string | undefined;
      try {
        const product = await adminProductService.getProductById(id);
        slug = product?.slug;
      } catch (error) {
        // If we can't get product, continue with deletion
        console.warn('Failed to get product for revalidation:', error);
      }

      // Delete the product
      await adminProductService.deleteProduct(id, softDelete);

      // Return slug for use in onSuccess
      return { id, slug };
    },
    onSuccess: async (result) => {
      // Invalidate and refetch products list
      queryClient.invalidateQueries({ queryKey: ['admin', 'products'] });
      await queryClient.refetchQueries({ queryKey: ['admin', 'products'] });

      // Revalidate SSG pages
      await revalidateProductPages({ slug: result.slug });
    },
  });
};

export const useCategories = () => {
  return useQuery<Category[]>({
    queryKey: ['admin', 'categories'],
    queryFn: () => adminProductService.getCategories(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useColors = () => {
  return useQuery<Color[]>({
    queryKey: ['admin', 'colors'],
    queryFn: () => adminProductService.getColors(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useSizes = () => {
  return useQuery<Size[]>({
    queryKey: ['admin', 'sizes'],
    queryFn: () => adminProductService.getSizes(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useTags = () => {
  return useQuery<Tag[]>({
    queryKey: ['admin', 'tags'],
    queryFn: () => adminProductService.getTags(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useCreateTag = () => {
  return useMutation({
    mutationFn: (name: string) => adminProductService.createTag(name),
  });
};
