import React from 'react';
import { Metadata } from 'next';
import WishlistClient from './wishlist-client';

export const metadata: Metadata = {
  title: 'علاقه‌مندی‌ها | شیک‌پوشان',
  description: 'محصولات مورد علاقه شما در فروشگاه شیک‌پوشان',
};

export default function WishlistPage() {
  return <WishlistClient />;
}
