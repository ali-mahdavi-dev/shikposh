import React from 'react';
import { Metadata } from 'next';
import ProductsClient from './products-client';
import { serverFetch } from '@/shared/services/server-fetch';
import type { ProductEntity } from './_api/entities';
import type { CategoryEntity } from './_api/entities';

export const revalidate = 3600; // ISR: revalidate every hour

export const metadata: Metadata = {
  title: 'محصولات | شیک‌پوشان',
  description: 'جستجو و فیلتر محصولات پوشاک زنانه در فروشگاه شیک‌پوشان',
};

export default async function ProductsPage() {
  // Fetch initial data server-side for SSG/ISR
  const [products, categories] = await Promise.all([
    serverFetch<ProductEntity[]>('/api/v1/public/products', {
      tags: ['products'],
    }),
    serverFetch<CategoryEntity[]>('/api/v1/public/categories', {
      tags: ['categories'],
    }),
  ]);

  return <ProductsClient initialProducts={products || []} initialCategories={categories || []} />;
}
