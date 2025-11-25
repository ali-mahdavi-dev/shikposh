import React from 'react';
import { cn } from '@/utils/cn';
import { formatIranianPrice } from '@/shared/utils';

export interface PriceDisplayProps {
  price: number;
  discount?: number;
  currency?: string;
  locale?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showDiscount?: boolean;
  className?: string;
}

export const PriceDisplay: React.FC<PriceDisplayProps> = ({
  price,
  discount = 0,
  currency = 'IRR',
  locale = 'fa-IR',
  size = 'md',
  showDiscount = true,
  className,
}) => {
  const priceSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
  };

  const formatPrice = (amount: number) => {
    // Use formatIranianPrice to add 3 zeros at the beginning
    return formatIranianPrice(amount);
  };

  // Calculate original price from current price and discount
  const calculateOriginalPrice = (currentPrice: number, discountPercent: number): number => {
    if (discountPercent <= 0 || discountPercent >= 100) return currentPrice;
    return Math.round(currentPrice / (1 - discountPercent / 100));
  };

  const originalPrice = discount > 0 ? calculateOriginalPrice(price, discount) : null;
  const hasDiscount = discount > 0 && originalPrice && originalPrice > price;

  return (
    <div className={cn('flex items-center gap-2', className)}>
      {/* Original Price (strikethrough) */}
      {hasDiscount && (
        <span
          className={cn(
            'text-gray-400 line-through',
            priceSizes[size === 'xl' ? 'lg' : size === 'lg' ? 'md' : 'sm'],
          )}
        >
          {formatPrice(originalPrice)}
        </span>
      )}

      {/* Current Price */}
      <span className={cn('font-bold text-pink-600', priceSizes[size])}>{formatPrice(price)}</span>

      {/* Discount Badge */}
      {showDiscount && discount > 0 && (
        <span className="rounded-full bg-red-500 px-2 py-1 text-xs font-medium text-white">
          {discount}% تخفیف
        </span>
      )}
    </div>
  );
};
