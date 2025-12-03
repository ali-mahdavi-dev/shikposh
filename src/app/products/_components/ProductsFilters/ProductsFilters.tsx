'use client';

import React from 'react';
import { Input, Select, Rate, Button, Typography, Slider } from 'antd';
import { SearchOutlined, ReloadOutlined } from '@ant-design/icons';
import { formatIranianPrice } from '@/shared/utils';
import type { CategoryEntity } from '../../_api/entities';

const { Text } = Typography;
const { Option } = Select;

interface ProductsFiltersProps {
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

export const ProductsFilters: React.FC<ProductsFiltersProps> = ({
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
    <div className="sticky top-24 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="space-y-4">
        <Input
          allowClear
          prefix={<SearchOutlined />}
          placeholder="جستجوی محصول، برند یا توضیحات..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="h-10 w-full"
        />

        <div className="flex flex-col gap-2">
          <Text className="text-sm text-gray-600">دسته‌بندی</Text>
          <Select
            value={category}
            onChange={onCategoryChange}
            className="w-full"
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.children as unknown as string)
                ?.toLowerCase()
                .includes(input.toLowerCase())
            }
          >
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
              formatter: (value) => `${formatIranianPrice(value || 0)} تومان`,
            }}
            className="mb-0"
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
                  typeof option?.label === 'string'
                    ? option.label
                    : String(option?.label || '');
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

      <div className="mt-4">
        <Button onClick={onReset} icon={<ReloadOutlined />} block>
          بازنشانی
        </Button>
      </div>
    </div>
  );
};

