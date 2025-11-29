'use client';

import React from 'react';
import { Typography, Space } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { formatIranianPrice } from '@/shared/utils';
import { getValidImageSrc, DEFAULT_IMAGES } from '@/shared/utils/image';
import type { OrderItem } from '../_api/entities';

const { Text } = Typography;

export interface OrderItemsProps {
  items: OrderItem[];
}

export function OrderItems({ items }: OrderItemsProps) {
  return (
    <div className="space-y-3">
      {items.map((item) => {
        const imageSrc = getValidImageSrc(item.product_image, DEFAULT_IMAGES.product);
        const itemTotal = (item.price - (item.discount || 0)) * item.quantity;

        return (
          <div
            key={item.id}
            className="flex gap-3 rounded-lg border border-gray-200 bg-white p-3 transition-all hover:border-pink-300 hover:shadow-sm"
          >
            <Link
              href={item.product_slug ? `/products/${item.product_slug}` : '#'}
              className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-gray-100"
            >
              <Image
                src={imageSrc}
                alt={item.product_name}
                fill
                className="object-cover"
                sizes="80px"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = DEFAULT_IMAGES.product;
                }}
              />
            </Link>
            <div className="flex min-w-0 flex-1 flex-col justify-between">
              <div>
                <Link
                  href={item.product_slug ? `/products/${item.product_slug}` : '#'}
                  className="block"
                >
                  <Text strong className="block text-gray-900">
                    {item.product_name}
                  </Text>
                </Link>
                <Space size="small" className="mt-1">
                  {item.color && (
                    <Text type="secondary" className="text-xs">
                      رنگ: {item.color}
                    </Text>
                  )}
                  {item.size && (
                    <Text type="secondary" className="text-xs">
                      سایز: {item.size}
                    </Text>
                  )}
                  <Text type="secondary" className="text-xs">
                    تعداد: <span dir="ltr">{item.quantity}</span>
                  </Text>
                </Space>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {item.discount && item.discount > 0 ? (
                    <>
                      <Text delete type="secondary" className="text-xs">
                        <span dir="ltr">{formatIranianPrice(item.price)}</span>
                      </Text>
                      <Text strong className="text-pink-600">
                        <span dir="ltr">
                          {formatIranianPrice(item.price - item.discount)}
                        </span>
                      </Text>
                    </>
                  ) : (
                    <Text strong className="text-gray-900">
                      <span dir="ltr">{formatIranianPrice(item.price)}</span>
                    </Text>
                  )}
                </div>
                <Text strong className="text-gray-900">
                  <span dir="ltr">{formatIranianPrice(itemTotal)}</span> تومان
                </Text>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default OrderItems;

