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

// Posts
export const usePosts = () => {
  return useQuery({
    queryKey: ['posts'],
    queryFn: api.getPosts,
  });
};

export const usePost = (id: string) => {
  return useQuery({
    queryKey: ['posts', id],
    queryFn: () => api.getPost(id),
    enabled: !!id,
  });
};

export const useFeaturedPosts = () => {
  return useQuery({
    queryKey: ['posts', 'featured'],
    queryFn: api.getFeaturedPosts,
  });
};

export const usePostsByCategory = (category: string) => {
  return useQuery({
    queryKey: ['posts', 'category', category],
    queryFn: () => api.getPostsByCategory(category),
  });
};

// Playlists
export const usePlaylists = () => {
  return useQuery({
    queryKey: ['playlists'],
    queryFn: api.getPlaylists,
  });
};

export const usePlaylist = (id: string) => {
  return useQuery({
    queryKey: ['playlists', id],
    queryFn: () => api.getPlaylist(id),
    enabled: !!id,
  });
};

// Sellers
export const useSellers = () => {
  return useQuery({
    queryKey: ['sellers'],
    queryFn: api.getSellers,
  });
};

export const useSeller = (id: string) => {
  return useQuery({
    queryKey: ['sellers', id],
    queryFn: () => api.getSeller(id),
    enabled: !!id,
  });
};
