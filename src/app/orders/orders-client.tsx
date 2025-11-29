'use client';

import React, { useState } from 'react';
import { Typography, App as AntApp } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { useOrders, useCancelOrderMutation } from './_api/hooks';
import { OrderCard, OrdersEmptyState, OrderFilters } from './_components';
import { OrdersSkeleton } from '@/app/_components/skeleton';
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
          message.error('خطا در لغو سفارش. لطفاً دوباره تلاش کنید.');
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
        <div className="flex min-h-[50vh] flex-col items-center justify-center rounded-2xl bg-red-50 p-8 text-center">
          <ExclamationCircleOutlined className="mb-4 text-5xl text-red-500" />
          <Title level={4} className="mb-2 text-red-700">
            خطا در بارگذاری سفارش‌ها
          </Title>
          <p className="text-red-600">
            متأسفانه خطایی در دریافت اطلاعات سفارش‌ها رخ داده است. لطفاً دوباره تلاش کنید.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Title level={2} className="mb-6 text-gray-800">
        سفارش‌های من
      </Title>

      {/* Filters - Always show, even when no orders */}
      <div className="relative mb-6">
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
        <div className="space-y-6">
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
