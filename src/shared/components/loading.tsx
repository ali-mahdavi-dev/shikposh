import React from 'react';
import { Spin, Skeleton, Alert } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

// Base loading component with consistent styling
interface LoadingProps {
  size?: 'small' | 'default' | 'large';
  tip?: string;
  spinning?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export const Loading: React.FC<LoadingProps> = ({
  size = 'default',
  tip = 'در حال بارگذاری...',
  spinning = true,
  children,
  className = '',
}) => {
  if (children) {
    return (
      <Spin
        spinning={spinning}
        size={size}
        tip={tip}
        indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
        className={className}
      >
        {children}
      </Spin>
    );
  }

  return (
    <div className={`flex items-center justify-center py-8 ${className}`}>
      <div className="flex flex-col items-center space-y-2">
        <Spin
          size={size}
          indicator={
            <LoadingOutlined
              style={{ fontSize: size === 'large' ? 32 : size === 'small' ? 16 : 24 }}
              spin
            />
          }
        />
        {tip && <p className="text-sm text-gray-600">{tip}</p>}
      </div>
    </div>
  );
};

// Full page loading component
interface PageLoadingProps {
  tip?: string;
  size?: 'small' | 'default' | 'large';
  className?: string;
}

export const PageLoading: React.FC<PageLoadingProps> = ({
  tip = 'در حال بارگذاری...',
  size = 'large',
  className = '',
}) => {
  return (
    <div className={`flex min-h-screen items-center justify-center bg-gray-50 ${className}`}>
      <div className="text-center">
        <div className="flex flex-col items-center space-y-4">
          <Spin
            size={size}
            indicator={
              <LoadingOutlined
                style={{ fontSize: size === 'large' ? 48 : size === 'small' ? 24 : 32 }}
                spin
              />
            }
          />
          {tip && <p className="text-lg text-gray-600">{tip}</p>}
        </div>
      </div>
    </div>
  );
};

// Content loading component (for sections within pages)
interface ContentLoadingProps {
  tip?: string;
  size?: 'small' | 'default' | 'large';
  className?: string;
}

export const ContentLoading: React.FC<ContentLoadingProps> = ({
  tip = 'در حال بارگذاری...',
  size = 'default',
  className = '',
}) => {
  return (
    <div className={`flex items-center justify-center py-12 ${className}`}>
      <div className="flex flex-col items-center space-y-3">
        <Spin
          size={size}
          indicator={
            <LoadingOutlined
              style={{ fontSize: size === 'large' ? 32 : size === 'small' ? 16 : 24 }}
              spin
            />
          }
        />
        {tip && <p className="text-base text-gray-600">{tip}</p>}
      </div>
    </div>
  );
};

// Skeleton loading components
interface SkeletonLoadingProps {
  rows?: number;
  avatar?: boolean;
  title?: boolean;
  paragraph?: boolean;
  active?: boolean;
  className?: string;
}

export const SkeletonLoading: React.FC<SkeletonLoadingProps> = ({
  rows = 3,
  avatar = false,
  title = true,
  paragraph = true,
  active = true,
  className = '',
}) => {
  return (
    <div className={`space-y-4 ${className}`}>
      <Skeleton
        avatar={avatar}
        title={title}
        paragraph={paragraph ? { rows } : false}
        active={active}
      />
    </div>
  );
};

// Specific skeleton components for different UI elements
export const ProductCardSkeleton = ({ className = '' }: { className?: string }) => (
  <div className={`rounded-lg bg-white p-4 shadow-sm ${className}`}>
    <Skeleton.Image className="mb-4 h-48 w-full" />
    <Skeleton title={{ width: '80%' }} paragraph={{ rows: 2 }} />
  </div>
);

export const ReviewSkeleton = ({ className = '' }: { className?: string }) => (
  <div className={`mb-4 rounded-lg bg-white p-4 shadow-sm ${className}`}>
    <div className="mb-3 flex items-center">
      <Skeleton.Avatar size="small" />
      <div className="ml-3 flex-1">
        <Skeleton title={{ width: '30%' }} paragraph={false} />
        <Skeleton paragraph={{ rows: 1, width: '60%' }} />
      </div>
    </div>
    <Skeleton paragraph={{ rows: 2 }} />
  </div>
);

export const CommentBoxSkeleton = ({ className = '' }: { className?: string }) => (
  <div className={`space-y-6 ${className}`}>
    <Skeleton title={{ width: '40%' }} paragraph={{ rows: 1 }} />
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <Skeleton.Image className="h-32 w-full" />
      <div className="space-y-2">
        <Skeleton title={{ width: '60%' }} />
        <Skeleton paragraph={{ rows: 3 }} />
      </div>
    </div>
    <div className="space-y-4">
      {Array.from({ length: 3 }).map((_, index) => (
        <ReviewSkeleton key={index} />
      ))}
    </div>
  </div>
);

// Grid skeleton for product lists
export const ProductGridSkeleton = ({
  count = 6,
  className = '',
}: {
  count?: number;
  className?: string;
}) => (
  <div className={`grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 ${className}`}>
    {Array.from({ length: count }).map((_, index) => (
      <ProductCardSkeleton key={index} />
    ))}
  </div>
);

// Error state component
interface ErrorStateProps {
  message?: string;
  description?: string;
  onRetry?: () => void;
  className?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  message = 'خطا در بارگذاری داده‌ها',
  description = 'لطفاً اتصال اینترنت خود را بررسی کنید و دوباره تلاش کنید.',
  onRetry,
  className = '',
}) => {
  return (
    <div className={`flex min-h-screen items-center justify-center bg-gray-50 ${className}`}>
      <Alert
        message={message}
        description={description}
        type="error"
        showIcon
        action={
          onRetry && (
            <button
              onClick={onRetry}
              className="mt-2 rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
            >
              تلاش مجدد
            </button>
          )
        }
      />
    </div>
  );
};

// Loading wrapper for async operations
interface LoadingWrapperProps {
  loading: boolean;
  error?: string | null;
  children: React.ReactNode;
  loadingComponent?: React.ReactNode;
  errorComponent?: React.ReactNode;
  className?: string;
}

export const LoadingWrapper: React.FC<LoadingWrapperProps> = ({
  loading,
  error,
  children,
  loadingComponent,
  errorComponent,
  className = '',
}) => {
  if (loading) {
    return loadingComponent || <ContentLoading className={className} />;
  }

  if (error) {
    return errorComponent || <ErrorState message={error} className={className} />;
  }

  return <>{children}</>;
};

// Export all components
export default {
  Loading,
  PageLoading,
  ContentLoading,
  SkeletonLoading,
  ProductCardSkeleton,
  ReviewSkeleton,
  CommentBoxSkeleton,
  ProductGridSkeleton,
  ErrorState,
  LoadingWrapper,
};
