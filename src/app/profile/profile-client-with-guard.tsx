'use client';

import { useAuthGuard } from '@/lib/security/guards/auth.guard';
import { PageLoading } from '@/shared';

/**
 * Example: Using Auth Guard in a page component
 */
export default function ProfileClientWithGuard() {
  // Use enterprise auth guard
  const { isAuthenticated, isLoading, isAuthorized } = useAuthGuard({
    requireAuth: true,
    redirectTo: '/auth',
  });

  if (isLoading) {
    return <PageLoading tip="در حال بارگذاری..." />;
  }

  if (!isAuthorized) {
    return null; // Will redirect via useAuthGuard
  }

  return (
    <div>
      <h1>Profile Page</h1>
      {/* Your profile content here */}
    </div>
  );
}

