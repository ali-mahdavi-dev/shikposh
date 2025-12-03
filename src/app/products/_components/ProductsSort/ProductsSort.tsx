'use client';

import React from 'react';
import { Select, Typography } from 'antd';

const { Text } = Typography;
const { Option } = Select;

interface ProductsSortProps {
  sortBy: string;
  onSortChange: (value: string) => void;
}

export const ProductsSort: React.FC<ProductsSortProps> = ({ sortBy, onSortChange }) => {
  return (
    <div className="order-1 flex w-full items-center gap-2 sm:order-2 sm:w-auto">
      <Text className="text-xs whitespace-nowrap text-gray-600 sm:text-sm">مرتب‌سازی:</Text>
      <Select
        value={sortBy}
        onChange={onSortChange}
        className="flex-1 sm:w-48 md:w-56"
        size="small"
      >
        <Option value="relevance">مرتبط‌ترین</Option>
        <Option value="price_asc">قیمت: کم به زیاد</Option>
        <Option value="price_desc">قیمت: زیاد به کم</Option>
        <Option value="rating_desc">بالاترین امتیاز</Option>
        <Option value="newest">جدیدترین</Option>
      </Select>
    </div>
  );
};
