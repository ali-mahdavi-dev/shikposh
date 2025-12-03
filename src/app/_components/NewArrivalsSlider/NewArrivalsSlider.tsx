'use client';

import React, { useRef, useEffect, useState } from 'react';
import { useNewArrivals } from '@/app/products/_api';
import { ProductSlider } from '../ProductSlider';
import { ProductGridSkeleton } from '@/shared';

const NewArrivalsSlider: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '200px',
        threshold: 0,
      },
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const { data: products = [], isLoading } = useNewArrivals(isVisible);

  return (
    <div ref={containerRef} className="min-h-[300px]">
      {isLoading ? (
        <div className="container mx-auto px-4 py-8">
          <ProductGridSkeleton count={4} className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" />
        </div>
      ) : products.length > 0 ? (
        <ProductSlider
          title="جدیدترین محصولات"
          description="آخرین محصولات اضافه شده به فروشگاه را ببینید"
          products={products}
          icon="star"
          accentColor="purple"
        />
      ) : null}
    </div>
  );
};

export default NewArrivalsSlider;
