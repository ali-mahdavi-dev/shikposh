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
      <Button icon={<FilterOutlined />} onClick={onFilterClick} size="large" className="lg:hidden">
        فیلتر
      </Button>
    </div>
  );
};
