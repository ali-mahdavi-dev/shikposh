import { z } from 'zod';
import { idSchema, slugSchema } from './common.schema';

/**
 * Product validation schemas
 */

// Product variant schema
export const productVariantSchema = z.object({
  colorId: idSchema,
  sizeId: idSchema.optional(),
  stock: z.number().int().nonnegative(),
  price: z.number().int().nonnegative().optional(),
  discount: z.number().int().min(0).max(100).optional(),
});

// Product image schema
export const productImageSchema = z.object({
  colorId: idSchema.optional(),
  urls: z.array(z.string().url()).min(1),
});

// Product spec schema
export const productSpecSchema = z.object({
  key: z.string().min(1),
  value: z.string().min(1),
});

// Product create schema
export const createProductSchema = z.object({
  title: z.string().min(3, { message: 'عنوان باید حداقل 3 کاراکتر باشد' }),
  slug: slugSchema,
  brand: z.string().min(2, { message: 'برند باید حداقل 2 کاراکتر باشد' }),
  description: z.string().min(10).optional(),
  shortDescription: z.string().max(500).optional(),
  thumbnail: z.string().url({ message: 'آدرس تصویر شاخص معتبر نیست' }),
  categories: z.array(idSchema).min(1, { message: 'حداقل یک دسته‌بندی انتخاب کنید' }),
  discount: z.number().int().min(0).max(100).default(0),
  stock: z.number().int().nonnegative().default(0),
  originPrice: z.number().int().nonnegative().optional(),
  price: z.number().int().nonnegative({ message: 'قیمت باید عدد مثبت باشد' }),
  isNew: z.boolean().default(false),
  isFeatured: z.boolean().default(false),
  colors: z.array(idSchema).optional(),
  sizes: z.array(idSchema).optional(),
  variants: z.array(productVariantSchema).optional(),
  tags: z.array(z.string()).optional(),
  features: z.array(z.string()).optional(),
  specs: z.array(productSpecSchema).optional(),
  images: z.array(productImageSchema).optional(),
});

export type CreateProductInput = z.infer<typeof createProductSchema>;

// Product update schema (all fields optional except id)
export const updateProductSchema = createProductSchema.partial().extend({
  id: idSchema,
});

export type UpdateProductInput = z.infer<typeof updateProductSchema>;

// Product filter schema
export const productFilterSchema = z.object({
  q: z.string().optional(),
  category: z.string().optional(),
  min: z.number().nonnegative().optional(),
  max: z.number().positive().optional(),
  rating: z.number().min(0).max(5).optional(),
  featured: z.boolean().optional(),
  tags: z.array(z.string()).optional(),
  sort: z.string().optional(),
  page: z.number().int().positive().optional(),
  limit: z.number().int().positive().max(100).optional(),
});

export type ProductFilterInput = z.infer<typeof productFilterSchema>;
