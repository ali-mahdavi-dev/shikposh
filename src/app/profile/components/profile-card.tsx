'use client';

import { Avatar, Card, Rate, Tag, Badge } from 'antd';
import { CheckCircleOutlined, CalendarOutlined, ShopOutlined } from '@ant-design/icons';
import { Typography } from 'antd';
import React from 'react';
import Link from 'next/link';

const { Title, Text } = Typography;

interface ProfileCardProps {
  name?: string;
  avatar?: string;
  description?: string;
  rating?: number;
  totalProducts?: number;
  joinDate?: string;
  verified?: boolean;
  className?: string;
  sellerId?: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  name = 'Ali Ahmagh',
  avatar = '/images/alilaloii.jpg',
  description = 'فروشنده معتبر با بیش از 5 سال تجربه در زمینه پوشاک و فشن',
  rating = 4.8,
  totalProducts = 127,
  joinDate = '1398',
  verified = true,
  className = '',
  sellerId,
}) => {
  const formatDate = (date: string) => {
    return date;
  };

  const cardContent = (
    <Card
      className={`overflow-hidden rounded-xl border-0 bg-white shadow-lg ${sellerId ? 'cursor-pointer' : ''} ${className}`}
      hoverable={!!sellerId}
    >
      <div className="flex items-center gap-4">
        {/* Avatar with Gradient Border */}
        <div className="relative flex-shrink-0">
          <div className="rounded-full bg-gradient-to-r from-pink-400 via-purple-500 to-purple-700 p-[3px]">
            <Avatar size={132} src={avatar} alt={name} className="border-4 border-white" />
          </div>
          {verified && (
            <Badge
              count={
                <CheckCircleOutlined className="rounded-full bg-white text-lg text-green-500" />
              }
              offset={[-8, 8]}
              className="absolute right-0 bottom-0"
            />
          )}
        </div>

        {/* Seller Info */}
        <div className="min-w-0 flex-1">
          <div className="mb-2 flex items-center gap-3">
            <Title level={3} className="!mb-0 text-gray-800">
              {name}
            </Title>
            {verified && (
              <Tag icon={<CheckCircleOutlined />} color="success" className="ml-2">
                تایید شده
              </Tag>
            )}
          </div>

          {/* Rating */}
          <div className="mb-3 flex items-center gap-2">
            <Rate disabled allowHalf defaultValue={rating} className="text-sm text-yellow-400" />
            <Text className="text-sm text-gray-600">{rating.toFixed(1)}</Text>
            <Text className="text-xs text-gray-400">({Math.floor(totalProducts * 0.8)} نظر)</Text>
          </div>

          {/* Description */}
          {description && (
            <Text className="mb-3 line-clamp-2 block text-sm text-gray-600">{description}</Text>
          )}

          {/* Stats */}
          <div className="mt-4 flex items-center gap-4 border-t border-gray-100 pt-3">
            <div className="flex items-center gap-2">
              <ShopOutlined className="text-pink-500" />
              <Text className="text-sm text-gray-600">
                <span className="font-semibold text-gray-800">{totalProducts}</span> محصول
              </Text>
            </div>
            <div className="flex items-center gap-2">
              <CalendarOutlined className="text-purple-500" />
              <Text className="text-sm text-gray-600">
                عضویت از <span className="font-semibold text-gray-800">{formatDate(joinDate)}</span>
              </Text>
            </div>
          </div>
        </div>
      </div>
    </Card>
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
