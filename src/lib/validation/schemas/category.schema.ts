import { z } from 'zod';
import { idSchema, slugSchema } from './common.schema';

/**
 * Category validation schemas
 */

// Create category schema
export const createCategorySchema = z.object({
  name: z.string().min(2, { message: 'نام دسته‌بندی باید حداقل 2 کاراکتر باشد' }),
  slug: slugSchema,
  description: z.string().optional(),
  parentId: idSchema.optional(),
  image: z.string().url().optional(),
  order: z.number().int().nonnegative().default(0),
});

export type CreateCategoryInput = z.infer<typeof createCategorySchema>;

// Update category schema
export const updateCategorySchema = createCategorySchema.partial().extend({
  id: idSchema,
});

export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>;
