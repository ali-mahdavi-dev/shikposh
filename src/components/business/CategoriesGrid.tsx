'use client';

import React from 'react';
import { Card, Typography } from 'antd';
import { motion } from 'framer-motion';
import { ShopOutlined } from '@ant-design/icons';
import type { Category } from '@/types';

const { Title, Text } = Typography;

export interface CategoriesGridProps {
  categories: Array<Pick<Category, 'id' | 'name' | 'count'>>;
}

export const CategoriesGrid: React.FC<CategoriesGridProps> = ({ categories }) => {
  if (!categories || categories.length === 0) {
    return (
      <div className="py-12 text-center">
        <Text className="text-lg text-gray-500">دسته‌بندی‌ای یافت نشد</Text>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {categories.map((category) => (
        <motion.div
          key={category.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ y: -5 }}
          transition={{ duration: 0.3 }}
        >
          <Card hoverable className="h-full rounded-xl shadow-md transition-all hover:shadow-xl">
            <div className="flex flex-col items-center p-4 text-center">
              <ShopOutlined className="mb-3 text-4xl text-pink-500" />
              <Title level={4} className="!mb-2">
                {category.name}
              </Title>
              <Text className="text-gray-600">{category.count ?? 0} محصول</Text>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default CategoriesGrid;


