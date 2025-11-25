'use client';

import React, { useRef, useEffect, useState } from 'react';
import { useMostDiscountedProducts } from '@/app/products/_api';
import ProductSlider from './product-slider';

const DiscountedProductsSlider: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Stop observing once visible
        }
      },
      {
        rootMargin: '200px', // Load 200px before element comes into view
        threshold: 0,
      },
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const { data: products = [], isLoading } = useMostDiscountedProducts(isVisible);

  return (
    <div ref={containerRef} className="min-h-[300px]">
      {isLoading ? (
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse rounded-2xl bg-orange-50 p-6">
            <div className="mb-6 flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-orange-200" />
              <div>
                <div className="mb-2 h-6 w-48 rounded bg-orange-200" />
                <div className="h-4 w-64 rounded bg-orange-100" />
              </div>
            </div>
            <div className="flex gap-4 overflow-hidden">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-72 w-64 flex-shrink-0 rounded-lg bg-orange-100" />
              ))}
            </div>
          </div>
        </div>
      ) : products.length > 0 ? (
        <ProductSlider
          title="پرتخفیف‌ترین محصولات"
          description="بهترین فرصت برای خرید با تخفیف‌های ویژه و استثنایی"
          products={products}
          icon="discount"
          accentColor="orange"
        />
      ) : null}
    </div>
  );
};

export default DiscountedProductsSlider;
