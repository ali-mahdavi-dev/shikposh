'use client';

import React, { memo } from 'react';
import { Card, Button, Rate, Typography, Badge } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { formatIranianPrice } from '@/shared/utils';
import { SafeImage } from '@/shared';

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
  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(product.id);
    }
  };

  // Calculate badge positions to prevent overlapping
  // Each badge is spaced 32px apart, starting from 12px from top
  const BADGE_SPACING = 32;
  const INITIAL_TOP = 12;

  // Calculate how many badges come before each one
  const badgesBeforeNew = 0;
  const badgesBeforeFeatured = product.isNew ? 1 : 0;
  const badgesBeforeDiscount = (product.isNew ? 1 : 0) + (product.isFeatured ? 1 : 0);

  const newBadgeTop = product.isNew ? INITIAL_TOP + badgesBeforeNew * BADGE_SPACING : 0;
  const featuredBadgeTop = product.isFeatured
    ? INITIAL_TOP + badgesBeforeFeatured * BADGE_SPACING
    : 0;
  const discountBadgeTop =
    product.discount && product.discount > 0
      ? INITIAL_TOP + badgesBeforeDiscount * BADGE_SPACING
      : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      <Card
        className="group h-full rounded-xl border-0 shadow-md transition-all duration-300 hover:shadow-xl md:rounded-2xl md:shadow-lg md:hover:shadow-2xl"
        style={{ padding: 0 }}
      >
        {/* Badges */}
        <div className="absolute top-0 right-0 z-10">
          {product.isNew && (
            <Badge.Ribbon
              text="جدید"
              color="#10b981"
              placement="start"
              style={{ top: `${newBadgeTop}px` }}
            >
              <div />
            </Badge.Ribbon>
          )}
          {product.isFeatured && (
            <Badge.Ribbon
              text="ویژه"
              color="#ec4899"
              placement="start"
              style={{ top: `${featuredBadgeTop}px` }}
            >
              <div />
            </Badge.Ribbon>
          )}
          {product.discount && product.discount > 0 ? (
            <Badge.Ribbon
              text={`${product.discount}% تخفیف`}
              color="#ef4444"
              placement="start"
              style={{ top: `${discountBadgeTop}px` }}
            >
              <div />
            </Badge.Ribbon>
          ) : (
            <></>
          )}
        </div>
        <Link href={`/products/${product.slug}`} className="block">
          <div className="relative overflow-hidden">
            <SafeImage
              src={product.image}
              alt={product.name}
              width={200}
              height={200}
              className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-110 sm:h-56 md:h-64"
              priority={index < 4} // Prioritize first 4 images
              fallbackType="product"
            />
          </div>

          <div className="space-y-2 p-3 sm:space-y-3 sm:p-4">
            <Text className="line-clamp-2 text-sm font-semibold text-gray-800 transition-colors hover:text-pink-600 sm:text-base">
              {product.name}
            </Text>

            <div className="flex items-center gap-1 sm:gap-2">
              <Rate disabled value={product.rating} className="text-xs" />
            </div>

            <div className="flex items-center justify-between gap-2">
              <div className="flex min-w-0 flex-1 flex-col">
                {(product.discount && product.discount > 0) || product.origin_price ? (
                  <>
                    <Text delete className="text-xs text-gray-400 sm:text-sm">
                      {formatIranianPrice(
                        product.origin_price ||
                          Math.round(product.price / (1 - (product.discount || 0) / 100)),
                      )}{' '}
                      تومان
                    </Text>
                    <Text className="text-base font-bold text-pink-600 sm:text-lg">
                      {formatIranianPrice(product.price)} تومان
                    </Text>
                  </>
                ) : (
                  product.price && (
                    <Text className="text-base font-bold text-pink-600 sm:text-lg">
                      {formatIranianPrice(product.price)} تومان
                    </Text>
                  )
                )}
              </div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  type="primary"
                  icon={<ShoppingCartOutlined />}
                  size="small"
                  onClick={(e) => {
                    e.preventDefault();
                    handleAddToCart();
                  }}
                  className="h-9 rounded-lg border-0 bg-gradient-to-r from-pink-500 to-purple-600 px-3 text-xs sm:h-10 sm:px-4 sm:text-sm"
                >
                  <span className="hidden sm:inline">خرید</span>
                  <span className="sm:hidden">+</span>
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
