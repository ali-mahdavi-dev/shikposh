'use client';

import React from 'react';
import { Card, Tabs, Button, Typography } from 'antd';
import {
  EditOutlined,
  HeartOutlined,
  HistoryOutlined,
  ShoppingCartOutlined,
  WalletOutlined,
} from '@ant-design/icons';
import { useRouter } from 'next/navigation';

const { Title, Text } = Typography;

interface ProfileTabsProps {
  orderCount: number;
  wishlistCount: number;
  cartItemsCount: number;
  loyaltyLevel: {
    name: string;
    color: string;
    progress: number;
  };
  user: {
    first_name?: string;
    last_name?: string;
    phone?: string;
    email?: string;
  };
}

export const ProfileTabs: React.FC<ProfileTabsProps> = ({
  orderCount,
  wishlistCount,
  cartItemsCount,
  loyaltyLevel,
  user,
}) => {
  const router = useRouter();
  const fullName = `${user.first_name || ''} ${user.last_name || ''}`.trim() || 'کاربر شیک‌پوشان';

  const items = [
    {
      key: 'overview',
      label: 'نمای کلی',
      children: (
        <div className="space-y-6">
          {/* Statistics Cards */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-xl border-0 bg-gradient-to-br from-pink-50 to-pink-100 p-4 shadow-sm transition-all hover:shadow-md">
              <div className="flex items-center gap-2">
                <ShoppingCartOutlined className="text-pink-500" />
                <div>
                  <div className="text-xs text-gray-600">سفارش‌ها</div>
                  <div className="text-lg font-semibold text-pink-600">{orderCount}</div>
                </div>
              </div>
            </div>
            <div className="rounded-xl border-0 bg-gradient-to-br from-purple-50 to-purple-100 p-4 shadow-sm transition-all hover:shadow-md">
              <div className="flex items-center gap-2">
                <HeartOutlined className="text-purple-500" />
                <div>
                  <div className="text-xs text-gray-600">علاقه‌مندی‌ها</div>
                  <div className="text-lg font-semibold text-purple-600">{wishlistCount}</div>
                </div>
              </div>
            </div>
            <div className="rounded-xl border-0 bg-gradient-to-br from-blue-50 to-blue-100 p-4 shadow-sm transition-all hover:shadow-md">
              <div className="flex items-center gap-2">
                <ShoppingCartOutlined className="text-blue-500" />
                <div>
                  <div className="text-xs text-gray-600">سبد خرید</div>
                  <div className="text-lg font-semibold text-blue-600">{cartItemsCount}</div>
                </div>
              </div>
            </div>
            <div className="rounded-xl border-0 bg-gradient-to-br from-amber-50 to-amber-100 p-4 shadow-sm transition-all hover:shadow-md">
              <div className="flex items-center gap-2">
                <div className="text-xs text-gray-600">امتیاز</div>
                <div className="text-lg font-semibold text-amber-600">0</div>
              </div>
            </div>
          </div>

          {/* Main Info Cards */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[2fr_1fr]">
            <div className="rounded-2xl border bg-white p-6 shadow-sm transition-all hover:shadow-md">
              <div className="mb-4 flex items-center justify-between">
                <Title level={5} className="mb-0 flex items-center gap-2">
                  <span className="text-pink-500">👤</span>
                  اطلاعات تماس
                </Title>
                <Button type="link" icon={<EditOutlined />} className="px-0 text-pink-500">
                  ویرایش
                </Button>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-100">
                    <span className="text-pink-500">👤</span>
                  </div>
                  <div>
                    <Text type="secondary" className="text-xs">
                      نام و نام خانوادگی
                    </Text>
                    <div className="font-medium text-gray-900">{fullName}</div>
                  </div>
                </div>
                {user.phone && (
                  <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                      <span className="text-green-500">📱</span>
                    </div>
                    <div>
                      <Text type="secondary" className="text-xs">
                        شماره تلفن
                      </Text>
                      <div className="font-medium text-gray-900">{user.phone}</div>
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                    <span className="text-blue-500">✉️</span>
                  </div>
                  <div>
                    <Text type="secondary" className="text-xs">
                      ایمیل
                    </Text>
                    <div className="font-medium text-gray-900">{user.email || 'ثبت نشده'}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="rounded-2xl border bg-white p-6 shadow-sm transition-all hover:shadow-md">
              <Title level={5} className="mb-4 flex items-center gap-2">
                <span className="text-amber-500">🏆</span>
                وضعیت حساب
              </Title>
              <div className="space-y-4">
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <Text className="text-sm text-gray-600">سطح وفاداری</Text>
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-medium`}
                      style={{
                        backgroundColor: `${loyaltyLevel.color}20`,
                        color: loyaltyLevel.color,
                      }}
                    >
                      {loyaltyLevel.name}
                    </span>
                  </div>
                  <div className="mb-1 h-2 w-full rounded-full bg-gray-200">
                    <div
                      className="h-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-500"
                      style={{ width: `${loyaltyLevel.progress}%` }}
                    />
                  </div>
                  <Text type="secondary" className="text-xs">
                    {orderCount} سفارش از 50 سفارش برای سطح بعدی
                  </Text>
                </div>
                <div className="space-y-2 border-t pt-4">
                  <div className="flex items-center justify-between rounded-lg bg-gray-50 p-2">
                    <Text className="text-sm">تعداد سفارش‌ها</Text>
                    <Text strong className="text-pink-500">
                      {orderCount.toLocaleString('fa-IR')}
                    </Text>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-gray-50 p-2">
                    <Text className="text-sm">محصولات مورد علاقه</Text>
                    <Text strong className="text-purple-500">
                      {wishlistCount.toLocaleString('fa-IR')}
                    </Text>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-gray-50 p-2">
                    <Text className="text-sm">وضعیت حساب</Text>
                    <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                      فعال
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      key: 'orders',
      label: (
        <span>
          <HistoryOutlined className="ml-1 align-middle" />
          سفارش‌ها
        </span>
      ),
      children: (
        <div className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 p-8 text-center">
          <div className="mb-4 rounded-full bg-pink-100 p-6">
            <ShoppingCartOutlined className="text-5xl text-pink-500" />
          </div>
          <Title level={4} className="mb-2 text-gray-900">
            هنوز سفارشی ثبت نکرده‌اید
          </Title>
          <Text type="secondary" className="mb-6 max-w-md text-base">
            اولین خرید خود را انجام دهید تا اینجا تاریخچه سفارش‌هایتان نمایش داده شود.
          </Text>
          <Button
            type="primary"
            size="large"
            icon={<ShoppingCartOutlined />}
            onClick={() => router.push('/products')}
          >
            شروع خرید
          </Button>
        </div>
      ),
    },
    {
      key: 'wishlist',
      label: (
        <span>
          <HeartOutlined className="ml-1 align-middle" />
          علاقه‌مندی‌ها
        </span>
      ),
      children: (
        <div className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 p-8 text-center">
          <div className="mb-4 rounded-full bg-purple-100 p-6">
            <HeartOutlined className="text-5xl text-purple-500" />
          </div>
          <Title level={4} className="mb-2 text-gray-900">
            {wishlistCount > 0
              ? 'لیست علاقه‌مندی‌هایتان اینجاست'
              : 'هنوز محصولی به علاقه‌مندی‌ها اضافه نکرده‌اید'}
          </Title>
          <Text type="secondary" className="mb-6 max-w-md text-base">
            {wishlistCount > 0
              ? 'برای مشاهده و مدیریت علاقه‌مندی‌ها به صفحه اختصاصی آن بروید.'
              : 'محصولات مورد علاقه خود را ذخیره کنید تا بعداً راحت‌تر پیدا کنید.'}
          </Text>
          <Button
            type={wishlistCount > 0 ? 'default' : 'primary'}
            size="large"
            icon={<HeartOutlined />}
            onClick={() => router.push('/wishlist')}
          >
            {wishlistCount > 0 ? 'مشاهده علاقه‌مندی‌ها' : 'مشاهده محصولات'}
          </Button>
        </div>
      ),
    },
    {
      key: 'addresses',
      label: (
        <span>
          <WalletOutlined className="ml-1 align-middle" />
          آدرس‌ها
        </span>
      ),
      children: (
        <div className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 p-8 text-center">
          <div className="mb-4 rounded-full bg-blue-100 p-6">
            <WalletOutlined className="text-5xl text-blue-500" />
          </div>
          <Title level={4} className="mb-2 text-gray-900">
            هنوز آدرسی ثبت نکرده‌اید
          </Title>
          <Text type="secondary" className="mb-6 max-w-md text-base">
            آدرس خود را اضافه کنید تا در زمان خرید سریع‌تر بتوانید سفارش دهید.
          </Text>
          <Button type="primary" size="large" icon={<EditOutlined />}>
            افزودن آدرس جدید
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Card className="rounded-xl border-0 bg-white shadow-lg md:rounded-2xl">
      <Tabs
        defaultActiveKey="overview"
        items={items}
        tabBarGutter={16}
        size="large"
        className="profile-tabs"
        tabBarStyle={{
          overflowX: 'auto',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      />
    </Card>
  );
};
