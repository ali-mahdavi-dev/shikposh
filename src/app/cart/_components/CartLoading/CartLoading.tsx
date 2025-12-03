'use client';

import React from 'react';
import { Typography } from 'antd';
import { ContentLoading } from '@/shared';

const { Title } = Typography;

export const CartLoading: React.FC = () => {
  return (
    <>
      <Title level={2} className="mb-6 text-gray-800">
        سبد خرید
      </Title>
      <ContentLoading tip="در حال بارگذاری سبد خرید..." />
    </>
  );
};

