import { SellerEntity, SellerSummary } from '../entities/seller.entity';

export interface SellerRepository {
  getSellerById(id: string): Promise<SellerEntity>;
  getAllSellers(): Promise<SellerSummary[]>;
  getSellersByCategory(category: string): Promise<SellerSummary[]>;
  searchSellers(query: string): Promise<SellerSummary[]>;
  getSellerByProductId(productId: string): Promise<SellerEntity>;
}
