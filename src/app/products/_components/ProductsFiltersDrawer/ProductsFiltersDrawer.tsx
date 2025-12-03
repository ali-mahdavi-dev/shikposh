'use client';

import React from 'react';
import { Drawer, Input, Select, Rate, Button, Typography, Slider } from 'antd';
import { SearchOutlined, ReloadOutlined } from '@ant-design/icons';
import { formatIranianPrice } from '@/shared/utils';

const { Text } = Typography;
const { Option } = Select;

interface ProductsFiltersDrawerProps {
  open: boolean;
  onClose: () => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  category: string;
  onCategoryChange: (value: string) => void;
  categoryOptions: Array<{ slug: string; name: string }>;
  priceRange: [number, number];
  onPriceRangeChange: (value: [number, number]) => void;
  minRating: number;
  onMinRatingChange: (value: number) => void;
  onlyFeatured: boolean;
  onOnlyFeaturedChange: (value: boolean) => void;
  selectedTags: string[];
  onSelectedTagsChange: (value: string[]) => void;
  allTags: string[];
  onReset: () => void;
}

export const ProductsFiltersDrawer: React.FC<ProductsFiltersDrawerProps> = ({
  open,
  onClose,
  searchQuery,
  onSearchChange,
  category,
  onCategoryChange,
  categoryOptions,
  priceRange,
  onPriceRangeChange,
  minRating,
  onMinRatingChange,
  onlyFeatured,
  onOnlyFeaturedChange,
  selectedTags,
  onSelectedTagsChange,
  allTags,
  onReset,
}) => {
  return (
    <Drawer
      title="فیلتر محصولات"
      placement="right"
      onClose={onClose}
      open={open}
      width={typeof window !== 'undefined' ? Math.min(320, window.innerWidth * 0.85) : 320}
      className="mobile-filter-drawer"
    >
      <div className="space-y-4">
        <div className="flex flex-col gap-2">
          <Text className="text-sm text-gray-600">دسته‌بندی</Text>
          <Select value={category} onChange={onCategoryChange} className="w-full">
            <Option value="all">همه</Option>
            {categoryOptions.map((cat) => (
              <Option key={cat.slug} value={cat.slug}>
                {cat.name}
              </Option>
            ))}
          </Select>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-3">
            <div className="flex flex-col gap-1">
              <Text className="text-xs text-gray-500">حداقل قیمت</Text>
              <Text className="text-base font-semibold text-gray-900">
                {formatIranianPrice(priceRange[0])} تومان
              </Text>
            </div>
            <div className="mx-2 text-gray-400">–</div>
            <div className="flex flex-col gap-1">
              <Text className="text-xs text-gray-500">حداکثر قیمت</Text>
              <Text className="text-base font-semibold text-gray-900">
                {formatIranianPrice(priceRange[1])} تومان
              </Text>
            </div>
          </div>
          <Slider
            range
            min={0}
            max={10_000_000}
            step={10000}
            value={priceRange}
            onChange={(value) => onPriceRangeChange(value as [number, number])}
            tooltip={{
              formatter: (value) => `${value?.toLocaleString('fa-IR')} تومان`,
            }}
            className="!mb-0"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Text className="text-sm text-gray-600">حداقل امتیاز</Text>
          <Rate value={minRating} onChange={onMinRatingChange} />
        </div>

        <div className="flex items-center justify-between">
          <Text className="text-sm text-gray-600">فقط ویژه</Text>
          <Select
            value={onlyFeatured ? 'yes' : 'no'}
            onChange={(v) => onOnlyFeaturedChange(v === 'yes')}
            className="w-24"
          >
            <Option value="no">خیر</Option>
            <Option value="yes">بله</Option>
          </Select>
        </div>

        {allTags.length > 0 && (
          <div className="flex flex-col gap-2">
            <Text className="text-sm text-gray-600">تگ‌ها</Text>
            <Select
              mode="multiple"
              value={selectedTags}
              onChange={onSelectedTagsChange}
              placeholder="تگ‌ها را انتخاب کنید"
              className="w-full"
              maxTagCount="responsive"
              showSearch
              filterOption={(input, option) => {
                const label =
                  typeof option?.label === 'string' ? option.label : String(option?.label || '');
                return label.toLowerCase().includes(input.toLowerCase());
              }}
            >
              {allTags.map((tag) => (
                <Option key={tag} value={tag}>
                  {tag}
                </Option>
              ))}
            </Select>
          </div>
        )}
      </div>
      <div className="mt-6">
        <Button onClick={onReset} icon={<ReloadOutlined />} block>
          بازنشانی
        </Button>
      </div>
    </Drawer>
  );
};

