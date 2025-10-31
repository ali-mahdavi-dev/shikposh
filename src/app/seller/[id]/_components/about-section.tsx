'use client';

import React from 'react';
import { Card, Typography, Rate, Tag } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import type { Seller } from '../_types';

const { Title, Paragraph, Text } = Typography;

export interface AboutSectionProps {
  seller: Seller;
}

export function AboutSection({ seller }: AboutSectionProps) {
  return (
    <div className="space-y-6">
      <Card className="rounded-xl shadow-md">
        <Title level={3} className="mb-4">
          درباره فروشنده
        </Title>
        <Paragraph className="leading-relaxed text-gray-600">
          {seller?.description || 'توضیحاتی در دسترس نیست'}
        </Paragraph>

        <div className="mt-6 border-t border-gray-200 pt-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <Text strong className="mb-2 block">
                تعداد محصولات
              </Text>
              <Text className="text-gray-600">{seller?.totalProducts || 0} محصول</Text>
            </div>
            <div>
              <Text strong className="mb-2 block">
                تاریخ عضویت
              </Text>
              <Text className="text-gray-600">از سال {seller?.joinDate || 'نامشخص'}</Text>
            </div>
            <div>
              <Text strong className="mb-2 block">
                امتیاز فروشنده
              </Text>
              <div className="flex items-center gap-2">
                <Rate disabled defaultValue={seller?.rating || 0} />
                <Text className="text-gray-600">{(seller?.rating || 0).toFixed(1)}</Text>
              </div>
            </div>
            <div>
              <Text strong className="mb-2 block">
                وضعیت حساب
              </Text>
              {seller?.verified ? (
                <Tag color="success" icon={<CheckOutlined />}>
                  تایید شده
                </Tag>
              ) : (
                <Tag color="default">در انتظار تایید</Tag>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6 border-t border-gray-200 pt-6">
          <Title level={4} className="mb-4">
            دسته‌بندی‌های اصلی
          </Title>
          <div className="flex flex-wrap gap-2">
            {seller?.categories?.map((category, idx) => {
              if (typeof category === 'string') {
                return (
                  <Tag key={`cat-${idx}`} color="pink" className="px-3 py-1">
                    {category}
                  </Tag>
                );
              }
              return (
                <Tag key={category.id} color="pink" className="px-3 py-1">
                  {category.name} ({category.count})
                </Tag>
              );
            })}
          </div>
        </div>
      </Card>
    </div>
  );
}

export default AboutSection;
