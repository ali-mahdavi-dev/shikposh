import { AppError } from '@/lib/errors/base/app.error';
import type { HomeRepository } from './repository';
import type { ProductEntity } from './entities';

/**
 * Home Service
 * Service layer for home page data operations
 * Follows enterprise architecture pattern with validation and error handling
 */
export class HomeService {
  constructor(private homeRepository: HomeRepository) {}

  /**
   * Get discounted products
   * @param limit - Maximum number of products to return (default: 12)
   * @returns Array of discounted products
   */
  async getDiscountedProducts(limit?: number): Promise<ProductEntity[]> {
    // Validation
    if (limit !== undefined && limit < 0) {
      throw AppError.validation('Limit must be a positive number');
    }

    return await this.homeRepository.getDiscountedProducts(limit);
  }

  /**
   * Get best selling products
   * @param limit - Maximum number of products to return (default: 12)
   * @returns Array of best selling products
   */
  async getBestSellingProducts(limit?: number): Promise<ProductEntity[]> {
    // Validation
    if (limit !== undefined && limit < 0) {
      throw AppError.validation('Limit must be a positive number');
    }

    return await this.homeRepository.getBestSellingProducts(limit);
  }

  /**
   * Get new arrival products
   * @param limit - Maximum number of products to return (default: 12)
   * @returns Array of new arrival products
   */
  async getNewArrivals(limit?: number): Promise<ProductEntity[]> {
    // Validation
    if (limit !== undefined && limit < 0) {
      throw AppError.validation('Limit must be a positive number');
    }

    return await this.homeRepository.getNewArrivals(limit);
  }
}
