import React from 'react';
import { Card, Skeleton } from 'antd';

export function WishlistSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Skeleton active paragraph={{ rows: 0 }} title={{ width: '30%' }} className="mb-6" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <Card key={index} className="rounded-2xl shadow-md">
            <Skeleton.Image active className="!h-48 !w-full rounded-xl" />
            <Skeleton active paragraph={{ rows: 2 }} title={{ width: '80%' }} className="mt-3" />
            <div className="mt-4 flex gap-2">
              <Skeleton.Button active size="default" style={{ flex: 1 }} />
              <Skeleton.Button active size="default" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default WishlistSkeleton;
