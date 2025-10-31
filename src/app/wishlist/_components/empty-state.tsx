'use client';

import React from 'react';
import { Card, Button, Empty } from 'antd';
import Link from 'next/link';

export function WishlistEmptyState() {
  return (
    <div className="mx-auto max-w-5xl py-10">
      <Card className="rounded-2xl shadow-sm">
        <Empty description="لیست علاقه‌مندی خالی است">
          <Link href="/">
            <Button type="primary">شروع خرید</Button>
          </Link>
        </Empty>
      </Card>
    </div>
  );
}

export default WishlistEmptyState;
