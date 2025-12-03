'use client';

import React from 'react';
import { Rate as AntRate, RateProps as AntRateProps } from 'antd';
import { cn } from '@/utils/cn';

export interface RateProps extends Omit<AntRateProps, 'size'> {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: 'default' | 'pink' | 'amber' | 'purple';
  className?: string;
}

// Mobile-first sizes
const rateSizes = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
};

const rateColors = {
  default: '#fadb14', // Ant Design default
  pink: '#ec4899',
  amber: '#f59e0b',
  purple: '#a855f7',
};

export const Rate: React.FC<RateProps> = ({
  size = 'md',
  color = 'default',
  className,
  ...props
}) => {
  const rateClasses = cn(rateSizes[size], className);

  const rateProps = {
    ...props,
    className: rateClasses,
    style: {
      ...props.style,
      '--ant-rate-star-color': rateColors[color],
      '--ant-rate-star-size': size === 'xs' ? '14px' : size === 'sm' ? '16px' : size === 'md' ? '20px' : size === 'lg' ? '24px' : '28px',
    } as React.CSSProperties,
  } as AntRateProps;

  return <AntRate {...rateProps} />;
};

export default Rate;

