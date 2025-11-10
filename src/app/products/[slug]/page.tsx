import React from 'react';
import { Metadata } from 'next';
import ProductDetailClient from './product-detail-client';

interface ProductDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `محصول ${slug} | شیک‌پوشان`,
    description: 'جزئیات محصول در فروشگاه شیک‌پوشان',
  };
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = await params;
  return <ProductDetailClient productId={slug} />;
}
