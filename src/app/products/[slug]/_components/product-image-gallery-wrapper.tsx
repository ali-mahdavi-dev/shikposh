'use client';

import React, { Suspense } from 'react';

const ProductImageGallery = React.lazy(() => import('../../_components/product-image-gallery'));

interface ProductImageGalleryWrapperProps {
  images: string[];
  productName: string;
}

export default function ProductImageGalleryWrapper({ images, productName }: ProductImageGalleryWrapperProps) {
  return (
    <Suspense fallback={<div className="h-96 animate-pulse rounded-lg bg-gray-200" />}>
      <ProductImageGallery images={images} productName={productName} />
    </Suspense>
  );
}

