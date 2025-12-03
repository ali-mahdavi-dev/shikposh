'use client';

import React, { Suspense, ReactNode } from 'react';

/**
 * Suspense Provider Options
 */
export interface SuspenseProviderOptions {
  fallback?: ReactNode;
  showErrorBoundary?: boolean;
}

/**
 * Default loading fallback
 */
const DefaultFallback = () => (
  <div className="flex items-center justify-center min-h-[200px]">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  </div>
);

/**
 * Enhanced Suspense Provider
 * Provides consistent Suspense boundaries across the app
 */
export function SuspenseProvider({
  children,
  fallback,
  showErrorBoundary = false,
}: {
  children: ReactNode;
} & SuspenseProviderOptions) {
  const fallbackComponent = fallback || <DefaultFallback />;

  if (showErrorBoundary) {
    // Wrap in ErrorBoundary if needed
    return <Suspense fallback={fallbackComponent}>{children}</Suspense>;
  }

  return <Suspense fallback={fallbackComponent}>{children}</Suspense>;
}

/**
 * Create a Suspense boundary with custom fallback
 */
export function withSuspense<P extends object>(
  Component: React.ComponentType<P>,
  fallback?: ReactNode,
) {
  return function SuspenseWrappedComponent(props: P) {
    return (
      <SuspenseProvider fallback={fallback}>
        <Component {...props} />
      </SuspenseProvider>
    );
  };
}

