import type { Metadata } from 'next';
import dynamic from 'next/dynamic';

const CartClient = dynamic(() => import('./cart-client'));

export const metadata: Metadata = {
  title: 'سبد خرید | تکمیل سفارش و پرداخت امن',
  description:
    'مشاهده و ویرایش سبد خرید شما در شیک‌پوشان. پرداخت امن، ارسال سریع و ضمانت بازگشت کالا. سفارش خود را نهایی کنید.',
  robots: { index: false, follow: true },
  alternates: { canonical: '/cart' },
};

export default function CartPage() {
  return <CartClient />;
}
