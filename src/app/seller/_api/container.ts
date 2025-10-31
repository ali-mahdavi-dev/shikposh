import { SellerService } from './service';
import { HttpSellerRepository } from './repository';

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
