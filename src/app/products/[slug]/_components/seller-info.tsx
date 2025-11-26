'use client';

import React, { Suspense } from 'react';
import { useSeller } from '@/app/seller/_api';
import { ContentLoading } from '@/shared/components/loading';
import { getValidImageSrc } from '@/shared/utils';

const ProfileCard = React.lazy(() => import('@/app/profile/_components/profile-card'));

interface SellerInfoProps {
  sellerId?: number;
}

export default function SellerInfo({ sellerId }: SellerInfoProps) {
  const { data: sellerData, isLoading, error } = useSeller(sellerId ? String(sellerId) : '');

  if (!sellerId) {
    return <div className="p-8 text-center text-gray-500">اطلاعات فروشنده در دسترس نیست</div>;
  }

  if (isLoading) {
    return <ContentLoading tip="در حال بارگذاری اطلاعات فروشنده..." size="small" />;
  }

  if (error) {
    return <div className="p-8 text-center text-gray-500">خطا در بارگذاری اطلاعات فروشنده</div>;
  }

  if (!sellerData) {
    return <div className="p-8 text-center text-gray-500">در حال بارگذاری اطلاعات فروشنده...</div>;
  }

  return (
    <Suspense fallback={<div className="h-32 animate-pulse rounded-lg bg-gray-200" />}>
      <ProfileCard
        name={sellerData.name || 'فروشنده'}
        avatar={getValidImageSrc(sellerData.avatar)}
        description={sellerData.description || 'توضیحاتی در دسترس نیست'}
        rating={sellerData.rating || sellerData.stats?.averageRating || 0}
        totalProducts={sellerData.totalProducts || 0}
        joinDate={sellerData.joinDate || 'نامشخص'}
        verified={sellerData.verified || false}
        sellerId={sellerData.id}
        reviewCount={sellerData.stats?.totalReviews}
      />
    </Suspense>
  );
}
