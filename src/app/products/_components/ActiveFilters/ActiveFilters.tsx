'use client';

import React from 'react';
import { Button, Tag } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import { formatIranianPrice } from '@/shared/utils';

interface ActiveFiltersProps {
  searchQuery: string;
  category: string;
  selectedTags: string[];
  onlyFeatured: boolean;
  minPrice: number;
  maxPrice: number;
  minRating: number;
  sortBy: string;
  onReset: () => void;
}

export const ActiveFilters: React.FC<ActiveFiltersProps> = ({
  searchQuery,
  category,
  selectedTags,
  onlyFeatured,
  minPrice,
  maxPrice,
  minRating,
  sortBy,
  onReset,
}) => {
  const getSortLabel = (sortValue: string): string => {
    const sortLabels: Record<string, string> = {
      relevance: 'مرتبط‌ترین',
      price_asc: 'قیمت: کم به زیاد',
      price_desc: 'قیمت: زیاد به کم',
      rating_desc: 'بالاترین امتیاز',
      newest: 'جدیدترین',
    };
    return sortLabels[sortValue] || sortValue;
  };

  const active: string[] = [];
  if (searchQuery) active.push(`جستجو: ${searchQuery}`);
  if (category !== 'all') active.push(`دسته: ${category}`);
  if (selectedTags.length > 0) active.push(`تگ‌ها: ${selectedTags.join(', ')}`);
  if (onlyFeatured) active.push('ویژه');
  if (minPrice > 0 || maxPrice < 10_000_000) {
    active.push(`قیمت: ${formatIranianPrice(minPrice)} - ${formatIranianPrice(maxPrice)} تومان`);
  }
  if (minRating > 0) active.push(`حداقل امتیاز: ${minRating}`);
  if (sortBy !== 'relevance') {
    const sortLabel = getSortLabel(sortBy);
    active.push(`مرتب‌سازی: ${sortLabel}`);
  }

  return (
    <div className="mt-1 flex min-h-[32px] flex-wrap items-center gap-2">
      {active.length > 0 && (
        <>
          {active.map((filter, idx) => (
            <Tag key={idx} color="magenta" className="m-0 px-2 py-1">
              {filter}
            </Tag>
          ))}
          <Button type="link" onClick={onReset} icon={<ReloadOutlined />} size="small">
            بازنشانی
          </Button>
        </>
      )}
    </div>
  );
};
