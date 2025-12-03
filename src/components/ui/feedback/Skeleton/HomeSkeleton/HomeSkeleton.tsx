import React from 'react';
import { Card, Skeleton } from 'antd';

export function HomeSkeleton() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-96 bg-gradient-to-r from-gray-200 to-gray-300 md:h-[500px]">
        <Skeleton.Image active className="!h-full !w-full" />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Categories Section */}
        <div className="mb-16">
          <Skeleton
            active
            paragraph={{ rows: 0 }}
            title={{ width: '30%' }}
            className="mb-8 text-center"
          />
          <div className="flex flex-wrap justify-center gap-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <Skeleton.Image key={index} active className="!h-24 !w-24 rounded-full" />
            ))}
          </div>
        </div>

        {/* Featured Products Section */}
        <div className="mb-16">
          <Skeleton active paragraph={{ rows: 0 }} title={{ width: '25%' }} className="mb-8" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <Card key={index} className="rounded-2xl shadow-md">
                <Skeleton.Image active className="!h-48 !w-full rounded-xl" />
                <Skeleton
                  active
                  paragraph={{ rows: 2 }}
                  title={{ width: '80%' }}
                  className="mt-3"
                />
              </Card>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-16">
          <Skeleton
            active
            paragraph={{ rows: 0 }}
            title={{ width: '25%' }}
            className="mb-8 text-center"
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <Card key={index} className="rounded-2xl">
                <Skeleton active paragraph={{ rows: 2 }} avatar={{ size: 40 }} />
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeSkeleton;
