'use client';

import React from 'react';
import { Card, Button, Empty } from 'antd';
import Link from 'next/link';

export const CartEmpty: React.FC = () => {
  return (
    <Card className="rounded-2xl shadow-sm">
      <Empty description="سبد خرید شما خالی است">
        <Link href="/">
          <Button type="primary">شروع خرید</Button>
        </Link>
      </Empty>
    </Card>
  );
};

