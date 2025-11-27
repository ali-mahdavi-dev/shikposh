import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { serverFetch } from '@/shared/services/server-fetch';
import type { ProductEntity, ProductSummary } from './products/_api/entities';

const HeroCarousel = dynamic(() => import('./_components/home/hero-carousel'));
const FeaturesSection = dynamic(() => import('./_components/home/features-section'));
const ProductSlider = dynamic(() => import('./_components/home/product-slider'));
const CtaSection = dynamic(() => import('./_components/home/cta-section'));
const LazySection = dynamic(() => import('./_components/common/lazy-section'));

export const revalidate = 3600; // ISR: revalidate every hour

export const metadata: Metadata = {
  title: 'شیک‌پوشان | فروشگاه آنلاین مد و پوشاک زنانه با بهترین قیمت',
  description:
    'خرید آنلاین لباس زنانه، مانتو، شال و روسری، کیف و کفش با تخفیف‌های ویژه. ارسال رایگان، ضمانت بازگشت کالا و پشتیبانی ۲۴ ساعته در فروشگاه شیک‌پوشان.',
  keywords: [
    'فروشگاه آنلاین لباس زنانه',
    'خرید مانتو',
    'خرید شال و روسری',
    'پوشاک زنانه',
    'مد و فشن',
    'لباس با تخفیف',
    'شیک‌پوشان',
    'خرید اینترنتی لباس',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    title: 'شیک‌پوشان | فروشگاه آنلاین مد و پوشاک زنانه',
    description:
      'بهترین محصولات مد و پوشاک زنانه با کیفیت بالا، قیمت مناسب و ارسال سریع. همین حالا خرید کنید!',
    url: '/',
    siteName: 'شیک‌پوشان',
    type: 'website',
    locale: 'fa_IR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'شیک‌پوشان | فروشگاه آنلاین مد و پوشاک زنانه',
    description: 'خرید آنلاین لباس زنانه با بهترین قیمت و کیفیت',
  },
};

// Helper to map ProductEntity to ProductSummary format
function mapToProductSummary(products: ProductEntity[]): ProductSummary[] {
  return products.map((product) => {
    const colorsMap: Record<string, { name: string }> = {};
    if (product.colors) {
      product.colors.forEach((color) => {
        colorsMap[color.id.toString()] = { name: color.name };
      });
    }

    let firstImage = product.thumbnail;
    if (product.images && Object.keys(product.images).length > 0) {
      const firstColorId = Object.keys(product.images)[0];
      const firstColorImages = product.images[firstColorId];
      if (firstColorImages?.length > 0) {
        firstImage = firstColorImages[0];
      }
    }

    return {
      id: product.id,
      slug: product.slug,
      name: product.title,
      price: product.price || 0,
      origin_price: product.origin_price,
      discount: product.discount || 0,
      rating: product.rating || 0,
      reviewCount: 0,
      image: firstImage,
      category: product.categories?.[0]?.name || 'همه',
      isNew: product.is_new || false,
      isFeatured: product.is_featured || false,
      colors: colorsMap,
      sizes: product.sizes?.map((s) => s.name) || [],
      brand: product.brand || '',
      description: product.description || '',
      tags: product.tags || [],
    };
  });
}

export default async function Page() {
  // Fetch data server-side for SSG/ISR
  const [discountedProducts, bestSellingProducts, newArrivals] = await Promise.all([
    serverFetch<ProductEntity[]>('/api/v1/public/products?sort=discount_desc&limit=12', {
      tags: ['products', 'discounted'],
    }),
    serverFetch<ProductEntity[]>('/api/v1/public/products?sort=rating&limit=12', {
      tags: ['products', 'bestselling'],
    }),
    serverFetch<ProductEntity[]>('/api/v1/public/products?sort=newest&limit=12', {
      tags: ['products', 'new-arrivals'],
    }),
  ]);

  const mappedDiscounted = mapToProductSummary(discountedProducts || []);
  const mappedBestSelling = mapToProductSummary(bestSellingProducts || []);
  const mappedNewArrivals = mapToProductSummary(newArrivals || []);

  return (
    <div className="space-y-12">
      {/* Hero */}
      <HeroCarousel />

      {/* Features - SSG */}
      <FeaturesSection />

      {/* Product Sliders - Lazy loaded on scroll */}
      {mappedDiscounted.length > 0 && (
        <LazySection>
          <ProductSlider
            title="پرتخفیف‌ترین محصولات"
            description="بهترین فرصت برای خرید با تخفیف‌های ویژه و استثنایی"
            products={mappedDiscounted}
            icon="discount"
            accentColor="orange"
          />
        </LazySection>
      )}

      {mappedBestSelling.length > 0 && (
        <LazySection>
          <ProductSlider
            title="پرفروش‌ترین محصولات"
            description="محبوب‌ترین انتخاب‌های مشتریان ما را کشف کنید"
            products={mappedBestSelling}
            icon="fire"
            accentColor="pink"
          />
        </LazySection>
      )}

      {mappedNewArrivals.length > 0 && (
        <LazySection>
          <ProductSlider
            title="جدیدترین محصولات"
            description="آخرین محصولات اضافه شده به فروشگاه را ببینید"
            products={mappedNewArrivals}
            icon="star"
            accentColor="purple"
          />
        </LazySection>
      )}

      {/* CTA - Lazy loaded on scroll */}
      <LazySection>
        <CtaSection />
      </LazySection>
    </div>
  );
}
