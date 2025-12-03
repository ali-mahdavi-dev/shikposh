import { z } from 'zod';
import { AppError } from '@/lib/errors/base/app.error';
import { productFilterSchema } from '@/lib/validation/schemas/product.schema';
import { ValidatorFactory } from '@/lib/validation/validators/validator.factory';
import type { ProductRepository, ProductFilters } from './repository';
import type { ProductEntity, ProductSummary, CategoryEntity } from './entities';
import type { CartProduct } from './repository';

/**
 * Product Service
 * Service layer for product data operations
 * Follows enterprise architecture pattern with validation and error handling
 */
export class ProductService {
  constructor(private productRepository: ProductRepository) {}

  async getAllProducts(): Promise<ProductEntity[]> {
    return this.productRepository.getAllProducts();
  }

  async getProductById(id: string): Promise<ProductEntity> {
    if (!id) {
      throw AppError.validation('Product ID is required');
    }
    return await this.productRepository.getProductById(id);
  }

  async getFeaturedProducts(): Promise<ProductSummary[]> {
    return this.productRepository.getFeaturedProducts();
  }

  async getProductsByCategory(category: string): Promise<ProductSummary[]> {
    return this.productRepository.getProductsByCategory(category);
  }

  async searchProducts(query: string): Promise<ProductSummary[]> {
    if (!query.trim()) {
      return [];
    }
    return this.productRepository.searchProducts(query);
  }

  async getFilteredProducts(filters: ProductFilters): Promise<ProductSummary[]> {
    // Use enterprise validation
    const validator = ValidatorFactory.createSafeValidator(productFilterSchema);
    const validationResult = validator(filters);

    if (!validationResult.success) {
      // validationResult.error is already a ZodError from createSafeValidator
      const errorMessages = (validationResult.error as z.ZodError).issues.map((err) => {
        const path = err.path.join('.');
        return path ? `${path}: ${err.message}` : err.message;
      });
      throw AppError.validation(`Invalid filter parameters: ${errorMessages.join('; ')}`);
    }

    return await this.productRepository.getFilteredProducts(validationResult.data);
  }

  async getAllCategories(): Promise<CategoryEntity[]> {
    return this.productRepository.getAllCategories();
  }

  async getCategoryBySlug(slug: string): Promise<CategoryEntity> {
    if (!slug) {
      throw AppError.validation('Category slug is required');
    }
    return await this.productRepository.getCategoryBySlug(slug);
  }

  async getProductsForCart(productIds: string[]): Promise<CartProduct[]> {
    if (!productIds || productIds.length === 0) {
      return [];
    }
    return this.productRepository.getProductsForCart(productIds);
  }

  async getMostDiscountedProducts(limit?: number): Promise<ProductSummary[]> {
    return this.productRepository.getMostDiscountedProducts(limit);
  }

  async getBestSellingProducts(limit?: number): Promise<ProductSummary[]> {
    return this.productRepository.getBestSellingProducts(limit);
  }

  async getNewArrivals(limit?: number): Promise<ProductSummary[]> {
    return this.productRepository.getNewArrivals(limit);
  }
}
