'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Card, Button, Space, Typography, Empty } from 'antd';
import { PlusOutlined, ArrowLeftOutlined } from '@ant-design/icons';

const { Title } = Typography;

export default function ProductsPage() {
  const router = useRouter();

  return (
    <div className="container mx-auto py-6">
      <Space direction="vertical" size="large" className="w-full">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Title level={2} className="mb-0!">
            مدیریت محصولات
          </Title>
          <Space>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => router.push('/admin/products/new')}
            >
              افزودن محصول جدید
            </Button>
            <Button icon={<ArrowLeftOutlined />} onClick={() => router.push('/admin')}>
              بازگشت به داشبورد
            </Button>
          </Space>
        </div>

        {/* Products List - Placeholder */}
        <Card>
          <Empty
            description="لیست محصولات به زودی اضافه خواهد شد"
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
        </Card>
      </Space>
    </div>
  );
}
