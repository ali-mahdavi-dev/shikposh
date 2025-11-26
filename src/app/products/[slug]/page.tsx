import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { serverFetch } from '@/shared/services/server-fetch';
import type { ProductEntity, CategoryEntity, ProductSummary } from '../_api/entities';
import FeaturesList from './_components/features-list';
import ShippingInfo from './_components/shipping-info';
import ProductActions from './_components/product-actions';
import SellerInfo from './_components/seller-info';
import ProductTabs from './_components/product-tabs';
import ProductTags from './_components/product-tags';
import ProductImageGalleryWrapper from './_components/product-image-gallery-wrapper';
import ProductHeader from './_components/product-header';
import ProductCardWrapper, { ProductDivider } from './_components/product-card-wrapper';
import RelatedProducts from '../_components/related-products';

export const revalidate = 3600;

interface ProductDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const products = await serverFetch<ProductEntity[]>('/api/v1/public/products', {
    revalidate: 3600,
  });
  if (!products) return [];
  return products.map((product) => ({
    slug: product.slug || String(product.id),
  }));
}

export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await serverFetch<ProductEntity>(`/api/v1/public/products/${slug}`, {
    tags: ['products', `product-${slug}`],
  });

  if (!product) {
    return { title: 'محصول یافت نشد | شیک‌پوشان' };
  }

  return {
    title: `${product.title} | شیک‌پوشان`,
    description: product.description || 'جزئیات محصول در فروشگاه شیک‌پوشان',
    openGraph: {
      title: product.title,
      description: product.description,
      images: product.thumbnail ? [product.thumbnail] : [],
    },
  };
}

// Helper to map ProductEntity to ProductSummary
function mapToProductSummary(products: ProductEntity[]): ProductSummary[] {
  return products.map((product) => {
    const colorsMap: Record<string, { name: string }> = {};
    product.colors?.forEach((color) => {
      colorsMap[color.id.toString()] = { name: color.name };
    });

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

// Get initial images for SSG
function getInitialImages(product: ProductEntity): string[] {
  if (product.images && Object.keys(product.images).length > 0) {
    const firstColorId = Object.keys(product.images)[0];
    return product.images[firstColorId] || [];
  }
  return product.thumbnail ? [product.thumbnail] : [];
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = await params;

  const [product, categories] = await Promise.all([
    serverFetch<ProductEntity>(`/api/v1/public/products/${slug}`, {
      tags: ['products', `product-${slug}`],
    }),
    serverFetch<CategoryEntity[]>('/api/v1/public/categories', {
      tags: ['categories'],
    }),
  ]);

  if (!product) {
    notFound();
  }

  // Get category slug from categories list or use category name as fallback
  let categorySlug: string | undefined;
  if (product.categories?.[0]) {
    const cat = categories?.find((c) => String(c.id) === String(product.categories[0].id));
    categorySlug = cat?.slug;
  }

  let relatedProducts: ProductSummary[] = [];
  if (categorySlug) {
    const related = await serverFetch<ProductEntity[]>(
      `/api/v1/public/products/category/${categorySlug}`,
      { tags: ['products', `category-${categorySlug}`] },
    );
    if (related && related.length > 0) {
      relatedProducts = mapToProductSummary(
        related.filter((p) => String(p.id) !== String(product.id)),
      );
    }
  }

  // Fallback: if no related products, fetch some products
  if (relatedProducts.length === 0) {
    const allProducts = await serverFetch<ProductEntity[]>('/api/v1/public/products?limit=10', {
      tags: ['products'],
    });
    if (allProducts) {
      relatedProducts = mapToProductSummary(
        allProducts.filter((p) => String(p.id) !== String(product.id)).slice(0, 10),
      );
    }
  }

  const initialImages = getInitialImages(product);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ProductCardWrapper>
            <div className="grid grid-cols-1 gap-8 p-6 lg:grid-cols-2">
              {/* Product Images */}
              <div className="space-y-4">
                <ProductImageGalleryWrapper images={initialImages} productName={product.title} />
                <div className="mt-4">
                  <SellerInfo sellerId={product.seller_id} />
                </div>
              </div>

              {/* Product Details */}
              <div className="space-y-6">
                <ProductHeader
                  brand={product.brand}
                  title={product.title}
                  description={product.description}
                  discount={product.discount}
                  rating={product.rating}
                />

                <ProductTags tags={product.tags || []} />

                <FeaturesList features={product.features} />

                <ProductActions product={product} />

                <ShippingInfo />
              </div>
            </div>

            <ProductDivider />

            <div className="px-6 pb-6">
              <ProductTabs product={product} />
            </div>

            <ProductDivider />

            <div className="px-6 pb-6">
              <RelatedProducts products={relatedProducts} />
            </div>
          </ProductCardWrapper>
        </div>
      </div>
    </div>
  );
}
