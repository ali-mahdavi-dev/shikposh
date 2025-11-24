import type { ProductRepository, ProductFilters } from './repository';
import type {
  ProductEntity,
  ProductSummary,
  CategoryEntity,
  ReviewEntity,
  ReviewFormData,
} from './entities';
import type { CartProduct } from './repository';

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

  async getFilteredProducts(filters: ProductFilters): Promise<ProductSummary[]> {
    return this.productRepository.getFilteredProducts(filters);
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

  async getProductsForCart(productIds: string[]): Promise<CartProduct[]> {
    if (!productIds || productIds.length === 0) {
      return [];
    }
    return this.productRepository.getProductsForCart(productIds);
  }

  private mapToProductSummary(products: ProductEntity[]): ProductSummary[] {
    return products.map((product) => {
      // Extract prices from variants - find minimum price
      let minPrice = Infinity;
      let minOriginalPrice: number | undefined;
      let maxDiscount = 0;
      const sizesSet = new Set<string>();
      const colorsMap: Record<string, { name: string; stock?: number; discount?: number }> = {};

      // Process variants to extract price, discount, sizes, and colors
      if (product.variants) {
        Object.entries(product.variants).forEach(([colorName, sizeVariants]) => {
          // Find color info from colors array
          const colorInfo = product.colors?.find(
            (c) => c.name.toLowerCase() === colorName.toLowerCase() || c.name === colorName,
          );

          if (colorInfo) {
            colorsMap[colorName] = {
              name: colorInfo.name,
            };
          }

          Object.entries(sizeVariants).forEach(([size, variant]) => {
            sizesSet.add(size);

            if (variant.price < minPrice) {
              minPrice = variant.price;
              minOriginalPrice = variant.original_price;
            }

            if (variant.discount > maxDiscount) {
              maxDiscount = variant.discount;
            }
          });
        });
      }

      // Get first category name or default
      const categoryName = product.categories?.[0]?.name || 'همه';

      return {
        id: product.id,
        slug: product.slug,
        name: product.title, // Map title to name
        price: minPrice !== Infinity ? minPrice : 0,
        originalPrice: minOriginalPrice,
        discount: maxDiscount,
        rating: product.rating || 0,
        reviewCount: 0, // Not available in new API structure
        image: product.thumbnail, // Map thumbnail to image
        category: categoryName,
        isNew: product.is_new || false,
        isFeatured: product.is_featured || false,
        colors: colorsMap,
        sizes: Array.from(sizesSet),
        brand: product.brand || '',
        description: product.description || '',
        tags: product.tags || [],
      };
    });
  }
}
