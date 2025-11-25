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
    const p = products.find((x: any) => String(x.id) === String(id)) as any;
    if (!p) return;

    // Get color name from colors object (key is ID, value has name)
    // Handle both ProductSummary format (Record) and ProductEntity format (array)
    let colorName = 'default';
    if (p.colors) {
      if (Array.isArray(p.colors) && p.colors.length > 0) {
        // ProductEntity format: colors is array of {id, name, hex}
        colorName = p.colors[0].name;
      } else if (typeof p.colors === 'object' && !Array.isArray(p.colors)) {
        // ProductSummary format: colors is Record<string, {name}>
        const colorKeys = Object.keys(p.colors);
        const firstColorId = colorKeys[0];
        if (firstColorId && p.colors[firstColorId]?.name) {
          colorName = p.colors[firstColorId].name;
        }
      }
    }

    // Get size name - handle both formats
    let sizeName = '';
    if (p.sizes) {
      if (Array.isArray(p.sizes) && p.sizes.length > 0) {
        if (typeof p.sizes[0] === 'object' && p.sizes[0].name) {
          // ProductEntity format: sizes is array of {id, name}
          sizeName = p.sizes[0].name;
        } else if (typeof p.sizes[0] === 'string') {
          // ProductSummary format: sizes is array of strings
          sizeName = p.sizes[0];
        }
      }
    }

    dispatch(
      addToCart({
        productId: String(p.id),
        color: colorName,
        size: sizeName,
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

      <ProductGrid products={products as any} cols={3} onAddToCart={(id) => handleAddToCart(id)} />
    </div>
  );
};

export default RelatedProducts;
