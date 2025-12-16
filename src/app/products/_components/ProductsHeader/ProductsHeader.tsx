'use client';

import React from 'react';
import { Input, Button } from 'antd';
import { FilterOutlined, SearchOutlined } from '@ant-design/icons';

interface ProductsHeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onFilterClick: () => void;
}

export const ProductsHeader: React.FC<ProductsHeaderProps> = ({
  searchQuery,
  onSearchChange,
  onFilterClick,
}) => {
  return (
    <div
      className="sticky z-30 -mx-2 bg-gray-50 px-2 py-2 md:static md:z-auto md:mx-0 md:px-0 md:py-0"
      style={{
        top: 'calc(64px + 56px)', // Header (64px) + Breadcrumb (~56px with padding)
      }}
    >
      <div className="flex items-center gap-2">
        <div className="flex-1">
          <Input
            allowClear
            prefix={<SearchOutlined />}
            placeholder="جستجو..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="h-10 w-full lg:hidden"
            size="large"
          />
        </div>
        <Button
          icon={<FilterOutlined />}
          onClick={onFilterClick}
          size="large"
          className="lg:hidden"
        >
          فیلتر
        </Button>
      </div>
    </div>
  );
};
