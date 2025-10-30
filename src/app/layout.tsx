import '@ant-design/v5-patch-for-react-19';
import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { Content } from 'antd/lib/layout/layout';
import { ConfigProvider, App } from 'antd';
import { ReactQueryProvider } from '@/providers/react-query-provider';
import { ReduxProvider } from '@/providers/redux-provider';
import { ErrorBoundary, ApiMonitor } from '@/shared';
import './globals.css';

// Lazy load components for better performance
const Header = React.lazy(() => import('@/components/layout/site-header'));
const Footer = React.lazy(() => import('@/components/layout/footer'));
const Breadcrumbs = React.lazy(() => import('@/components/breadcrumbs'));
// Dev-only MSW initializer (client component)
const DevMocks = React.lazy(() => import('@/providers/dev-mocks').then(m => ({ default: m.DevMocks })));

const theme = {
  token: {
    colorPrimary: '#ec4899', // Pink primary color
    colorSuccess: '#10b981', // Green
    colorWarning: '#f59e0b', // Yellow
    colorError: '#ef4444', // Red
    borderRadius: 12,
    fontFamily: 'Vazirmatn, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  components: {
    Button: {
      borderRadius: 12,
      controlHeight: 40,
    },
    Card: {
      borderRadius: 16,
    },
    Input: {
      borderRadius: 12,
    },
    Select: {
      borderRadius: 12,
    },
  },
};

export const metadata: Metadata = {
  title: {
    default: 'شیک‌پوشان - فروشگاه آنلاین مد و پوشاک',
    template: '%s | شیک‌پوشان',
  },
  description: 'فروشگاه آنلاین شیک‌پوشان - بهترین محصولات مد و پوشاک با کیفیت بالا و قیمت مناسب',
  keywords: ['فروشگاه آنلاین', 'مد و پوشاک', 'لباس زنانه', 'خرید آنلاین', 'شیک‌پوشان'],
  authors: [{ name: 'شیک‌پوشان' }],
  creator: 'شیک‌پوشان',
  publisher: 'شیک‌پوشان',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'fa_IR',
    url: '/',
    title: 'شیک‌پوشان - فروشگاه آنلاین مد و پوشاک',
    description: 'فروشگاه آنلاین شیک‌پوشان - بهترین محصولات مد و پوشاک با کیفیت بالا و قیمت مناسب',
    siteName: 'شیک‌پوشان',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'شیک‌پوشان - فروشگاه آنلاین مد و پوشاک',
    description: 'فروشگاه آنلاین شیک‌پوشان - بهترین محصولات مد و پوشاک با کیفیت بالا و قیمت مناسب',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

// Loading component for Suspense
const LayoutLoading = () => (
  <div className="flex min-h-screen items-center justify-center">
    <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-pink-500"></div>
  </div>
);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />

        {/* PWA Support */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ec4899" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="شیک‌پوشان" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />

        {/* Preload critical resources */}
        <link
          rel="preload"
          href="/fonts/Vazir.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link rel="preload" href="/images/daman.jpeg" as="image" />
      </head>
      <body>
        <React.StrictMode>
          <ReduxProvider>
            <ReactQueryProvider>
              <AntdRegistry>
                <ConfigProvider theme={theme} direction="rtl" notification={{ placement: 'topRight' }}>
                  <App>
                    <ErrorBoundary>
                      {/* API Monitor - Only in development */}
                      {process.env.NODE_ENV === 'development' && (
                        <div className="fixed top-4 left-4 z-50">
                          <ApiMonitor showDetails={false} />
                        </div>
                      )}

                      {/* Initialize MSW in development when enabled */}
                      {process.env.NODE_ENV === 'development' && (
                        <Suspense fallback={null}>
                          <DevMocks />
                        </Suspense>
                      )}

                      {/* Header with Suspense */}
                      <Suspense fallback={<LayoutLoading />}>
                        <Header />
                      </Suspense>

                      {/* Breadcrumbs with Suspense */}
                      <Suspense fallback={<div className="h-8" />}>
                        <Breadcrumbs />
                      </Suspense>

                      {/* Content */}
                      <Content>
                        <div
                          className="min-h-lvh bg-gray-50 px-2"
                          style={{
                            marginTop: 46,
                            padding: 24,
                          }}
                        >
                          <main className="">{children}</main>
                        </div>
                      </Content>

                      {/* Footer with Suspense */}
                      <Suspense fallback={<div className="h-32" />}>
                        <Footer />
                      </Suspense>
                    </ErrorBoundary>
                  </App>
                </ConfigProvider>
              </AntdRegistry>
            </ReactQueryProvider>
          </ReduxProvider>
        </React.StrictMode>
      </body>
    </html>
  );
}
