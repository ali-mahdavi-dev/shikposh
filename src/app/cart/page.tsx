'use client';
import React, { useMemo } from 'react';
import { Card, Button, Typography, InputNumber, Empty, Divider } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import { removeFromCart, updateQuantity, clearCart } from '@/stores/slices/cartSlice';

const { Title, Text } = Typography;

export default function CartPage() {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.cart.items);

  const totals = useMemo(() => {
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = items.length > 0 ? 0 : 0;
    const total = subtotal + shipping;
    return { subtotal, shipping, total };
  }, [items]);

  if (!items.length) {
    return (
      <div className="mx-auto max-w-5xl py-10">
        <Card className="rounded-2xl shadow-sm">
          <Empty description="سبد خرید شما خالی است">
            <Link href="/">
              <Button type="primary">شروع خرید</Button>
            </Link>
          </Empty>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Title level={2} className="mb-6 text-gray-800">
        سبد خرید
      </Title>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          {items.map((item) => (
            <Card key={`${item.productId}-${item.color}-${item.size}`} className="rounded-2xl shadow-sm">
              <div className="flex items-center gap-4">
                {item.image && (
                  <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-gray-100">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                )}
                <div className="flex min-w-0 flex-1 flex-col gap-1">
                  <Text className="truncate font-semibold text-gray-800">{item.name}</Text>
                  <Text className="text-sm text-gray-500">رنگ: {item.color} | سایز: {item.size}</Text>
                </div>
                <div className="flex items-center gap-3">
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
                  />
                  <Text className="w-24 text-left font-semibold text-pink-600">
                    {(item.price * item.quantity).toLocaleString()} تومان
                  </Text>
                  <Button
                    danger
                    onClick={() =>
                      dispatch(
                        removeFromCart({ productId: item.productId, color: item.color, size: item.size }),
                      )
                    }
                  >
                    حذف
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div>
          <Card className="sticky top-28 rounded-2xl shadow-lg">
            <Title level={4} className="mb-4 text-gray-800">
              خلاصه سفارش
            </Title>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <Text className="text-gray-600">جمع جزء</Text>
                <Text className="font-semibold">{totals.subtotal.toLocaleString()} تومان</Text>
              </div>
              <div className="flex items-center justify-between">
                <Text className="text-gray-600">هزینه ارسال</Text>
                <Text className="font-semibold">{totals.shipping === 0 ? 'رایگان' : `${totals.shipping.toLocaleString()} تومان`}</Text>
              </div>
            </div>
            <Divider className="my-4" />
            <div className="mb-4 flex items-center justify-between text-base">
              <Text className="text-gray-700">مبلغ قابل پرداخت</Text>
              <Text className="text-xl font-extrabold text-pink-600">{totals.total.toLocaleString()} تومان</Text>
            </div>
            <div className="flex flex-col gap-2">
              <Button type="primary" size="large" className="h-12 rounded-xl border-0 bg-gradient-to-r from-pink-500 to-purple-600">
                ادامه فرآیند خرید
              </Button>
              <Button onClick={() => dispatch(clearCart())} className="h-12 rounded-xl">
                خالی کردن سبد خرید
              </Button>
              <Link href="/">
                <Button type="link" className="w-full">
                  ادامه خرید
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}


