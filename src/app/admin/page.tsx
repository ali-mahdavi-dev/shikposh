'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/stores/hooks';
import { hasPermission, PermissionScope, isAdmin } from '@/shared/utils/permissions';
import { useDashboardStats, useDailySales } from './_api';
import { Card, Typography, Row, Col, Statistic, Button, Space, Spin } from 'antd';
import {
  ShoppingCartOutlined,
  UserOutlined,
  AppstoreOutlined,
  DollarOutlined,
  ArrowRightOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import DailySalesChart from './_components/daily-sales-chart';

const { Title, Paragraph } = Typography;

export default function AdminPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAppSelector((state) => state.auth);
  const [mounted, setMounted] = useState(false);

  // Fetch dashboard data
  const { data: stats, isLoading: statsLoading } = useDashboardStats();
  const { data: dailySales, isLoading: salesLoading } = useDailySales(7);

  // Wait for component to mount
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Redirect if not authenticated or not admin/superuser (only after mount and loading is complete)
    if (mounted && !isLoading) {
      if (!isAuthenticated || !isAdmin(user)) {
        router.push('/');
      }
    }
  }, [mounted, isLoading, isAuthenticated, user, router]);

  // Show loading while checking auth
  if (!mounted || isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-pink-500"></div>
      </div>
    );
  }

  // Show nothing if not admin or superuser
  if (!isAuthenticated || !isAdmin(user)) {
    return null;
  }

  return (
    <div className="admin-dashboard">
      <Title level={2} className="mb-6">
        داشبورد مدیریت
      </Title>
      <Paragraph className="mb-8 text-gray-600">
        خوش آمدید {user?.first_name} {user?.last_name}
      </Paragraph>

      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="کل سفارش‌ها"
              value={stats?.total_orders || 0}
              prefix={<ShoppingCartOutlined />}
              valueStyle={{ color: '#ec4899' }}
              loading={statsLoading}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="کل کاربران"
              value={stats?.total_users || 0}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#10b981' }}
              loading={statsLoading}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="کل محصولات"
              value={stats?.total_products || 0}
              prefix={<AppstoreOutlined />}
              valueStyle={{ color: '#8b5cf6' }}
              loading={statsLoading}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="درآمد کل"
              value={stats?.total_revenue || 0}
              prefix={<DollarOutlined />}
              suffix="تومان"
              valueStyle={{ color: '#f59e0b' }}
              loading={statsLoading}
            />
          </Card>
        </Col>
      </Row>

      {/* Daily Sales Chart */}
      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24}>
          {salesLoading ? (
            <Card>
              <div className="flex items-center justify-center py-12">
                <Spin size="large" />
              </div>
            </Card>
          ) : (
            <DailySalesChart data={dailySales} />
          )}
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card title="مدیریت محصولات" className="h-full">
            <Space direction="vertical" size="middle" className="w-full">
              <Button
                type="primary"
                block
                icon={<AppstoreOutlined />}
                onClick={() => router.push('/admin/products')}
              >
                مشاهده محصولات
              </Button>
              <Button
                block
                icon={<ArrowRightOutlined />}
                onClick={() => router.push('/admin/products/new')}
              >
                افزودن محصول جدید
              </Button>
            </Space>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="مدیریت سفارش‌ها" className="h-full">
            <Space direction="vertical" size="middle" className="w-full">
              <Button
                type="primary"
                block
                icon={<ShoppingCartOutlined />}
                onClick={() => router.push('/admin/orders')}
              >
                مشاهده سفارش‌ها
              </Button>
            </Space>
          </Card>
        </Col>
        {hasPermission(user, PermissionScope.MANAGE_USERS) && (
          <Col xs={24} lg={12}>
            <Card title="مدیریت کاربران" className="h-full">
              <Space direction="vertical" size="middle" className="w-full">
                <Button
                  type="primary"
                  block
                  icon={<UserOutlined />}
                  onClick={() => router.push('/admin/users')}
                >
                  مشاهده کاربران
                </Button>
              </Space>
            </Card>
          </Col>
        )}
        <Col xs={24} lg={12}>
          <Card title="تنظیمات" className="h-full">
            <Space direction="vertical" size="middle" className="w-full">
              <Button block onClick={() => router.push('/admin/settings')}>
                تنظیمات سیستم
              </Button>
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
