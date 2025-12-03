'use client';

import React from 'react';
import { Form, Input, Button, Divider } from 'antd';
import { UserOutlined, MailOutlined } from '@ant-design/icons';

interface AuthRegisterStepProps {
  onRegister: (values: { firstName: string; lastName: string; email?: string }) => void;
  onBack: () => void;
  isLoading: boolean;
}

export const AuthRegisterStep: React.FC<AuthRegisterStepProps> = ({
  onRegister,
  onBack,
  isLoading,
}) => {
  const [form] = Form.useForm();

  const handleFinish = async (values: { firstName: string; lastName: string; email?: string }) => {
    try {
      await form.validateFields(['firstName', 'lastName']);
      onRegister(values);
    } catch (error) {
      // Validation error handled by form
    }
  };

  return (
    <div className="space-y-6">
      <Form form={form} layout="vertical" onFinish={handleFinish} className="space-y-4">
        <Form.Item
          name="firstName"
          label="نام"
          rules={[
            { required: true, message: 'نام الزامی است' },
            { min: 2, message: 'نام باید حداقل 2 کاراکتر باشد' },
          ]}
        >
          <Input size="large" prefix={<UserOutlined />} placeholder="نام خود را وارد کنید" />
        </Form.Item>

        <Form.Item
          name="lastName"
          label="نام خانوادگی"
          rules={[
            { required: true, message: 'نام خانوادگی الزامی است' },
            { min: 2, message: 'نام خانوادگی باید حداقل 2 کاراکتر باشد' },
          ]}
        >
          <Input
            size="large"
            prefix={<UserOutlined />}
            placeholder="نام خانوادگی خود را وارد کنید"
          />
        </Form.Item>

        <Form.Item
          name="email"
          label="ایمیل (اختیاری)"
          rules={[
            {
              type: 'email',
              message: 'ایمیل معتبر نیست',
            },
          ]}
        >
          <Input size="large" prefix={<MailOutlined />} placeholder="example@email.com" dir="ltr" />
        </Form.Item>

        <Button
          type="primary"
          size="large"
          htmlType="submit"
          loading={isLoading}
          block
          className="h-12 border-0 bg-gradient-to-r from-pink-500 to-purple-600 font-semibold"
        >
          تکمیل ثبت نام
        </Button>
      </Form>

      <Divider />

      <div className="text-center">
        <Button type="link" onClick={onBack} className="p-0">
          بازگشت به تایید کد
        </Button>
      </div>
    </div>
  );
};
