'use client';

import React from 'react';
import { Card, Row, Col, Avatar, Button, Space, Divider, Tag, Typography } from 'antd';
import {
  EditOutlined,
  HistoryOutlined,
  LogoutOutlined,
  TrophyOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useRouter } from 'next/navigation';

const { Title, Text } = Typography;

interface ProfileHeaderProps {
  user: {
    first_name?: string;
    last_name?: string;
    avatar?: string;
  };
  loyaltyLevel: {
    name: string;
    color: string;
  };
  onLogout: () => void;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user, loyaltyLevel, onLogout }) => {
  const router = useRouter();
  const fullName = `${user.first_name || ''} ${user.last_name || ''}`.trim() || 'کاربر شیک‌پوشان';

  return (
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
              onClick={onLogout}
              className="w-full transition-all hover:scale-105 md:w-auto"
            >
              خروج از حساب
            </Button>
          </div>
        </Col>
      </Row>
    </Card>
  );
};
