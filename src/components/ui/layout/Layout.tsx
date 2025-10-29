import React from 'react';
import { Layout as AntLayout, LayoutProps as AntLayoutProps } from 'antd';
import { motion, MotionProps } from 'framer-motion';
import { cn } from '@/utils/cn';

export interface BaseLayoutProps extends Omit<AntLayoutProps, 'size'> {
  variant?: 'default' | 'centered' | 'fullscreen' | 'sidebar';
  animation?: boolean;
  motionProps?: MotionProps;
  className?: string;
  children: React.ReactNode;
}

const layoutVariants = {
  default: 'min-h-screen',
  centered: 'min-h-screen flex items-center justify-center',
  fullscreen: 'h-screen w-screen',
  sidebar: 'min-h-screen flex',
};

export const Layout: React.FC<BaseLayoutProps> = ({
  variant = 'default',
  animation = true,
  motionProps,
  className,
  children,
  ...props
}) => {
  const layoutClasses = cn(layoutVariants[variant], className);

  const LayoutComponent = animation ? motion(AntLayout) : AntLayout;

  const layoutProps = {
    ...props,
    className: layoutClasses,
    ...(animation && {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 0.3 },
      ...motionProps,
    }),
  };

  return <LayoutComponent {...layoutProps}>{children}</LayoutComponent>;
};

export default Layout;
