'use client';

import React, { useState } from 'react';
import { Typography, App as AntApp } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { useOrders, useCancelOrderMutation } from './_api/hooks';
import { OrderCard, OrdersEmptyState, OrderFilters } from './_components';
import { OrdersSkeleton } from '@/components/ui/feedback/Skeleton';
import { ErrorState } from '@/shared';
import { handleError } from '@/lib/errors';
import type { OrderStatus } from './_api/entities';

const { Title } = Typography;

export default function OrdersClient() {
  const router = useRouter();
  const { message, modal } = AntApp.useApp();
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus | 'all'>('all');

  const filters = selectedStatus !== 'all' ? { status: selectedStatus } : undefined;
  const { data, isLoading, isFetching, isError } = useOrders(filters);
  const cancelOrderMutation = useCancelOrderMutation();

  const handleViewDetails = (orderId: string | number) => {
    // Navigate to order detail page or show modal
    router.push(`/orders/${orderId}`);
  };

  const handleCancel = (orderId: string | number) => {
    modal.confirm({
      title: 'لغو سفارش',
      icon: <ExclamationCircleOutlined />,
      content: 'آیا از لغو این سفارش اطمینان دارید؟ این عمل قابل بازگشت نیست.',
      okText: 'بله، لغو کن',
      cancelText: 'انصراف',
      okType: 'danger',
      onOk: async () => {
        try {
          await cancelOrderMutation.mutateAsync(orderId);
          message.success('سفارش با موفقیت لغو شد');
        } catch (error) {
          // Use enterprise error handling
          const appError = handleError(error);
          message.error(appError.message || 'خطا در لغو سفارش. لطفاً دوباره تلاش کنید.');
        }
      },
    });
  };

  // Show skeleton only on initial load, not when switching tabs
  if (isLoading && !data) {
    return <OrdersSkeleton />;
  }

  // Get orders from data, fallback to empty array
  const orders = data?.orders || [];

  // Show error only if we don't have any previous data
  if (isError && !data) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Title level={2} className="mb-6 text-gray-800">
          سفارش‌های من
        </Title>
        <ErrorState
          message="خطا در بارگذاری سفارش‌ها"
          description="متأسفانه خطایی در دریافت اطلاعات سفارش‌ها رخ داده است. لطفاً دوباره تلاش کنید."
          onRetry={() => window.location.reload()}
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-2 py-4 sm:px-4 sm:py-6 md:py-8">
      <Title level={2} className="mb-4 text-lg text-gray-800 sm:mb-6 sm:text-xl md:text-2xl">
        سفارش‌های من
      </Title>

      {/* Filters - Always show, even when no orders */}
      <div className="relative mb-4 sm:mb-6">
        {isFetching && !isLoading && (
          <div className="absolute -top-2 right-0 z-10">
            <div className="h-1 w-24 animate-pulse rounded-full bg-pink-500" />
          </div>
        )}
        <OrderFilters selectedStatus={selectedStatus} onStatusChange={setSelectedStatus} />
      </div>

      {/* Orders List */}
      {orders.length === 0 ? (
        <OrdersEmptyState />
      ) : (
        <div className="space-y-4 sm:space-y-6">
          {orders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              onViewDetails={handleViewDetails}
              onCancel={handleCancel}
            />
          ))}
        </div>
      )}
    </div>
  );
}
