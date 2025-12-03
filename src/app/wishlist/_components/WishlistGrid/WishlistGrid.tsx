'use client';

import React from 'react';
import { Row, Col } from 'antd';
import { WishlistItem, WishlistItemProps } from './wishlist-item';

export interface WishlistGridProps {
  items: WishlistItemProps['product'][];
  onMoveToCart: (product: WishlistItemProps['product']) => void;
  onRemove: (id: string) => void;
}

export function WishlistGrid({ items, onMoveToCart, onRemove }: WishlistGridProps) {
  return (
    <Row gutter={[24, 24]}>
      {items.map((product) => (
        <Col xs={24} sm={12} lg={6} key={product.id}>
          <WishlistItem product={product} onMoveToCart={onMoveToCart} onRemove={onRemove} />
        </Col>
      ))}
    </Row>
  );
}

export default WishlistGrid;
