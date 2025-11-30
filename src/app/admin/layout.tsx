'use client';

import React, { useCallback, useMemo, useState } from 'react';
import { Layout, Menu, Avatar, Dropdown, Badge } from 'antd';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useAppSelector } from '@/stores/hooks';
import { isAdmin, hasPermission, PermissionScope } from '@/shared/utils/permissions';
import {
  HomeOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DashboardOutlined,
  AppstoreOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  SettingOutlined,
  BellOutlined,
} from '@ant-design/icons';
import { useLogout } from '@/app/auth/_api';
import type { MenuProps } from 'antd';

const { Header: AntHeader, Content, Sider } = Layout;

interface MenuItem {
  key: string;
  icon: React.ReactNode;
  label: React.ReactNode;
  path: string;
  permission?: PermissionScope;
}

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isAuthenticated, isLoading } = useAppSelector((state) => state.auth);
  const logoutMutation = useLogout();
  const [mounted, setMounted] = React.useState(false);
  const [collapsed, setCollapsed] = useState(false);

  // Auto-collapse on mobile
  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCollapsed(true);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Wait for component to mount and auth state to load
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Memoize admin check to avoid recalculating
  const hasAdminAccess = useMemo(() => isAuthenticated && isAdmin(user), [isAuthenticated, user]);

  // Redirect if not authenticated or not admin/superuser (only after mount and loading is complete)
  React.useEffect(() => {
    if (mounted && !isLoading && !hasAdminAccess) {
      router.push('/');
    }
  }, [mounted, isLoading, hasAdminAccess, router]);

  // Memoize logout handler to prevent unnecessary re-renders
  const handleLogout = useCallback(() => {
    logoutMutation.mutate();
  }, [logoutMutation]);

  // Build menu items based on permissions
  const menuItems: MenuItem[] = useMemo(() => {
    const items: MenuItem[] = [
      {
        key: '/admin',
        icon: <DashboardOutlined />,
        label: 'داشبورد',
        path: '/admin',
      },
      {
        key: '/admin/products',
        icon: <AppstoreOutlined />,
        label: 'محصولات',
        path: '/admin/products',
      },
      {
        key: '/admin/orders',
        icon: <ShoppingCartOutlined />,
        label: 'سفارش‌ها',
        path: '/admin/orders',
      },
    ];

    if (hasPermission(user, PermissionScope.MANAGE_USERS)) {
      items.push({
        key: '/admin/users',
        icon: <UserOutlined />,
        label: 'کاربران',
        path: '/admin/users',
        permission: PermissionScope.MANAGE_USERS,
      });
    }

    items.push({
      key: '/admin/settings',
      icon: <SettingOutlined />,
      label: 'تنظیمات',
      path: '/admin/settings',
    });

    return items;
  }, [user]);

  // Filter menu items based on permissions
  const filteredMenuItems = useMemo(() => {
    return menuItems.filter((item) => {
      if (item.permission) {
        return hasPermission(user, item.permission);
      }
      return true;
    });
  }, [menuItems, user]);

  // Get selected menu key based on pathname
  const selectedKey = useMemo(() => {
    if (!pathname) return '/admin';
    // Find exact match first
    const exactMatch = filteredMenuItems.find((item) => item.path === pathname);
    if (exactMatch) return exactMatch.key;
    // Find parent match (e.g., /admin/products/new should select /admin/products)
    const parentMatch = filteredMenuItems.find((item) => pathname.startsWith(item.path + '/'));
    return parentMatch?.key || '/admin';
  }, [pathname, filteredMenuItems]);

  // Handle menu click
  const handleMenuClick = useCallback(
    ({ key }: { key: string }) => {
      const menuItem = filteredMenuItems.find((item) => item.key === key);
      if (menuItem) {
        router.push(menuItem.path);
      }
    },
    [filteredMenuItems, router],
  );

  // User dropdown menu
  const userMenuItems: MenuProps['items'] = useMemo(
    () => [
      {
        key: 'home',
        icon: <HomeOutlined />,
        label: <Link href="/">بازگشت به سایت</Link>,
      },
      {
        type: 'divider',
      },
      {
        key: 'logout',
        icon: <LogoutOutlined />,
        label: 'خروج از حساب',
        danger: true,
        onClick: handleLogout,
      },
    ],
    [handleLogout],
  );

  // Show loading or nothing while checking auth
  if (!mounted || isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-pink-50 via-white to-purple-50">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-pink-200 border-t-pink-500"></div>
          <p className="text-gray-600">در حال بارگذاری...</p>
        </div>
      </div>
    );
  }

  // Don't render if not admin or superuser
  if (!isAuthenticated || !isAdmin(user)) {
    return null;
  }

  return (
    <Layout className="min-h-screen bg-gray-50">
      {/* Mobile Overlay */}
      {!collapsed && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setCollapsed(true)}
        />
      )}
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={260}
        className="!fixed top-0 right-0 bottom-0 z-50 shadow-lg"
        style={{
          overflow: 'auto',
          height: '100vh',
          background: 'linear-gradient(180deg, #ffffff 0%, #f9fafb 100%)',
        }}
      >
        {/* Logo/Brand Section */}
        <div
          className={`flex items-center justify-center gap-3 border-b border-gray-200 px-4 py-6 transition-all duration-300 ${
            collapsed ? 'px-2' : ''
          }`}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 shadow-lg">
            <SettingOutlined className="text-lg text-white" />
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <h1 className="m-0 text-lg font-bold text-gray-800">پنل مدیریت</h1>
              <span className="text-xs text-gray-500">Admin Panel</span>
            </div>
          )}
        </div>

        {/* Navigation Menu */}
        <Menu
          mode="inline"
          selectedKeys={[selectedKey]}
          onClick={handleMenuClick}
          className="border-none bg-transparent px-2 py-4 [&_.ant-menu-item]:mb-2 [&_.ant-menu-item]:rounded-lg [&_.ant-menu-item]:transition-all [&_.ant-menu-item]:duration-200 [&_.ant-menu-item-selected]:bg-gradient-to-l [&_.ant-menu-item-selected]:from-pink-500 [&_.ant-menu-item-selected]:to-purple-600 [&_.ant-menu-item-selected]:text-white [&_.ant-menu-item-selected]:shadow-md [&_.ant-menu-item-selected:hover]:from-pink-600 [&_.ant-menu-item-selected:hover]:to-purple-700 [&_.ant-menu-item:hover]:bg-gray-100"
          items={filteredMenuItems.map((item) => ({
            key: item.key,
            icon: item.icon,
            label: item.label,
          }))}
          style={{
            background: 'transparent',
          }}
        />
      </Sider>

      <Layout
        className="transition-all duration-300"
        style={{
          marginRight: collapsed ? 80 : 260,
        }}
      >
        {/* Header */}
        <AntHeader
          className="sticky top-0 z-40 flex items-center justify-between border-b border-gray-200 !bg-white shadow-sm"
          style={{
            padding: '0 24px',
            height: 64,
          }}
        >
          <div className="flex items-center gap-4">
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-600 transition-colors hover:bg-gray-100 hover:text-pink-500"
            >
              {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </button>
            <div className="hidden md:block">
              <h2 className="m-0 text-lg font-semibold text-gray-800">
                {filteredMenuItems.find((item) => item.key === selectedKey)?.label || 'پنل مدیریت'}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Notifications */}
            <Badge count={0} showZero={false}>
              <button className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-600 transition-colors hover:bg-gray-100 hover:text-pink-500">
                <BellOutlined className="text-lg" />
              </button>
            </Badge>

            {/* User Menu */}
            <Dropdown menu={{ items: userMenuItems }} placement="bottomLeft" trigger={['click']}>
              <button className="flex items-center gap-3 rounded-lg px-3 py-2 transition-colors hover:bg-gray-100">
                <Avatar
                  size="small"
                  className="shrink-0 bg-gradient-to-br from-pink-500 to-purple-600"
                  icon={<UserOutlined />}
                >
                  {user?.first_name?.[0]?.toUpperCase()}
                </Avatar>
                <div className="hidden text-right md:block">
                  <div className="text-sm leading-tight font-medium text-gray-800">
                    {user?.first_name} {user?.last_name}
                  </div>
                  <div className="text-xs leading-tight text-gray-500">مدیر سیستم</div>
                </div>
              </button>
            </Dropdown>
          </div>
        </AntHeader>

        {/* Content */}
        <Content>
          <div
            className="min-h-[calc(100vh-64px)] p-6"
            style={{
              background: 'linear-gradient(to bottom, #f9fafb 0%, #ffffff 100%)',
            }}
          >
            <main className="mx-auto max-w-7xl">{children}</main>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
