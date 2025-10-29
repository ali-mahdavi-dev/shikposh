import { ProductRepository } from '../repositories/product.repository';
import { ProductEntity, ProductSummary } from '../entities/product.entity';
import { CategoryEntity } from '../entities/category.entity';
import { ReviewEntity, ReviewFormData } from '../entities/review.entity';

export class ProductService {
  constructor(private productRepository: ProductRepository) {}

  async getAllProducts(): Promise<ProductEntity[]> {
    return this.productRepository.getAllProducts();
  }

  async getProductById(id: string): Promise<ProductEntity> {
    if (!id) {
      throw new Error('Product ID is required');
    }
    return this.productRepository.getProductById(id);
  }

  async getFeaturedProducts(): Promise<ProductSummary[]> {
    return this.productRepository.getFeaturedProducts();
  }

  async getProductsByCategory(category: string): Promise<ProductSummary[]> {
    if (category === 'all') {
      const allProducts = await this.productRepository.getAllProducts();
      return this.mapToProductSummary(allProducts);
    }
    return this.productRepository.getProductsByCategory(category);
  }

  async searchProducts(query: string): Promise<ProductSummary[]> {
    if (!query.trim()) {
      return [];
    }
    return this.productRepository.searchProducts(query);
  }

  async getAllCategories(): Promise<CategoryEntity[]> {
    return this.productRepository.getAllCategories();
  }

  async getReviewsByProductId(productId: string): Promise<ReviewEntity[]> {
    if (!productId) {
      throw new Error('Product ID is required');
    }
    return this.productRepository.getReviewsByProductId(productId);
  }

  async createReview(reviewData: ReviewFormData & { productId: string }): Promise<ReviewEntity> {
    if (!reviewData.productId) {
      throw new Error('Product ID is required');
    }
    if (!reviewData.rating || reviewData.rating < 1 || reviewData.rating > 5) {
      throw new Error('Rating must be between 1 and 5');
    }
    if (!reviewData.comment.trim()) {
      throw new Error('Comment is required');
    }

    return this.productRepository.createReview(reviewData);
  }

  async updateReviewHelpful(
    reviewId: number,
    type: 'helpful' | 'notHelpful',
  ): Promise<ReviewEntity> {
    if (!reviewId) {
      throw new Error('Review ID is required');
    }
    return this.productRepository.updateReviewHelpful(reviewId, type);
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
