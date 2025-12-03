'use client';

import React from 'react';

interface ProductsResultsProps {
  count: number;
  isLoading: boolean;
}

export const ProductsResults: React.FC<ProductsResultsProps> = ({ count, isLoading }) => {
  return (
    <div className="order-2 text-xs text-gray-500 sm:order-1 sm:text-sm">
      {isLoading
        ? 'در حال بارگذاری...'
        : `تعداد نتایج: ${count.toLocaleString('fa-IR')}`}
    </div>
  );
};

