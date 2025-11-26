import React from 'react';
import { Metadata } from 'next';
import { serverFetch } from '@/shared/services/server-fetch';
import type { ProductEntity, ProductSummary } from './products/_api/entities';
import HeroCarousel from './_components/home/hero-carousel';
import FeaturesSection from './_components/home/features-section';
import ProductSlider from './_components/home/product-slider';
import CtaSection from './_components/home/cta-section';

export const revalidate = 3600; // ISR: revalidate every hour

export const metadata: Metadata = {
  title: 'صفحه اصلی',
  description: 'فروشگاه آنلاین شیک‌پوشان - بهترین محصولات مد و پوشاک',
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

      {/* Product Sliders - Client (for addToCart) */}
      {mappedDiscounted.length > 0 && (
        <ProductSlider
          title="پرتخفیف‌ترین محصولات"
          description="بهترین فرصت برای خرید با تخفیف‌های ویژه و استثنایی"
          products={mappedDiscounted}
          icon="discount"
          accentColor="orange"
        />
      )}

      {mappedBestSelling.length > 0 && (
        <ProductSlider
          title="پرفروش‌ترین محصولات"
          description="محبوب‌ترین انتخاب‌های مشتریان ما را کشف کنید"
          products={mappedBestSelling}
          icon="fire"
          accentColor="pink"
        />
      )}

      {mappedNewArrivals.length > 0 && (
        <ProductSlider
          title="جدیدترین محصولات"
          description="آخرین محصولات اضافه شده به فروشگاه را ببینید"
          products={mappedNewArrivals}
          icon="star"
          accentColor="purple"
        />
      )}

      {/* CTA - Client (for auth check) */}
      <CtaSection />
    </div>
  );
}
