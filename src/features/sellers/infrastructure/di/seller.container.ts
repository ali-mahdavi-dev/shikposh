import { SellerService } from '../../domain/services/seller.service';
import { JsonServerSellerRepository } from '../repositories/json-server-seller.repository';

export class SellerContainer {
  private static sellerService: SellerService;

  static getSellerService(): SellerService {
    if (!this.sellerService) {
      const sellerRepository = new JsonServerSellerRepository();
      this.sellerService = new SellerService(sellerRepository);
    }
    return this.sellerService;
  }
}
