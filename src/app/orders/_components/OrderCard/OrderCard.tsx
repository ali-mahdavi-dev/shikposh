'use client';

import React from 'react';
import { Card, Tag, Typography, Button, Divider } from 'antd';
import {
  CalendarOutlined,
  TruckOutlined,
  CloseCircleOutlined,
  FileTextOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import type { OrderEntity, OrderStatus } from '../_api/entities';
import { formatIranianPrice } from '@/shared/utils';
import { OrderItems } from './order-items';
import { getStatusConfig } from '../_utils/order-status';

const { Title, Text } = Typography;

export interface OrderCardProps {
  order: OrderEntity;
  onViewDetails?: (orderId: string | number) => void;
  onCancel?: (orderId: string | number) => void;
}

export function OrderCard({ order, onViewDetails, onCancel }: OrderCardProps) {
  const statusConfig = getStatusConfig(order.status);

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fa-IR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const canCancel = order.status === 'payment_confirmed' || order.status === 'processing';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        className="mb-6 overflow-hidden rounded-2xl border-0 bg-white shadow-md transition-all hover:shadow-xl"
        styles={{ body: { padding: '24px' } }}
      >
        {/* Header */}
        <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex-1">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <Title level={4} className="!mb-0 !text-lg !text-gray-900">
                سفارش #{order.order_number}
              </Title>
              <Tag
                color={statusConfig.color}
                className="!m-0 font-medium"
              >
                <span className="ml-1">{statusConfig.icon}</span>
                {statusConfig.label}
              </Tag>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1.5">
                <CalendarOutlined />
                <Text type="secondary">{formatDate(order.created_at)}</Text>
              </div>
              {order.tracking_number && (
                <div className="flex items-center gap-1.5">
                  <TruckOutlined />
                  <Text type="secondary" className="font-mono">
                    {order.tracking_number}
                  </Text>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            {onViewDetails && (
              <Button
                type="default"
                icon={<EyeOutlined />}
                onClick={() => onViewDetails(order.id)}
                className="rounded-lg"
              >
                مشاهده جزئیات
              </Button>
            )}
            {canCancel && onCancel && (
              <Button
                danger
                icon={<CloseCircleOutlined />}
                onClick={() => onCancel(order.id)}
                className="rounded-lg"
              >
                لغو سفارش
              </Button>
            )}
          </div>
        </div>

        <Divider className="my-4" />

        {/* Order Items */}
        <div className="mb-4">
          <OrderItems items={order.items} />
        </div>

        <Divider className="my-4" />

        {/* Order Summary */}
        <div className="rounded-xl bg-gradient-to-l from-gray-50 to-gray-100 p-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Text className="text-gray-600">جمع کل</Text>
              <Text strong className="text-gray-900">
                <span dir="ltr" className="inline-block">
                  {formatIranianPrice(order.total_amount)}
                </span>{' '}
                تومان
              </Text>
            </div>
            {order.discount_amount && order.discount_amount > 0 && (
              <div className="flex items-center justify-between">
                <Text className="text-gray-600">تخفیف</Text>
                <Text className="text-green-600">
                  <span dir="ltr" className="inline-block">
                    -{formatIranianPrice(order.discount_amount)}
                  </span>{' '}
                  تومان
                </Text>
              </div>
            )}
            {order.shipping_cost !== undefined && order.shipping_cost > 0 && (
              <div className="flex items-center justify-between">
                <Text className="text-gray-600">هزینه ارسال</Text>
                <Text className="text-gray-900">
                  <span dir="ltr" className="inline-block">
                    {formatIranianPrice(order.shipping_cost)}
                  </span>{' '}
                  تومان
                </Text>
              </div>
            )}
            <Divider className="my-2" />
            <div className="flex items-center justify-between">
              <Text strong className="text-base text-gray-900">
                مبلغ قابل پرداخت
              </Text>
              <Text strong className="text-lg text-pink-600">
                <span dir="ltr" className="inline-block">
                  {formatIranianPrice(order.final_amount)}
                </span>{' '}
                تومان
              </Text>
            </div>
          </div>
        </div>

        {/* Shipping Address */}
        {order.shipping_address && (
          <>
            <Divider className="my-4" />
            <div className="rounded-lg bg-blue-50 p-3">
              <div className="mb-2 flex items-center gap-2">
                <FileTextOutlined className="text-blue-500" />
                <Text strong className="text-sm text-gray-900">
                  آدرس ارسال
                </Text>
              </div>
              <Text className="text-sm text-gray-700">
                {order.shipping_address.full_name} - {order.shipping_address.phone}
                <br />
                {order.shipping_address.address}، {order.shipping_address.city}،{' '}
                {order.shipping_address.province}
                {order.shipping_address.postal_code && (
                  <> - کد پستی: {order.shipping_address.postal_code}</>
                )}
              </Text>
            </div>
          </>
        )}
      </Card>
    </motion.div>
  );
}

export default OrderCard;

