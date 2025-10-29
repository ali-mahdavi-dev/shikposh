export { themeConfig, type ThemeConfig } from './theme';
export { componentConfig, type ComponentConfig } from './components';

// App Configuration
export const appConfig = {
  name: 'شیک‌پوشان',
  description: 'فروشگاه لباس زنانه',
  version: '1.0.0',
  locale: 'fa-IR',
  currency: 'IRR',
  timezone: 'Asia/Tehran',
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
    timeout: 10000,
  },
  features: {
    darkMode: true,
    animations: true,
    rtl: true,
    pwa: false,
  },
  seo: {
    title: 'شیک‌پوشان - فروشگاه لباس زنانه',
    description: 'فروشگاه شیک‌پوشان با بیش از ۵ سال تجربه در زمینه فروش لباس‌های زنانه',
    keywords: ['لباس زنانه', 'فروشگاه', 'مد', 'فشن', 'شیک‌پوشان'],
    ogImage: '/images/og-image.jpg',
  },
} as const;

export type AppConfig = typeof appConfig;
