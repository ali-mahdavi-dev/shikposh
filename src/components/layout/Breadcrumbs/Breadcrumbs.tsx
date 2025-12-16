'use client';

import { Breadcrumb } from 'antd';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HomeOutlined } from '@ant-design/icons';
import React from 'react';
import { useCategoryBySlug } from '@/app/products/_api';

const segmentLabelMap: Record<string, string> = {
  products: 'محصولات',
  notification: 'اعلانات',
  category: 'دسته‌بندی',
  subcategory: 'زیر دسته‌بندی',
  product: 'محصول',
  variant: 'نوع محصول',
  color: 'رنگ',
  size: 'اندازه',
  quantity: 'تعداد',
  cart: 'سبد خرید',
  checkout: 'تسویه حساب',
  profile: 'پروفایل',
  orders: 'سفارش‌ها',
  order: 'سفارش',
  favorites: 'علاقه‌مندی‌ها',
  wishlist: 'علاقه‌مندی‌ها',
  sellers: 'فروشندگان',
  seller: 'فروشنده',
  brands: 'برندها',
  brand: 'برند',
  categories: 'دسته‌ها',
  tags: 'برچسب‌ها',
  tag: 'برچسب',
  search: 'جستجو',
  blog: 'بلاگ',
  posts: 'نوشته‌ها',
  post: 'نوشته',
  about: 'درباره ما',
  contact: 'تماس با ما',
  compare: 'مقایسه',
  settings: 'تنظیمات',
  addresses: 'آدرس‌ها',
  payments: 'پرداخت‌ها',
};

type Pattern = { pattern: string; label: string };

// Simple pattern list for known paths (supports :param placeholders)
const pathPatternLabels: Pattern[] = [
  { pattern: '/products', label: 'محصولات' },
  { pattern: '/products/:slug', label: 'جزئیات محصول' },
  { pattern: '/category/:slug', label: 'دسته‌بندی' },
  { pattern: '/cart', label: 'سبد خرید' },
  { pattern: '/checkout', label: 'تسویه حساب' },
  { pattern: '/profile', label: 'پروفایل' },
  { pattern: '/orders', label: 'سفارش‌ها' },
  { pattern: '/orders/:id', label: 'جزئیات سفارش' },
  { pattern: '/wishlist', label: 'علاقه‌مندی‌ها' },
  { pattern: '/sellers', label: 'فروشندگان' },
  { pattern: '/seller/:id', label: 'فروشنده' },
  { pattern: '/brands', label: 'برندها' },
  { pattern: '/brand/:slug', label: 'برند' },
  { pattern: '/categories', label: 'دسته‌ها' },
  { pattern: '/tags', label: 'برچسب‌ها' },
  { pattern: '/tag/:slug', label: 'برچسب' },
  { pattern: '/search', label: 'جستجو' },
  { pattern: '/blog', label: 'بلاگ' },
  { pattern: '/posts', label: 'نوشته‌ها' },
  { pattern: '/post/:slug', label: 'نوشته' },
  { pattern: '/about', label: 'درباره ما' },
  { pattern: '/contact', label: 'تماس با ما' },
  { pattern: '/compare', label: 'مقایسه' },
  { pattern: '/settings', label: 'تنظیمات' },
  { pattern: '/addresses', label: 'آدرس‌ها' },
  { pattern: '/payments', label: 'پرداخت‌ها' },
  { pattern: '/notification', label: 'اعلانات' },
];

// Helper function to match path pattern
function matchPattern(path: string, pattern: string): boolean {
  const patternParts = pattern.split('/').filter(Boolean);
  const pathParts = path.split('/').filter(Boolean);

  if (patternParts.length !== pathParts.length) {
    return false;
  }

  return patternParts.every((part, index) => {
    if (part.startsWith(':')) {
      return true; // Parameter placeholder matches anything
    }
    return part === pathParts[index];
  });
}

// Helper function to get label for a path segment
function getSegmentLabel(segment: string): string {
  // Check if it's a known segment
  if (segmentLabelMap[segment]) {
    return segmentLabelMap[segment];
  }

  // Try to match against patterns
  const pathname = `/${segment}`;
  for (const pattern of pathPatternLabels) {
    if (matchPattern(pathname, pattern.pattern)) {
      return pattern.label;
    }
  }

  // Default: capitalize first letter
  return segment.charAt(0).toUpperCase() + segment.slice(1);
}

// Helper function to get label for full path
function getPathLabel(pathname: string): string {
  // Try exact match first
  for (const pattern of pathPatternLabels) {
    if (matchPattern(pathname, pattern.pattern)) {
      return pattern.label;
    }
  }

  // Fallback: use last segment
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length > 0) {
    return getSegmentLabel(segments[segments.length - 1]);
  }

  return 'صفحه اصلی';
}

export default function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname?.split('/').filter(Boolean) || [];

  // Get category name if we're on a category page
  const categorySlug = segments[0] === 'category' ? segments[1] : null;
  const { data: category } = useCategoryBySlug(categorySlug || '', {
    enabled: !!categorySlug,
  });

  // Don't show breadcrumbs on home page
  if (!pathname || pathname === '/') {
    return null;
  }

  // Don't show breadcrumbs on admin pages
  if (pathname.startsWith('/admin')) {
    return null;
  }

  const breadcrumbItems = [
    {
      title: (
        <Link href="/" className="flex items-center gap-1 text-gray-600 hover:text-pink-600">
          <HomeOutlined />
          <span className="hidden sm:inline">خانه</span>
        </Link>
      ),
    },
  ];

  // Build breadcrumb items from path segments
  let currentPath = '';
  segments.forEach((segment, index) => {
    currentPath += `/${segment}`;

    // Special handling for category pages
    if (segment === 'category' && segments[index + 1]) {
      const categoryName = category?.name || getSegmentLabel(segments[index + 1]);
      breadcrumbItems.push({
        title: (
          <Link href={currentPath} className="text-gray-600 transition-colors hover:text-pink-600">
            {categoryName}
          </Link>
        ),
      });
      return; // Skip the next segment as we've already handled it
    }

    // Skip if previous segment was 'category' (already handled)
    if (index > 0 && segments[index - 1] === 'category') {
      return;
    }

    // Special handling for product pages
    if (segment === 'products' && segments[index + 1]) {
      breadcrumbItems.push({
        title: (
          <Link href="/products" className="text-gray-600 transition-colors hover:text-pink-600">
            محصولات
          </Link>
        ),
      });
      return; // Will add product name in next iteration
    }

    // For product slug, show product name (or slug if name not available)
    if (index > 0 && segments[index - 1] === 'products') {
      breadcrumbItems.push({
        title: <span className="text-gray-800">{getSegmentLabel(segment)}</span>,
      });
      return;
    }

    // Default: add segment label
    const isLast = index === segments.length - 1;
    breadcrumbItems.push({
      title: isLast ? (
        <span className="text-gray-800">{getSegmentLabel(segment)}</span>
      ) : (
        <Link href={currentPath} className="text-gray-600 transition-colors hover:text-pink-600">
          {getSegmentLabel(segment)}
        </Link>
      ),
    });
  });

  return (
    <nav className="sticky top-[64px] z-40 border-b border-gray-200 bg-white/95 backdrop-blur-sm md:static md:z-auto">
      <div className="mx-auto max-w-7xl px-2 py-2 sm:px-4 md:py-3">
        <Breadcrumb
          items={breadcrumbItems}
          separator={<span className="text-gray-400">/</span>}
          className="text-sm"
        />
      </div>
    </nav>
  );
}
