import React from 'react';
import { SkeletonLoading } from '@/shared';

export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <SkeletonLoading rows={8} avatar title paragraph active />
    </div>
  );
}
