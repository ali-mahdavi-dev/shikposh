'use server';

import { revalidatePath, revalidateTag } from 'next/cache';
import { serverFetch } from '@/shared/services/server-fetch';
import { createProductSchema, updateProductSchema, productFilterSchema } from '@/lib/validation/schemas/product.schema';
import type { CreateProductInput, UpdateProductInput, ProductFilterInput } from '@/lib/validation/dto/request';
import { ValidatorFactory } from '@/lib/validation/validators/validator.factory';
import { AppError } from '@/lib/errors/base/app.error';
import type { ProductEntity, ProductSummary } from '../_api/entities';

/**
 * Server Actions for Products
 */

/**
 * Create a new product
 */
export async function createProduct(input: CreateProductInput) {
  try {
    // Validate input
    const validator = ValidatorFactory.createValidatorWithMessages(createProductSchema);
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
    const response = await fetch(`${baseUrl}/api/v1/admin/products`, {
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
        error: errorData.error?.message || 'Failed to create product',
      };
    }

    const data = await response.json();

    // Revalidate product pages
    revalidatePath('/products');
    revalidateTag('products');

    return {
      success: true,
      data: data.data as ProductEntity,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An error occurred',
    };
  }
}

/**
 * Update a product
 */
export async function updateProduct(input: UpdateProductInput) {
  try {
    // Validate input
    const validator = ValidatorFactory.createValidatorWithMessages(updateProductSchema);
    const validationResult = validator(input);

    if (!validationResult.success) {
      return {
        success: false,
        error: validationResult.errors.join('; '),
      };
    }

    const { id, ...updateData } = validationResult.data;

    // Make API call
    const baseUrl = process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
    const response = await fetch(`${baseUrl}/api/v1/admin/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        error: errorData.error?.message || 'Failed to update product',
      };
    }

    const data = await response.json();

    // Revalidate product pages
    revalidatePath('/products');
    revalidatePath(`/products/${data.data?.slug}`);
    revalidateTag('products');

    return {
      success: true,
      data: data.data as ProductEntity,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An error occurred',
    };
  }
}

/**
 * Delete a product
 */
export async function deleteProduct(id: string | number) {
  try {
    const baseUrl = process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
    const response = await fetch(`${baseUrl}/api/v1/admin/products/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        error: errorData.error?.message || 'Failed to delete product',
      };
    }

    // Revalidate product pages
    revalidatePath('/products');
    revalidateTag('products');

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

/**
 * Get filtered products (server-side)
 */
export async function getFilteredProducts(filters: ProductFilterInput) {
  try {
    // Validate filters
    const validator = ValidatorFactory.createSafeValidator(productFilterSchema);
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
    if (validatedFilters.q) params.set('q', validatedFilters.q);
    if (validatedFilters.category) params.set('category', validatedFilters.category);
    if (validatedFilters.min !== undefined) params.set('min', String(validatedFilters.min));
    if (validatedFilters.max !== undefined) params.set('max', String(validatedFilters.max));
    if (validatedFilters.rating !== undefined) params.set('rating', String(validatedFilters.rating));
    if (validatedFilters.featured) params.set('featured', 'true');
    if (validatedFilters.tags) params.set('tags', validatedFilters.tags.join(','));
    if (validatedFilters.sort) params.set('sort', validatedFilters.sort);
    if (validatedFilters.page) params.set('page', String(validatedFilters.page));
    if (validatedFilters.limit) params.set('limit', String(validatedFilters.limit));

    const products = await serverFetch<ProductEntity[]>(
      `/api/v1/public/products?${params.toString()}`,
      {
        revalidate: 3600, // 1 hour
        tags: ['products'],
      },
    );

    if (!products) {
      return {
        success: false,
        error: 'Failed to fetch products',
      };
    }

    return {
      success: true,
      data: products,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An error occurred',
    };
  }
}

