import { SellerRepository } from '../../domain/repositories/seller.repository';
import { SellerEntity, SellerSummary } from '../../domain/entities/seller.entity';
import { apiService } from '@/shared/services/api.service';

export class HttpSellerRepository implements SellerRepository {
  async getSellerById(id: string): Promise<SellerEntity> {
    return apiService.get<SellerEntity>(`/sellers/${id}`);
  }

  async getAllSellers(): Promise<SellerSummary[]> {
    return apiService.get<SellerSummary[]>('/sellers');
  }

  async getSellersByCategory(category: string): Promise<SellerSummary[]> {
    return apiService.get<SellerSummary[]>(`/sellers`, { categories_like: category });
  }

  async searchSellers(query: string): Promise<SellerSummary[]> {
    return apiService.get<SellerSummary[]>(`/sellers`, { q: query });
  }

  async getSellerByProductId(productId: string): Promise<SellerEntity> {
    const product = await apiService.get<{ sellerId: string }>(`/products/${productId}`);
    return this.getSellerById(product.sellerId);
  }
}


