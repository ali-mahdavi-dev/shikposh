'use client';

import React from 'react';
import { Typography } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import Link from 'next/link';

const { Title, Text } = Typography;

type Step = 'phone' | 'otp' | 'register';

interface AuthHeaderProps {
  currentStep: Step;
}

export const AuthHeader: React.FC<AuthHeaderProps> = ({ currentStep }) => {
  return (
    <div className="mb-4 text-center sm:mb-6">
      <Link
        href="/"
        className="mb-3 inline-flex items-center text-sm !text-gray-600 hover:!text-pink-600 sm:mb-4 sm:text-base"
      >
        <ArrowLeftOutlined className="ml-2" />
        بازگشت به صفحه اصلی
      </Link>
      <Title level={2} className="mb-2 !text-xl sm:!text-2xl">
        {currentStep === 'register' ? 'تکمیل اطلاعات' : 'ورود / ثبت نام'}
      </Title>
      <Text className="text-sm text-gray-600 sm:text-base">
        {currentStep === 'phone'
          ? 'شماره تلفن خود را وارد کنید'
          : currentStep === 'otp'
            ? 'کد ارسال شده به شماره شما را وارد کنید'
            : 'لطفاً اطلاعات خود را تکمیل کنید'}
      </Text>
    </div>
  );
};

