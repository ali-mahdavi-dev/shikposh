'use client';

import React from 'react';
import { Badge } from 'antd';

interface DiscountBadgeProps {
  discount?: number;
  children: React.ReactNode;
}

export default function DiscountBadge({ discount, children }: DiscountBadgeProps) {
  if (!discount || discount <= 0) {
    return <>{children}</>;
  }

  return (
    <Badge.Ribbon text={`${discount}% تخفیف`} color="red">
      {children}
    </Badge.Ribbon>
  );
}
