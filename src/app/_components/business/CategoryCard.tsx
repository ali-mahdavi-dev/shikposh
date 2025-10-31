'use client';

import React, { memo } from 'react';
import { Badge } from 'antd';
import { motion } from 'framer-motion';

export interface CategoryCardProps {
  category: {
    id: string;
    name: string;
    count: number;
    color?: string;
    image?: string;
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

    const categoryColors: Record<string, string> = {
      'پیراهن': 'from-pink-500 to-rose-400',
      'شلوار': 'from-blue-500 to-cyan-400',
      'کت': 'from-purple-500 to-indigo-400',
      'کفش': 'from-orange-500 to-red-400',
      'کیف': 'from-amber-500 to-yellow-400',
      'اکسسوری': 'from-emerald-500 to-teal-400',
    };

    const defaultColor = categoryColors[category.name] || 'from-pink-500 to-purple-400';

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.3, delay: index * 0.05 }}
        whileHover={{ scale: 1.08, y: -4 }}
        whileTap={{ scale: 0.95 }}
        className="cursor-pointer"
      >
        <div
          onClick={handleClick}
          className={`relative overflow-hidden rounded-2xl p-1 transition-all duration-300 ${
            isSelected
              ? 'bg-gradient-to-r from-pink-500 to-purple-500 shadow-xl shadow-pink-500/30'
              : 'bg-white shadow-lg hover:shadow-xl'
          }`}
        >
          <div
            className={`relative h-24 w-full overflow-hidden rounded-xl ${
              isSelected
                ? 'bg-gradient-to-br from-white/20 to-white/5'
                : `bg-gradient-to-br ${defaultColor}`
            }`}
          >
            {category.image && (
              <div
                className="absolute inset-0 bg-cover bg-center opacity-20"
                style={{ backgroundImage: `url(${category.image})` }}
              />
            )}
            <div className={`absolute inset-0 flex items-center justify-center ${category.image ? '' : 'bg-gradient-to-br ' + defaultColor}`}>
              <div className={`rounded-full ${isSelected ? 'bg-white/30' : 'bg-white/90'} p-3 backdrop-blur-sm`}>
                <svg className="h-8 w-8 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </div>
            </div>
            {isSelected && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-2 right-2"
              >
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white">
                  <svg className="h-4 w-4 text-pink-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </motion.div>
            )}
          </div>
          <div className="mt-2 px-2 pb-2">
            <div className="flex items-center justify-between">
              <span
                className={`text-sm font-bold ${
                  isSelected ? 'text-white' : 'text-gray-800'
                }`}
              >
                {category.name}
              </span>
              <Badge
                count={category.count}
                className={`${isSelected ? 'bg-white/30 text-white' : 'bg-gray-100 text-gray-700'}`}
                style={{
                  fontSize: '10px',
                  fontWeight: 600,
                }}
              />
            </div>
          </div>
        </div>
      </motion.div>
    );
  },
);

CategoryCard.displayName = 'CategoryCard';

export { CategoryCard };
