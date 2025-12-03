import { AppError } from '@/lib/errors/base/app.error';
import {
  loginRequestSchema,
  verifyOtpRequestSchema,
  registerRequestSchema,
} from '@/lib/validation/schemas/auth.schema';
import { ValidatorFactory } from '@/lib/validation/validators/validator.factory';
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
    // Use enterprise validation with Zod
    const validator = ValidatorFactory.createValidatorWithMessages(loginRequestSchema);
    const validationResult = validator({ phone: request.phone });

    if (!validationResult.success) {
      throw AppError.validation(validationResult.errors.join('; '));
    }

    return await this.authRepository.sendOtp(request);
  }

  async verifyOtp(request: VerifyOtpRequest): Promise<VerifyOtpResponse> {
    // Use enterprise validation with Zod
    const validator = ValidatorFactory.createValidatorWithMessages(verifyOtpRequestSchema);
    // Map request to schema format (otp -> code)
    const validationResult = validator({
      phone: request.phone,
      code: request.otp,
    });

    if (!validationResult.success) {
      throw AppError.validation(validationResult.errors.join('; '));
    }

    // Map validated data back to entity format (code -> otp)
    return await this.authRepository.verifyOtp({
      phone: validationResult.data.phone,
      otp: validationResult.data.code,
    });
  }

  async register(request: RegisterRequest): Promise<RegisterResponse> {
    // Use enterprise validation with Zod
    const validator = ValidatorFactory.createValidatorWithMessages(registerRequestSchema);
    // Convert RegisterRequest to match schema format
    const validationResult = validator({
      phone: request.phone,
      code: '', // OTP is handled separately
      firstName: request.firstName,
      lastName: request.lastName,
      email: request.email || '',
    });

    if (!validationResult.success) {
      throw AppError.validation(validationResult.errors.join('; '));
    }

    return await this.authRepository.register(request);
  }

  async login(request: LoginRequest): Promise<LoginResponse> {
    // Use enterprise validation with Zod
    const validator = ValidatorFactory.createValidatorWithMessages(loginRequestSchema);
    const validationResult = validator(request);

    if (!validationResult.success) {
      throw AppError.validation(validationResult.errors.join('; '));
    }

    return await this.authRepository.login(validationResult.data);
  }

  async logout(): Promise<void> {
    return await this.authRepository.logout();
  }
}
