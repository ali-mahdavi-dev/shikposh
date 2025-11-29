'use client';

import React, { useCallback, useMemo } from 'react';
import { Layout } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/stores/hooks';
import { isAdmin } from '@/shared/utils/permissions';
import { HomeOutlined, LogoutOutlined } from '@ant-design/icons';
import { useLogout } from '@/app/auth/_api';

const { Header: AntHeader, Content } = Layout;

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAppSelector((state) => state.auth);
  const logoutMutation = useLogout();
  const [mounted, setMounted] = React.useState(false);

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

  // Show loading or nothing while checking auth
  if (!mounted || isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-pink-500"></div>
      </div>
    );
  }

  // Don't render if not admin or superuser
  if (!isAuthenticated || !isAdmin(user)) {
    return null;
  }

  return (
    <Layout className="min-h-screen">
      <AntHeader
        className="bg-white shadow-md"
        style={{
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'sticky',
          top: 0,
          zIndex: 1000,
        }}
      >
        <div className="flex items-center gap-4">
          <h1 className="m-0 text-xl font-bold text-pink-500">پنل مدیریت</h1>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-lg px-3 py-2 transition-colors hover:bg-gray-100"
          >
            <HomeOutlined />
            <span>بازگشت به سایت</span>
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-red-500 transition-colors hover:bg-red-50"
          >
            <LogoutOutlined />
            <span>خروج</span>
          </button>
        </div>
      </AntHeader>
      <Content>
        <div
          className="min-h-lvh bg-gray-50"
          style={{
            padding: 24,
          }}
        >
          <main>{children}</main>
        </div>
      </Content>
    </Layout>
  );
}
