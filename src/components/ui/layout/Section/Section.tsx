'use client';

import React from 'react';
import { cn } from '@/utils/cn';
import { Container, ContainerProps } from '../Container';

export interface SectionProps extends Omit<ContainerProps, 'children'> {
  variant?: 'default' | 'primary' | 'secondary' | 'muted';
  spacing?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  children: React.ReactNode;
}

const variantClasses = {
  default: 'bg-transparent',
  primary: 'bg-gradient-to-br from-pink-50 to-purple-50',
  secondary: 'bg-gray-50',
  muted: 'bg-gray-100',
};

// Mobile-first spacing
const spacingClasses = {
  none: 'py-0',
  sm: 'py-4 md:py-6', // Mobile: 16px, Desktop: 24px
  md: 'py-6 md:py-8', // Mobile: 24px, Desktop: 32px
  lg: 'py-8 md:py-12', // Mobile: 32px, Desktop: 48px
  xl: 'py-12 md:py-16', // Mobile: 48px, Desktop: 64px
};

export const Section: React.FC<SectionProps> = ({
  variant = 'default',
  spacing = 'md',
  maxWidth,
  fluid,
  centered,
  className,
  children,
}) => {
  return (
    <section className={cn(variantClasses[variant], spacingClasses[spacing], className)}>
      <Container maxWidth={maxWidth} fluid={fluid} centered={centered}>
        {children}
      </Container>
    </section>
  );
};

export default Section;

