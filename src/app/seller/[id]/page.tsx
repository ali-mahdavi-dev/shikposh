import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SellerClient from './seller-client';
import { serverFetch } from '@/shared/services/server-fetch';
import type { SellerEntity, SellerSummary } from '../_api/entities';
import type { ProductEntity } from '@/app/products/_api/entities';

export const revalidate = 3600; // ISR: revalidate every hour

interface SellerPageProps {
  params: Promise<{ id: string }>;
}

// Generate static params for all sellers
export async function generateStaticParams() {
  const sellers = await serverFetch<SellerSummary[]>('/api/v1/public/sellers', {
    revalidate: 3600,
  });

  if (!sellers) return [];

  return sellers.map((seller) => ({
    id: seller.id,
  }));
}

export async function generateMetadata({ params }: SellerPageProps): Promise<Metadata> {
  const { id } = await params;
  const seller = await serverFetch<SellerEntity>(`/api/v1/public/sellers/${id}`, {
    tags: ['sellers', `seller-${id}`],
  });

  if (!seller) {
    return {
      title: 'فروشنده یافت نشد | شیک‌پوشان',
    };
  }

  return {
    title: `${seller.name} | شیک‌پوشان`,
    description: seller.description || 'صفحه فروشنده در فروشگاه شیک‌پوشان',
    openGraph: {
      title: seller.name,
      description: seller.description,
      images: seller.avatar ? [seller.avatar] : [],
    },
  };
}

export default async function SellerPage({ params }: SellerPageProps) {
  const { id } = await params;

  // Fetch seller and products server-side
  const [seller, products] = await Promise.all([
    serverFetch<SellerEntity>(`/api/v1/public/sellers/${id}`, {
      tags: ['sellers', `seller-${id}`],
    }),
    serverFetch<ProductEntity[]>('/api/v1/public/products', {
      tags: ['products'],
    }),
  ]);

  if (!seller) {
    notFound();
  }

  return (
    <SellerClient
      initialSeller={seller}
      initialProducts={products || []}
    />
  );
}
