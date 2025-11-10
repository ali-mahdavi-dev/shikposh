import React from 'react';
import { Card, Skeleton } from 'antd';

export function SellerSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="relative h-64 bg-gray-200">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
          <Skeleton.Avatar active size={120} />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 pt-24 pb-8 sm:px-6 lg:px-8">
        <div className="mb-6 text-center">
          <Skeleton active paragraph={{ rows: 1 }} title={{ width: '30%' }} />
        </div>

        {/* Tabs */}
        <Card className="mb-6 rounded-2xl shadow-sm">
          <Skeleton active paragraph={{ rows: 0 }} title={{ width: '20%' }} />
        </Card>

        {/* Content */}
        <Card className="rounded-2xl shadow-sm">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <Skeleton.Image key={index} active className="!h-48 !w-full rounded-xl" />
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

export default SellerSkeleton;
