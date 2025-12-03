/**
 * Lazy-loaded components
 * Centralized exports for dynamically imported components
 */

import dynamic from 'next/dynamic';

/**
 * Lazy load heavy components
 */

// Admin components
export const AdminDashboard = dynamic(() => import('@/app/admin/_components/daily-sales-chart'), {
  loading: () => <div>Loading dashboard...</div>,
});

// Product components (examples - adjust paths as needed)
export const ProductCard = dynamic(() => import('@/components/business/Product/ProductCard'), {
  loading: () => <div className="h-64 bg-gray-200 animate-pulse rounded"></div>,
});

export const ProductList = dynamic(() => import('@/components/business/Product/ProductList'), {
  loading: () => <div>Loading products...</div>,
});

// Add more lazy-loaded components as needed
// Example:
// export const HeavyComponent = dynamic(() => import('@/path/to/component'), {
//   loading: () => <div>Loading...</div>,
//   ssr: false, // Disable SSR if needed
// });

