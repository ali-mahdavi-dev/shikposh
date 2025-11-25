import { apiService, PaginatedResponse } from '@/shared/services/api.service';
import type {
  ProductEntity,
  ProductSummary,
  CategoryEntity,
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
  slug: string;
}

export interface ProductRepository {
  getAllProducts(): Promise<ProductEntity[]>;
  getProductById(id: string): Promise<ProductEntity>;
  getFeaturedProducts(): Promise<ProductSummary[]>;
  getProductsByCategory(category: string): Promise<ProductSummary[]>;
  searchProducts(query: string): Promise<ProductSummary[]>;
  getFilteredProducts(filters: ProductFilters): Promise<ProductSummary[]>;
  getAllCategories(): Promise<CategoryEntity[]>;
  getProductsForCart(productIds: string[]): Promise<CartProduct[]>;
}

export class HttpProductRepository implements ProductRepository {
  async getAllProducts(): Promise<ProductEntity[]> {
    return apiService.get<ProductEntity[]>('/api/v1/public/products');
  }

  async getProductById(id: string): Promise<ProductEntity> {
    // id is actually slug in our system
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

  async getProductsForCart(productIds: string[]): Promise<CartProduct[]> {
    if (productIds.length === 0) {
      return [];
    }
    return apiService.post<CartProduct[]>('/api/v1/public/products/cart', productIds);
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
        sizes: [], // Sizes are no longer in the new structure
        brand: product.brand || '',
        description: product.description || '',
        tags: product.tags || [],
      };
    });
  }
}
