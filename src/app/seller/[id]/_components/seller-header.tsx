'use client';

import React from 'react';
import { Button, Typography, Rate, Tag } from 'antd';
import { BellOutlined, CheckOutlined, ShopOutlined, CalendarOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import Image from 'next/image';
import type { Seller } from '../_types';
import { getValidImageSrc, DEFAULT_IMAGES } from '@/shared/utils/image';

const { Title, Text, Paragraph } = Typography;

export interface SellerHeaderProps {
  seller: Seller;
  isFollowing: boolean;
  onFollowToggle: () => void;
  bannerImage?: string;
}

export function SellerHeader({
  seller,
  isFollowing,
  onFollowToggle,
  bannerImage,
}: SellerHeaderProps) {
  const avatarSrc = getValidImageSrc(seller?.avatar, DEFAULT_IMAGES.seller);
  const bannerSrc = bannerImage ? getValidImageSrc(bannerImage, DEFAULT_IMAGES.banner) : null;

  return (
    <>
      {/* Banner Section */}
      <div className="relative h-48 w-full overflow-hidden bg-gradient-to-r from-pink-500 via-purple-500 to-pink-600 sm:h-56 md:h-64 lg:h-72">
        {bannerSrc ? (
          <div className="relative h-full w-full">
            <Image
              src={bannerSrc}
              alt={`${seller?.name || 'Seller'} Banner`}
              fill
              className="object-cover"
              priority
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                if (target.src !== DEFAULT_IMAGES.banner) {
                  target.src = DEFAULT_IMAGES.banner;
                }
              }}
            />
          </div>
        ) : (
          <div className="relative h-full w-full">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-pink-600"></div>
          </div>
        )}
      </div>

      {/* Profile Header */}
      <div className="relative z-10 -mt-16 border-b border-gray-200 bg-white sm:-mt-20 md:-mt-24 lg:-mt-28">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 md:py-8 lg:px-8">
          <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:gap-8">
            {/* Avatar */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="flex w-full flex-shrink-0 justify-center pt-16 sm:pt-20 md:pt-24 lg:w-auto lg:justify-start lg:pt-28"
            >
              <div className="relative">
                <div className="relative h-28 w-28 sm:h-32 sm:w-32 lg:h-36 lg:w-36">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 p-[3px]">
                    <div className="relative h-full w-full rounded-full bg-white p-1">
                      <div className="absolute inset-1 overflow-hidden rounded-full">
                        <Image
                          src={avatarSrc}
                          alt={seller?.name || 'Seller'}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 112px, (max-width: 1024px) 128px, 144px"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = DEFAULT_IMAGES.seller;
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Seller Info */}
            <div className="w-full min-w-0 flex-1 pt-16 sm:pt-20 md:pt-24 lg:w-auto lg:pt-28">
              <div className="flex w-full flex-col items-start gap-4 lg:flex-row lg:items-center lg:gap-6">
                <div className="min-w-0 flex-1">
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <Title level={2} className="!mb-0 !text-2xl !text-gray-800 lg:!text-3xl">
                      {seller?.name || 'فروشنده'}
                    </Title>
                    {seller?.verified && (
                      <Tag icon={<CheckOutlined />} color="success" className="ml-2">
                        تایید شده
                      </Tag>
                    )}
                  </div>

                  {/* Rating */}
                  <div className="mb-3 flex items-center gap-3">
                    <Rate
                      disabled
                      allowHalf
                      defaultValue={seller?.rating || 0}
                      className="text-sm text-yellow-400"
                    />
                    <Text className="text-sm text-gray-600">
                      {(seller?.rating || 0).toFixed(1)}
                    </Text>
                    <Text className="text-xs text-gray-400">
                      ({Math.floor((seller?.totalProducts || 0) * 0.8)} نظر)
                    </Text>
                  </div>

                  <div className="mb-3 flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-2">
                      <ShopOutlined className="text-pink-500" />
                      <Text className="text-sm text-gray-600 lg:text-base">
                        <strong className="font-semibold text-gray-800">
                          {seller?.totalProducts || 0}
                        </strong>{' '}
                        محصول
                      </Text>
                    </div>
                    <div className="flex items-center gap-2">
                      <CalendarOutlined className="text-purple-500" />
                      <Text className="text-sm text-gray-600 lg:text-base">
                        عضویت از{' '}
                        <strong className="font-semibold text-gray-800">
                          {seller?.joinDate || 'نامشخص'}
                        </strong>
                      </Text>
                    </div>
                  </div>

                  <Paragraph
                    className="!mb-0 text-sm !leading-6 text-gray-600 lg:text-base"
                    ellipsis={{ rows: 2, expandable: true, symbol: 'بیشتر' }}
                  >
                    {seller?.description || 'توضیحاتی در دسترس نیست'}
                  </Paragraph>
                </div>

                {/* Action Buttons */}
                <div className="flex w-full flex-wrap items-center gap-2 sm:gap-3 lg:w-auto">
                  <Button
                    type={isFollowing ? 'default' : 'primary'}
                    size="large"
                    icon={isFollowing ? <CheckOutlined /> : <BellOutlined />}
                    onClick={onFollowToggle}
                    className={
                      isFollowing
                        ? ''
                        : 'border-0 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700'
                    }
                  >
                    {isFollowing ? 'دنبال می‌کنم' : 'دنبال کردن'}
                  </Button>
                  <Button
                    type="default"
                    size="large"
                    icon={<BellOutlined />}
                    className="border-gray-300 hover:border-pink-300 hover:text-pink-600"
                  >
                    <span className="hidden sm:inline">اعلان‌ها</span>
                    <span className="sm:hidden">اعلان</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SellerHeader;
