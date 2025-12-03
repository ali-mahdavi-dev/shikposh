'use client';

import React from 'react';
import { Card, Button, Typography, InputNumber, Tag } from 'antd';
import { GiftOutlined, DollarOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useAppDispatch } from '@/stores/hooks';
import { removeFromCart, updateQuantity } from '@/stores/features/cart';
import { formatIranianPrice, SafeImage } from '@/shared';

const { Text } = Typography;

interface CartItemProps {
  item: {
    productId: string;
    name?: string;
    slug?: string;
    image?: string;
    price?: number;
    discount?: number;
    quantity: number;
    color: string;
    size: string;
  };
}

export const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const dispatch = useAppDispatch();

  const imageElement = (
    <SafeImage
      src={item.image}
      alt={item.name || 'محصول'}
      fill
      className="object-cover"
      fallbackType="product"
    />
  );

  return (
    <Card key={`${item.productId}-${item.color}-${item.size}`} className="!mt-4 rounded-2xl shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        {item.slug ? (
          <Link
            href={`/products/${item.slug}`}
            className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-gray-100"
          >
            {imageElement}
          </Link>
        ) : (
          <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-gray-100">
            {imageElement}
          </div>
        )}

        <div className="flex min-w-0 flex-1 flex-col gap-1">
          {item.slug ? (
            <Link href={`/products/${item.slug}`}>
              <Text className="cursor-pointer font-semibold break-words text-gray-800 transition-colors hover:text-pink-600">
                {item.name || 'در حال بارگذاری...'}
              </Text>
            </Link>
          ) : (
            <Text className="font-semibold break-words text-gray-800">
              {item.name || 'در حال بارگذاری...'}
            </Text>
          )}
          <Text className="text-sm break-words text-gray-500">
            رنگ: {item.color} | سایز: {item.size}
          </Text>
          {item.discount && item.discount > 0 && item.price ? (
            <div className="mt-1 flex flex-wrap items-center gap-2">
              <Text className="text-sm whitespace-nowrap text-gray-400 line-through">
                {formatIranianPrice(
                  Math.round(item.price / (1 - item.discount / 100)) * item.quantity,
                )}{' '}
                تومان
              </Text>
              <Tag
                color="success"
                className="m-0 border-0 bg-gradient-to-r from-green-500 to-emerald-500 font-semibold text-white"
              >
                <GiftOutlined className="mr-1" />
                <span className="whitespace-nowrap">{item.discount}% تخفیف</span>
              </Tag>
            </div>
          ) : null}
        </div>

        <div className="flex w-full flex-col items-stretch gap-2 sm:w-auto sm:flex-row sm:items-center sm:gap-3">
          <InputNumber
            min={1}
            value={item.quantity}
            onChange={(val) =>
              dispatch(
                updateQuantity({
                  productId: item.productId,
                  color: item.color,
                  size: item.size,
                  quantity: Number(val || 1),
                }),
              )
            }
            className="w-full sm:w-24"
            size="large"
          />
          {item.price ? (
            <div className="flex flex-col items-end gap-1">
              <Text className="text-base font-bold whitespace-nowrap text-pink-600 sm:text-lg">
                {formatIranianPrice(item.price * item.quantity)} تومان
              </Text>
              {item.discount && item.discount > 0 ? (
                <div className="flex items-center gap-1 rounded-lg bg-green-50 px-2 py-1">
                  <DollarOutlined className="flex-shrink-0 text-xs text-green-600" />
                  <Text className="text-xs font-semibold whitespace-nowrap text-green-600">
                    {formatIranianPrice(
                      (Math.round(item.price / (1 - item.discount / 100)) - item.price) *
                        item.quantity,
                    )}{' '}
                    تومان صرفه‌جویی
                  </Text>
                </div>
              ) : null}
            </div>
          ) : (
            <Text className="text-left text-gray-400 sm:w-24">در حال بارگذاری...</Text>
          )}
          <Button
            danger
            onClick={() =>
              dispatch(
                removeFromCart({
                  productId: item.productId,
                  color: item.color,
                  size: item.size,
                }),
              )
            }
            className="w-full sm:w-auto"
            size="large"
          >
            حذف
          </Button>
        </div>
      </div>
    </Card>
  );
};

