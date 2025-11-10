import React from 'react';
import { Metadata } from 'next';
import NotificationClient from './notification-client';

export const metadata: Metadata = {
  title: 'اعلان‌ها | شیک‌پوشان',
  description: 'اعلان‌های شما در فروشگاه شیک‌پوشان',
};

export default function NotificationPage() {
  return <NotificationClient />;
}
