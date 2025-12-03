import { BaseContainer } from '@/lib/api/container-base';
import { AuthService } from './service';
import { HttpAuthRepository, type AuthRepository } from './repository';

export class AuthContainer extends BaseContainer<AuthRepository, AuthService> {
  protected createRepository(): AuthRepository {
    return new HttpAuthRepository();
  }

  protected createService(repository: AuthRepository): AuthService {
    return new AuthService(repository);
  }
}

// Export singleton instance
export const authContainer = new AuthContainer();
