'use client';

import React from 'react';
import { Form, Input, Button } from 'antd';
import { PhoneOutlined } from '@ant-design/icons';

interface AuthPhoneStepProps {
  phone: string;
  onPhoneChange: (phone: string) => void;
  onSendOtp: () => void;
  isLoading: boolean;
}

export const AuthPhoneStep: React.FC<AuthPhoneStepProps> = ({
  phone,
  onPhoneChange,
  onSendOtp,
  isLoading,
}) => {
  const [form] = Form.useForm();

  const formatPhoneNumber = (value: string) => {
    const digits = value.replace(/\D/g, '');
    if (digits.length > 11) {
      return phone;
    }
    return digits;
  };

  const handleFinish = async () => {
    try {
      await form.validateFields(['phone']);
      onSendOtp();
    } catch (error) {
      // Validation error handled by form
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleFinish} className="space-y-4">
      <Form.Item
        name="phone"
        label="شماره تلفن"
        rules={[
          { required: true, message: 'شماره تلفن الزامی است' },
          {
            pattern: /^09\d{9}$/,
            message: 'شماره تلفن معتبر نیست. فرمت صحیح: 09123456789',
          },
        ]}
      >
        <Input
          size="large"
          prefix={<PhoneOutlined />}
          placeholder="09123456789"
          value={phone}
          onChange={(e) => onPhoneChange(formatPhoneNumber(e.target.value))}
          maxLength={11}
          className="text-center"
          dir="ltr"
        />
      </Form.Item>

      <Button
        type="primary"
        size="large"
        htmlType="submit"
        loading={isLoading}
        block
        className="h-12 border-0 bg-gradient-to-r from-pink-500 to-purple-600 font-semibold"
      >
        ارسال کد تایید
      </Button>
    </Form>
  );
};
