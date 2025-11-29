'use client';

import React from 'react';
import { Button, Card, Rate, Tag, Typography } from 'antd';
import {
  CheckOutlined,
  ShopOutlined,
  CalendarOutlined,
  ArrowLeftOutlined,
} from '@ant-design/icons';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { getValidImageSrc, DEFAULT_IMAGES } from '@/shared/utils/image';

const { Title, Text, Paragraph } = Typography;

export interface ProfileCardProps {
  name: string;
  avatar?: string;
  description?: string;
  rating?: number;
  totalProducts?: number;
  joinDate?: string;
  verified?: boolean;
  sellerId?: string | number;
  reviewCount?: number;
}

export default function ProfileCard({
  name,
  avatar,
  description,
  rating = 0,
  totalProducts = 0,
  joinDate,
  verified = false,
  sellerId,
  reviewCount,
}: ProfileCardProps) {
  const avatarSrc = getValidImageSrc(avatar, DEFAULT_IMAGES.seller);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        className="rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md"
        styles={{ body: { padding: '20px' } }}
      >
        <div className="flex items-start gap-4">
          {/* Avatar Section - Right side */}
          <div className="order-1 shrink-0">
            <div className="relative">
              <div className="relative h-16 w-16">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 p-[2px]">
                  <div className="relative h-full w-full rounded-full bg-white p-0.5">
                    <div className="absolute inset-0.5 overflow-hidden rounded-full">
                      <Image
                        src={avatarSrc}
                        alt={name}
                        fill
                        className="object-cover"
                        sizes="64px"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = DEFAULT_IMAGES.seller;
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              {verified && (
                <div className="absolute -right-0.5 -bottom-0.5 flex h-4 w-4 items-center justify-center rounded-full border-2 border-white bg-green-500">
                  <CheckOutlined className="text-[8px] text-white" />
                </div>
              )}
            </div>
          </div>

          {/* Info Section - Left side (text content) */}
          <div className="order-2 min-w-0 flex-1 text-right">
            {/* Name and Verified Badge */}
            <div className="mb-2 flex items-center justify-start gap-2">
              <Title level={4} className="!mb-0 !text-base !text-gray-900">
                {name}
              </Title>
              {verified && (
                <Tag icon={<CheckOutlined />} color="success" className="text-xs">
                  تایید شده
                </Tag>
              )}
            </div>

            {/* Rating */}
            {rating > 0 && (
              <div className="mb-2 flex items-center justify-start gap-2">
                <Text className="text-sm font-medium text-gray-700">{rating.toFixed(1)}</Text>
                <div dir="ltr" className="inline-block">
                  <Rate disabled allowHalf defaultValue={rating} className="text-sm" />
                </div>
                {reviewCount !== undefined && reviewCount > 0 && (
                  <Text className="text-xs text-gray-400">
                    ({reviewCount.toLocaleString('fa-IR')} نظر)
                  </Text>
                )}
              </div>
            )}

            {/* Stats */}
            <div className="mb-2 flex flex-wrap items-center justify-start gap-3 text-sm">
              {totalProducts > 0 && (
                <div className="flex items-center gap-1.5">
                  <ShopOutlined className="text-pink-500" />
                  <Text className="text-gray-600">
                    <span dir="ltr" className="inline-block font-medium text-gray-900">
                      {totalProducts.toLocaleString('fa-IR')}
                    </span>{' '}
                    محصول
                  </Text>
                </div>
              )}
              {joinDate && (
                <div className="flex items-center gap-1.5">
                  <CalendarOutlined className="text-gray-400" />
                  <Text className="text-gray-600">
                    عضویت از <strong className="font-medium text-gray-900">{joinDate}</strong>
                  </Text>
                </div>
              )}
            </div>

            {/* Description */}
            {description && (
              <div className="mb-3">
                <Paragraph
                  className="!mb-0 text-sm !leading-6 text-gray-600"
                  ellipsis={{ rows: 2, expandable: true, symbol: 'بیشتر' }}
                >
                  {description}
                </Paragraph>
              </div>
            )}

            {/* Action Button */}
            {sellerId && (
              <div className="mt-3 flex justify-end">
                <Link href={`/seller/${sellerId}`}>
                  <Button
                    type="default"
                    icon={<ArrowLeftOutlined />}
                    size="small"
                    className="rounded-lg"
                    style={{ direction: 'rtl' }}
                  >
                    مشاهده پروفایل
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
