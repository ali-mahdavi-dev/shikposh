import type { Metadata } from 'next';
import dynamic from 'next/dynamic';

const NotificationClient = dynamic(() => import('./notification-client'));

export const metadata: Metadata = {
  title: 'اعلان‌ها و پیام‌ها | مرکز اطلاع‌رسانی',
  description: 'مشاهده اعلان‌ها، پیام‌های سیستم، وضعیت سفارشات و اطلاعیه‌های تخفیف در شیک‌پوشان.',
  robots: { index: false, follow: false },
  alternates: { canonical: '/notification' },
};

export default function NotificationPage() {
  return <NotificationClient />;
}
