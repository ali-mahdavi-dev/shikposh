'use client';

import React from 'react';
import { Typography as AntTypography } from 'antd';
import { cn } from '@/utils/cn';

const { Title: AntTitle, Text: AntText, Paragraph: AntParagraph } = AntTypography;

export interface TypographyProps {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'label';
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold';
  color?: 'primary' | 'secondary' | 'muted' | 'error' | 'success' | 'warning' | 'default';
  align?: 'left' | 'center' | 'right' | 'justify';
  truncate?: boolean;
  clamp?: number;
  className?: string;
  children: React.ReactNode;
}

// Mobile-first text sizes
const textSizes = {
  xs: 'text-xs md:text-sm', // Mobile: 12px, Desktop: 14px
  sm: 'text-sm md:text-base', // Mobile: 14px, Desktop: 16px
  base: 'text-base md:text-lg', // Mobile: 16px, Desktop: 18px
  lg: 'text-lg md:text-xl', // Mobile: 18px, Desktop: 20px
  xl: 'text-xl md:text-2xl', // Mobile: 20px, Desktop: 24px
  '2xl': 'text-2xl md:text-3xl', // Mobile: 24px, Desktop: 30px
  '3xl': 'text-3xl md:text-4xl', // Mobile: 30px, Desktop: 36px
  '4xl': 'text-4xl md:text-5xl', // Mobile: 36px, Desktop: 48px
};

const textWeights = {
  light: 'font-light',
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
  extrabold: 'font-extrabold',
};

const textColors = {
  primary: 'text-pink-600',
  secondary: 'text-purple-600',
  muted: 'text-gray-500',
  error: 'text-red-500',
  success: 'text-green-500',
  warning: 'text-yellow-500',
  default: 'text-gray-900',
};

const alignClasses = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
  justify: 'text-justify',
};

export const Typography: React.FC<TypographyProps> = ({
  variant = 'p',
  size = 'base',
  weight = 'normal',
  color = 'default',
  align,
  truncate = false,
  clamp,
  className,
  children,
}) => {
  const classes = cn(
    textSizes[size],
    textWeights[weight],
    textColors[color],
    align && alignClasses[align],
    truncate && 'truncate',
    clamp && `line-clamp-${clamp}`,
    className,
  );

  // Heading variants with responsive sizes
  if (variant === 'h1') {
    return (
      <AntTitle
        level={1}
        className={cn(
          '!mb-2 !text-2xl !font-bold md:!mb-3 md:!text-3xl lg:!text-4xl',
          textColors[color],
          className,
        )}
      >
        {children}
      </AntTitle>
    );
  }

  if (variant === 'h2') {
    return (
      <AntTitle
        level={2}
        className={cn(
          '!mb-2 !text-xl !font-bold md:!mb-3 md:!text-2xl lg:!text-3xl',
          textColors[color],
          className,
        )}
      >
        {children}
      </AntTitle>
    );
  }

  if (variant === 'h3') {
    return (
      <AntTitle
        level={3}
        className={cn(
          '!mb-2 !text-lg !font-semibold md:!mb-2 md:!text-xl lg:!text-2xl',
          textColors[color],
          className,
        )}
      >
        {children}
      </AntTitle>
    );
  }

  if (variant === 'h4') {
    return (
      <AntTitle
        level={4}
        className={cn(
          '!mb-1 !text-base !font-semibold md:!mb-2 md:!text-lg lg:!text-xl',
          textColors[color],
          className,
        )}
      >
        {children}
      </AntTitle>
    );
  }

  if (variant === 'h5') {
    return (
      <AntTitle
        level={5}
        className={cn(
          '!mb-1 !text-sm !font-semibold md:!text-base lg:!text-lg',
          textColors[color],
          className,
        )}
      >
        {children}
      </AntTitle>
    );
  }

  if (variant === 'h6') {
    return (
      <AntTitle
        level={5}
        className={cn(
          '!mb-1 !text-xs !font-semibold md:!text-sm lg:!text-base',
          textColors[color],
          className,
        )}
      >
        {children}
      </AntTitle>
    );
  }

  if (variant === 'p') {
    return (
      <AntParagraph className={cn(classes, '!mb-0')}>{children}</AntParagraph>
    );
  }

  if (variant === 'label') {
    return (
      <label className={cn(classes, 'block')}>{children}</label>
    );
  }

  return <AntText className={classes}>{children}</AntText>;
};

// Export individual components for convenience
export const Heading = {
  H1: (props: Omit<TypographyProps, 'variant'>) => <Typography variant="h1" {...props} />,
  H2: (props: Omit<TypographyProps, 'variant'>) => <Typography variant="h2" {...props} />,
  H3: (props: Omit<TypographyProps, 'variant'>) => <Typography variant="h3" {...props} />,
  H4: (props: Omit<TypographyProps, 'variant'>) => <Typography variant="h4" {...props} />,
  H5: (props: Omit<TypographyProps, 'variant'>) => <Typography variant="h5" {...props} />,
  H6: (props: Omit<TypographyProps, 'variant'>) => <Typography variant="h6" {...props} />,
};

export default Typography;

