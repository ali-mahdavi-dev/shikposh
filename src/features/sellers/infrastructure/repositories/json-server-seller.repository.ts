import { SellerRepository } from '../../domain/repositories/seller.repository';
import { SellerEntity, SellerSummary } from '../../domain/entities/seller.entity';
import { getApiBaseUrl } from '../../../../shared/config/env';

export class JsonServerSellerRepository implements SellerRepository {
  private baseUrl = getApiBaseUrl();

  async getSellerById(id: string): Promise<SellerEntity> {
    const response = await fetch(`${this.baseUrl}/sellers/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch seller: ${response.statusText}`);
    }
    return response.json();
  }

  async getAllSellers(): Promise<SellerSummary[]> {
    const response = await fetch(`${this.baseUrl}/sellers`);
    if (!response.ok) {
      throw new Error(`Failed to fetch sellers: ${response.statusText}`);
    }
    return response.json();
  }

  async getSellersByCategory(category: string): Promise<SellerSummary[]> {
    const response = await fetch(`${this.baseUrl}/sellers?categories_like=${category}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch sellers by category: ${response.statusText}`);
    }
    return response.json();
  }

  async searchSellers(query: string): Promise<SellerSummary[]> {
    const response = await fetch(`${this.baseUrl}/sellers?q=${encodeURIComponent(query)}`);
    if (!response.ok) {
      throw new Error(`Failed to search sellers: ${response.statusText}`);
    }
    return response.json();
  }

  async getSellerByProductId(productId: string): Promise<SellerEntity> {
    // First get the product to find seller ID
    const productResponse = await fetch(`${this.baseUrl}/products/${productId}`);
    if (!productResponse.ok) {
      throw new Error(`Failed to fetch product: ${productResponse.statusText}`);
    }
    const product = await productResponse.json();

    // Then get the seller
    return this.getSellerById(product.sellerId);
  }
}
