import { AuthService } from './service';
import { HttpAuthRepository } from './repository';

class AuthContainerClass {
  private authRepository: HttpAuthRepository | null = null;
  private authService: AuthService | null = null;

  getAuthRepository(): HttpAuthRepository {
    if (!this.authRepository) {
      this.authRepository = new HttpAuthRepository();
    }
    return this.authRepository;
  }

  getAuthService(): AuthService {
    if (!this.authService) {
      this.authService = new AuthService(this.getAuthRepository());
    }
    return this.authService;
  }
}

export const AuthContainer = new AuthContainerClass();
