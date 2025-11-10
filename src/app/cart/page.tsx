import React from 'react';
import { Metadata } from 'next';
import CartClient from './cart-client';

export const metadata: Metadata = {
  title: 'سبد خرید | شیک‌پوشان',
  description: 'سبد خرید شما در فروشگاه شیک‌پوشان',
};

export default function CartPage() {
  return <CartClient />;
}
