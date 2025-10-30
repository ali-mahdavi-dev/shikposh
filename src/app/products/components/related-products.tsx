import React from 'react';
import { Typography } from 'antd';
import { useAppDispatch } from '@/stores/hooks';
import { addToCart } from '@/stores/slices/cartSlice';
import { ProductGrid } from '@/components/business';
import { RelatedProductsProps } from '../types';

const { Title } = Typography;

const RelatedProducts: React.FC<RelatedProductsProps> = ({ products }) => {
  const dispatch = useAppDispatch();

  const handleAddToCart = (id: string) => {
    const p = products.find((x) => x.id === id);
    if (!p) return;
    const colors = p.colors ? Object.keys(p.colors) : [];
    const sizes = p.sizes || [];
    const firstColor = colors[0] || 'default';
    const firstSize = sizes[0] || 'default';
    dispatch(
      addToCart({
        productId: p.id,
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
        products={products}
        cols={3}
        onAddToCart={(id) => handleAddToCart(id)}
      />

      {/* You can add a CTA below if needed */}
    </div>
  );
};

export default RelatedProducts;
