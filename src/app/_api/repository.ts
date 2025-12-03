import { ServerFetchAdapter, type ServerRequestConfig } from '@/lib/api/adapters/server-fetch.adapter';
import type { IHttpAdapter } from '@/lib/api/adapters/http.adapter';
import type { ProductEntity } from './entities';

export interface HomeRepository {
  getDiscountedProducts(limit?: number): Promise<ProductEntity[]>;
  getBestSellingProducts(limit?: number): Promise<ProductEntity[]>;
  getNewArrivals(limit?: number): Promise<ProductEntity[]>;
}

export class HttpHomeRepository implements HomeRepository {
  private httpAdapter: ServerFetchAdapter;

  constructor(httpAdapter?: IHttpAdapter) {
    // Use provided adapter or create a new ServerFetchAdapter for server-side requests
    this.httpAdapter = (httpAdapter as ServerFetchAdapter) || new ServerFetchAdapter();
  }

  async getDiscountedProducts(limit: number = 12): Promise<ProductEntity[]> {
    const params = {
      sort: 'discount_desc',
      limit: String(limit),
    };

    const config: ServerRequestConfig = {
      params,
      tags: ['products', 'discounted'],
      revalidate: 3600, // 1 hour
    };

    const products = await this.httpAdapter.get<ProductEntity[]>(
      '/api/v1/public/products',
      config,
    );

    return products || [];
  }

  async getBestSellingProducts(limit: number = 12): Promise<ProductEntity[]> {
    const params = {
      sort: 'rating',
      limit: String(limit),
    };

    const config: ServerRequestConfig = {
      params,
      tags: ['products', 'bestselling'],
      revalidate: 3600, // 1 hour
    };

    const products = await this.httpAdapter.get<ProductEntity[]>(
      '/api/v1/public/products',
      config,
    );

    return products || [];
  }

  async getNewArrivals(limit: number = 12): Promise<ProductEntity[]> {
    const params = {
      sort: 'newest',
      limit: String(limit),
    };

    const config: ServerRequestConfig = {
      params,
      tags: ['products', 'new-arrivals'],
      revalidate: 3600, // 1 hour
    };

    const products = await this.httpAdapter.get<ProductEntity[]>(
      '/api/v1/public/products',
      config,
    );

    return products || [];
  }
}

