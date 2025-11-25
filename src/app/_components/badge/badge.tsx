"use client";
import React from 'react';
import { cn } from '@/utils/cn';

export interface BadgeProps {
  text: string;
  variant?: 'new' | 'featured' | 'trending' | 'guide' | 'popular' | 'discount' | 'default';
  className?: string;
}

const badgeStyles = {
  new: 'bg-gradient-to-r from-emerald-500/85 to-teal-600/85 backdrop-blur-sm text-white shadow-md border border-white/30',
  featured:
    'bg-gradient-to-r from-pink-500/85 to-purple-600/85 backdrop-blur-sm text-white shadow-md border border-white/30',
  trending:
    'bg-gradient-to-r from-orange-500/85 to-amber-600/85 backdrop-blur-sm text-white shadow-md border border-white/30',
  guide:
    'bg-gradient-to-r from-blue-500/85 to-indigo-600/85 backdrop-blur-sm text-white shadow-md border border-white/30',
  popular:
    'bg-gradient-to-r from-yellow-500/85 to-orange-500/85 backdrop-blur-sm text-white shadow-md border border-white/30',
  discount:
    'bg-gradient-to-r from-rose-500/85 to-pink-600/85 backdrop-blur-sm text-white shadow-md border border-white/30',
  default: 'bg-black/75 backdrop-blur-sm text-white shadow-md border border-white/20',
};

const getVariant = (badgeText: string): string => {
  if (badgeText.includes('جدید') || badgeText.toLowerCase().includes('new')) return 'new';
  if (
    badgeText.includes('ویژه') ||
    badgeText.includes('محصولات') ||
    badgeText.toLowerCase().includes('featured')
  )
    return 'featured';
  if (badgeText.includes('ترند') || badgeText.toLowerCase().includes('trend')) return 'trending';
  if (badgeText.includes('راهنما') || badgeText.toLowerCase().includes('guide')) return 'guide';
  if (badgeText.includes('محبوب') || badgeText.toLowerCase().includes('popular')) return 'popular';
  if (
    badgeText.includes('تخفیف') ||
    badgeText.includes('%') ||
    badgeText.toLowerCase().includes('discount')
  )
    return 'discount';
  return 'default';
};

export const Badge: React.FC<BadgeProps> = ({ text, variant, className }) => {
  const variantStyle = variant ? badgeStyles[variant] : badgeStyles[getVariant(text)] || badgeStyles.default;

  return (
    <span
      className={cn(
        'inline-flex items-center justify-center rounded-full px-2 py-0.5 text-[10px] font-medium whitespace-nowrap transition-all duration-200 hover:scale-[1.02] hover:brightness-110',
        variantStyle,
        className,
      )}
      style={{
        letterSpacing: '0.01em',
        textShadow: '0 1px 2px rgba(0,0,0,0.15)',
        width: 'fit-content',
        minWidth: 'fit-content',
      }}
    >
      {text}
    </span>
  );
};

export default Badge;
