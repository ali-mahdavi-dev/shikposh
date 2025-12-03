/**
 * Response DTOs - Type definitions for API responses
 */

import { z } from 'zod';

// Generic API response wrapper
export const apiResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    success: z.boolean(),
    data: dataSchema.optional(),
    error: z
      .object({
        message: z.string(),
        code: z.string().optional(),
        details: z.any().optional(),
      })
      .optional(),
    total: z.number().int().nonnegative().optional(),
    page: z.number().int().positive().optional(),
    pages: z.number().int().positive().optional(),
  });

export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    code?: string;
    details?: any;
  };
  total?: number;
  page?: number;
  pages?: number;
};
