import { z } from 'zod';

/**
 * Common validation schemas used across the application
 */

// Pagination schema
export const paginationSchema = z.object({
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().max(100).default(20),
  skip: z.number().int().nonnegative().optional(),
});

export type PaginationInput = z.infer<typeof paginationSchema>;

// Sort schema
export const sortSchema = z.object({
  field: z.string().min(1),
  order: z.enum(['asc', 'desc']).default('desc'),
});

export type SortInput = z.infer<typeof sortSchema>;

// Filter schema
export const filterSchema = z.object({
  q: z.string().optional(),
  min: z.number().nonnegative().optional(),
  max: z.number().positive().optional(),
  rating: z.number().min(0).max(5).optional(),
  featured: z.boolean().optional(),
  tags: z.array(z.string()).optional(),
  sort: z.string().optional(),
});

export type FilterInput = z.infer<typeof filterSchema>;

// ID schema
export const idSchema = z.union([z.string().min(1), z.number().int().positive()]);

export type IdInput = z.infer<typeof idSchema>;

// Slug schema
export const slugSchema = z
  .string()
  .min(1)
  .regex(/^[a-z0-9-]+$/i, {
    message: 'Slug must contain only letters, numbers, and hyphens',
  });

export type SlugInput = z.infer<typeof slugSchema>;
