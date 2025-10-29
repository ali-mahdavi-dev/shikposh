import { ProductEntity, ProductSummary } from '../entities/product.entity';
import { CategoryEntity } from '../entities/category.entity';
import { ReviewEntity, ReviewFormData } from '../entities/review.entity';

export interface ProductRepository {
  // Products
  getAllProducts(): Promise<ProductEntity[]>;
  getProductById(id: string): Promise<ProductEntity>;
  getFeaturedProducts(): Promise<ProductSummary[]>;
  getProductsByCategory(category: string): Promise<ProductSummary[]>;
  searchProducts(query: string): Promise<ProductSummary[]>;

  // Categories
  getAllCategories(): Promise<CategoryEntity[]>;

  // Reviews
  getReviewsByProductId(productId: string): Promise<ReviewEntity[]>;
  createReview(review: ReviewFormData & { productId: string }): Promise<ReviewEntity>;
  updateReviewHelpful(reviewId: number, type: 'helpful' | 'notHelpful'): Promise<ReviewEntity>;
}
