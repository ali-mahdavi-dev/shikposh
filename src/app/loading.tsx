import React from 'react';
import { Skeleton } from 'antd';

export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Skeleton active paragraph={{ rows: 8 }} avatar={{ size: 120 }} />
    </div>
  );
}
