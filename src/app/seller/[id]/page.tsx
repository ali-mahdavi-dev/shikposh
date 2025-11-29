import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';
import { serverFetch } from '@/shared/services/server-fetch';
import type { SellerEntity, SellerSummary } from '../_api/entities';
import type { ProductEntity } from '@/app/products/_api/entities';

const SellerClient = dynamic(() => import('./seller-client'));

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
    // Next.js requires route params to be strings
    id: String(seller.id),
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
      description: 'متاسفانه فروشنده مورد نظر یافت نشد.',
    };
  }

  return {
    title: `فروشگاه ${seller.name} | محصولات و اطلاعات فروشنده`,
    description:
      seller.description ||
      `مشاهده محصولات و اطلاعات فروشنده ${seller.name} در شیک‌پوشان. خرید مستقیم از فروشنده معتبر با ضمانت کیفیت.`,
    alternates: { canonical: `/seller/${id}` },
    openGraph: {
      title: `فروشگاه ${seller.name}`,
      description: seller.description || `محصولات ${seller.name} در شیک‌پوشان`,
      images: seller.avatar ? [{ url: seller.avatar, alt: seller.name }] : [],
      type: 'profile',
      url: `/seller/${id}`,
      siteName: 'شیک‌پوشان',
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

  return <SellerClient initialSeller={seller} initialProducts={products || []} />;
}
