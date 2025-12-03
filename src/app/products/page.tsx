import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { productContainer } from './_api/container';

const ProductsClient = dynamic(() => import('./products-client'));

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'خرید لباس زنانه | مانتو، شال، روسری، کیف و کفش | همه محصولات شیک‌پوشان',
  description:
    'خرید آنلاین انواع لباس زنانه با بهترین قیمت. مشاهده و فیلتر مانتو، شال و روسری، کیف، کفش و اکسسوری زنانه. جدیدترین مدل‌ها با ارسال سریع از فروشگاه شیک‌پوشان.',
  keywords: [
    'خرید لباس زنانه',
    'خرید مانتو زنانه',
    'شال و روسری زنانه',
    'کیف زنانه شیک',
    'کفش زنانه ارزان',
    'اکسسوری زنانه',
    'لباس زنانه آنلاین',
    'فروشگاه اینترنتی لباس زنانه',
  ],
  alternates: {
    canonical: '/products',
  },
  openGraph: {
    title: 'خرید لباس زنانه | جدیدترین محصولات شیک‌پوشان',
    description:
      'مشاهده همه محصولات فروشگاه شیک‌پوشان. بهترین مدل‌های مانتو، شال، روسری، کیف و کفش زنانه با امکان فیلتر و مرتب‌سازی.',
    url: '/products',
    siteName: 'شیک‌پوشان',
    type: 'website',
    images: [
      {
        url: '/og/products.jpg',
        width: 1200,
        height: 630,
        alt: 'فروشگاه شیک‌پوشان - محصولات زنانه',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'خرید لباس زنانه | شیک‌پوشان',
    description:
      'مشاهده همه محصولات زنانه شامل مانتو، شال، روسری، کیف و کفش. با فیلتر پیشرفته و قیمت عالی.',
    images: ['/og/products.jpg'],
  },
};

export default async function ProductsPage() {
  const productService = productContainer.getService();
  const [products, categories] = await Promise.all([
    productService.getAllProducts(),
    productService.getAllCategories(),
  ]);

  return <ProductsClient initialProducts={products || []} initialCategories={categories || []} />;
}
