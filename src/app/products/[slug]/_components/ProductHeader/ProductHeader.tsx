import React from 'react';
import DiscountBadge from '../DiscountBadge';

interface ProductHeaderProps {
  brand?: string;
  title: string;
  description?: string;
  discount?: number;
  rating?: number;
}

function StarRating({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

  return (
    <div className="flex items-center gap-0.5">
      {[...Array(fullStars)].map((_, i) => (
        <span key={`full-${i}`} className="text-yellow-400">
          ★
        </span>
      ))}
      {hasHalf && <span className="text-yellow-400">☆</span>}
      {[...Array(emptyStars)].map((_, i) => (
        <span key={`empty-${i}`} className="text-gray-300">
          ★
        </span>
      ))}
    </div>
  );
}

export default function ProductHeader({
  brand,
  title,
  description,
  discount,
  rating = 0,
}: ProductHeaderProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="mb-2 flex items-center gap-2">
          <span className="text-sm text-gray-500">{brand}</span>
          <span className="rounded bg-pink-100 px-2 py-0.5 text-xs text-pink-600">برند معتبر</span>
        </div>
        <DiscountBadge discount={discount}>
          <h2 className="mb-3 text-2xl font-bold text-gray-800 md:text-3xl">{title}</h2>
        </DiscountBadge>
        <div className="mb-4 flex items-center gap-3">
          <StarRating rating={rating} />
          <span className="text-sm text-gray-500">({rating.toFixed(1)})</span>
        </div>
      </div>

      {/* Description */}
      {description && <p className="leading-relaxed text-gray-600">{description}</p>}
    </div>
  );
}
