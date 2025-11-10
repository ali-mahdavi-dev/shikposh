import React from 'react';
import { Metadata } from 'next';
import SellerClient from './seller-client';

interface SellerPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: SellerPageProps): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `فروشنده ${id} | شیک‌پوشان`,
    description: 'صفحه فروشنده در فروشگاه شیک‌پوشان',
  };
}

export default async function SellerPage({ params }: SellerPageProps) {
  const { id } = await params;
  return <SellerClient sellerId={id} />;
}
