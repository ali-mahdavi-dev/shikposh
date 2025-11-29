'use client';

import React, { useState, useEffect } from 'react';
import { Card, Input, Button, Typography, Form, Divider, Steps, App } from 'antd';
import { PhoneOutlined, UserOutlined, MailOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { OtpInput } from './_components';
import { useSendOtp, useVerifyOtp, useRegister } from './_api';
import { useAppSelector, useAppDispatch } from '@/stores/hooks';
import { setCredentials } from '@/stores/slices/authSlice';
import { getErrorMessage } from '@/shared/utils/error-handler';

const { Title, Text } = Typography;

type Step = 'phone' | 'otp' | 'register';

export default function AuthClient() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { message } = App.useApp();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const [currentStep, setCurrentStep] = useState<Step>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [countdown, setCountdown] = useState(0);
  const [form] = Form.useForm();

  const sendOtpMutation = useSendOtp();
  const verifyOtpMutation = useVerifyOtp();
  const registerMutation = useRegister();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  // Countdown timer
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleSendOtp = async () => {
    try {
      await form.validateFields(['phone']);

      const result = await sendOtpMutation.mutateAsync({
        phone,
      });

      if (result.success) {
        message.success('کد OTP به شماره شما ارسال شد');
        setCurrentStep('otp');
        setCountdown(120); // 2 minutes
      }
    } catch (error: any) {
      message.error(error?.message || 'خطا در ارسال کد OTP');
    }
  };

  const handleVerifyOtp = async () => {
    if (otp.length !== 6) {
      message.error('لطفاً کد 6 رقمی را وارد کنید');
      return;
    }

    try {
      const verifyResult = await verifyOtpMutation.mutateAsync({
        phone,
        otp,
      });

      // Check if user exists
      if (verifyResult.user_exists === false) {
        // User doesn't exist, go to register form
        setCurrentStep('register');
        message.info('لطفاً اطلاعات خود را تکمیل کنید');
      } else if (verifyResult.user && verifyResult.token) {
        // User exists, login successful - save tokens
        const backendUser = verifyResult.user;

        // Handle is_admin - it should be boolean, but handle edge cases
        // Sometimes backend might send it as string or number, so we handle all cases
        let isAdminValue = false;
        const isAdmin: any = backendUser.is_admin;
        if (isAdmin === true || isAdmin === 'true' || isAdmin === 1 || isAdmin === '1') {
          isAdminValue = true;
        } else if (typeof isAdmin === 'string' && isAdmin.toLowerCase() === 'true') {
          isAdminValue = true;
        }

        // Handle is_superuser
        let isSuperuserValue = false;
        const isSuperuser: any = backendUser.is_superuser;
        if (
          isSuperuser === true ||
          isSuperuser === 'true' ||
          isSuperuser === 1 ||
          isSuperuser === '1'
        ) {
          isSuperuserValue = true;
        } else if (typeof isSuperuser === 'string' && isSuperuser.toLowerCase() === 'true') {
          isSuperuserValue = true;
        }

        const normalizedUser = {
          id: String(backendUser.id),
          first_name: backendUser.first_name || '',
          last_name: backendUser.last_name || '',
          email: backendUser.email || '',
          phone: backendUser.phone || phone,
          avatar: backendUser.avatar,
          is_admin: isAdminValue,
          is_superuser: isSuperuserValue,
        };

        dispatch(
          setCredentials({
            user: normalizedUser,
            token: verifyResult.token,
            refreshToken: verifyResult.refresh_token,
          }),
        );
        message.success('ورود با موفقیت انجام شد');
        router.push('/');
      } else {
        message.error('خطا در تایید کد OTP');
        setOtp('');
      }
    } catch (error: any) {
      // Log error for debugging
      console.error('Verify OTP Error in component:', {
        error: error,
        errorMessage: error?.message,
        errorType: error?.constructor?.name,
        errorString: String(error),
      });

      // Use the error handler utility to get the message
      const errorMessage = getErrorMessage(error) || 'کد OTP نامعتبر است';

      message.error(errorMessage);
      setOtp('');
    }
  };

  const handleRegister = async () => {
    try {
      const values = await form.validateFields(['firstName', 'lastName']);

      // Register user
      const result = await registerMutation.mutateAsync({
        phone,
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        avatarIdentifier: phone,
      });

      // If registration returns token, log user in automatically
      if (result.token && result.user) {
        const backendUser = result.user;

        // Handle is_admin
        let isAdminValue = false;
        const isAdmin: any = backendUser.is_admin;
        if (isAdmin === true || isAdmin === 'true' || isAdmin === 1 || isAdmin === '1') {
          isAdminValue = true;
        } else if (typeof isAdmin === 'string' && isAdmin.toLowerCase() === 'true') {
          isAdminValue = true;
        }

        // Handle is_superuser
        let isSuperuserValue = false;
        const isSuperuser: any = backendUser.is_superuser;
        if (
          isSuperuser === true ||
          isSuperuser === 'true' ||
          isSuperuser === 1 ||
          isSuperuser === '1'
        ) {
          isSuperuserValue = true;
        } else if (typeof isSuperuser === 'string' && isSuperuser.toLowerCase() === 'true') {
          isSuperuserValue = true;
        }

        const normalizedUser = {
          id: String(backendUser.id),
          first_name: backendUser.first_name || '',
          last_name: backendUser.last_name || '',
          email: backendUser.email || '',
          phone: backendUser.phone || phone,
          avatar: backendUser.avatar,
          is_admin: isAdminValue,
          is_superuser: isSuperuserValue,
        };

        dispatch(
          setCredentials({
            user: normalizedUser,
            token: result.token,
            refreshToken: result.refresh_token,
          }),
        );
        message.success('ثبت نام با موفقیت انجام شد');
        router.push('/');
      } else {
        message.success('ثبت نام با موفقیت انجام شد. لطفاً وارد شوید');
        // Reset form and go back to phone step
        setCurrentStep('phone');
        setPhone('');
        setOtp('');
        form.resetFields();
      }
    } catch (error: any) {
      message.error(error?.message || 'خطا در ثبت نام');
    }
  };

  const handleResendOtp = async () => {
    if (countdown > 0) {
      message.warning(`لطفاً ${countdown} ثانیه صبر کنید`);
      return;
    }

    try {
      await sendOtpMutation.mutateAsync({
        phone,
      });

      message.success('کد جدید ارسال شد');
      setCountdown(120);
      setOtp('');
    } catch (error: any) {
      message.error(error?.message || 'خطا در ارسال مجدد کد');
    }
  };

  const formatPhoneNumber = (value: string) => {
    const digits = value.replace(/\D/g, '');
    if (digits.length > 11) {
      return phone;
    }
    return digits;
  };

  const getStepNumber = () => {
    switch (currentStep) {
      case 'phone':
        return 0;
      case 'otp':
        return 1;
      case 'register':
        return 2;
      default:
        return 0;
    }
  };

  return (
    <div className="flex min-h-screen items-start justify-center bg-gradient-to-br from-pink-50 to-purple-50 px-4 py-12">
      <Card className="w-full max-w-md shadow-2xl">
        <div className="mb-6 text-center">
          <Link
            href="/"
            className="mb-4 inline-flex items-center !text-gray-600 hover:!text-pink-600"
          >
            <ArrowLeftOutlined className="ml-2" />
            بازگشت به صفحه اصلی
          </Link>
          <Title level={2} className="mb-2">
            {currentStep === 'register' ? 'تکمیل اطلاعات' : 'ورود / ثبت نام'}
          </Title>
          <Text className="text-gray-600">
            {currentStep === 'phone'
              ? 'شماره تلفن خود را وارد کنید'
              : currentStep === 'otp'
                ? 'کد ارسال شده به شماره شما را وارد کنید'
                : 'لطفاً اطلاعات خود را تکمیل کنید'}
          </Text>
        </div>

        <Steps
          current={getStepNumber()}
          items={[
            { title: 'شماره تلفن' },
            { title: 'تایید کد' },
            ...(currentStep === 'register' ? [{ title: 'اطلاعات' }] : []),
          ]}
          className="mb-6"
        />

        {currentStep === 'phone' ? (
          <Form form={form} layout="vertical" onFinish={handleSendOtp} className="space-y-4">
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
                onChange={(e) => setPhone(formatPhoneNumber(e.target.value))}
                maxLength={11}
                className="text-center"
                dir="ltr"
              />
            </Form.Item>

            <Button
              type="primary"
              size="large"
              htmlType="submit"
              loading={sendOtpMutation.isPending}
              block
              className="h-12 border-0 bg-gradient-to-r from-pink-500 to-purple-600 font-semibold"
            >
              ارسال کد تایید
            </Button>
          </Form>
        ) : currentStep === 'otp' ? (
          <div className="space-y-6">
            <div>
              <Text className="mb-2 block text-center text-gray-600">
                کد به شماره <strong>{phone}</strong> ارسال شد
              </Text>
              <OtpInput
                value={otp}
                onChange={setOtp}
                length={6}
                disabled={verifyOtpMutation.isPending}
                error={false}
              />
              {otp.length === 6 && (
                <Button
                  type="primary"
                  size="large"
                  onClick={handleVerifyOtp}
                  loading={verifyOtpMutation.isPending}
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
                onClick={handleResendOtp}
                disabled={countdown > 0 || sendOtpMutation.isPending}
                className="p-0"
              >
                {countdown > 0
                  ? `ارسال مجدد کد (${Math.floor(countdown / 60)}:${String(countdown % 60).padStart(2, '0')})`
                  : 'ارسال مجدد کد'}
              </Button>

              <div>
                <Button
                  type="link"
                  onClick={() => {
                    setCurrentStep('phone');
                    setOtp('');
                    setCountdown(0);
                  }}
                  className="p-0"
                >
                  تغییر شماره تلفن
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <Form form={form} layout="vertical" onFinish={handleRegister} className="space-y-4">
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
                <Input
                  size="large"
                  prefix={<MailOutlined />}
                  placeholder="example@email.com"
                  dir="ltr"
                />
              </Form.Item>

              <Button
                type="primary"
                size="large"
                htmlType="submit"
                loading={verifyOtpMutation.isPending || registerMutation.isPending}
                block
                className="h-12 border-0 bg-gradient-to-r from-pink-500 to-purple-600 font-semibold"
              >
                تکمیل ثبت نام
              </Button>
            </Form>

            <Divider />

            <div className="text-center">
              <Button
                type="link"
                onClick={() => {
                  setCurrentStep('otp');
                }}
                className="p-0"
              >
                بازگشت به تایید کد
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
