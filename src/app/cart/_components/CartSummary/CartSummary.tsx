'use client';

import React from 'react';
import { Card, Button, Typography, Divider } from 'antd';
import { GiftOutlined, DollarOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useAppDispatch } from '@/stores/hooks';
import { clearCart } from '@/stores/features/cart';
import { formatIranianPrice } from '@/shared/utils';
import { PaymentMethodSelector, type PaymentMethod } from '../PaymentMethodSelector';

const { Title, Text } = Typography;

interface CartSummaryProps {
  totals: {
    subtotal: number;
    shipping: number;
    total: number;
    totalDiscount: number;
    tax: number;
    realSavings: number;
  };
  selectedPaymentMethod: PaymentMethod;
  onPaymentMethodChange: (method: PaymentMethod) => void;
  onContinuePurchase: () => void;
  isCreatingOrder: boolean;
  itemsCount: number;
}

export const CartSummary: React.FC<CartSummaryProps> = ({
  totals,
  selectedPaymentMethod,
  onPaymentMethodChange,
  onContinuePurchase,
  isCreatingOrder,
  itemsCount,
}) => {
  const dispatch = useAppDispatch();

  return (
    <Card className="sticky top-20 rounded-xl shadow-lg sm:top-24 md:top-28 md:rounded-2xl">
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
            {totals.shipping === 0 ? 'رایگان' : `${formatIranianPrice(totals.shipping)} تومان`}
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
      <PaymentMethodSelector
        selectedMethod={selectedPaymentMethod}
        onMethodChange={onPaymentMethodChange}
      />
      <div className="flex flex-col gap-2">
        <Button
          type="primary"
          size="large"
          className="h-12 rounded-xl border-0 bg-gradient-to-r from-pink-500 to-purple-600"
          onClick={onContinuePurchase}
          loading={isCreatingOrder}
          disabled={isCreatingOrder || itemsCount === 0}
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
  );
};
