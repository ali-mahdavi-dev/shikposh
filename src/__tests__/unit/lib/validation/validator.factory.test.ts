/**
 * Unit tests for ValidatorFactory
 */

import { ValidatorFactory } from '@/lib/validation/validators/validator.factory';
import { loginRequestSchema } from '@/lib/validation/schemas/auth.schema';
import { z } from 'zod';

describe('ValidatorFactory', () => {
  describe('createValidator', () => {
    it('should validate correct data', () => {
      const validator = ValidatorFactory.createValidator(loginRequestSchema);
      const result = validator({ phone: '09123456789' });
      expect(result.phone).toBe('09123456789');
    });

    it('should throw on invalid data', () => {
      const validator = ValidatorFactory.createValidator(loginRequestSchema);
      expect(() => validator({ phone: '123' })).toThrow();
    });
  });

  describe('createSafeValidator', () => {
    it('should return success for valid data', () => {
      const validator = ValidatorFactory.createSafeValidator(loginRequestSchema);
      const result = validator({ phone: '09123456789' });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.phone).toBe('09123456789');
      }
    });

    it('should return error for invalid data', () => {
      const validator = ValidatorFactory.createSafeValidator(loginRequestSchema);
      const result = validator({ phone: '123' });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toBeInstanceOf(z.ZodError);
      }
    });
  });

  describe('createValidatorWithMessages', () => {
    it('should return success for valid data', () => {
      const validator = ValidatorFactory.createValidatorWithMessages(loginRequestSchema);
      const result = validator({ phone: '09123456789' });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.phone).toBe('09123456789');
      }
    });

    it('should return formatted error messages', () => {
      const validator = ValidatorFactory.createValidatorWithMessages(loginRequestSchema);
      const result = validator({ phone: '123' });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.errors).toBeInstanceOf(Array);
        expect(result.errors.length).toBeGreaterThan(0);
      }
    });
  });
});

