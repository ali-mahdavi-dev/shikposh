'use client';

import React, { useMemo } from 'react';
import {
  Avatar,
  Button,
  Card,
  Col,
  Divider,
  Progress,
  Row,
  Space,
  Statistic,
  Tabs,
  Tag,
  Typography,
} from 'antd';
import {
  EditOutlined,
  HeartOutlined,
  HistoryOutlined,
  LogoutOutlined,
  MailOutlined,
  PhoneOutlined,
  ShoppingCartOutlined,
  StarOutlined,
  TrophyOutlined,
  UserOutlined,
  WalletOutlined,
} from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import { logout as logoutAction } from '@/stores/slices/authSlice';
import { useRouter } from 'next/navigation';
import { ProfileSkeleton } from '@/app/_components/skeleton';

const { Title, Text } = Typography;

export default function ProfileClient() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAppSelector((s) => s.auth);
  const wishlistCount = useAppSelector((s) => s.wishlist.productIds.length);
  const cartItemsCount = useAppSelector((s) =>
    s.cart.items.reduce((sum, item) => sum + item.quantity, 0),
  );

  const handleLogout = () => {
    dispatch(logoutAction());
    router.push('/');
  };

  if (isLoading) {
    return <ProfileSkeleton />;
  }

  if (!isAuthenticated || !user) {
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
  }

  const fullName = `${user.first_name || ''} ${user.last_name || ''}`.trim() || 'کاربر شیک‌پوشان';

  // Calculate loyalty level based on orders (placeholder - would come from API)
  const orderCount = 0; // This would come from orders API
  const loyaltyLevel = useMemo(() => {
    if (orderCount >= 50) return { name: 'VIP', color: 'gold', progress: 100, level: 5 };
    if (orderCount >= 30) return { name: 'طلایی', color: 'orange', progress: 80, level: 4 };
    if (orderCount >= 15) return { name: 'نقره‌ای', color: 'default', progress: 60, level: 3 };
    if (orderCount >= 5) return { name: 'برنزی', color: 'cyan', progress: 40, level: 2 };
    return { name: 'عضو جدید', color: 'magenta', progress: 20, level: 1 };
  }, [orderCount]);

  const items = [
    {
      key: 'overview',
      label: 'نمای کلی',
      children: (
        <div className="space-y-6">
          {/* Statistics Cards */}
          <Row gutter={[16, 16]}>
            <Col xs={12} sm={6}>
              <Card className="rounded-xl border-0 bg-gradient-to-br from-pink-50 to-pink-100 shadow-sm transition-all hover:shadow-md">
                <Statistic
                  title={<span className="text-gray-600">سفارش‌ها</span>}
                  value={orderCount}
                  prefix={<ShoppingCartOutlined className="text-pink-500" />}
                  valueStyle={{ color: '#ec4899' }}
                />
              </Card>
            </Col>
            <Col xs={12} sm={6}>
              <Card className="rounded-xl border-0 bg-gradient-to-br from-purple-50 to-purple-100 shadow-sm transition-all hover:shadow-md">
                <Statistic
                  title={<span className="text-gray-600">علاقه‌مندی‌ها</span>}
                  value={wishlistCount}
                  prefix={<HeartOutlined className="text-purple-500" />}
                  valueStyle={{ color: '#a855f7' }}
                />
              </Card>
            </Col>
            <Col xs={12} sm={6}>
              <Card className="rounded-xl border-0 bg-gradient-to-br from-blue-50 to-blue-100 shadow-sm transition-all hover:shadow-md">
                <Statistic
                  title={<span className="text-gray-600">سبد خرید</span>}
                  value={cartItemsCount}
                  prefix={<ShoppingCartOutlined className="text-blue-500" />}
                  valueStyle={{ color: '#3b82f6' }}
                />
              </Card>
            </Col>
            <Col xs={12} sm={6}>
              <Card className="rounded-xl border-0 bg-gradient-to-br from-amber-50 to-amber-100 shadow-sm transition-all hover:shadow-md">
                <Statistic
                  title={<span className="text-gray-600">امتیاز</span>}
                  value={0}
                  prefix={<StarOutlined className="text-amber-500" />}
                  valueStyle={{ color: '#f59e0b' }}
                />
              </Card>
            </Col>
          </Row>

          {/* Main Info Cards */}
          <Row gutter={[24, 24]}>
            <Col xs={24} lg={14}>
              <Card
                title={
                  <span className="flex items-center gap-2">
                    <UserOutlined className="text-pink-500" />
                    اطلاعات تماس
                  </span>
                }
                className="rounded-2xl shadow-sm transition-all hover:shadow-md"
                extra={
                  <Button type="link" icon={<EditOutlined />} className="px-0 text-pink-500">
                    ویرایش
                  </Button>
                }
              >
                <Space direction="vertical" size="large" className="w-full">
                  <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-100">
                      <UserOutlined className="text-pink-500" />
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
                        <PhoneOutlined className="text-green-500" />
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
                      <MailOutlined className="text-blue-500" />
                    </div>
                    <div>
                      <Text type="secondary" className="text-xs">
                        ایمیل
                      </Text>
                      <div className="font-medium text-gray-900">{user.email || 'ثبت نشده'}</div>
                    </div>
                  </div>
                </Space>
              </Card>
            </Col>
            <Col xs={24} lg={10}>
              <Card
                title={
                  <span className="flex items-center gap-2">
                    <TrophyOutlined className="text-amber-500" />
                    وضعیت حساب
                  </span>
                }
                className="rounded-2xl shadow-sm transition-all hover:shadow-md"
              >
                <Space direction="vertical" size="large" className="w-full">
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <Text className="text-sm text-gray-600">سطح وفاداری</Text>
                      <Tag color={loyaltyLevel.color} className="font-medium">
                        {loyaltyLevel.name}
                      </Tag>
                    </div>
                    <Progress
                      percent={loyaltyLevel.progress}
                      strokeColor={{
                        '0%': '#ec4899',
                        '100%': '#a855f7',
                      }}
                      showInfo={false}
                      className="mb-1"
                    />
                    <Text type="secondary" className="text-xs">
                      {orderCount} سفارش از 50 سفارش برای سطح بعدی
                    </Text>
                  </div>
                  <Divider className="my-2" />
                  <div className="space-y-3">
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
                      <Tag color="success" className="font-medium">
                        فعال
                      </Tag>
                    </div>
                  </div>
                </Space>
              </Card>
            </Col>
          </Row>
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
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Profile Header */}
      <Card className="mb-6 overflow-hidden rounded-2xl border-0 bg-gradient-to-l from-pink-50 via-white to-purple-50 shadow-lg transition-all hover:shadow-xl">
        <Row gutter={[24, 24]} align="middle">
          <Col xs={24} md={8} className="flex justify-center md:justify-start">
            <Space
              align="center"
              size="large"
              direction="vertical"
              className="w-full md:w-auto md:flex-row"
            >
              <div className="relative">
                <Avatar
                  size={120}
                  src={user.avatar}
                  icon={!user.avatar && <UserOutlined />}
                  className="border-4 border-white shadow-lg ring-4 ring-pink-100 transition-all hover:ring-pink-200"
                />
                <div className="absolute right-0 bottom-0 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-green-500 shadow-md">
                  <div className="h-3 w-3 rounded-full bg-white"></div>
                </div>
              </div>
              <div className="space-y-2 text-center md:text-right">
                <Title level={2} className="mb-1 text-gray-900">
                  {fullName}
                </Title>
                <Text type="secondary" className="block text-base">
                  خوش آمدید به دنیای شیک‌پوشان ✨
                </Text>
                <Space wrap className="justify-center md:justify-start">
                  <Tag color={loyaltyLevel.color} className="font-medium">
                    <TrophyOutlined className="ml-1" />
                    {loyaltyLevel.name}
                  </Tag>
                  <Tag color="success" className="font-medium">
                    حساب فعال
                  </Tag>
                </Space>
              </div>
            </Space>
          </Col>
          <Col xs={24} md={16}>
            <div className="flex flex-col items-center justify-end gap-3 md:flex-row">
              <Space wrap className="w-full justify-center md:w-auto md:justify-end">
                <Button
                  icon={<EditOutlined />}
                  size="large"
                  className="transition-all hover:scale-105"
                >
                  ویرایش پروفایل
                </Button>
                <Button
                  icon={<HistoryOutlined />}
                  size="large"
                  onClick={() => router.push('/orders')}
                  className="transition-all hover:scale-105"
                >
                  تاریخچه سفارش‌ها
                </Button>
              </Space>
              <Divider type="vertical" className="hidden h-10 md:block" />
              <Button
                type="primary"
                danger
                icon={<LogoutOutlined />}
                size="large"
                onClick={handleLogout}
                className="w-full transition-all hover:scale-105 md:w-auto"
              >
                خروج از حساب
              </Button>
            </div>
          </Col>
        </Row>
      </Card>

      {/* Tabs */}
      <Card className="rounded-2xl border-0 bg-white shadow-lg">
        <Tabs
          defaultActiveKey="overview"
          items={items}
          tabBarGutter={32}
          size="large"
          className="profile-tabs"
        />
      </Card>
    </div>
  );
}
