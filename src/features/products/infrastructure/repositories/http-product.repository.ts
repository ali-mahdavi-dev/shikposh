import { ProductRepository } from '../../domain/repositories/product.repository';
import { ProductEntity, ProductSummary } from '../../domain/entities/product.entity';
import { CategoryEntity } from '../../domain/entities/category.entity';
import { ReviewEntity, ReviewFormData } from '../../domain/entities/review.entity';
import { apiService, PaginatedResponse } from '@/shared/services/api.service';

export class HttpProductRepository implements ProductRepository {
  async getAllProducts(): Promise<ProductEntity[]> {
    return apiService.get<ProductEntity[]>('/products');
  }

  async getProductById(id: string): Promise<ProductEntity> {
    return apiService.get<ProductEntity>(`/products/${id}`);
  }

  async getFeaturedProducts(): Promise<ProductSummary[]> {
    const products = await apiService.get<ProductEntity[]>('/products?isFeatured=true');
    return this.mapToProductSummary(products);
  }

  async getProductsByCategory(category: string): Promise<ProductSummary[]> {
    const products = await apiService.get<ProductEntity[]>(`/products?category=${category}`);
    return this.mapToProductSummary(products);
  }

  async searchProducts(query: string): Promise<ProductSummary[]> {
    const products = await apiService.get<ProductEntity[]>('/products');
    const filteredProducts = products.filter(
      (product) =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase()) ||
        product.brand.toLowerCase().includes(query.toLowerCase()),
    );
    return this.mapToProductSummary(filteredProducts);
  }

  async getAllCategories(): Promise<CategoryEntity[]> {
    return apiService.get<CategoryEntity[]>('/categories');
  }

  async getReviewsByProductId(productId: string): Promise<ReviewEntity[]> {
    try {
      const response = await apiService.get<PaginatedResponse<ReviewEntity>>(
        `/products/${productId}/reviews`,
      );
      return response.data || [];
    } catch (_error) {
      return apiService.get<ReviewEntity[]>(`/reviews?productId=${productId}`);
    }
  }

  async createReview(review: ReviewFormData & { productId: string }): Promise<ReviewEntity> {
    const reviewData = {
      rating: review.rating,
      comment: review.comment,
      productId: review.productId,
    };
    return apiService.post<ReviewEntity>('/reviews', reviewData);
  }

  async updateReviewHelpful(
    reviewId: number,
    type: 'helpful' | 'notHelpful',
  ): Promise<ReviewEntity> {
    return apiService.patch<ReviewEntity>(`/reviews/${reviewId}`, { type });
  }

  private mapToProductSummary(products: ProductEntity[]): ProductSummary[] {
    return products.map((product) => ({
      id: product.id,
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
    }));
  }
}


