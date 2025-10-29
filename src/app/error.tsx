'use client';

import React from 'react';
import { ErrorState } from '@/shared/components/loading';
import { Button } from 'antd';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <ErrorState
          message="خطایی رخ داده است"
          description="متأسفانه مشکلی در بارگذاری صفحه پیش آمده است."
        />
        <Button type="primary" onClick={reset} className="mt-4">
          تلاش مجدد
        </Button>
      </div>
    </div>
  );
}
