'use client';

import React, { useState, Suspense } from 'react';
import { Tabs, Typography } from 'antd';
import type { ProductEntity } from '../../_api/entities';

const Questions = React.lazy(() => import('../../_components/questions'));

const { Text } = Typography;

interface ProductTabsProps {
  product: ProductEntity;
}

export default function ProductTabs({ product }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState<string>('1');

  const tabItems = [
    {
      key: '1',
      label: 'مشخصات فنی',
      children: (
        <div className="space-y-3">
          {product.specs?.length > 0 ? (
            product.specs.map((spec, index) => (
              <div key={index} className="flex justify-between border-b border-gray-100 py-2">
                <Text strong className="text-gray-700">
                  {spec.key}:
                </Text>
                <Text className="text-gray-600">{spec.value}</Text>
              </div>
            ))
          ) : (
            <Text className="text-gray-500">مشخصات فنی برای این محصول ثبت نشده است.</Text>
          )}
        </div>
      ),
    },
    {
      key: 'qa',
      label: 'سوالات',
      children: (
        <Suspense fallback={<div className="h-32 animate-pulse rounded-lg bg-gray-200" />}>
          <Questions productId={String(product.id)} />
        </Suspense>
      ),
    },
    {
      key: '3',
      label: 'راهنمای سایز',
      children: (
        <div className="space-y-4">
          <div className="rounded-lg bg-blue-50 p-4">
            <h4 className="mb-2 font-semibold">راهنمای انتخاب سایز:</h4>
            <div className="grid grid-cols-2 gap-4 text-sm md:grid-cols-4">
              <div><strong>S:</strong> 36-38</div>
              <div><strong>M:</strong> 38-40</div>
              <div><strong>L:</strong> 40-42</div>
              <div><strong>XL:</strong> 42-44</div>
            </div>
          </div>
          <p className="text-sm text-gray-600">
            💡 توصیه می‌شود قبل از خرید، جدول سایز را با دقت مطالعه کنید.
          </p>
        </div>
      ),
    },
  ];

  return (
    <Tabs
      activeKey={activeTab}
      onChange={setActiveTab}
      items={tabItems}
      className="custom-tabs"
    />
  );
}

