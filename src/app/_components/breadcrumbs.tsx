'use client';

import { Breadcrumb } from 'antd';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HomeOutlined } from '@ant-design/icons';
import React from 'react';

const segmentLabelMap: Record<string, string> = {
  products: 'محصولات',
  notification: "اعلانات",
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

function humanizeSegment(raw: string): string {
  const decoded = decodeURIComponent(raw || '').trim();
  if (!decoded) return '';
  if (segmentLabelMap[decoded]) return segmentLabelMap[decoded];
  // Replace dashes/underscores with spaces; do not force capitalization for RTL labels
  return decoded.replace(/[-_]+/g, ' ');
}

type Pattern = { pattern: string; label: string };

// Simple pattern list for known paths (supports :param placeholders)
const pathPatternLabels: Pattern[] = [
  { pattern: '/products', label: 'محصولات' },
  { pattern: '/products/category/:category', label: 'دسته‌بندی محصولات' },
  { pattern: '/products/category/:category/subcategory/:subcategory', label: 'زیر دسته‌بندی محصولات' },
  { pattern: '/products/category/:category/subcategory/:subcategory/product/:product', label: 'محصول' },
  { pattern: '/products/category/:category/subcategory/:subcategory/product/:product/variant/:variant', label: 'نوع محصول' },
  { pattern: '/products/category/:category/subcategory/:subcategory/product/:product/variant/:variant/color/:color', label: 'رنگ محصول' },
  { pattern: '/products/category/:category/subcategory/:subcategory/product/:product/variant/:variant/color/:color/size/:size', label: 'اندازه محصول' },
  { pattern: '/products/category/:category/subcategory/:subcategory/product/:product/variant/:variant/color/:color/size/:size/quantity/:quantity', label: 'تعداد محصول' },
  { pattern: '/cart', label: 'سبد خرید' },
  { pattern: '/checkout', label: 'تسویه حساب' },
  { pattern: '/profile', label: 'پروفایل' },
  { pattern: '/orders', label: 'سفارش‌ها' },
  { pattern: '/orders/:orderId', label: 'جزئیات سفارش' },
  { pattern: '/favorites', label: 'علاقه‌مندی‌ها' },
  { pattern: '/sellers', label: 'فروشندگان' },
  { pattern: '/sellers/:sellerId', label: 'فروشنده' },
  { pattern: '/brands', label: 'برندها' },
  { pattern: '/brands/:brand', label: 'برند' },
  { pattern: '/categories', label: 'دسته‌ها' },
  { pattern: '/search', label: 'جستجو' },
  { pattern: '/blog', label: 'بلاگ' },
  { pattern: '/blog/post/:slug', label: 'نوشته' },
  { pattern: '/about', label: 'درباره ما' },
  { pattern: '/contact', label: 'تماس با ما' },
  { pattern: '/compare', label: 'مقایسه' },
];

function matchPatternLabel(path: string): string | null {
  const segments = path.split('/').filter(Boolean);
  for (const { pattern, label } of pathPatternLabels) {
    const pSegs = pattern.split('/').filter(Boolean);
    if (pSegs.length !== segments.length) continue;
    let ok = true;
    for (let i = 0; i < pSegs.length; i++) {
      const p = pSegs[i];
      if (p.startsWith(':')) continue; // placeholder
      if (p !== segments[i]) {
        ok = false;
        break;
      }
    }
    if (ok) return label;
  }
  return null;
}

export default function Breadcrumbs() {
  const pathname = usePathname();

  const { items } = React.useMemo(() => {
    const segments = (pathname || '/').split('/').filter(Boolean);
    const built = [
      {
        key: 'home',
        title: (
          <Link href="/" className="text-primary flex items-center gap-1">
            <HomeOutlined className="ml-1" />
            <span>خانه</span>
          </Link>
        ),
      },
    ];

    segments.forEach((segment, index) => {
      const href = '/' + segments.slice(0, index + 1).join('/');
      const isLast = index === segments.length - 1;
      const matched = matchPatternLabel(href);
      const label = matched || humanizeSegment(segment);
      built.push({
        key: href,
        title: isLast ? (
          <span className="text-gray-500">{label}</span>
        ) : (
          <Link href={href} className="text-primary hover:underline">
            {label}
          </Link>
        ),
      });
    });

    return { items: built };
  }, [pathname]);

  if (!items || items.length <= 1) return null;

  return (
    <nav aria-label="breadcrumb" className="m-4">
      <Breadcrumb items={items} className="text-sm" separator={<span className="text-gray-400">/</span>} />
    </nav>
  );
}
