import type { Metadata } from 'next';
import dynamic from 'next/dynamic';

const ProfileClient = dynamic(() => import('./profile-client'));

export const metadata: Metadata = {
  title: 'پروفایل کاربری | مدیریت حساب و سفارشات',
  description:
    'مدیریت حساب کاربری، مشاهده سفارشات، ویرایش اطلاعات شخصی و آدرس‌ها در پنل کاربری شیک‌پوشان.',
  robots: { index: false, follow: false },
  alternates: { canonical: '/profile' },
};

export default function ProfilePage() {
  return <ProfileClient />;
}
