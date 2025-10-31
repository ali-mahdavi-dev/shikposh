'use client';

import { Avatar, Card, Rate, Tag, Badge } from 'antd';
import { CheckCircleOutlined, CalendarOutlined, ShopOutlined, StarFilled } from '@ant-design/icons';
import { Typography } from 'antd';
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const { Title, Text } = Typography;

export interface ProfileCardProps {
  name?: string;
  avatar?: string;
  description?: string;
  rating?: number;
  totalProducts?: number;
  joinDate?: string;
  verified?: boolean;
  className?: string;
  sellerId?: string;
  reviewCount?: number;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  name = 'Ali Ahmagh',
  avatar = '/images/alilaloii.jpg',
  description = 'فروشنده معتبر با بیش از 5 سال تجربه در زمینه پوشاک و فشن. ارائه محصولات با کیفیت و قیمت مناسب.',
  rating = 4.8,
  totalProducts = 127,
  joinDate = '1398',
  verified = true,
  className = '',
  sellerId,
  reviewCount,
}) => {
  const formatDate = (date: string) => {
    return date;
  };

  const displayedReviewCount = reviewCount || Math.floor(totalProducts * 0.8);

  const cardContent = (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        className={`overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-md transition-all duration-300 ${sellerId ? 'cursor-pointer hover:shadow-xl hover:border-pink-300' : ''} ${className}`}
        hoverable={!!sellerId}
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
          {/* Avatar Section */}
          <div className="relative flex-shrink-0 flex justify-center sm:justify-start">
            <div className="relative">
              <div className="rounded-full bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 p-1">
                <Avatar size={140} src={avatar} alt={name} className="border-4 border-white" />
              </div>
              {verified && (
                <div className="absolute -bottom-1 -right-1 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-lg">
                  <CheckCircleOutlined className="!text-xl !bg-blue-500 !text-white rounded-full" />
                </div>
              )}
            </div>
          </div>

          {/* Content Section */}
          <div className="min-w-0 flex-1 text-center sm:text-right sm:flex sm:flex-col sm:justify-start">
            {/* Name and Verified Badge */}
            <div className="mb-3 flex flex-col items-center gap-2 sm:flex-row sm:justify-end">
              <Title level={3} className="!mb-0 text-gray-800" style={{ fontSize: '1.5rem', fontWeight: 700 }}>
                {name}
              </Title>
              {verified && (
                <Tag
                  icon={<CheckCircleOutlined />}
                  color="success"
                  className="m-0 border-green-500 bg-green-50 px-3 py-1 text-green-700 shadow-sm"
                  style={{ fontSize: '0.875rem', fontWeight: 600 }}
                >
                  تایید شده
                </Tag>
              )}
            </div>

            {/* Rating */}
            <div className="mb-3 flex items-center justify-center gap-2 sm:justify-end">
              <Rate
                disabled
                allowHalf
                defaultValue={rating}
                character={<StarFilled />}
                className="text-base text-yellow-400"
              />
              <Text className="text-base font-bold text-gray-800">{rating.toFixed(1)}</Text>
              <Text className="text-sm text-gray-500">({displayedReviewCount} نظر)</Text>
            </div>

            {/* Description */}
            <div>
              {description && (
                  <Text className="mb-4 line-clamp-2 block text-sm leading-relaxed text-gray-600">
                    {description}
                  </Text>
                )}
            </div>

            {/* Stats */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-4 border-t border-gray-100 pt-4 sm:justify-end">
              <div className="flex items-center gap-2 rounded-xl bg-pink-50 px-4 py-2">
                <ShopOutlined className="text-lg text-pink-500" />
                <Text className="text-sm font-semibold text-gray-800">
                  {totalProducts} <span className="font-normal text-gray-600">محصول</span>
                </Text>
              </div>
              <div className="flex items-center gap-2 rounded-xl bg-purple-50 px-4 py-2">
                <CalendarOutlined className="text-lg text-purple-500" />
                <Text className="text-sm font-semibold text-gray-800">
                  عضویت از <span className="font-normal text-gray-600">{formatDate(joinDate)}</span>
                </Text>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );

  if (sellerId) {
    return (
      <Link href={`/seller/${sellerId}`} className="block">
        {cardContent}
      </Link>
    );
  }

  return cardContent;
};

export default ProfileCard;
