import React from 'react';
import { Card, Skeleton } from 'antd';

export function OrdersSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Skeleton active paragraph={{ rows: 0 }} title={{ width: '30%' }} className="mb-6" />
      
      {/* Filters Skeleton */}
      <div className="mb-6 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <Skeleton.Button active size="default" style={{ width: '100%', height: '40px' }} />
      </div>

      {/* Order Cards Skeleton */}
      <div className="space-y-6">
        {Array.from({ length: 3 }).map((_, index) => (
          <Card key={index} className="rounded-2xl shadow-md">
            <div className="mb-4">
              <div className="mb-3 flex items-center justify-between">
                <Skeleton active title={{ width: '200px' }} paragraph={{ rows: 0 }} />
                <Skeleton.Button active size="default" />
              </div>
              <Skeleton active paragraph={{ rows: 1 }} />
            </div>
            
            {/* Order Items Skeleton */}
            <div className="mb-4 space-y-3">
              {Array.from({ length: 2 }).map((_, itemIndex) => (
                <div key={itemIndex} className="flex gap-3">
                  <Skeleton.Image active className="!h-20 !w-20 rounded-lg" />
                  <div className="flex-1">
                    <Skeleton active paragraph={{ rows: 2 }} title={{ width: '60%' }} />
                  </div>
                </div>
              ))}
            </div>
            
            {/* Summary Skeleton */}
            <Skeleton active paragraph={{ rows: 4 }} title={{ width: '40%' }} />
          </Card>
        ))}
      </div>
    </div>
  );
}

export default OrdersSkeleton;

