'use client';

import React from 'react';
import { Card, Skeleton } from 'antd';

export function CartSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Skeleton active paragraph={{ rows: 0 }} title={{ width: '30%' }} className="mb-6" />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          {Array.from({ length: 3 }).map((_, index) => (
            <Card key={index} className="rounded-2xl shadow-sm">
              <div className="flex items-center gap-4">
                <Skeleton.Image active className="!h-20 !w-20 rounded-xl" />
                <div className="flex-1">
                  <Skeleton active paragraph={{ rows: 1 }} title={{ width: '60%' }} />
                </div>
                <div className="flex items-center gap-3">
                  <Skeleton.Input active size="small" style={{ width: 60 }} />
                  <Skeleton.Button active size="small" />
                </div>
              </div>
            </Card>
          ))}
        </div>
        <div>
          <Card className="rounded-2xl shadow-lg">
            <Skeleton active paragraph={{ rows: 4 }} title={{ width: '50%' }} />
            <Skeleton.Button active block size="large" className="mt-4" />
          </Card>
        </div>
      </div>
    </div>
  );
}

export default CartSkeleton;
