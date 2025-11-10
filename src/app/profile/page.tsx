import React from 'react';
import { Metadata } from 'next';
import ProfileClient from './profile-client';

export const metadata: Metadata = {
  title: 'پروفایل | شیک‌پوشان',
  description: 'پروفایل کاربر در فروشگاه شیک‌پوشان',
};

export default function ProfilePage() {
  return <ProfileClient />;
}
