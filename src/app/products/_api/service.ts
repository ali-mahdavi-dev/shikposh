import type { ProductRepository, ProductFilters } from './repository';
import type { ProductEntity, ProductSummary, CategoryEntity } from './entities';
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

  async getProductsForCart(productIds: string[]): Promise<CartProduct[]> {
    if (!productIds || productIds.length === 0) {
      return [];
    }
    return this.productRepository.getProductsForCart(productIds);
  }

  private mapToProductSummary(products: ProductEntity[]): ProductSummary[] {
    return products.map((product) => {
      // Build colors map from colors array
      const colorsMap: Record<string, { name: string; stock?: number; discount?: number }> = {};
      if (product.colors) {
        product.colors.forEach((color) => {
          colorsMap[color.id.toString()] = {
            name: color.name,
          };
        });
      }

      // Get first category name or default
      const categoryName = product.categories?.[0]?.name || 'همه';

      // Get first image from images object (first color's images) or use thumbnail
      let firstImage = product.thumbnail;
      if (product.images && Object.keys(product.images).length > 0) {
        const firstColorId = Object.keys(product.images)[0];
        const firstColorImages = product.images[firstColorId];
        if (firstColorImages && firstColorImages.length > 0) {
          firstImage = firstColorImages[0];
        }
      }

      return {
        id: product.id,
        slug: product.slug,
        name: product.title,
        price: product.price || 0,
        originalPrice: product.original_price,
        discount: product.discount || 0,
        rating: product.rating || 0,
        reviewCount: 0, // Not available in new API structure
        image: firstImage,
        category: categoryName,
        isNew: product.is_new || false,
        isFeatured: product.is_featured || false,
        colors: colorsMap,
        sizes: product.sizes?.map((s) => s.name) || [],
        brand: product.brand || '',
        description: product.description || '',
        tags: product.tags || [],
      };
    });
  }
}
