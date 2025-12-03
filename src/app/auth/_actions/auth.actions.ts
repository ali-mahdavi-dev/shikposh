'use server';

import { revalidatePath } from 'next/cache';
import {
  loginRequestSchema,
  verifyOtpRequestSchema,
  registerRequestSchema,
} from '@/lib/validation/schemas/auth.schema';
import type { LoginRequest, VerifyOtpRequest, RegisterRequest } from '@/lib/validation/dto/request';
import { ValidatorFactory } from '@/lib/validation/validators/validator.factory';

/**
 * Server Actions for Authentication
 */

/**
 * Send OTP for login
 */
export async function sendOtp(input: LoginRequest) {
  try {
    // Validate input
    const validator = ValidatorFactory.createValidatorWithMessages(loginRequestSchema);
    const validationResult = validator(input);

    if (!validationResult.success) {
      return {
        success: false,
        error: validationResult.errors.join('; '),
      };
    }

    const validatedData = validationResult.data;

    // Make API call
    const baseUrl = process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
    const response = await fetch(`${baseUrl}/api/v1/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ phone: validatedData.phone }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        error: errorData.error?.message || 'Failed to send OTP',
      };
    }

    const data = await response.json();

    return {
      success: true,
      data: data.data,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An error occurred',
    };
  }
}

/**
 * Verify OTP
 */
export async function verifyOtp(input: VerifyOtpRequest) {
  try {
    // Validate input
    const validator = ValidatorFactory.createValidatorWithMessages(verifyOtpRequestSchema);
    const validationResult = validator(input);

    if (!validationResult.success) {
      return {
        success: false,
        error: validationResult.errors.join('; '),
      };
    }

    const validatedData = validationResult.data;

    // Make API call
    const baseUrl = process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
    const response = await fetch(`${baseUrl}/api/v1/auth/verify-otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phone: validatedData.phone,
        code: validatedData.code,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        error: errorData.error?.message || 'Invalid OTP',
      };
    }

    const data = await response.json();

    // Revalidate user-dependent pages
    revalidatePath('/profile');
    revalidatePath('/cart');
    revalidatePath('/wishlist');

    return {
      success: true,
      data: data.data,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An error occurred',
    };
  }
}

/**
 * Register new user
 */
export async function register(input: RegisterRequest) {
  try {
    // Validate input
    const validator = ValidatorFactory.createValidatorWithMessages(registerRequestSchema);
    const validationResult = validator(input);

    if (!validationResult.success) {
      return {
        success: false,
        error: validationResult.errors.join('; '),
      };
    }

    const validatedData = validationResult.data;

    // Make API call
    const baseUrl = process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
    const response = await fetch(`${baseUrl}/api/v1/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(validatedData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        error: errorData.error?.message || 'Failed to register',
      };
    }

    const data = await response.json();

    // Revalidate user-dependent pages
    revalidatePath('/profile');
    revalidatePath('/cart');
    revalidatePath('/wishlist');

    return {
      success: true,
      data: data.data,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An error occurred',
    };
  }
}

/**
 * Logout
 */
export async function logout() {
  try {
    // Revalidate user-dependent pages
    revalidatePath('/profile');
    revalidatePath('/cart');
    revalidatePath('/wishlist');
    revalidatePath('/');

    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An error occurred',
    };
  }
}

