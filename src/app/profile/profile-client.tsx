'use client';

import React, { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import { logout as logoutAction } from '@/stores/features/auth';
import { ProfileSkeleton } from '@/components/ui/feedback/Skeleton';
import { ProfileNotAuthenticated, ProfileHeader, ProfileTabs } from './_components';
import { useAuthGuard } from '@/lib/security/guards/auth.guard';

export default function ProfileClient() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user, isAuthenticated, isLoading: authLoading } = useAppSelector((s) => s.auth);
  const wishlistCount = useAppSelector((s) => s.wishlist.productIds.length);
  const cartItemsCount = useAppSelector((s) =>
    s.cart.items.reduce((sum, item) => sum + item.quantity, 0),
  );

  // Use enterprise auth guard
  const { isLoading: guardLoading, isAuthorized } = useAuthGuard({
    requireAuth: true,
    redirectTo: '/auth',
  });

  const handleLogout = () => {
    dispatch(logoutAction());
    router.push('/');
  };

  if (authLoading || guardLoading) {
    return <ProfileSkeleton />;
  }

  if (!isAuthorized || !isAuthenticated || !user) {
    return <ProfileNotAuthenticated />;
  }

  // Calculate loyalty level based on orders (placeholder - would come from API)
  const orderCount = 0; // This would come from orders API
  const loyaltyLevel = useMemo(() => {
    if (orderCount >= 50) return { name: 'VIP', color: 'gold', progress: 100, level: 5 };
    if (orderCount >= 30) return { name: 'طلایی', color: 'orange', progress: 80, level: 4 };
    if (orderCount >= 15) return { name: 'نقره‌ای', color: 'default', progress: 60, level: 3 };
    if (orderCount >= 5) return { name: 'برنزی', color: 'cyan', progress: 40, level: 2 };
    return { name: 'عضو جدید', color: 'magenta', progress: 20, level: 1 };
  }, [orderCount]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <ProfileHeader user={user} loyaltyLevel={loyaltyLevel} onLogout={handleLogout} />
      <ProfileTabs
        orderCount={orderCount}
        wishlistCount={wishlistCount}
        cartItemsCount={cartItemsCount}
        loyaltyLevel={loyaltyLevel}
        user={user}
      />
    </div>
  );
}
