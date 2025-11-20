import type { AuthRepository } from './repository';
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

export class AuthService {
  constructor(private authRepository: AuthRepository) {}

  async sendOtp(request: SendOtpRequest): Promise<SendOtpResponse> {
    if (!request.phone || !request.phone.trim()) {
      throw new Error('شماره تلفن الزامی است');
    }

    // Validate phone number format (Iranian phone numbers)
    const phoneRegex = /^09\d{9}$/;
    if (!phoneRegex.test(request.phone)) {
      throw new Error('شماره تلفن معتبر نیست. فرمت صحیح: 09123456789');
    }

    return this.authRepository.sendOtp(request);
  }

  async verifyOtp(request: VerifyOtpRequest): Promise<VerifyOtpResponse> {
    if (!request.phone || !request.phone.trim()) {
      throw new Error('شماره تلفن الزامی است');
    }

    if (!request.otp || !request.otp.trim()) {
      throw new Error('کد OTP الزامی است');
    }

    // Validate OTP format (6 digits)
    const otpRegex = /^\d{6}$/;
    if (!otpRegex.test(request.otp)) {
      throw new Error('کد OTP باید 6 رقم باشد');
    }

    return this.authRepository.verifyOtp(request);
  }

  async register(request: RegisterRequest): Promise<RegisterResponse> {
    if (!request.phone || !request.phone.trim()) {
      throw new Error('شماره تلفن الزامی است');
    }

    if (!request.firstName || !request.firstName.trim()) {
      throw new Error('نام الزامی است');
    }

    if (!request.lastName || !request.lastName.trim()) {
      throw new Error('نام خانوادگی الزامی است');
    }

    if (request.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(request.email)) {
      throw new Error('ایمیل معتبر نیست');
    }

    return this.authRepository.register(request);
  }

  async login(request: LoginRequest): Promise<LoginResponse> {
    if (!request.phone || !request.phone.trim()) {
      throw new Error('شماره تلفن الزامی است');
    }

    return this.authRepository.login(request);
  }

  async logout(): Promise<void> {
    return this.authRepository.logout();
  }

  async getCurrentUser(): Promise<any> {
    return this.authRepository.getCurrentUser();
  }
}
