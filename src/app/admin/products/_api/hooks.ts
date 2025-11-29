import { useMutation, useQuery } from '@tanstack/react-query';
import { adminProductService } from './service';
import type {
  CreateProductRequest,
  Category,
  Color,
  Size,
  Tag,
} from './entities/product.entity';

export const useCreateProduct = () => {
  return useMutation({
    mutationFn: (data: CreateProductRequest) =>
      adminProductService.createProduct(data),
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

