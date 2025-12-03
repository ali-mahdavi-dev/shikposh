'use client';

import React, { useState, useEffect } from 'react';
import { Card, App } from 'antd';
import { useRouter } from 'next/navigation';
import { useSendOtp, useVerifyOtp, useRegister } from './_api';
import { useAppSelector, useAppDispatch } from '@/stores/hooks';
import { setCredentials } from '@/stores/features/auth';
import { getErrorMessage } from '@/shared/utils/error-handler';
import { handleError } from '@/lib/errors';
import {
  AuthHeader,
  AuthSteps,
  AuthPhoneStep,
  AuthOtpStep,
  AuthRegisterStep,
} from './_components';
import { normalizeUser } from './_utils/normalizeUser';

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
      const result = await sendOtpMutation.mutateAsync({
        phone,
      });

      if (result.success) {
        message.success('کد OTP به شماره شما ارسال شد');
        setCurrentStep('otp');
        setCountdown(120); // 2 minutes
      }
    } catch (error: any) {
      // Use enterprise error handling
      const appError = handleError(error);
      message.error(appError.message || 'خطا در ارسال کد OTP');
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
        const normalizedUser = normalizeUser(verifyResult.user, phone);

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
      // Use enterprise error handling
      const appError = handleError(error);
      
      // Log error for debugging
      if (process.env.NODE_ENV === 'development') {
        console.error('Verify OTP Error:', appError.toJSON());
      }

      message.error(appError.message || 'کد OTP نامعتبر است');
      setOtp('');
    }
  };

  const handleRegister = async (values: { firstName: string; lastName: string; email?: string }) => {
    try {
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
        const normalizedUser = normalizeUser(result.user, phone);

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
      }
    } catch (error: any) {
      // Use enterprise error handling
      const appError = handleError(error);
      message.error(appError.message || 'خطا در ثبت نام');
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
      // Use enterprise error handling
      const appError = handleError(error);
      message.error(appError.message || 'خطا در ارسال مجدد کد');
    }
  };


  return (
    <div className="flex min-h-screen items-start justify-center bg-gradient-to-br from-pink-50 to-purple-50 px-2 py-6 sm:px-4 sm:py-8 md:py-12">
      <Card className="w-full max-w-md rounded-xl shadow-xl md:rounded-2xl md:shadow-2xl">
        <AuthHeader currentStep={currentStep} />
        <AuthSteps currentStep={currentStep} />

        {currentStep === 'phone' ? (
          <AuthPhoneStep
            phone={phone}
            onPhoneChange={setPhone}
            onSendOtp={handleSendOtp}
            isLoading={sendOtpMutation.isPending}
          />
        ) : currentStep === 'otp' ? (
          <AuthOtpStep
            phone={phone}
            otp={otp}
            onOtpChange={setOtp}
            onVerify={handleVerifyOtp}
            onResend={handleResendOtp}
            onBack={() => {
              setCurrentStep('phone');
              setOtp('');
              setCountdown(0);
            }}
            countdown={countdown}
            isLoading={verifyOtpMutation.isPending}
            isResending={sendOtpMutation.isPending}
          />
        ) : (
          <AuthRegisterStep
            onRegister={async (values) => {
              await handleRegister(values);
            }}
            onBack={() => setCurrentStep('otp')}
            isLoading={verifyOtpMutation.isPending || registerMutation.isPending}
          />
        )}
      </Card>
    </div>
  );
}
