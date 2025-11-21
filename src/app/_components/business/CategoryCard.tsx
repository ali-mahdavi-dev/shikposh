'use client';

import React, { memo } from 'react';
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

    const categoryColors: Record<string, { gradient: string; icon: string }> = {
      پیراهن: { gradient: 'from-pink-500 via-rose-400 to-pink-600', icon: '👔' },
      شلوار: { gradient: 'from-blue-500 via-cyan-400 to-blue-600', icon: '👖' },
      کت: { gradient: 'from-purple-500 via-indigo-400 to-purple-600', icon: '🧥' },
      کفش: { gradient: 'from-orange-500 via-red-400 to-orange-600', icon: '👟' },
      کیف: { gradient: 'from-amber-500 via-yellow-400 to-amber-600', icon: '👜' },
      اکسسوری: { gradient: 'from-emerald-500 via-teal-400 to-emerald-600', icon: '💍' },
      'پوشاک مردانه': { gradient: 'from-blue-600 via-indigo-500 to-blue-700', icon: '👔' },
      زیورآلات: { gradient: 'from-purple-600 via-pink-500 to-purple-700', icon: '✨' },
      'کیف و کفش': { gradient: 'from-amber-600 via-orange-500 to-amber-700', icon: '👠' },
      'لباس زنانه': { gradient: 'from-pink-600 via-rose-500 to-pink-700', icon: '👗' },
    };

    const defaultColor = categoryColors[category.name] || {
      gradient: 'from-pink-500 via-purple-400 to-pink-600',
      icon: '📦',
    };

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.05, ease: [0.25, 0.46, 0.45, 0.94] }}
        whileHover={{
          scale: 1.03,
          y: -8,
          transition: { type: 'spring', stiffness: 400, damping: 10 },
        }}
        whileTap={{
          scale: 0.98,
          transition: { type: 'spring', stiffness: 600, damping: 20 },
        }}
        className="cursor-pointer"
      >
        <div
          onClick={handleClick}
          className={`group relative overflow-hidden rounded-3xl transition-all duration-500 ${
            isSelected
              ? 'shadow-2xl ring-4 shadow-pink-500/40 ring-pink-400 ring-offset-2'
              : 'shadow-lg hover:shadow-2xl'
          }`}
        >
          {/* Main Card */}
          <div
            className={`relative h-32 w-full overflow-hidden rounded-3xl bg-gradient-to-br ${defaultColor.gradient} p-4 transition-all duration-500 ${
              isSelected ? 'brightness-110' : 'hover:brightness-105'
            }`}
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.3),transparent_50%)]" />
              <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_25%,rgba(255,255,255,0.1)_50%,transparent_50%,transparent_75%,rgba(255,255,255,0.1)_75%)] bg-[length:20px_20px]" />
            </div>

            {/* Category Image Overlay */}
            {category.image && (
              <motion.div
                className="absolute inset-0 bg-cover bg-center opacity-10"
                style={{ backgroundImage: `url(${category.image})` }}
                whileHover={{ scale: 1.1, opacity: 0.15 }}
                transition={{ duration: 0.5 }}
              />
            )}

            {/* Content */}
            <div className="relative z-10 flex h-full flex-col justify-between">
              {/* Top Section - Icon */}
              <div className="flex items-start justify-between">
                <motion.div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl backdrop-blur-md transition-all duration-300 ${
                    isSelected
                      ? 'bg-white/40 shadow-lg shadow-white/20'
                      : 'bg-white/30 shadow-md group-hover:bg-white/40'
                  }`}
                  whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                  transition={{ duration: 0.1 }}
                >
                  <span className="text-2xl">{defaultColor.icon}</span>
                </motion.div>

                {/* Selected Checkmark */}
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-lg"
                  >
                    <svg className="h-5 w-5 text-pink-600" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </motion.div>
                )}
              </div>

              {/* Bottom Section - Name */}
              <div className="mt-auto">
                <h3
                  className={`text-base leading-tight font-bold transition-colors ${
                    isSelected ? 'text-white drop-shadow-lg' : 'text-white drop-shadow-md'
                  }`}
                >
                  {category.name}
                </h3>
              </div>
            </div>

            {/* Hover Glow Effect */}
            {!isSelected && (
              <motion.div
                className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/0 via-white/0 to-white/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                initial={false}
              />
            )}
          </div>
        </div>
      </motion.div>
    );
  },
);

CategoryCard.displayName = 'CategoryCard';

export { CategoryCard };
