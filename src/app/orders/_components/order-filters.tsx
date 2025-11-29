'use client';

import React from 'react';
import { Radio, Space } from 'antd';
import type { OrderStatus } from '../_api/entities';
import { getStatusConfig } from '../_utils/order-status';

export interface OrderFiltersProps {
  selectedStatus?: OrderStatus | 'all';
  onStatusChange: (status: OrderStatus | 'all') => void;
}

const statusOptions: Array<OrderStatus | 'all'> = [
  'all',
  'pending',
  'processing',
  'confirmed',
  'shipped',
  'delivered',
  'cancelled',
];

export function OrderFilters({ selectedStatus = 'all', onStatusChange }: OrderFiltersProps) {
  return (
    <div className="mb-6 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <Radio.Group
        value={selectedStatus}
        onChange={(e) => onStatusChange(e.target.value)}
        className="w-full"
      >
        <Space wrap className="w-full justify-center sm:justify-start">
          {statusOptions.map((status) => {
            const config =
              status === 'all'
                ? { label: 'همه سفارش‌ها', color: 'default' as const, icon: null }
                : getStatusConfig(status);
            return (
              <Radio.Button
                key={status}
                value={status}
                className="rounded-lg border-gray-300 transition-all hover:border-pink-400"
              >
                {config.icon && <span className="ml-1">{config.icon}</span>}
                {config.label}
              </Radio.Button>
            );
          })}
        </Space>
      </Radio.Group>
    </div>
  );
}

export default OrderFilters;

