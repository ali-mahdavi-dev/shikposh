'use client';

import React from 'react';
import { Typography } from 'antd';
import { useAppDispatch } from '@/stores/hooks';
import { addToCart } from '@/stores/slices/cartSlice';
import { ProductGrid } from '@/app/_components/business';
import { RelatedProductsProps } from '../_types';

const { Title } = Typography;

const RelatedProducts: React.FC<RelatedProductsProps> = ({ products }) => {
  const dispatch = useAppDispatch();

  const handleAddToCart = (id: string | number) => {
    const p = products.find((x: any) => String(x.id) === String(id));
    if (!p) return;
    const firstColor = 'default';
    const firstSize = 'default';
    dispatch(
      addToCart({
        productId: String(p.id) as any,
        color: firstColor,
        size: firstSize,
        quantity: 1,
        price: p.price,
        name: p.name,
        image: p.image,
      }),
    );
  };

  return (
    <div className="space-y-6">
      <Title level={4} className="mb-6 text-gray-800">
        محصولات مرتبط
      </Title>

      <ProductGrid
        products={products as any}
        cols={3}
        onAddToCart={(id) => handleAddToCart(id)}
      />
    </div>
  );
};

export default RelatedProducts;

