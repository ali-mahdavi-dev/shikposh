import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { adminProductService } from './service';
import type {
  CreateProductRequest,
  Category,
  Color,
  Size,
  Tag,
  AdminProduct,
} from './entities/product.entity';

export const useProducts = () => {
  return useQuery<AdminProduct[]>({
    queryKey: ['admin', 'products'],
    queryFn: () => adminProductService.getProducts(),
    staleTime: 1 * 60 * 1000, // 1 minute
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'products'] });
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number | string; data: Partial<CreateProductRequest> }) =>
      adminProductService.updateProduct(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'products'] });
      queryClient.invalidateQueries({ queryKey: ['admin', 'products', variables.id] });
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, softDelete }: { id: number | string; softDelete?: boolean }) =>
      adminProductService.deleteProduct(id, softDelete),
    onSuccess: () => {
      // Invalidate and refetch products list
      queryClient.invalidateQueries({ queryKey: ['admin', 'products'] });
      queryClient.refetchQueries({ queryKey: ['admin', 'products'] });
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
