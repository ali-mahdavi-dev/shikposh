import React from 'react';
import { Grid } from '@/app/_components/ui';
import { ProductCard } from './ProductCard';
import { ProductGridSkeleton, ErrorState } from '@/shared/components/loading';
import { cn } from '@/utils/cn';

export interface ProductGridProps {
  products: Array<{
    id: string;
    slug: string;
    name: string;
    image?: string;
    price: number;
    discount?: number;
    rating: number;
    reviewCount: number;
    isNew?: boolean;
    isFeatured?: boolean;
  }>;
  loading?: boolean;
  error?: string;
  cols?: 1 | 2 | 3 | 4 | 5 | 6;
  gap?: 'sm' | 'md' | 'lg';
  onAddToCart?: (id: string) => void;
  className?: string;
  emptyMessage?: string;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  loading = false,
  error,
  cols = 4,
  gap = 'md',
  onAddToCart,
  className,
  emptyMessage = 'محصولی یافت نشد',
}) => {
  if (loading) {
    return <ProductGridSkeleton count={cols * 2} />;
  }

  if (error) {
    return <ErrorState message="خطا در بارگذاری محصولات" description={error} />;
  }

  if (products.length === 0) {
    return (
      <div className="py-12 text-center">
        <div className="text-lg text-gray-500">{emptyMessage}</div>
      </div>
    );
  }

  return (
    <Grid cols={cols} gap={gap} responsive={true} className={cn('w-full', className)}>
      {products.map((product, index) => (
        <ProductCard
          key={`${product.id}-${index}`}
          product={product}
          index={index}
          onAddToCart={onAddToCart}
        />
      ))}
    </Grid>
  );
};
