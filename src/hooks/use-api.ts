import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Product, Category, Review, ReviewFormData } from '@/types';

// Products
export const useProducts = () => {
  return useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: api.getProducts,
  });
};

export const useProduct = (id: string) => {
  return useQuery<Product>({
    queryKey: ['products', id],
    queryFn: () => api.getProduct(id),
    enabled: !!id,
  });
};

export const useFeaturedProducts = () => {
  return useQuery<Product[]>({
    queryKey: ['products', 'featured'],
    queryFn: api.getFeaturedProducts,
  });
};

export const useProductsByCategory = (category: string) => {
  return useQuery<Product[]>({
    queryKey: ['products', 'category', category],
    queryFn: () => api.getProductsByCategory(category),
  });
};

// Categories
export const useCategories = () => {
  return useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: api.getCategories,
  });
};

// Reviews
export const useReviews = (productId: string) => {
  return useQuery<Review[]>({
    queryKey: ['reviews', productId],
    queryFn: () => api.getReviews(productId),
    enabled: !!productId,
  });
};

export const useCreateReview = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (review: ReviewFormData & { productId: string }) => {
      const newReview = {
        ...review,
        user: 'کاربر جدید', // In real app, get from auth
        date: new Date().toLocaleDateString('fa-IR'),
        helpful: 0,
        notHelpful: 0,
        verified: false,
      };
      return api.createReview(newReview);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['reviews', variables.productId] });
    },
  });
};

export const useUpdateReviewHelpful = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ reviewId, type }: { reviewId: number; type: 'helpful' | 'notHelpful' }) =>
      api.updateReviewHelpful(reviewId, type),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
    },
  });
};

// Chat Users
export const useChatUsers = () => {
  return useQuery({
    queryKey: ['chatUsers'],
    queryFn: api.getChatUsers,
  });
};

