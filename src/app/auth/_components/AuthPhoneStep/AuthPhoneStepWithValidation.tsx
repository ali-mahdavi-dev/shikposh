'use client';

import React from 'react';
import { Form, Input, Button } from 'antd';
import { PhoneOutlined } from '@ant-design/icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { loginRequestSchema } from '@/lib/validation/schemas/auth.schema';
import type { LoginRequest } from '@/lib/validation/dto/request';
import { handleError } from '@/lib/errors';

interface AuthPhoneStepProps {
  phone: string;
  onPhoneChange: (phone: string) => void;
  onSendOtp: (data: LoginRequest) => Promise<void>;
  isLoading: boolean;
}

/**
 * AuthPhoneStep with Zod validation
 * Example of using enterprise validation patterns
 */
export const AuthPhoneStepWithValidation: React.FC<AuthPhoneStepProps> = ({
  phone,
  onPhoneChange,
  onSendOtp,
  isLoading,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<LoginRequest>({
    resolver: zodResolver(loginRequestSchema),
    defaultValues: { phone },
  });

  const watchedPhone = watch('phone');

  React.useEffect(() => {
    if (watchedPhone !== phone) {
      onPhoneChange(watchedPhone || '');
    }
  }, [watchedPhone, phone, onPhoneChange]);

  const formatPhoneNumber = (value: string) => {
    const digits = value.replace(/\D/g, '');
    if (digits.length > 11) {
      return phone;
    }
    return digits;
  };

  const onSubmit = async (data: LoginRequest) => {
    try {
      await onSendOtp(data);
    } catch (error) {
      // Use enterprise error handling
      const appError = handleError(error);
      console.error('Login error:', appError.toJSON());
      // You can show error to user using toast/notification
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="phone" className="block text-sm font-medium mb-2">
          شماره تلفن
        </label>
        <Input
          id="phone"
          size="large"
          prefix={<PhoneOutlined />}
          placeholder="09123456789"
          value={phone}
          onChange={(e) => {
            const formatted = formatPhoneNumber(e.target.value);
            setValue('phone', formatted);
            onPhoneChange(formatted);
          }}
          status={errors.phone ? 'error' : ''}
        />
        {errors.phone && (
          <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
        )}
      </div>

      <Button
        type="primary"
        size="large"
        block
        htmlType="submit"
        loading={isLoading}
        className="mt-4"
      >
        ارسال کد تایید
      </Button>
    </form>
  );
};

