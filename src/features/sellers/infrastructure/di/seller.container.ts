import { SellerService } from '../../domain/services/seller.service';
import { HttpSellerRepository } from '../repositories/http-seller.repository';

export class SellerContainer {
  private static sellerService: SellerService;

  static getSellerService(): SellerService {
    if (!this.sellerService) {
      const sellerRepository = new HttpSellerRepository();
      this.sellerService = new SellerService(sellerRepository);
    }
    return this.sellerService;
  }
}
