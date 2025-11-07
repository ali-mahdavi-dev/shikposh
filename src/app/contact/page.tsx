import React from 'react';
import type { Metadata } from 'next';
import ContactClient from './contact-client';

export const metadata: Metadata = {
  title: 'تماس با ما | شیک‌پوشان',
  description: 'با تیم شیک‌پوشان تماس بگیرید. فرم تماس، ایمیل و اطلاعات ارتباطی برای پشتیبانی سریع.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'تماس با شیک‌پوشان',
    description: 'مسیرهای ارتباط با تیم پشتیبانی و فروش شیک‌پوشان.',
    url: '/contact',
    siteName: 'شیک‌پوشان',
    type: 'website',
  },
};

export default function ContactPage() {

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    mainEntity: {
      '@type': 'Organization',
      name: 'شیک‌پوشان',
      email: 'support@shikposhan.ir',
      url: 'https://localhost:3000/contact',
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+98-21-00000000',
        contactType: 'customer support',
        areaServed: 'IR',
        availableLanguage: ['fa'],
      },
    },
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ContactClient />
    </div>
  );
}


