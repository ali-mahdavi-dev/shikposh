import { apiService } from '@/shared/services/api.service';
import type {
  SendOtpRequest,
  SendOtpResponse,
  SendOtpResponseBackend,
  VerifyOtpRequest,
  VerifyOtpResponse,
  VerifyOtpResponseBackend,
  RegisterRequest,
  RegisterResponse,
  RegisterResponseBackend,
  LoginRequest,
  LoginResponse,
  LoginResponseBackend,
  User,
} from './entities';

export interface AuthRepository {
  sendOtp(request: SendOtpRequest): Promise<SendOtpResponse>;
  verifyOtp(request: VerifyOtpRequest): Promise<VerifyOtpResponse>;
  register(request: RegisterRequest): Promise<RegisterResponse>;
  login(request: LoginRequest): Promise<LoginResponse>;
  logout(): Promise<void>;
}

export class HttpAuthRepository implements AuthRepository {
  async sendOtp(request: SendOtpRequest): Promise<SendOtpResponse> {
    const backendResponse = await apiService.post<SendOtpResponseBackend>(
      '/api/v1/public/auth/send-otp',
      request,
    );
    return {
      success: backendResponse.success,
      message: backendResponse.message,
      expires_in: backendResponse.expires_in,
    };
  }

  async verifyOtp(request: VerifyOtpRequest): Promise<VerifyOtpResponse> {
    const backendResponse = await apiService.post<VerifyOtpResponseBackend>(
      '/api/v1/public/auth/verify-otp',
      request,
    );
    // Debug: Log the full response to see what backend returns
    if (process.env.NODE_ENV === 'development') {
      console.log('🔍 VerifyOtp Backend Response:', JSON.stringify(backendResponse, null, 2));
      if (backendResponse.user) {
        console.log('🔍 User object:', JSON.stringify(backendResponse.user, null, 2));
      }
    }
    return {
      success: backendResponse.success,
      token: backendResponse.token,
      refresh_token: backendResponse.refresh_token,
      user: backendResponse.user as User | undefined,
      message: backendResponse.message,
      user_exists: backendResponse.user_exists,
    };
  }

  async register(request: RegisterRequest): Promise<RegisterResponse> {
    // Convert RegisterRequest to backend format
    // Note: avatarIdentifier stays camelCase, other fields convert to snake_case
    const backendRequest: Record<string, any> = {
      phone: request.phone,
      first_name: request.firstName,
      last_name: request.lastName,
      avatarIdentifier: request.avatarIdentifier, // Keep camelCase
    };

    // Add email only if provided
    if (request.email !== undefined) {
      backendRequest.email = request.email;
    }

    const backendResponse = await apiService.post<RegisterResponseBackend>(
      '/api/v1/public/register',
      backendRequest,
    );
    return {
      success: backendResponse.success,
      message: backendResponse.message,
      token: backendResponse.token,
      refresh_token: backendResponse.refresh_token,
      user: backendResponse.user as User | undefined,
    };
  }

  async login(request: LoginRequest): Promise<LoginResponse> {
    const backendResponse = await apiService.post<LoginResponseBackend>(
      '/api/v1/public/auth/login',
      request,
    );
    return {
      success: backendResponse.success,
      token: backendResponse.token,
      refresh_token: backendResponse.refresh_token,
      message: backendResponse.message,
    };
  }

  async logout(): Promise<void> {
    return await apiService.post<void>('/api/v1/public/logout');
  }
}
