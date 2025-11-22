import { apiService, PaginatedResponse } from '@/shared/services/api.service';
import type {
  ProductEntity,
  ProductSummary,
  CategoryEntity,
  ReviewEntity,
  ReviewFormData,
} from './entities';

export interface ProductFilters {
  q?: string;
  category?: string;
  min?: number;
  max?: number;
  rating?: number;
  featured?: boolean;
  tags?: string[];
  sort?: string;
}

export interface CartProduct {
  id: string;
  name: string;
  image: string;
  price: number;
  discount: number;
  hasDiscount: boolean;
}

export interface ProductRepository {
  getAllProducts(): Promise<ProductEntity[]>;
  getProductById(id: string): Promise<ProductEntity>;
  getFeaturedProducts(): Promise<ProductSummary[]>;
  getProductsByCategory(category: string): Promise<ProductSummary[]>;
  searchProducts(query: string): Promise<ProductSummary[]>;
  getFilteredProducts(filters: ProductFilters): Promise<ProductSummary[]>;
  getAllCategories(): Promise<CategoryEntity[]>;
  getReviewsByProductId(productId: string): Promise<ReviewEntity[]>;
  createReview(review: ReviewFormData & { productId: string }): Promise<ReviewEntity>;
  updateReviewHelpful(reviewId: number, type: 'helpful' | 'notHelpful'): Promise<ReviewEntity>;
  getProductsForCart(productIds: string[]): Promise<CartProduct[]>;
}

export class HttpProductRepository implements ProductRepository {
  async getAllProducts(): Promise<ProductEntity[]> {
    return apiService.get<ProductEntity[]>('/api/v1/public/products');
  }

  async getProductById(id: string): Promise<ProductEntity> {
    return apiService.get<ProductEntity>(`/api/v1/public/products/${id}`);
  }

  async getFeaturedProducts(): Promise<ProductSummary[]> {
    const products = await apiService.get<ProductEntity[]>('/api/v1/public/products/featured');
    return this.mapToProductSummary(products);
  }

  async getProductsByCategory(category: string): Promise<ProductSummary[]> {
    const products = await apiService.get<ProductEntity[]>(
      `/api/v1/public/products/category/${category}`,
    );
    return this.mapToProductSummary(products);
  }

  async searchProducts(query: string): Promise<ProductSummary[]> {
    if (!query.trim()) {
      return [];
    }
    const params = new URLSearchParams();
    params.set('q', query.trim());
    const products = await apiService.get<ProductEntity[]>(
      `/api/v1/public/products?${params.toString()}`,
    );
    return this.mapToProductSummary(products);
  }

  async getFilteredProducts(filters: ProductFilters): Promise<ProductSummary[]> {
    const params = new URLSearchParams();
    if (filters.q) params.set('q', filters.q);
    if (filters.category && filters.category !== 'all') params.set('category', filters.category);
    if (filters.min !== undefined && filters.min > 0) params.set('min', String(filters.min));
    if (filters.max !== undefined && filters.max < 10_000_000)
      params.set('max', String(filters.max));
    if (filters.rating !== undefined && filters.rating > 0)
      params.set('rating', String(filters.rating));
    if (filters.featured) params.set('featured', 'true');
    if (filters.tags && filters.tags.length > 0) params.set('tags', filters.tags.join(','));
    if (filters.sort && filters.sort !== 'relevance') params.set('sort', filters.sort);

    const queryString = params.toString();
    const endpoint = `/api/v1/public/products${queryString ? `?${queryString}` : ''}`;
    const products = await apiService.get<ProductEntity[]>(endpoint);
    return this.mapToProductSummary(products);
  }

  async getAllCategories(): Promise<CategoryEntity[]> {
    return apiService.get<CategoryEntity[]>('/api/v1/public/categories');
  }

  async getReviewsByProductId(productId: string): Promise<ReviewEntity[]> {
    try {
      const response = await apiService.get<PaginatedResponse<ReviewEntity>>(
        `/api/v1/public/products/${productId}/reviews`,
      );
      return response.data || [];
    } catch (_error) {
      return apiService.get<ReviewEntity[]>(`/api/v1/public/reviews?productId=${productId}`);
    }
  }

  async createReview(review: ReviewFormData & { productId: string }): Promise<ReviewEntity> {
    const reviewData = {
      rating: review.rating,
      comment: review.comment,
      productId: review.productId,
    };
    return apiService.post<ReviewEntity>('/api/v1/public/reviews', reviewData);
  }

  async updateReviewHelpful(
    reviewId: number,
    type: 'helpful' | 'notHelpful',
  ): Promise<ReviewEntity> {
    return apiService.patch<ReviewEntity>(`/api/v1/public/reviews/${reviewId}`, { type });
  }

  async getProductsForCart(productIds: string[]): Promise<CartProduct[]> {
    if (productIds.length === 0) {
      return [];
    }
    return apiService.post<CartProduct[]>('/api/v1/public/products/cart', productIds);
  }

  private mapToProductSummary(products: ProductEntity[]): ProductSummary[] {
    return products.map((product) => ({
      id: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      discount: product.discount,
      rating: product.rating,
      reviewCount: product.reviewCount,
      image: product.image,
      category: product.category,
      isNew: product.isNew,
      isFeatured: product.isFeatured,
      colors: product.colors,
      sizes: product.sizes,
      brand: product.brand,
      description: product.description,
      tags: product.tags || [],
    }));
  }
}
