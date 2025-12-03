import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { homeContainer } from './_api/container';
import type { ProductEntity, ProductSummary } from './_api/entities';

const HeroCarousel = dynamic(() => import('./_components/HeroCarousel'));
const FeaturesSection = dynamic(() => import('./_components/FeaturesSection'));
const ProductSlider = dynamic(() => import('./_components/ProductSlider'));
const CtaSection = dynamic(() => import('./_components/CTASection'));
const LazySection = dynamic(() => import('./_components/LazySection'));

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
  // Fetch data server-side for SSG/ISR using service layer
  const homeService = homeContainer.getService();
  const [discountedProducts, bestSellingProducts, newArrivals] = await Promise.all([
    homeService.getDiscountedProducts(12),
    homeService.getBestSellingProducts(12),
    homeService.getNewArrivals(12),
  ]);

  const mappedDiscounted = mapToProductSummary(discountedProducts || []);
  const mappedBestSelling = mapToProductSummary(bestSellingProducts || []);
  const mappedNewArrivals = mapToProductSummary(newArrivals || []);

  return (
    <div className="space-y-6 md:space-y-12">
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
