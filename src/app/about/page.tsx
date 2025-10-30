import React from 'react';
import type { Metadata } from 'next';
import AboutClient from './about-client';

export const metadata: Metadata = {
  title: 'درباره ما | شیک‌پوشان',
  description: 'آشنایی با فروشگاه شیک‌پوشان، ماموریت، ارزش‌ها و تیم ما. خرید آنلاین پوشاک زنانه با بهترین کیفیت و تجربه کاربری.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'درباره شیک‌پوشان',
    description: 'با ماموریت و ارزش‌های شیک‌پوشان آشنا شوید.',
    url: '/about',
    siteName: 'شیک‌پوشان',
    type: 'website',
  },
};

export default function AboutPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'شیک‌پوشان',
    url: 'https://localhost:3000/',
    sameAs: ['https://instagram.com', 'https://twitter.com'],
    logo: '/icons/icon-512x512.png',
    description:
      'فروشگاه آنلاین پوشاک زنانه با تمرکز بر کیفیت، تجربه خرید و پشتیبانی.',
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <AboutClient />
    </div>
  );
}


