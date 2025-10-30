'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Typography } from 'antd';
import { motion } from 'framer-motion';
import { AppstoreOutlined } from '@ant-design/icons';

const { Title } = Typography;

export interface CategoryTileProps {
  id: string;
  name: string;
  count?: number;
  thumbnail?: string;
  href?: string;
  icon?: React.ReactNode;
  countSuffix?: string; // e.g., "محصول" or "پست"
}

export const CategoryTile: React.FC<CategoryTileProps> = ({ id, name, count = 0, thumbnail = '/images/dress-main.jpg', href, icon, countSuffix = 'محصول' }) => {
  const content = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="cursor-pointer"
    >
      <div className="flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:shadow-xl">
        {/* Thumbnail */}
        <div className="relative aspect-video w-full flex-shrink-0 overflow-hidden bg-gray-100">
          <Image
            src={thumbnail}
            alt={name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 hover:scale-110"
          />

          {/* Icon Overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <div className="rounded-full bg-white/90 p-3">
              {icon ?? <AppstoreOutlined className="text-2xl text-pink-600" />}
            </div>
          </div>

          {/* Count Badge */}
          <div className="absolute bottom-2 left-2 flex items-center gap-1 rounded bg-black/80 px-2 py-1 text-xs text-white">
            {count} {countSuffix}
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-3 sm:p-4">
          <Title
            level={5}
            className="!mb-1 line-clamp-2 !text-gray-800 transition-colors hover:text-pink-600"
            style={{ fontSize: '14px', fontWeight: 600, minHeight: '28px' }}
          >
            {name}
          </Title>
        </div>
      </div>
    </motion.div>
  );

  if (href) {
    return (
      <Link href={href} className="block h-full">
        {content}
      </Link>
    );
  }

  return content;
};

export default CategoryTile;


