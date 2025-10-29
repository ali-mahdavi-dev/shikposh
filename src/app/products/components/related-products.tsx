import React from 'react';
import { Card, Typography, Rate, Button, Badge } from 'antd';
import { ShoppingCartOutlined, EyeOutlined, HeartOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import { addToCart } from '@/stores/slices/cartSlice';
import { toggleWishlist } from '@/stores/slices/wishlistSlice';
import { RelatedProductsProps } from '../types';

const { Title, Text } = Typography;

const RelatedProducts: React.FC<RelatedProductsProps> = ({ products }) => {
  const dispatch = useAppDispatch();
  const wishlistItems = useAppSelector((state) => state.wishlist.productIds);

  const handleQuickView = (productId: string) => {
    console.log('Quick view product:', productId);
    // TODO: Implement quick view modal
  };

  const handleAddToCart = (product: {
    id: string;
    colors: Record<string, { name: string }>;
    sizes: string[];
    price: number;
    name: string;
    image: string;
  }) => {
    // Get first available color and size
    const firstColor = Object.keys(product.colors)[0];
    const firstSize = product.sizes[0];

    dispatch(
      addToCart({
        productId: product.id,
        color: firstColor,
        size: firstSize,
        quantity: 1,
        price: product.price,
        name: product.name,
        image: product.image,
      }),
    );
  };

  const handleWishlistToggle = (productId: string) => {
    dispatch(toggleWishlist(productId));
  };

  return (
    <div className="space-y-6">
      <Title level={4} className="mb-6 text-gray-800">
        محصولات مرتبط
      </Title>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="group"
          >
            <Card
              className="h-full overflow-hidden rounded-2xl border-0 shadow-lg transition-all duration-300 hover:shadow-2xl"
              style={{ padding: 0 }}
            >
              {/* Product Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Discount Badge */}
                {product.discount > 0 && (
                  <Badge.Ribbon text={`${product.discount}% تخفیف`} color="red">
                    <div></div>
                  </Badge.Ribbon>
                )}

                {/* New Badge */}
                {product.isNew && (
                  <div className="absolute top-2 right-2">
                    <Badge count="جدید" color="green" />
                  </div>
                )}

                {/* Overlay Actions */}
                <div className="absolute inset-0 flex items-center justify-center gap-3 bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Button
                      type="primary"
                      shape="circle"
                      icon={<EyeOutlined />}
                      onClick={() => handleQuickView(product.id)}
                      className="border-white/30 bg-white/20 backdrop-blur-sm hover:bg-white/30"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Button
                      type="primary"
                      shape="circle"
                      icon={<ShoppingCartOutlined />}
                      onClick={() => handleAddToCart(product)}
                      className="border-pink-500 bg-pink-500 hover:bg-pink-600"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Button
                      type="primary"
                      shape="circle"
                      icon={<HeartOutlined />}
                      onClick={() => handleWishlistToggle(product.id)}
                      className={`border-white/30 backdrop-blur-sm ${
                        wishlistItems.includes(product.id)
                          ? 'bg-red-500 hover:bg-red-600'
                          : 'bg-white/20 hover:bg-white/30'
                      }`}
                    />
                  </motion.div>
                </div>
              </div>

              {/* Product Info */}
              <div className="space-y-3 p-4">
                <div>
                  <Text className="line-clamp-2 text-base font-semibold text-gray-800">
                    {product.name}
                  </Text>
                  <Text className="text-sm text-gray-500">{product.brand}</Text>
                </div>

                <div className="flex items-center gap-2">
                  <Rate disabled value={product.rating} className="text-xs" />
                  <Text className="text-xs text-gray-500">
                    ({product.rating}) ({product.reviewCount} نظر)
                  </Text>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    {product.originalPrice && product.discount > 0 ? (
                      <div className="flex items-center gap-2">
                        <Text className="text-lg font-bold text-pink-600">
                          {product.price.toLocaleString()} تومان
                        </Text>
                        <Text delete className="text-sm text-gray-400">
                          {product.originalPrice.toLocaleString()} تومان
                        </Text>
                      </div>
                    ) : (
                      <Text className="text-lg font-bold text-pink-600">
                        {product.price.toLocaleString()} تومان
                      </Text>
                    )}
                  </div>

                  <Button
                    type="primary"
                    size="small"
                    icon={<ShoppingCartOutlined />}
                    onClick={() => handleAddToCart(product)}
                    className="rounded-lg border-0 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
                  >
                    خرید
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* View All Button */}
      <div className="pt-4 text-center">
        <Button
          type="default"
          size="large"
          className="rounded-xl border-2 border-pink-300 px-8 font-semibold text-pink-600 hover:border-pink-400 hover:bg-pink-50"
        >
          مشاهده همه محصولات مرتبط
        </Button>
      </div>
    </div>
  );
};

export default RelatedProducts;
