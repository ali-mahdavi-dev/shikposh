import React from 'react';
import { Typography, Badge } from 'antd';
import Link from 'next/link';
import Image from 'next/image';
import { ShopOutlined, RightOutlined } from '@ant-design/icons';
import type { Category } from '@/types';

const { Title, Text } = Typography;

export interface CategoriesGridProps {
  categories: Array<Pick<Category, 'id' | 'name' | 'count'>>;
}

const categoryImages = [
  '/images/dress-main.jpg',
  '/images/handbag.jpg',
  '/images/shoes.jpg',
  '/images/jewelry.jpg',
  '/images/dress-alt1.jpg',
  '/images/dress-alt2.jpeg',
];

const categoryColors = [
  'from-pink-500 to-rose-400',
  'from-purple-500 to-indigo-400',
  'from-blue-500 to-cyan-400',
  'from-orange-500 to-red-400',
  'from-emerald-500 to-teal-400',
  'from-amber-500 to-yellow-400',
];

export const CategoriesGrid: React.FC<CategoriesGridProps> = ({ categories }) => {
  if (!categories || categories.length === 0) {
    return (
      <div className="py-12 text-center">
        <Text className="text-lg text-gray-500">دسته‌بندی‌ای یافت نشد</Text>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
      {categories.map((category, index) => {
        const imageUrl = categoryImages[index % categoryImages.length];
        const gradientColor = categoryColors[index % categoryColors.length];
        const href = `/products?category=${encodeURIComponent(category.name)}`;

        return (
          <div key={category.id} className="group">
            <Link href={href} className="block h-full">
              <div className="relative h-full overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                {/* Image Background */}
                <div
                  className={`relative h-32 w-full overflow-hidden bg-gradient-to-br ${gradientColor}`}
                >
                  <Image
                    src={imageUrl}
                    alt={category.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                    className="object-cover opacity-30 transition-transform duration-500 group-hover:scale-110"
                  />

                  {/* Gradient Overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${gradientColor} mix-blend-multiply`}
                  />

                  {/* Icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="rounded-full bg-white/90 p-3 shadow-lg backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                      <ShopOutlined className="text-2xl text-gray-800" />
                    </div>
                  </div>

                  {/* Count Badge */}
                  {category.count && category.count > 0 && (
                    <div className="absolute bottom-2 left-2">
                      <Badge
                        count={category.count}
                        className="bg-black/70 text-white backdrop-blur-sm"
                        style={{ fontSize: '11px', fontWeight: 600 }}
                      />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-3">
                  <div className="flex items-center justify-between gap-2">
                    <Title
                      level={5}
                      className="!mb-0 line-clamp-2 !text-gray-800 transition-colors group-hover:text-pink-600"
                      style={{ fontSize: '13px', fontWeight: 600, minHeight: '36px' }}
                    >
                      {category.name}
                    </Title>
                    <RightOutlined className="text-xs text-gray-400 transition-all duration-300 group-hover:translate-x-1 group-hover:text-pink-500" />
                  </div>
                  <Text className="mt-1 text-xs text-gray-500">{category.count ?? 0} محصول</Text>
                </div>

                {/* Hover Effect Border */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent transition-colors duration-300 group-hover:border-pink-300" />
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default CategoriesGrid;
