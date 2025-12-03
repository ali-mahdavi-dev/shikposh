import { z } from 'zod';
import type { ZodSchema } from 'zod';

/**
 * Validator Factory - Creates validators from Zod schemas
 */

export class ValidatorFactory {
  /**
   * Create a validator function from a Zod schema
   */
  static createValidator<T extends ZodSchema>(schema: T) {
    return (data: unknown): z.infer<T> => {
      return schema.parse(data);
    };
  }

  /**
   * Create a safe validator that returns a result instead of throwing
   */
  static createSafeValidator<T extends ZodSchema>(schema: T) {
    return (data: unknown): { success: true; data: z.infer<T> } | { success: false; error: z.ZodError } => {
      const result = schema.safeParse(data);
      if (result.success) {
        return { success: true, data: result.data };
      }
      return { success: false, error: result.error };
    };
  }

  /**
   * Create a validator that returns formatted error messages
   */
  static createValidatorWithMessages<T extends ZodSchema>(schema: T) {
    return (data: unknown): { success: true; data: z.infer<T> } | { success: false; errors: string[] } => {
      const result = schema.safeParse(data);
      if (result.success) {
        return { success: true, data: result.data };
      }

      const errors = result.error.errors.map((err) => {
        const path = err.path.join('.');
        return path ? `${path}: ${err.message}` : err.message;
      });

      return { success: false, errors };
    };
  }
}
