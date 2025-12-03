'use client';

import React from 'react';
import { Layout as AntLayout } from 'antd';
import { cn } from '@/utils/cn';

const { Header: AntHeader, Content: AntContent, Footer: AntFooter, Sider: AntSider } = AntLayout;

export interface LayoutProps {
  className?: string;
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ className, children }) => {
  return (
    <AntLayout className={cn('min-h-screen bg-gray-50', className)}>
      {children}
    </AntLayout>
  );
};

export interface HeaderProps {
  className?: string;
  children: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({ className, children }) => {
  return (
    <AntHeader
      className={cn(
        'sticky top-0 z-50 bg-white border-b border-gray-200',
        'px-2 md:px-4', // Mobile-first padding
        className,
      )}
    >
      {children}
    </AntHeader>
  );
};

export interface ContentProps {
  className?: string;
  children: React.ReactNode;
}

export const Content: React.FC<ContentProps> = ({ className, children }) => {
  return (
    <AntContent
      className={cn(
        'p-2 md:p-4 lg:p-6', // Mobile-first padding
        className,
      )}
    >
      {children}
    </AntContent>
  );
};

export interface FooterProps {
  className?: string;
  children: React.ReactNode;
}

export const Footer: React.FC<FooterProps> = ({ className, children }) => {
  return (
    <AntFooter
      className={cn(
        'bg-white border-t border-gray-200',
        'px-2 py-4 md:px-4 md:py-6', // Mobile-first padding
        className,
      )}
    >
      {children}
    </AntFooter>
  );
};

export interface SiderProps {
  className?: string;
  children: React.ReactNode;
  collapsed?: boolean;
  width?: number;
}

export const Sider: React.FC<SiderProps> = ({
  className,
  children,
  collapsed,
  width = 200,
}) => {
  return (
    <AntSider
      collapsed={collapsed}
      width={width}
      className={cn('bg-white border-r border-gray-200', className)}
    >
      {children}
    </AntSider>
  );
};

export default Layout;

