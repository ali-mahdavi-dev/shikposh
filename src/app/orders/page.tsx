import type { Metadata } from 'next';
import dynamic from 'next/dynamic';

const OrdersClient = dynamic(() => import('./orders-client'));

export const metadata: Metadata = {
  title: 'سفارش‌های من | تاریخچه خرید',
  description:
    'مشاهده و مدیریت تمام سفارش‌های خود در شیک‌پوشان. پیگیری وضعیت سفارش‌ها، مشاهده جزئیات و مدیریت خریدهای قبلی.',
  robots: { index: false, follow: true },
  alternates: { canonical: '/orders' },
};

export default function OrdersPage() {
  return <OrdersClient />;
}

