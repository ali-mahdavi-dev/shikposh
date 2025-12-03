'use client';

import React from 'react';
import { Card, Button, Typography, Popconfirm } from 'antd';
import Link from 'next/link';
import { formatIranianPrice, SafeImage } from '@/shared';

const { Text } = Typography;

export interface WishlistItemProps {
  product: {
    id: string;
    name: string;
    image?: string;
    price: number;
    colors?: Record<string, any>;
    sizes?: string[];
  };
  onMoveToCart: (product: WishlistItemProps['product']) => void;
  onRemove: (id: string) => void;
}

export function WishlistItem({ product, onMoveToCart, onRemove }: WishlistItemProps) {
  return (
    <Card className="h-full rounded-2xl shadow-md">
      <Link href={`/products/${product.id}`} className="block">
        <div className="relative mb-3 h-48 w-full overflow-hidden rounded-xl bg-gray-100">
          <SafeImage
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            fallbackType="product"
          />
        </div>
        <Text className="mb-2 line-clamp-2 block font-semibold text-gray-800">{product.name}</Text>
        <Text className="mb-3 block text-pink-600">
          {formatIranianPrice(product.price || 0)} تومان
        </Text>
      </Link>

      <div className="flex gap-2">
        <Button
          type="primary"
          className="flex-1 rounded-lg border-0 bg-gradient-to-r from-pink-500 to-purple-600"
          onClick={() => onMoveToCart(product)}
        >
          افزودن به سبد
        </Button>
        <Popconfirm
          title="حذف از علاقه‌مندی‌ها؟"
          onConfirm={() => onRemove(product.id)}
          okText="بله"
          cancelText="خیر"
        >
          <Button danger className="rounded-lg">
            حذف
          </Button>
        </Popconfirm>
      </div>
    </Card>
  );
}

export default WishlistItem;
