import React from 'react';
import { cn } from '@/utils/cn';

export interface PriceDisplayProps {
  price: number;
  originalPrice?: number;
  currency?: string;
  locale?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showDiscount?: boolean;
  className?: string;
}

export const PriceDisplay: React.FC<PriceDisplayProps> = ({
  price,
  originalPrice,
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
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const calculateDiscount = () => {
    if (originalPrice && originalPrice > price) {
      return Math.round(((originalPrice - price) / originalPrice) * 100);
    }
    return 0;
  };

  const discount = calculateDiscount();

  return (
    <div className={cn('flex items-center gap-2', className)}>
      {/* Current Price */}
      <span className={cn('font-bold text-pink-600', priceSizes[size])}>{formatPrice(price)}</span>

      {/* Original Price */}
      {originalPrice && originalPrice > price && (
        <span
          className={cn(
            'text-gray-400 line-through',
            priceSizes[size === 'xl' ? 'lg' : size === 'lg' ? 'md' : 'sm'],
          )}
        >
          {formatPrice(originalPrice)}
        </span>
      )}

      {/* Discount Badge */}
      {showDiscount && discount > 0 && (
        <span className="rounded-full bg-red-500 px-2 py-1 text-xs font-medium text-white">
          {discount}% تخفیف
        </span>
      )}
    </div>
  );
};
