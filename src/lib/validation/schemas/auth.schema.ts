import { z } from 'zod';

/**
 * Authentication validation schemas
 */

// Phone number schema (Iranian format)
export const phoneSchema = z
  .string()
  .regex(/^09\d{9}$/, {
    message: 'شماره موبایل باید با 09 شروع شود و 11 رقم باشد',
  })
  .length(11, {
    message: 'شماره موبایل باید 11 رقم باشد',
  });

// OTP schema
export const otpSchema = z
  .string()
  .length(6, {
    message: 'کد تایید باید 6 رقم باشد',
  })
  .regex(/^\d+$/, {
    message: 'کد تایید باید فقط شامل اعداد باشد',
  });

// Login request schema
export const loginRequestSchema = z.object({
  phone: phoneSchema,
});

export type LoginRequest = z.infer<typeof loginRequestSchema>;

// Verify OTP request schema
export const verifyOtpRequestSchema = z.object({
  phone: phoneSchema,
  code: otpSchema,
});

export type VerifyOtpRequest = z.infer<typeof verifyOtpRequestSchema>;

// Register request schema
export const registerRequestSchema = z.object({
  phone: phoneSchema,
  code: otpSchema,
  firstName: z.string().min(2, { message: 'نام باید حداقل 2 کاراکتر باشد' }),
  lastName: z.string().min(2, { message: 'نام خانوادگی باید حداقل 2 کاراکتر باشد' }),
  email: z.string().email({ message: 'ایمیل معتبر نیست' }).optional().or(z.literal('')),
});

export type RegisterRequest = z.infer<typeof registerRequestSchema>;

// Refresh token request schema
export const refreshTokenRequestSchema = z.object({
  refreshToken: z.string().min(1, { message: 'Refresh token is required' }),
});

export type RefreshTokenRequest = z.infer<typeof refreshTokenRequestSchema>;
