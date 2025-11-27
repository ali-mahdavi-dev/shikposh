import type { Metadata } from 'next';
import dynamic from 'next/dynamic';

const WishlistClient = dynamic(() => import('./wishlist-client'));

export const metadata: Metadata = {
  title: 'لیست علاقه‌مندی‌ها | محصولات ذخیره شده شما',
  description:
    'مشاهده و مدیریت محصولات مورد علاقه شما در شیک‌پوشان. لباس‌ها و اکسسوری‌های ذخیره شده را بررسی کنید و به سبد خرید اضافه نمایید.',
  robots: { index: false, follow: true },
  alternates: { canonical: '/wishlist' },
};

export default function WishlistPage() {
  return <WishlistClient />;
}
