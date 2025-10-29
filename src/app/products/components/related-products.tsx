import React from "react";
import { Card, Typography, Rate, Button } from "antd";
import { ShoppingCartOutlined, EyeOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import Image from "next/image";
import { RelatedProductsProps } from "../types";

const { Title, Text } = Typography;

const RelatedProducts: React.FC<RelatedProductsProps> = ({ products }) => {
  const handleQuickView = (productId: string) => {
    console.log("Quick view product:", productId);
  };

  const handleAddToCart = (productId: string) => {
    console.log("Add to cart:", productId);
  };

  return (
    <div className="space-y-6">
      <Title level={4} className="text-gray-800 mb-6">
        محصولات مرتبط
      </Title>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
              className="h-full shadow-lg hover:shadow-2xl transition-all duration-300 rounded-2xl overflow-hidden border-0"
              style={{ padding: 0 }}
            >
              {/* Product Image */}
              <div className="relative overflow-hidden h-48">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />

                {/* Overlay Actions */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
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
                      className="bg-white/20 border-white/30 backdrop-blur-sm hover:bg-white/30"
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
                      onClick={() => handleAddToCart(product.id)}
                      className="bg-pink-500 border-pink-500 hover:bg-pink-600"
                    />
                  </motion.div>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4 space-y-3">
                <div>
                  <Text className="text-gray-800 font-semibold text-base line-clamp-2">
                    {product.name}
                  </Text>
                </div>

                <div className="flex items-center gap-2">
                  <Rate disabled value={product.rating} className="text-xs" />
                  <Text className="text-gray-500 text-xs">
                    ({product.rating})
                  </Text>
                </div>

                <div className="flex items-center justify-between">
                  <Text className="text-pink-600 font-bold text-lg">
                    {product.price.toLocaleString()} تومان
                  </Text>

                  <Button
                    type="primary"
                    // size="small"
                    icon={<ShoppingCartOutlined />}
                    onClick={() => handleAddToCart(product.id)}
                    className="bg-gradient-to-r from-pink-500 to-purple-600 border-0 rounded-lg hover:from-pink-600 hover:to-purple-700"
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
      <div className="text-center pt-4">
        <Button
          type="default"
          size="large"
          className="rounded-xl border-2 border-pink-300 text-pink-600 hover:bg-pink-50 hover:border-pink-400 font-semibold px-8"
        >
          مشاهده همه محصولات مرتبط
        </Button>
      </div>
    </div>
  );
};

export default RelatedProducts;
