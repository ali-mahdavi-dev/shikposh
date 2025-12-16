'use client';

import React, { useState, useEffect } from 'react';
import { Badge } from 'antd';
import {
  HomeOutlined,
  AppstoreOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from '@ant-design/icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAppSelector } from '@/stores/hooks';
import { motion } from 'framer-motion';

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
  badge?: number;
}

const BottomNavigation: React.FC = () => {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Get cart count from store
  const cartCountFromStore = useAppSelector((state) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0),
  );

  // Fix hydration error: only show cart count after client-side mount
  useEffect(() => {
    setMounted(true);

    // Check if mobile on mount and resize
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const displayCartCount = mounted ? cartCountFromStore : 0;

  // Check if a route is active
  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname?.startsWith(href) ?? false;
  };

  // Navigation items with dynamic icons based on active state
  const navItems: NavItem[] = [
    {
      href: '/',
      label: 'خانه',
      icon: (
        <HomeOutlined
          className="text-xl transition-colors duration-300"
          style={{
            color: isActive('/') ? '#ec4899' : '#6b7280',
          }}
        />
      ),
    },
    {
      href: '/products',
      label: 'دسته‌بندی',
      icon: (
        <AppstoreOutlined
          className="text-xl transition-colors duration-300"
          style={{
            color: isActive('/products') ? '#ec4899' : '#6b7280',
          }}
        />
      ),
    },
    {
      href: '/cart',
      label: 'سبد خرید',
      icon: (
        <ShoppingCartOutlined
          className="text-xl transition-colors duration-300"
          style={{
            color: isActive('/cart') ? '#ec4899' : '#6b7280',
          }}
        />
      ),
      badge: displayCartCount > 0 ? displayCartCount : undefined,
    },
    {
      href: '/profile',
      label: 'پروفایل',
      icon: (
        <UserOutlined
          className="text-xl transition-colors duration-300"
          style={{
            color: isActive('/profile') ? '#ec4899' : '#6b7280',
          }}
        />
      ),
    },
  ];

  // Don't render on server or desktop
  if (!mounted || !isMobile) {
    return null;
  }

  return (
    <nav
      className="fixed right-0 bottom-0 left-0 z-50 border-t border-gray-200/80 bg-white/98 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] backdrop-blur-xl"
      style={{
        paddingBottom: 'max(env(safe-area-inset-bottom), 0px)',
      }}
    >
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-around px-2">
        {navItems.map((item) => {
          const active = isActive(item.href);
          return (
            <motion.div
              key={item.href}
              initial={false}
              whileTap={{ scale: 0.9 }}
              className="relative flex flex-1 items-center justify-center"
            >
              <Link
                href={item.href}
                className={`relative flex w-full flex-col items-center justify-center gap-1.5 px-1 py-2.5 transition-all duration-300 ${
                  active ? 'text-pink-600' : 'text-gray-500 active:text-pink-600'
                }`}
              >
                <div className="relative flex items-center justify-center">
                  <motion.div
                    animate={{
                      scale: active ? 1.1 : 1,
                      y: active ? -1 : 0,
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 500,
                      damping: 30,
                    }}
                    className="flex items-center justify-center"
                  >
                    <motion.div
                      animate={{
                        backgroundColor: active ? 'rgba(236, 72, 153, 0.12)' : 'transparent',
                        scale: active ? 1 : 1,
                      }}
                      transition={{
                        duration: 0.3,
                        ease: 'easeOut',
                      }}
                      className="flex h-10 w-10 items-center justify-center rounded-full"
                    >
                      <motion.div
                        animate={{
                          rotate: active ? [0, -10, 10, -10, 0] : 0,
                        }}
                        transition={{
                          duration: 0.5,
                          ease: 'easeInOut',
                        }}
                      >
                        {item.icon}
                      </motion.div>
                    </motion.div>
                  </motion.div>
                  {item.badge !== undefined && item.badge > 0 && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: 'spring',
                        stiffness: 500,
                        damping: 15,
                      }}
                    >
                      <Badge
                        count={item.badge}
                        size="small"
                        className="absolute -top-1 -right-1 z-10"
                        style={{
                          backgroundColor: '#ec4899',
                          boxShadow: '0 2px 8px rgba(236, 72, 153, 0.4)',
                        }}
                      />
                    </motion.div>
                  )}
                </div>
                <motion.span
                  animate={{
                    scale: active ? 1.05 : 1,
                    fontWeight: active ? 600 : 500,
                  }}
                  transition={{ duration: 0.2 }}
                  className={`text-[11px] leading-tight transition-colors duration-300 ${
                    active ? 'text-pink-600' : 'text-gray-500'
                  }`}
                >
                  {item.label}
                </motion.span>
                {active && (
                  <motion.div
                    className="absolute -bottom-1 left-1/2 h-1 w-8 -translate-x-1/2 rounded-full bg-gradient-to-r from-pink-500 via-pink-600 to-purple-600"
                    layoutId="activeIndicator"
                    initial={false}
                    transition={{
                      type: 'spring',
                      stiffness: 500,
                      damping: 30,
                    }}
                  />
                )}
              </Link>
            </motion.div>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavigation;
