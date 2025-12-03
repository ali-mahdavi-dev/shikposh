'use client';

import React from 'react';
import { Button, Typography, Divider } from 'antd';
import { OtpInput } from '../OtpInput';

const { Text } = Typography;

interface AuthOtpStepProps {
  phone: string;
  otp: string;
  onOtpChange: (otp: string) => void;
  onVerify: () => void;
  onResend: () => void;
  onBack: () => void;
  countdown: number;
  isLoading: boolean;
  isResending: boolean;
}

export const AuthOtpStep: React.FC<AuthOtpStepProps> = ({
  phone,
  otp,
  onOtpChange,
  onVerify,
  onResend,
  onBack,
  countdown,
  isLoading,
  isResending,
}) => {
  return (
    <div className="space-y-6">
      <div>
        <Text className="mb-2 block text-center text-gray-600">
          کد به شماره <strong>{phone}</strong> ارسال شد
        </Text>
        <OtpInput
          value={otp}
          onChange={onOtpChange}
          length={6}
          disabled={isLoading}
          error={false}
        />
        {otp.length === 6 && (
          <Button
            type="primary"
            size="large"
            onClick={onVerify}
            loading={isLoading}
            block
            className="mt-4 h-12 border-0 bg-gradient-to-r from-pink-500 to-purple-600 font-semibold"
          >
            تایید کد
          </Button>
        )}
      </div>

      <Divider />

      <div className="space-y-2 text-center">
        <Button
          type="link"
          onClick={onResend}
          disabled={countdown > 0 || isResending}
          className="p-0"
        >
          {countdown > 0
            ? `ارسال مجدد کد (${Math.floor(countdown / 60)}:${String(countdown % 60).padStart(2, '0')})`
            : 'ارسال مجدد کد'}
        </Button>

        <div>
          <Button type="link" onClick={onBack} className="p-0">
            تغییر شماره تلفن
          </Button>
        </div>
      </div>
    </div>
  );
};

