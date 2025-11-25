'use client';
import React, { useMemo, useEffect, useState } from 'react';
import { Card, Button, Typography, InputNumber, Empty, Divider, Tag } from 'antd';
import { GiftOutlined, DollarOutlined } from '@ant-design/icons';
import Image from 'next/image';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import {
  removeFromCart,
  updateQuantity,
  clearCart,
  updateCartItemsWithProductData,
} from '@/stores/slices/cartSlice';
import { useProductsForCart } from '@/app/products/_api';
import { formatIranianPrice } from '@/shared/utils';

const { Title, Text } = Typography;

export default function CartClient() {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.cart.items);
  const [isMounted, setIsMounted] = useState(false);

  // Ensure consistent initial render between server and client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Get unique product IDs from cart items
  const productIds = useMemo(() => {
    return Array.from(new Set(items.map((item) => item.productId)));
  }, [items]);

  // Fetch product details from API (only if we have items)
  const { data: cartProducts = [], isLoading: isLoadingProducts } = useProductsForCart(productIds);

  // Update cart items with product data when API response arrives
  useEffect(() => {
    if (cartProducts.length > 0) {
      dispatch(updateCartItemsWithProductData(cartProducts));
    }
  }, [cartProducts, dispatch]);

  const totals = useMemo(() => {
    const subtotal = items.reduce((sum, item) => {
      const price = item.price || 0;
      return sum + price * item.quantity;
    }, 0);

    // Calculate total discount (savings)
    // Formula: discount = price × discount% / (100 - discount%)
    const totalDiscount = items.reduce((sum, item) => {
      if (item.price && item.discount && item.discount > 0) {
        // Calculate discount amount: price × discount / (100 - discount)
        const discountAmount = Math.round((item.price * item.discount) / (100 - item.discount));
        return sum + discountAmount * item.quantity;
      }
      return sum;
    }, 0);

    // Calculate tax (3% on subtotal)
    const taxRate = 0.03; // 3%
    const tax = Math.round(subtotal * taxRate);

    // Calculate tax on discount (tax that would have been paid on the discount amount)
    const taxOnDiscount = Math.round(totalDiscount * taxRate);

    // Real savings = discount - tax on discount (rounded)
    const realSavings = Math.round(totalDiscount - taxOnDiscount);

    const shipping = items.length > 0 ? 0 : 0;
    const total = subtotal + tax + shipping;
    return { subtotal, shipping, total, totalDiscount, tax, realSavings };
  }, [items]);

  // During SSR and initial client render, show empty state to prevent hydration mismatch
  // After mount, show actual cart state
  const showEmptyState = !isMounted || !items.length;
  const showLoadingState = isMounted && items.length > 0 && isLoadingProducts;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {showEmptyState ? (
        <Card className="rounded-2xl shadow-sm">
          <Empty description="سبد خرید شما خالی است">
            <Link href="/">
              <Button type="primary">شروع خرید</Button>
            </Link>
          </Empty>
        </Card>
      ) : showLoadingState ? (
        <>
          <Title level={2} className="mb-6 text-gray-800">
            سبد خرید
          </Title>
          <Card className="rounded-2xl shadow-sm">
            <div className="flex items-center justify-center py-10">
              <Text>در حال بارگذاری...</Text>
            </div>
          </Card>
        </>
      ) : (
        <>
          <Title level={2} className="mb-6 text-gray-800">
            سبد خرید
          </Title>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="space-y-4 lg:col-span-2">
              {items.map((item) => (
                <Card
                  key={`${item.productId}-${item.color}-${item.size}`}
                  className="!mt-4 rounded-2xl shadow-sm"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                    {item.image && item.slug ? (
                      <Link
                        href={`/products/${item.slug}`}
                        className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-gray-100"
                      >
                        <Image
                          src={item.image}
                          alt={item.name || 'محصول'}
                          fill
                          className="cursor-pointer object-cover transition-opacity hover:opacity-80"
                        />
                      </Link>
                    ) : item.image ? (
                      <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-gray-100">
                        <Image
                          src={item.image}
                          alt={item.name || 'محصول'}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : null}
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
                    <div className="flex flex-col items-end gap-3 sm:flex-row sm:items-center">
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
                        className="w-full sm:w-auto"
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
                                  (Math.round(item.price / (1 - item.discount / 100)) -
                                    item.price) *
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
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <Text className="break-words text-gray-600">جمع جزء</Text>
                    <Text className="font-semibold whitespace-nowrap text-gray-800">
                      {formatIranianPrice(totals.subtotal)} تومان
                    </Text>
                  </div>
                  {totals.totalDiscount > 0 && (
                    <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg bg-red-50 p-2">
                      <div className="flex items-center gap-2">
                        <GiftOutlined className="flex-shrink-0 text-red-500" />
                        <Text className="font-medium text-gray-700">تخفیف</Text>
                      </div>
                      <Text className="font-bold whitespace-nowrap text-red-600">
                        -{formatIranianPrice(totals.totalDiscount)} تومان
                      </Text>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <Text className="break-words text-gray-600">مالیات (3%)</Text>
                    <Text className="font-semibold whitespace-nowrap text-gray-800">
                      {formatIranianPrice(totals.tax)} تومان
                    </Text>
                  </div>
                  <div className="flex items-center justify-between">
                    <Text className="break-words text-gray-600">هزینه ارسال</Text>
                    <Text className="font-semibold whitespace-nowrap text-gray-800">
                      {totals.shipping === 0
                        ? 'رایگان'
                        : `${formatIranianPrice(totals.shipping)} تومان`}
                    </Text>
                  </div>
                  {totals.realSavings > 0 && (
                    <div className="rounded-xl border-2 border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 p-3">
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-2">
                          <DollarOutlined className="flex-shrink-0 text-lg text-green-600" />
                          <Text className="font-bold text-green-700">سود شما</Text>
                        </div>
                        <div className="flex items-center gap-2">
                          <Text className="text-lg font-extrabold whitespace-nowrap text-green-600">
                            {formatIranianPrice(totals.realSavings)} تومان
                          </Text>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <Divider className="my-4" />
                <div className="mb-4 flex items-center justify-between text-base">
                  <Text className="text-gray-700">مبلغ قابل پرداخت</Text>
                  <Text className="text-xl font-extrabold text-pink-600">
                    {formatIranianPrice(totals.total)} تومان
                  </Text>
                </div>
                <div className="flex flex-col gap-2">
                  <Button
                    type="primary"
                    size="large"
                    className="h-12 rounded-xl border-0 bg-gradient-to-r from-pink-500 to-purple-600"
                  >
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
        </>
      )}
    </div>
  );
}
