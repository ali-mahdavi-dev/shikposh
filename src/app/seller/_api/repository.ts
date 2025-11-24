import { apiService } from '@/shared/services/api.service';
import type { SellerEntity, SellerSummary } from './entities';

export interface SellerRepository {
  getSellerById(id: string): Promise<SellerEntity>;
  getAllSellers(): Promise<SellerSummary[]>;
  getSellersByCategory(category: string): Promise<SellerSummary[]>;
  searchSellers(query: string): Promise<SellerSummary[]>;
}

export class HttpSellerRepository implements SellerRepository {
  async getSellerById(id: string): Promise<SellerEntity> {
    return apiService.get<SellerEntity>(`/api/v1/public/sellers/${id}`);
  }

  async getAllSellers(): Promise<SellerSummary[]> {
    return apiService.get<SellerSummary[]>('/api/v1/public/sellers');
  }

  async getSellersByCategory(category: string): Promise<SellerSummary[]> {
    return apiService.get<SellerSummary[]>(`/api/v1/public/sellers`, { categories_like: category });
  }

  async searchSellers(query: string): Promise<SellerSummary[]> {
    return apiService.get<SellerSummary[]>(`/api/v1/public/sellers`, { q: query });
  }
}
