import { ComponentType } from 'react';
import dynamic from 'next/dynamic';

// Dynamic imports with loading states
export const createDynamicComponent = <T extends ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>,
  fallback?: React.ComponentType,
) => {
  return dynamic(importFunc, {
    loading: fallback
      ? () => React.createElement(fallback)
      : () =>
          React.createElement(
            'div',
            {
              className: 'flex items-center justify-center p-4',
            },
            React.createElement('div', {
              className: 'h-8 w-8 animate-spin rounded-full border-b-2 border-pink-500',
            }),
          ),
    ssr: false, // Disable SSR for client-only components
  });
};

// Pre-configured dynamic components
export const DynamicProductCard = createDynamicComponent(
  () => import('@/components/business/ProductCard'),
);

export const DynamicCategoryCard = createDynamicComponent(
  () => import('@/components/business/CategoryCard'),
);

export const DynamicColorSelector = createDynamicComponent(
  () => import('@/app/products/components/color-selector'),
);

export const DynamicSizeSelector = createDynamicComponent(
  () => import('@/app/products/components/size-selector'),
);

export const DynamicQuantitySelector = createDynamicComponent(
  () => import('@/app/products/components/quantity-selector'),
);

export const DynamicRelatedProducts = createDynamicComponent(
  () => import('@/app/products/components/related-products'),
);

export const DynamicProductImageGallery = createDynamicComponent(
  () => import('@/app/products/components/product-image-gallery'),
);

export const DynamicCommentBox = createDynamicComponent(() => import('@/components/comment-box'));

export const DynamicProfileCard = createDynamicComponent(
  () => import('@/app/profile/components/profile-card'),
);

export const DynamicReviewSummary = createDynamicComponent(
  () => import('@/components/review-summary'),
);
