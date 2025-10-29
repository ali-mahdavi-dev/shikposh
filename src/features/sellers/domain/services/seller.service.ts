import { SellerRepository } from '../repositories/seller.repository';
import { SellerEntity, SellerSummary } from '../entities/seller.entity';

export class SellerService {
  constructor(private sellerRepository: SellerRepository) {}

  async getSellerById(id: string): Promise<SellerEntity> {
    return this.sellerRepository.getSellerById(id);
  }

  async getAllSellers(): Promise<SellerSummary[]> {
    return this.sellerRepository.getAllSellers();
  }

  async getSellersByCategory(category: string): Promise<SellerSummary[]> {
    return this.sellerRepository.getSellersByCategory(category);
  }

  async searchSellers(query: string): Promise<SellerSummary[]> {
    return this.sellerRepository.searchSellers(query);
  }

  async getSellerByProductId(productId: string): Promise<SellerEntity> {
    return this.sellerRepository.getSellerByProductId(productId);
  }
}
