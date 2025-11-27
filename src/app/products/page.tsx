import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { serverFetch } from '@/shared/services/server-fetch';
import type { ProductEntity, CategoryEntity } from './_api/entities';

const ProductsClient = dynamic(() => import('./products-client'));

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'همه محصولات | مانتو، شال، روسری، کیف و کفش زنانه',
  description:
    'مشاهده تمام محصولات فروشگاه شیک‌پوشان. فیلتر بر اساس دسته‌بندی، قیمت، رنگ و سایز. مانتو، شال و روسری، کیف، کفش و اکسسوری زنانه با بهترین قیمت.',
  keywords: [
    'خرید لباس زنانه',
    'مانتو زنانه',
    'شال و روسری',
    'کیف زنانه',
    'کفش زنانه',
    'پوشاک زنانه آنلاین',
  ],
  alternates: { canonical: '/products' },
  openGraph: {
    title: 'فروشگاه محصولات شیک‌پوشان',
    description: 'جدیدترین و بهترین محصولات مد و پوشاک زنانه',
    url: '/products',
    siteName: 'شیک‌پوشان',
    type: 'website',
  },
};

export default async function ProductsPage() {
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
