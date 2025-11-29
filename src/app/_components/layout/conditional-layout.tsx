'use client';

import React, { useMemo, memo } from 'react';
import { usePathname } from 'next/navigation';
import { Layout } from 'antd';
import { Suspense } from 'react';

const { Content } = Layout;

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

// Lazy load components with preload hints for better performance
const Header = React.lazy(() => import('@/app/_components/layout/site-header'));
const Footer = React.lazy(() => import('@/app/_components/layout/footer'));
const Breadcrumbs = React.lazy(() => import('@/app/_components/breadcrumbs'));

const LayoutLoading = () => (
  <div className="flex min-h-screen items-center justify-center">
    <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-pink-500"></div>
  </div>
);

// Memoized content wrapper to prevent unnecessary re-renders
const ContentWrapper = memo(({ children }: { children: React.ReactNode }) => (
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
));

ContentWrapper.displayName = 'ContentWrapper';

/**
 * ConditionalLayout component that conditionally renders layout components
 * based on the current route. For admin routes, it only renders the main content.
 * For other routes, it renders all layout components (Header, Footer, etc.)
 *
 * Optimized with:
 * - useMemo for pathname check to prevent unnecessary recalculations
 * - React.memo for content wrapper to prevent re-renders
 * - Lazy loading for non-critical components
 */
export const ConditionalLayout = memo(function ConditionalLayout({
  children,
}: ConditionalLayoutProps) {
  const pathname = usePathname();

  // Memoize admin route check to avoid recalculating on every render
  const isAdminRoute = useMemo(() => pathname?.startsWith('/admin') ?? false, [pathname]);

  // For admin routes, only render the main content (children)
  // The admin layout will handle its own header and structure
  // This avoids loading Header/Footer components for admin pages
  if (isAdminRoute) {
    return <>{children}</>;
  }

  // For regular routes, render all layout components
  // Components are lazy loaded and wrapped in Suspense for optimal performance
  return (
    <>
      {/* Header with Suspense - Only loads when needed */}
      <Suspense fallback={<LayoutLoading />}>
        <Header />
      </Suspense>

      {/* Breadcrumbs with Suspense - Only loads when needed */}
      <Suspense fallback={<div className="h-8" />}>
        <Breadcrumbs />
      </Suspense>

      {/* Content - Memoized to prevent unnecessary re-renders */}
      <ContentWrapper>{children}</ContentWrapper>

      {/* Footer with Suspense - Only loads when needed */}
      <Suspense fallback={<div className="h-32" />}>
        <Footer />
      </Suspense>
    </>
  );
});
