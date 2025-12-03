'use server';

import { revalidatePath, revalidateTag } from 'next/cache';
import { createOrderSchema, orderFilterSchema } from '@/lib/validation/schemas/order.schema';
import type { CreateOrderInput, OrderFilterInput } from '@/lib/validation/dto/request';
import { ValidatorFactory } from '@/lib/validation/validators/validator.factory';

/**
 * Server Actions for Orders
 */

/**
 * Create a new order
 */
export async function createOrder(input: CreateOrderInput) {
  try {
    // Validate input
    const validator = ValidatorFactory.createValidatorWithMessages(createOrderSchema);
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
    const response = await fetch(`${baseUrl}/api/v1/orders`, {
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
        error: errorData.error?.message || 'Failed to create order',
      };
    }

    const data = await response.json();

    // Revalidate order pages
    revalidatePath('/orders');
    revalidatePath('/cart');
    revalidateTag('orders');

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
 * Get filtered orders (server-side)
 */
export async function getFilteredOrders(filters: OrderFilterInput) {
  try {
    // Validate filters
    const validator = ValidatorFactory.createSafeValidator(orderFilterSchema);
    const validationResult = validator(filters);

    if (!validationResult.success) {
      return {
        success: false,
        error: 'Invalid filter parameters',
      };
    }

    const validatedFilters = validationResult.data;

    // Build query string
    const params = new URLSearchParams();
    if (validatedFilters.status) params.set('status', validatedFilters.status);
    if (validatedFilters.page) params.set('page', String(validatedFilters.page));
    if (validatedFilters.limit) params.set('limit', String(validatedFilters.limit));

    const baseUrl = process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
    const response = await fetch(`${baseUrl}/api/v1/orders?${params.toString()}`, {
      next: {
        revalidate: 60, // 1 minute
        tags: ['orders'],
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        error: errorData.error?.message || 'Failed to fetch orders',
      };
    }

    const data = await response.json();

    return {
      success: true,
      data: data.data,
      total: data.total,
      page: data.page,
      pages: data.pages,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An error occurred',
    };
  }
}

