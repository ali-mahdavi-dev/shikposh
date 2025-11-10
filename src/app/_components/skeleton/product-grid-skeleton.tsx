import React from 'react';
import { Card, Skeleton } from 'antd';

export interface ProductGridSkeletonProps {
  count?: number;
  cols?: number;
}

export function ProductGridSkeleton({ count = 8, cols = 4 }: ProductGridSkeletonProps) {
  return (
    <div className={`grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-${cols}`}>
      {Array.from({ length: count }).map((_, index) => (
        <Card key={index} className="rounded-2xl shadow-md">
          <Skeleton.Image active className="!h-48 !w-full rounded-xl" />
          <Skeleton active paragraph={{ rows: 2 }} title={{ width: '80%' }} className="mt-3" />
        </Card>
      ))}
    </div>
  );
}

export default ProductGridSkeleton;
