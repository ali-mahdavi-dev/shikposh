import type { Metadata } from 'next';
import dynamic from 'next/dynamic';

const AuthClient = dynamic(() => import('./auth-client'));

export const metadata: Metadata = {
  title: 'ورود و ثبت‌نام | عضویت در شیک‌پوشان',
  description:
    'ورود به حساب کاربری یا ثبت‌نام رایگان در فروشگاه شیک‌پوشان. با عضویت از تخفیف‌های ویژه، پیگیری سفارش و امکانات اختصاصی بهره‌مند شوید.',
  robots: { index: true, follow: true },
  alternates: { canonical: '/auth' },
  openGraph: {
    title: 'ورود و ثبت‌نام در شیک‌پوشان',
    description: 'عضو شوید و از مزایای خرید آنلاین بهره‌مند شوید',
    url: '/auth',
    siteName: 'شیک‌پوشان',
    type: 'website',
  },
};

export default function AuthPage() {
  return <AuthClient />;
}
