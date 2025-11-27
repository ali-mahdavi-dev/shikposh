import type { Metadata } from 'next';
import dynamicImport from 'next/dynamic';

const ContactClient = dynamicImport(() => import('./contact-client'));

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'تماس با ما | پشتیبانی ۲۴ ساعته شیک‌پوشان',
  description:
    'راه‌های ارتباط با شیک‌پوشان: تلفن، ایمیل، فرم تماس و چت آنلاین. پشتیبانی سریع برای سوالات، پیگیری سفارش و بازگشت کالا. پاسخگویی ۲۴ ساعته.',
  keywords: ['تماس با شیک‌پوشان', 'پشتیبانی فروشگاه', 'شماره تماس', 'ایمیل پشتیبانی'],
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'تماس با پشتیبانی شیک‌پوشان',
    description: 'سوالی دارید؟ تیم پشتیبانی ما آماده پاسخگویی است.',
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ContactClient />
    </div>
  );
}
