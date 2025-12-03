import { ServerBaseRepository } from '@/lib/api/repositories/server-base.repository';
import {
  ServerFetchAdapter,
  type ServerRequestConfig,
} from '@/lib/api/adapters/server-fetch.adapter';
import type { IHttpAdapter } from '@/lib/api/adapters/http.adapter';
import type { ProductEntity, ProductSummary, CategoryEntity } from './entities';

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
  getCategoryBySlug(slug: string): Promise<CategoryEntity>;
  getProductsForCart(productIds: string[]): Promise<CartProduct[]>;
  getMostDiscountedProducts(limit?: number): Promise<ProductSummary[]>;
  getBestSellingProducts(limit?: number): Promise<ProductSummary[]>;
  getNewArrivals(limit?: number): Promise<ProductSummary[]>;
}

export class HttpProductRepository
  extends ServerBaseRepository<ProductEntity, string>
  implements ProductRepository
{
  constructor(httpAdapter?: IHttpAdapter) {
    // Initialize base repository with adapter and base path
    super(httpAdapter, '/api/v1/public/products');
  }

  async getAllProducts(): Promise<ProductEntity[]> {
    const config: ServerRequestConfig = {
      tags: ['products'],
      revalidate: 3600, // 1 hour
    };
    return await this.findAll(config);
  }

  async getProductById(id: string): Promise<ProductEntity> {
    // id is actually slug in our system
    const config: ServerRequestConfig = {
      tags: ['products', id],
      revalidate: 3600, // 1 hour
    };
    const product = await this.findById(id, config);
    if (!product) {
      throw new Error(`Product with id ${id} not found`);
    }
    return product;
  }

  async getFeaturedProducts(): Promise<ProductSummary[]> {
    const config: ServerRequestConfig = {
      tags: ['products', 'featured'],
      revalidate: 3600, // 1 hour
    };
    const products = await this.getFromEndpoint<ProductEntity[]>('featured', config);
    return this.mapToProductSummary(products);
  }

  async getProductsByCategory(category: string): Promise<ProductSummary[]> {
    const config: ServerRequestConfig = {
      tags: ['products', 'category', category],
      revalidate: 3600, // 1 hour
    };
    const products = await (this.httpAdapter as ServerFetchAdapter).get<ProductEntity[]>(
      `${this.basePath}/category/${category}`,
      config,
    );
    return this.mapToProductSummary(products);
  }

  async searchProducts(query: string): Promise<ProductSummary[]> {
    if (!query.trim()) {
      return [];
    }
    const config: ServerRequestConfig = {
      params: {
        q: query.trim(),
      },
      tags: ['products', 'search'],
      revalidate: 300, // 5 minutes for search results
    };
    const products = await this.findAll(config);
    return this.mapToProductSummary(products);
  }

  async getFilteredProducts(filters: ProductFilters): Promise<ProductSummary[]> {
    const params: Record<string, string> = {};
    if (filters.q) params.q = filters.q;
    if (filters.category && filters.category !== 'all') params.category = filters.category;
    if (filters.min !== undefined && filters.min > 0) params.min = String(filters.min);
    if (filters.max !== undefined && filters.max < 10_000_000) params.max = String(filters.max);
    if (filters.rating !== undefined && filters.rating > 0) params.rating = String(filters.rating);
    if (filters.featured) params.featured = 'true';
    if (filters.tags && filters.tags.length > 0) params.tags = filters.tags.join(',');
    if (filters.sort && filters.sort !== 'relevance') params.sort = filters.sort;

    const config: ServerRequestConfig = {
      params,
      tags: ['products', 'filtered'],
      revalidate: 300, // 5 minutes for filtered results
    };

    const products = await this.findAll(config);
    return this.mapToProductSummary(products);
  }

  async getAllCategories(): Promise<CategoryEntity[]> {
    const config: ServerRequestConfig = {
      tags: ['categories'],
      revalidate: 3600 * 24, // 24 hours - categories don't change often
    };
    const categories = await (this.httpAdapter as ServerFetchAdapter).get<CategoryEntity[]>(
      '/api/v1/public/categories',
      config,
    );
    // Ensure all IDs are strings and map parent_id correctly
    return categories.map((category) => ({
      ...category,
      id: String(category.id),
      parentId: category.parentId ? String(category.parentId) : undefined,
    }));
  }

  async getCategoryBySlug(slug: string): Promise<CategoryEntity> {
    const config: ServerRequestConfig = {
      tags: ['categories', slug],
      revalidate: 3600 * 24, // 24 hours
    };
    const category = await (this.httpAdapter as ServerFetchAdapter).get<CategoryEntity>(
      `/api/v1/public/categories/${slug}`,
      config,
    );
    // Ensure ID is string and map parent_id correctly
    return {
      ...category,
      id: String(category.id),
      parentId: category.parentId ? String(category.parentId) : undefined,
    };
  }

  async getProductsForCart(productIds: string[]): Promise<CartProduct[]> {
    if (productIds.length === 0) {
      return [];
    }
    const config: ServerRequestConfig = {
      tags: ['products', 'cart'],
      revalidate: 60, // 1 minute - cart data changes frequently
    };
    return await (this.httpAdapter as ServerFetchAdapter).post<CartProduct[]>(
      `${this.basePath}/cart`,
      productIds,
      config,
    );
  }

  async getMostDiscountedProducts(limit: number = 12): Promise<ProductSummary[]> {
    const config: ServerRequestConfig = {
      params: {
        sort: 'discount_desc',
        limit: String(limit),
      },
      tags: ['products', 'discounted'],
      revalidate: 3600, // 1 hour
    };
    const products = await this.findAll(config);
    return this.mapToProductSummary(products);
  }

  async getBestSellingProducts(limit: number = 12): Promise<ProductSummary[]> {
    const config: ServerRequestConfig = {
      params: {
        sort: 'rating',
        limit: String(limit),
      },
      tags: ['products', 'bestselling'],
      revalidate: 3600, // 1 hour
    };
    const products = await this.findAll(config);
    return this.mapToProductSummary(products);
  }

  async getNewArrivals(limit: number = 12): Promise<ProductSummary[]> {
    const config: ServerRequestConfig = {
      params: {
        sort: 'newest',
        limit: String(limit),
      },
      tags: ['products', 'new-arrivals'],
      revalidate: 3600, // 1 hour
    };
    const products = await this.findAll(config);
    return this.mapToProductSummary(products);
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
        origin_price: product.origin_price,
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
