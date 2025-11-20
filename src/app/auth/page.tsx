import React from 'react';
import { Metadata } from 'next';
import AuthClient from './auth-client';

export const metadata: Metadata = {
  title: 'ورود / ثبت نام | شیک‌پوشان',
  description: 'ورود یا ثبت نام در فروشگاه شیک‌پوشان',
};

export default function AuthPage() {
  return <AuthClient />;
}
