'use client';

import React from 'react';
import { Radio, Card, Typography } from 'antd';
import { CreditCardOutlined } from '@ant-design/icons';

const { Text } = Typography;

export type PaymentMethod = 'zarinpal' | 'snapppay';

export interface PaymentMethodSelectorProps {
  selectedMethod: PaymentMethod;
  onMethodChange: (method: PaymentMethod) => void;
}

const paymentMethods: Array<{ value: PaymentMethod; label: string; description: string }> = [
  {
    value: 'zarinpal',
    label: 'زرین‌پال',
    description: 'پرداخت آنلاین از طریق درگاه زرین‌پال',
  },
  // SnappPay will be added later
  // {
  //   value: 'snapppay',
  //   label: 'اسنپ‌پی',
  //   description: 'پرداخت قسطی از طریق اسنپ‌پی',
  // },
];

export function PaymentMethodSelector({
  selectedMethod,
  onMethodChange,
}: PaymentMethodSelectorProps) {
  return (
    <div className="mb-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <Text className="mb-3 block text-base font-semibold text-gray-800">انتخاب روش پرداخت</Text>
      <Radio.Group
        value={selectedMethod}
        onChange={(e) => onMethodChange(e.target.value)}
        className="w-full"
      >
        <div className="flex flex-col gap-3">
          {paymentMethods.map((method) => (
            <Radio.Button
              key={method.value}
              value={method.value}
              className="!h-auto !rounded-lg !border-gray-300 !p-3 transition-all hover:!border-pink-400"
            >
              <div className="flex items-center gap-3">
                <CreditCardOutlined className="text-lg text-pink-600" />
                <div className="flex flex-col">
                  <Text className="font-semibold text-gray-800">{method.label}</Text>
                  <Text className="text-xs text-gray-500">{method.description}</Text>
                </div>
              </div>
            </Radio.Button>
          ))}
        </div>
      </Radio.Group>
    </div>
  );
}

export default PaymentMethodSelector;
