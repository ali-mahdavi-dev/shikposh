'use client';

import React from 'react';
import { Card, Skeleton } from 'antd';

export function ProfileSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Profile Header */}
      <Card className="mb-6 rounded-2xl shadow-sm">
        <div className="flex items-center gap-6">
          <Skeleton.Avatar active size={120} />
          <div className="flex-1">
            <Skeleton active paragraph={{ rows: 2 }} title={{ width: '40%' }} />
          </div>
        </div>
      </Card>

      {/* Tabs Content */}
      <Card className="rounded-2xl shadow-sm">
        <Skeleton active paragraph={{ rows: 8 }} title={{ width: '30%' }} />
      </Card>

      {/* Posts Grid */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <Card key={index} className="rounded-2xl shadow-sm">
            <Skeleton.Image active className="!h-48 !w-full rounded-xl" />
            <Skeleton active paragraph={{ rows: 2 }} title={{ width: '70%' }} className="mt-3" />
          </Card>
        ))}
      </div>
    </div>
  );
}

export default ProfileSkeleton;
