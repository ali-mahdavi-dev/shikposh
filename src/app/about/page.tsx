import type { Metadata } from 'next';
import nextDynamic from 'next/dynamic';

const AboutClient = nextDynamic(() => import('./about-client'));

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'درباره ما | داستان و ارزش‌های شیک‌پوشان',
  description:
    'با فروشگاه شیک‌پوشان آشنا شوید. داستان ما، ماموریت، ارزش‌ها، تعهد به کیفیت و رضایت مشتری. چرا هزاران نفر به ما اعتماد کرده‌اند؟',
  keywords: ['درباره شیک‌پوشان', 'فروشگاه معتبر لباس', 'تاریخچه شیک‌پوشان'],
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'درباره فروشگاه شیک‌پوشان',
    description: 'ماموریت ما: ارائه بهترین پوشاک زنانه با کیفیت و قیمت مناسب',
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
    description: 'فروشگاه آنلاین پوشاک زنانه با تمرکز بر کیفیت، تجربه خرید و پشتیبانی.',
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AboutClient />
    </div>
  );
}
