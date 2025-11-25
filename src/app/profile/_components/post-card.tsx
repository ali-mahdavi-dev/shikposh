'use client';

import React, { useState } from 'react';
import { Typography } from 'antd';
import { CalendarOutlined, EyeOutlined, LikeOutlined, MessageOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/app/_components';
import type { Post } from '@/types';
import { getValidImageSrc, DEFAULT_IMAGES } from '@/shared/utils/image';

const { Title } = Typography;

const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'امروز';
  if (diffDays === 1) return 'دیروز';
  if (diffDays < 7) return `${diffDays} روز پیش`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} هفته پیش`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} ماه پیش`;
  return `${Math.floor(diffDays / 365)} سال پیش`;
};

export function PostCard({ post }: { post: Post }) {
  const [imageSrc, setImageSrc] = useState(() =>
    getValidImageSrc(post.thumbnail, DEFAULT_IMAGES.post),
  );

  const handleImageError = () => {
    setImageSrc(DEFAULT_IMAGES.post);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="cursor-pointer"
    >
      <Link href={`/products/${post.id}`} className="block h-full">
        <div className="flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:shadow-xl">
          <div className="relative aspect-video w-full flex-shrink-0 overflow-hidden bg-gray-100">
            <Image
              src={imageSrc}
              alt={post.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover transition-transform duration-300 hover:scale-110"
              onError={handleImageError}
            />

            {post.badges && post.badges.length > 0 && (
              <div className="absolute top-2 left-2 z-10 flex flex-col gap-1.5">
                {post.badges.map((badge, index) => (
                  <Badge key={index} text={badge} />
                ))}
              </div>
            )}

            <div className="absolute bottom-2 left-2 rounded bg-black/80 px-2 py-1 text-xs text-white backdrop-blur-sm">
              {post.category}
            </div>
          </div>

          <div className="flex flex-1 flex-col p-3 sm:p-4">
            <Title
              level={5}
              className="!mb-2 line-clamp-2 !text-gray-800 transition-colors hover:text-pink-600"
              style={{ fontSize: '14px', fontWeight: 600, minHeight: '44px' }}
            >
              {post.title}
            </Title>

            <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-gray-500">
              <span className="flex items-center gap-1 whitespace-nowrap">
                <EyeOutlined />
                {formatNumber(post.views)} بازدید
              </span>
              <span className="flex items-center gap-1 whitespace-nowrap">
                <CalendarOutlined />
                {formatDate(post.publishedAt)}
              </span>
            </div>

            {post.likes && post.comments && (
              <div className="mt-3 flex items-center gap-4 border-t border-gray-100 pt-3">
                <span className="flex items-center gap-1 text-xs text-gray-600">
                  <LikeOutlined className="text-pink-500" />
                  {formatNumber(post.likes)}
                </span>
                <span className="flex items-center gap-1 text-xs text-gray-600">
                  <MessageOutlined className="text-purple-500" />
                  {formatNumber(post.comments)}
                </span>
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default PostCard;
