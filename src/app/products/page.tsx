import React from 'react';
import { Metadata } from 'next';
import ProductsClient from './products-client';

export const metadata: Metadata = {
  title: 'محصولات | شیک‌پوشان',
  description: 'جستجو و فیلتر محصولات پوشاک زنانه در فروشگاه شیک‌پوشان',
};

export default function ProductsPage() {
  return <ProductsClient />;
}
