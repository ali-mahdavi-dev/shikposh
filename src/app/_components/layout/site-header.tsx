'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { MenuProps } from 'antd';
import {
  ShoppingCartOutlined,
  HeartOutlined,
  UserOutlined,
  AppstoreOutlined,
  InfoCircleOutlined,
  PhoneOutlined,
  FireOutlined,
} from '@ant-design/icons';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/stores/hooks';
import { useLogout } from '@/app/auth/_api';
import { useCategories } from '@/app/products/_api';
import { MobileHeader } from './mobile-header';
import { TabletHeader } from './tablet-header';
import { DesktopHeader } from './desktop-header';

interface HeaderProps {
  cartItemsCount?: number;
  wishlistCount?: number;
}

const Header: React.FC<HeaderProps> = ({ wishlistCount = 5 }) => {
  const router = useRouter();
  const cartCountFromStore = useAppSelector((state) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0),
  );
  const wishlistCountFromStore = useAppSelector((state) => state.wishlist.productIds.length);

  // Fix hydration error: only show cart count after client-side mount
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  // Use cartCountFromStore only after mount to prevent hydration mismatch
  const displayCartCount = mounted ? cartCountFromStore : 0;
  const notificationUnreadCount = useAppSelector(
    (state) => state.notifications.items.filter((n) => !n.read).length,
  );
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const user = useAppSelector((state) => state.auth.user);
  const logoutMutation = useLogout();
  const { data: categories = [] } = useCategories();
  const [searchValue, setSearchValue] = useState<string>('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [hasAnimated, setHasAnimated] = useState<boolean>(false);
  const [screenSize, setScreenSize] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check screen size and determine which header to show
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setScreenSize('mobile');
      } else if (width < 1024) {
        setScreenSize('tablet');
      } else {
        setScreenSize('desktop');
        // Close mobile menu if open on desktop
        if (mobileMenuOpen) {
          setMobileMenuOpen(false);
        }
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, [mobileMenuOpen]);

  // Track if component has animated to prevent animation replay on navigation
  useEffect(() => {
    // Mark as animated after first mount to prevent replay on re-renders
    setHasAnimated(true);
  }, []);

  // Memoize menu items to prevent recreating on every render
  const userMenuItems: MenuProps['items'] = useMemo(
    () => [
      {
        key: 'profile',
        label: (
          <Link href="/profile" className="flex items-center gap-2 px-2 py-1">
            <UserOutlined className="text-pink-500" />
            <span>پروفایل کاربری</span>
          </Link>
        ),
      },
      {
        key: 'orders',
        label: (
          <Link href="/orders" className="flex items-center gap-2 px-2 py-1">
            <ShoppingCartOutlined className="text-pink-500" />
            <span>سفارش‌های من</span>
          </Link>
        ),
      },
      {
        key: 'wishlist',
        label: (
          <Link href="/wishlist" className="flex items-center gap-2 px-2 py-1">
            <HeartOutlined className="text-pink-500" />
            <span>علاقه‌مندی‌ها</span>
          </Link>
        ),
      },
      {
        type: 'divider' as const,
      },
      {
        key: 'logout',
        label: (
          <span
            className="block cursor-pointer px-2 py-1 text-red-500"
            onClick={() => logoutMutation.mutate()}
          >
            خروج از حساب
          </span>
        ),
        danger: true,
      },
    ],
    [logoutMutation],
  );

  const categoryMenuItems: MenuProps['items'] = useMemo(
    () =>
      categories.map((category) => ({
        key: category.slug || category.id,
        label: (
          <Link
            href={`/category/${category.slug}`}
            className="block rounded-lg px-4 py-2 transition-colors hover:bg-pink-50"
          >
            <span className="flex items-center gap-2">
              <FireOutlined className="text-pink-500" />
              {category.name}
            </span>
          </Link>
        ),
      })),
    [categories],
  );

  const handleSearch = (value: string) => {
    if (value.trim()) {
      router.push(`/products?q=${encodeURIComponent(value.trim())}`);
    }
  };

  const navLinks = useMemo(
    () => [
      { href: '/products', label: 'محصولات', icon: <AppstoreOutlined /> },
      { href: '/about', label: 'درباره ما', icon: <InfoCircleOutlined /> },
      { href: '/contact', label: 'تماس با ما', icon: <PhoneOutlined /> },
    ],
    [],
  );

  // Shared props for all header components
  const sharedProps = {
    cartCount: displayCartCount,
    wishlistCount: wishlistCountFromStore ?? wishlistCount,
    notificationCount: notificationUnreadCount,
    isAuthenticated,
    user,
    searchValue,
    onSearchValueChange: setSearchValue,
    onSearch: handleSearch,
    userMenuItems,
    categoryMenuItems,
    categories,
    navLinks,
    scrolled,
    hasAnimated,
    onLogout: () => logoutMutation.mutate(),
    logoutLoading: logoutMutation.isPending,
  };

  return (
    <>
      {/* Render appropriate header based on screen size */}
      {screenSize === 'mobile' && (
        <MobileHeader {...sharedProps} onMenuToggle={setMobileMenuOpen} menuOpen={mobileMenuOpen} />
      )}
      {screenSize === 'tablet' && (
        <TabletHeader {...sharedProps} onMenuToggle={setMobileMenuOpen} menuOpen={mobileMenuOpen} />
      )}
      {screenSize === 'desktop' && <DesktopHeader {...sharedProps} />}

      <style jsx global>{`
        .custom-dropdown .ant-dropdown-menu {
          border-radius: 16px;
          box-shadow: 0 10px 40px rgba(236, 72, 153, 0.15);
          padding: 8px;
          border: 1px solid rgba(236, 72, 153, 0.1);
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
        }
        .custom-dropdown .ant-dropdown-menu-item {
          border-radius: 8px;
          margin: 4px 0;
          transition: all 0.2s ease;
        }
        .custom-dropdown .ant-dropdown-menu-item:hover {
          background: linear-gradient(
            90deg,
            rgba(236, 72, 153, 0.1),
            rgba(139, 92, 246, 0.1)
          ) !important;
          transform: translateX(-4px);
        }
        /* Mega Menu Popover Styles */
        .mega-menu-popover .ant-popover-inner {
          padding: 0 !important;
          border-radius: 16px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
          overflow: hidden;
        }
        .mega-menu-popover .ant-popover-inner-content {
          padding: 0 !important;
        }
        .mega-menu-popover .ant-popover-arrow {
          display: none;
        }
        .mega-menu-container {
          max-width: 1200px;
          min-width: 800px;
        }
        @media (max-width: 1024px) {
          .mega-menu-container {
            min-width: 600px;
          }
        }
        @media (max-width: 768px) {
          .mega-menu-container {
            min-width: 100%;
            max-width: 100%;
          }
        }
        .mobile-menu-drawer .ant-drawer-header {
          border-bottom: 1px solid rgba(236, 72, 153, 0.1);
          padding: 20px 24px;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.9));
        }
        .mobile-menu-drawer .ant-drawer-body {
          padding: 24px;
        }
        .custom-badge .ant-badge-count {
          font-size: 10px;
          min-width: 18px;
          height: 18px;
          line-height: 18px;
          border-radius: 9px;
          box-shadow: 0 2px 8px rgba(236, 72, 153, 0.3);
          background: linear-gradient(135deg, #ec4899, #8b5cf6) !important;
        }
        /* Fix header layout issues */
        .ant-layout-header {
          display: flex !important;
          align-items: center !important;
          padding: 0 !important;
          line-height: normal !important;
        }
        /* Ensure proper spacing in RTL */
        @media (max-width: 1280px) {
          .ant-layout-header .hidden.xl\\:flex {
            display: none !important;
          }
        }
        @media (max-width: 1024px) {
          .ant-layout-header .hidden.lg\\:flex {
            display: none !important;
          }
        }
        /* Prevent text overflow */
        .ant-layout-header * {
          max-width: 100%;
        }
        /* Enhanced navigation link hover effect (animated underline) */
        .ant-layout-header nav a,
        .ant-layout-header .nav-trigger {
          position: relative;
        }
        /* Underline only beneath text content */
        .ant-layout-header nav a .nav-label::after,
        .ant-layout-header .nav-trigger::after {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          bottom: -6px; /* sits just below the text line */
          height: 2px;
          border-radius: 9999px;
          background: linear-gradient(90deg, #ec4899, #f43f5e); /* pink → rose, no blue */
          transform: scaleX(0);
          transform-origin: center;
          transition:
            transform 200ms ease,
            opacity 200ms ease;
          opacity: 0;
        }
        .ant-layout-header nav a:hover .nav-label::after,
        .ant-layout-header .nav-trigger:hover::after {
          transform: scaleX(1);
          opacity: 1;
        }
        /* Dropdown menu items with gradient hover */
        .ant-dropdown-menu-item:hover {
          background: linear-gradient(
            90deg,
            rgba(236, 72, 153, 0.1),
            rgba(139, 92, 246, 0.1)
          ) !important;
        }
      `}</style>
    </>
  );
};

export default React.memo(Header);
