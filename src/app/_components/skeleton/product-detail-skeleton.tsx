import React from 'react';
import { Card, Skeleton } from 'antd';

export function ProductDetailSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Image Gallery */}
        <div>
          <Skeleton.Image active className="!h-96 !w-full rounded-2xl" />
          <div className="mt-4 flex gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton.Image key={i} active className="!h-20 !w-20 rounded-lg" />
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <Skeleton active paragraph={{ rows: 1 }} title={{ width: '70%' }} />
          <Skeleton active paragraph={{ rows: 3 }} />
          <div className="flex gap-4">
            <Skeleton.Button active size="large" />
            <Skeleton.Button active size="large" />
          </div>
          <Skeleton active paragraph={{ rows: 2 }} />
        </div>
      </div>

      {/* Tabs Section */}
      <Card className="mt-8 rounded-2xl">
        <Skeleton active paragraph={{ rows: 6 }} title={{ width: '40%' }} />
      </Card>
    </div>
  );
}

export default ProductDetailSkeleton;
