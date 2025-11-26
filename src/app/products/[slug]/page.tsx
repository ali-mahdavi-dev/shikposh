import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProductDetailClient from './product-detail-client';
import { serverFetch } from '@/shared/services/server-fetch';
import type { ProductEntity, CategoryEntity } from '../_api/entities';

export const revalidate = 3600; // ISR: revalidate every hour

interface ProductDetailPageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params for all products
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
    return {
      title: 'محصول یافت نشد | شیک‌پوشان',
    };
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

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = await params;

  // Fetch product and related data server-side
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

  // Get category slug for related products
  const categorySlug = product.categories?.[0]?.id
    ? categories?.find((cat) => String(cat.id) === String(product.categories[0].id))?.slug
    : undefined;

  // Fetch related products if we have a category
  let relatedProducts: ProductEntity[] = [];
  if (categorySlug) {
    relatedProducts =
      (await serverFetch<ProductEntity[]>(`/api/v1/public/products/category/${categorySlug}`, {
        tags: ['products', `category-${categorySlug}`],
      })) || [];
    // Filter out current product
    relatedProducts = relatedProducts.filter((p) => String(p.id) !== String(product.id));
  }

  return <ProductDetailClient initialProduct={product} initialRelatedProducts={relatedProducts} />;
}
