'use client';

import React, { memo } from 'react';
import { Button, Badge } from 'antd';
import { motion } from 'framer-motion';

export interface CategoryCardProps {
  category: {
    id: string;
    name: string;
    count: number;
    color: string;
  };
  index: number;
  isSelected: boolean;
  onSelect: (categoryId: string) => void;
}

const CategoryCard: React.FC<CategoryCardProps> = memo(
  ({ category, index, isSelected, onSelect }) => {
    const handleClick = () => {
      onSelect(category.id);
    };

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2, delay: index * 0.1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          type={isSelected ? 'primary' : 'default'}
          size="large"
          onClick={handleClick}
          className={`h-auto rounded-xl px-6 py-3 font-semibold transition-all duration-300 ${
            isSelected
              ? 'border-pink-500 bg-pink-500 text-white shadow-lg'
              : 'border-gray-300 bg-white text-gray-700 hover:border-pink-300 hover:text-pink-500'
          }`}
        >
          <span className="flex items-center gap-2">
            {category.name}
            <Badge
              count={category.count}
              style={{
                backgroundColor: isSelected ? 'rgba(255,255,255,0.2)' : category.color,
                fontSize: '10px',
              }}
            />
          </span>
        </Button>
      </motion.div>
    );
  },
);

CategoryCard.displayName = 'CategoryCard';

export { CategoryCard };
