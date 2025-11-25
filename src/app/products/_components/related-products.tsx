'use client';

import React, { useRef } from 'react';
import { Typography, Button } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { useAppDispatch } from '@/stores/hooks';
import { addToCart } from '@/stores/slices/cartSlice';
import { ProductCard } from '@/app/_components/business';
import { RelatedProductsProps } from '../_types';

const { Title } = Typography;

const RelatedProducts: React.FC<RelatedProductsProps> = ({ products }) => {
  const dispatch = useAppDispatch();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Limit to 10 products
  const limitedProducts = products.slice(0, 10);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

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
      <div className="flex items-center justify-between">
        <Title level={4} className="!mb-0 text-gray-800">
          محصولات مرتبط
        </Title>
        <div className="flex gap-2">
          <Button
            type="default"
            shape="circle"
            icon={<RightOutlined />}
            onClick={() => scroll('right')}
            className="border-gray-300 hover:border-pink-400 hover:text-pink-500"
          />
          <Button
            type="default"
            shape="circle"
            icon={<LeftOutlined />}
            onClick={() => scroll('left')}
            className="border-gray-300 hover:border-pink-400 hover:text-pink-500"
          />
        </div>
      </div>

      <div
        ref={scrollContainerRef}
        className="scrollbar-hide flex gap-4 overflow-x-auto scroll-smooth pb-4"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {limitedProducts.map((product: any, index: number) => (
          <div key={product.id} className="w-64 flex-shrink-0">
            <ProductCard
              product={product}
              index={index}
              onAddToCart={() => handleAddToCart(product.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
