'use client';

import React, { Suspense } from 'react';
import { useSeller } from '@/app/seller/_api';
import { ContentLoading, LoadingWrapper, ErrorState } from '@/shared';
import { getValidImageSrc } from '@/shared/utils';

const ProfileCard = React.lazy(() => import('@/app/profile/_components/ProfileCard/ProfileCard'));

interface SellerInfoProps {
  sellerId?: number;
}

export default function SellerInfo({ sellerId }: SellerInfoProps) {
  const { data: sellerData, isLoading, error } = useSeller(sellerId ? String(sellerId) : '');

  if (!sellerId) {
    return <div className="p-8 text-center text-gray-500">اطلاعات فروشنده در دسترس نیست</div>;
  }

  return (
    <LoadingWrapper
      loading={isLoading}
      error={error ? 'خطا در بارگذاری اطلاعات فروشنده' : null}
      loadingComponent={<ContentLoading tip="در حال بارگذاری اطلاعات فروشنده..." size="small" />}
      errorComponent={
        <ErrorState
          message="خطا در بارگذاری اطلاعات فروشنده"
          description="لطفاً اتصال اینترنت خود را بررسی کنید و دوباره تلاش کنید."
        />
      }
    >
      {sellerData ? (
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
      ) : (
        <div className="p-8 text-center text-gray-500">در حال بارگذاری اطلاعات فروشنده...</div>
      )}
    </LoadingWrapper>
  );
}
