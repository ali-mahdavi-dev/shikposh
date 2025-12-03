'use client';

import React from 'react';
import { Card, Divider } from 'antd';

interface ProductCardWrapperProps {
  children: React.ReactNode;
}

export default function ProductCardWrapper({ children }: ProductCardWrapperProps) {
  return (
    <Card className="overflow-hidden rounded-3xl bg-white/80 shadow-2xl backdrop-blur-sm">
      {children}
    </Card>
  );
}

export function ProductDivider() {
  return <Divider className="my-8" />;
}
