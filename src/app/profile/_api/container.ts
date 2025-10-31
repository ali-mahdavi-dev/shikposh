import { ContentService } from './service';
import { HttpContentRepository } from './repository';

export class ContentContainer {
  private static repository: HttpContentRepository;
  private static service: ContentService;

  static getRepository(): HttpContentRepository {
    if (!this.repository) {
      this.repository = new HttpContentRepository();
    }
    return this.repository;
  }

  static getService(): ContentService {
    if (!this.service) {
      this.service = new ContentService(this.getRepository());
    }
    return this.service;
  }
}
