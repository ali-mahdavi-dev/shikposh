import { apiService } from '@/shared/services/api.service';
import type {
  SendOtpRequest,
  SendOtpResponse,
  VerifyOtpRequest,
  VerifyOtpResponse,
  RegisterRequest,
  RegisterResponse,
  LoginRequest,
  LoginResponse,
} from './entities';

export interface AuthRepository {
  sendOtp(request: SendOtpRequest): Promise<SendOtpResponse>;
  verifyOtp(request: VerifyOtpRequest): Promise<VerifyOtpResponse>;
  register(request: RegisterRequest): Promise<RegisterResponse>;
  login(request: LoginRequest): Promise<LoginResponse>;
  logout(): Promise<void>;
  getCurrentUser(): Promise<any>;
}

export class HttpAuthRepository implements AuthRepository {
  async sendOtp(request: SendOtpRequest): Promise<SendOtpResponse> {
    return apiService.post<SendOtpResponse>('/api/v1/public/auth/send-otp', request);
  }

  async verifyOtp(request: VerifyOtpRequest): Promise<VerifyOtpResponse> {
    return apiService.post<VerifyOtpResponse>('/api/v1/public/auth/verify-otp', request);
  }

  async register(request: RegisterRequest): Promise<RegisterResponse> {
    return apiService.post<RegisterResponse>('/api/v1/public/register', request);
  }

  async login(request: LoginRequest): Promise<LoginResponse> {
    return apiService.post<LoginResponse>('/api/v1/public/auth/login', request);
  }

  async logout(): Promise<void> {
    return apiService.post<void>('/api/v1/public/logout');
  }

  async getCurrentUser(): Promise<any> {
    return apiService.get<any>('/api/v1/user/profile');
  }
}
