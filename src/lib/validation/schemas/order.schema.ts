import { z } from 'zod';
import { idSchema } from './common.schema';

/**
 * Order validation schemas
 */

// Order item schema
export const orderItemSchema = z.object({
  productId: idSchema,
  variantId: idSchema.optional(),
  quantity: z.number().int().positive({ message: 'تعداد باید عدد مثبت باشد' }),
  price: z.number().int().nonnegative({ message: 'قیمت باید عدد مثبت باشد' }),
});

// Create order schema
export const createOrderSchema = z.object({
  items: z
    .array(orderItemSchema)
    .min(1, { message: 'حداقل یک محصول باید در سبد خرید باشد' }),
  paymentMethod: z.enum(['zarinpal', 'cash'], {
    errorMap: () => ({ message: 'روش پرداخت معتبر نیست' }),
  }),
  shippingAddress: z
    .object({
      province: z.string().min(1, { message: 'استان الزامی است' }),
      city: z.string().min(1, { message: 'شهر الزامی است' }),
      address: z.string().min(10, { message: 'آدرس باید حداقل 10 کاراکتر باشد' }),
      postalCode: z
        .string()
        .regex(/^\d{10}$/, { message: 'کد پستی باید 10 رقم باشد' }),
      receiverName: z.string().min(2, { message: 'نام گیرنده الزامی است' }),
      receiverPhone: z
        .string()
        .regex(/^09\d{9}$/, { message: 'شماره موبایل معتبر نیست' }),
    })
    .optional(),
});

export type CreateOrderInput = z.infer<typeof createOrderSchema>;

// Order filter schema
export const orderFilterSchema = z.object({
  status: z
    .enum(['pending', 'processing', 'shipped', 'delivered', 'cancelled'])
    .optional(),
  page: z.number().int().positive().optional(),
  limit: z.number().int().positive().max(100).optional(),
});

export type OrderFilterInput = z.infer<typeof orderFilterSchema>;
