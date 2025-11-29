import type { Metadata } from 'next';
import dynamic from 'next/dynamic';

const ProfileClient = dynamic(() => import('./profile-client'));

export const metadata: Metadata = {
  title: 'پروفایل کاربری | حساب من',
  description:
    'مدیریت اطلاعات حساب کاربری، مشاهده سفارش‌ها و دسترسی سریع به علاقه‌مندی‌ها در پروفایل شیک‌پوشان.',
  robots: { index: false, follow: true },
  alternates: { canonical: '/profile' },
};

export default function ProfilePage() {
  return <ProfileClient />;
}
