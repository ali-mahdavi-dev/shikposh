'use client';

import React, { memo } from 'react';
import { Card, Button, Rate, Typography, Badge } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Badge as BaseBadge } from '@/app/_components';

const { Text } = Typography;

export interface ProductCardProps {
  product: {
    id: string;
    name: string;
    image?: string;
    price: number;
    originalPrice?: number;
    discount?: number;
    rating: number;
    reviewCount: number;
    isNew?: boolean;
    isFeatured?: boolean;
  };
  index: number;
  onAddToCart?: (productId: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = memo(({ product, index, onAddToCart }) => {
  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(product.id);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      <Card
        className="group h-full overflow-hidden rounded-2xl border-0 shadow-lg transition-all duration-300 hover:shadow-2xl"
        style={{ padding: 0 }}
      >
        <Link href={`/products/${product.id}`} className="block">
          <div className="relative overflow-hidden">
            {product.image && (
              <Image
                src={product.image}
                alt={product.name}
                width={200}
                height={200}
                className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-110"
                priority={index < 4} // Prioritize first 4 images
              />
            )}

            {/* Badges */}
            <div className="absolute top-3 right-3 z-10 flex flex-col gap-2">
              {product.isNew && <BaseBadge text="جدید" variant="new" />}
              {product.isFeatured && <BaseBadge text="ویژه" variant="featured" />}
              {product.discount && product.discount > 0 && (
                <BaseBadge text={`${product.discount}% تخفیف`} variant="discount" />
              )}
            </div>
          </div>

          <div className="space-y-3 p-4">
            <Text className="line-clamp-2 text-base font-semibold text-gray-800 transition-colors hover:text-pink-600">
              {product.name}
            </Text>

            <div className="flex items-center gap-2">
              <Rate disabled value={product.rating} className="text-xs" />
              <Text className="text-xs text-gray-500">({product.reviewCount})</Text>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                {product.originalPrice &&
                  product.price &&
                  product.originalPrice > product.price && (
                    <Text delete className="text-sm text-gray-400">
                      {product.originalPrice.toLocaleString()} تومان
                    </Text>
                  )}
                {product.price && (
                  <Text className="text-lg font-bold text-pink-600">
                    {product.price.toLocaleString()} تومان
                  </Text>
                )}
              </div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  type="primary"
                  icon={<ShoppingCartOutlined />}
                  onClick={(e) => {
                    e.preventDefault();
                    handleAddToCart();
                  }}
                  className="rounded-lg border-0 bg-gradient-to-r from-pink-500 to-purple-600"
                >
                  خرید
                </Button>
              </motion.div>
            </div>
          </div>
        </Link>
      </Card>
    </motion.div>
  );
});

ProductCard.displayName = 'ProductCard';

export { ProductCard };
