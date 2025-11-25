'use client';

import React, { memo, useState } from 'react';
import { Card, Button, Rate, Typography, Badge } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { formatIranianPrice } from '@/shared/utils';
import { getValidImageSrc, DEFAULT_IMAGES } from '@/shared/utils/image';

const { Text } = Typography;

export interface ProductCardProps {
  product: {
    slug: string;
    id: string;
    name: string;
    image?: string;
    price: number;
    origin_price?: number;
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
  const [imageSrc, setImageSrc] = useState(() =>
    getValidImageSrc(product.image, DEFAULT_IMAGES.product),
  );

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(product.id);
    }
  };

  const handleImageError = () => {
    setImageSrc(DEFAULT_IMAGES.product);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      <Card
        className="group h-full rounded-2xl border-0 shadow-lg transition-all duration-300 hover:shadow-2xl"
        style={{ padding: 0 }}
      >
        {/* Badges */}
        <div className="absolute top-3 right-0 z-10 flex flex-col gap-4">
          {/* Badges */}
          {product.isNew && (
            <Badge.Ribbon text="جدید" color="#10b981" placement="start">
              <div />
            </Badge.Ribbon>
          )}
          {product.isFeatured && (
            <Badge.Ribbon
              text="ویژه"
              color="#ec4899"
              placement="start"
              className={product.isNew ? '!top-5' : ''}
            >
              <div />
            </Badge.Ribbon>
          )}
          {product.discount && product.discount > 0 && (
            <Badge.Ribbon
              text={`${product.discount}% تخفیف`}
              color="#ef4444"
              placement="start"
              className={
                product.isNew && product.isFeatured
                  ? '!top-[11px]'
                  : product.isNew || product.isFeatured
                    ? '!top-5'
                    : ''
              }
            >
              <div />
            </Badge.Ribbon>
          )}
        </div>
        <Link href={`/products/${product.slug}`} className="block">
          <div className="relative overflow-hidden">
            <Image
              src={imageSrc}
              alt={product.name}
              width={200}
              height={200}
              className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-110"
              priority={index < 4} // Prioritize first 4 images
              onError={handleImageError}
            />
          </div>

          <div className="space-y-3 p-4">
            <Text className="line-clamp-2 text-base font-semibold text-gray-800 transition-colors hover:text-pink-600">
              {product.name}
            </Text>

            <div className="flex items-center gap-2">
              <Rate disabled value={product.rating} className="text-xs" />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                {(product.discount && product.discount > 0) || product.origin_price ? (
                  <>
                    <Text delete className="text-sm text-gray-400">
                      {formatIranianPrice(
                        product.origin_price ||
                          Math.round(product.price / (1 - (product.discount || 0) / 100)),
                      )}{' '}
                      تومان
                    </Text>
                    <Text className="text-lg font-bold text-pink-600">
                      {formatIranianPrice(product.price)} تومان
                    </Text>
                  </>
                ) : (
                  product.price && (
                    <Text className="text-lg font-bold text-pink-600">
                      {formatIranianPrice(product.price)} تومان
                    </Text>
                  )
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
