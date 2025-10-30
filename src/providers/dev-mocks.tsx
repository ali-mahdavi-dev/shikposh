"use client";

import { useEffect } from 'react';

export function DevMocks() {
  useEffect(() => {
    if (
      process.env.NEXT_PUBLIC_API_MOCKING === 'msw' &&
      process.env.NODE_ENV === 'development'
    ) {
      // Dynamically import to avoid bundling for production
      import('@/mocks');
    }
  }, []);

  return null;
}


