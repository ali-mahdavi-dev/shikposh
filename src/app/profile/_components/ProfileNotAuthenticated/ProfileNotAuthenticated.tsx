'use client';

import React from 'react';
import { Button, Space, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';

const { Title, Text } = Typography;

export const ProfileNotAuthenticated: React.FC = () => {
  const router = useRouter();

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center rounded-2xl bg-gradient-to-l from-pink-50 via-white to-purple-50 px-6 py-12 shadow-lg">
      <div className="mb-6 rounded-full bg-pink-100 p-6">
        <UserOutlined className="text-6xl text-pink-500" />
      </div>
      <Title level={3} className="mb-2 text-gray-900">
        برای مشاهده پروفایل وارد حساب کاربری شوید
      </Title>
      <Text type="secondary" className="mb-6 text-center text-base">
        برای دسترسی به اطلاعات شخصی، سفارش‌ها و علاقه‌مندی‌ها ابتدا باید وارد یا ثبت‌نام کنید.
      </Text>
      <Space size="middle" direction="vertical" className="w-full sm:w-auto">
        <Button
          type="primary"
          size="large"
          block
          className="sm:w-auto"
          onClick={() => router.push('/auth')}
        >
          ورود / ثبت‌نام
        </Button>
        <Button size="large" block className="sm:w-auto" onClick={() => router.push('/')}>
          بازگشت به صفحه اصلی
        </Button>
      </Space>
    </div>
  );
};
