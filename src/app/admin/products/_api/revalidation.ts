/**
 * Product-specific revalidation helpers
 * Uses the base revalidation utility for product-related pages
 */

import { revalidate } from '@/shared/utils/revalidation';

interface ProductRevalidationOptions {
  slug?: string;
  additionalTags?: string[];
  additionalPaths?: string[];
}

/**
 * Revalidates SSG pages based on product changes
 * @param options - Revalidation options including slug, additional tags, and paths
 */
export async function revalidateProductPages(options: ProductRevalidationOptions = {}) {
  const { slug, additionalTags = [], additionalPaths = [] } = options;

  // Default tags for products
  const defaultTags = [
    'products', // Revalidate all products
    slug ? `product-${slug}` : undefined, // Revalidate specific product
    'categories', // Revalidate categories (in case product categories changed)
  ].filter(Boolean) as string[];

  // Default paths for products
  const defaultPaths = [
    '/products', // Products listing page
    slug ? `/products/${slug}` : undefined, // Specific product page
    '/', // Home page (may show products)
  ].filter(Boolean) as string[];

  // Merge default and additional tags/paths
  const tags = [...defaultTags, ...additionalTags];
  const paths = [...defaultPaths, ...additionalPaths];

  return revalidate({ tags, paths });
}

/**
 * Helper function to generate slug from title
 */
export function generateSlug(title: string): string {
  return title
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFFa-zA-Z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}
