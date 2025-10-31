'use client';
import React, { useState } from 'react';
import { Button, Tabs, TabsProps, Typography } from 'antd';
import {
  BellOutlined,
  CalendarOutlined,
  EyeOutlined,
  LikeOutlined,
  MessageOutlined,
  CheckOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import type { Post } from './_api';
import { Badge } from '@/app/_components';
import { CategoriesGrid } from '@/app/_components/business';
import { usePosts, usePlaylists } from './_api';
import { PostCard, PlaylistCard } from './_components';
import { ProductGridSkeleton } from '@/app/_components/skeleton';
import type { Playlist } from './_types';
import { Badge as AntBadge } from 'antd';

const { Title, Text, Paragraph } = Typography;

// Format number (e.g., 15230 -> "15.2K")
const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};

// Format date (simple format for now)
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

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [subscribed, setSubscribed] = useState<boolean>(false);

  // Fetch data from API
  const { data: posts = [], isLoading: postsLoading, error: postsError } = usePosts();
  const {
    data: playlists = [],
    isLoading: playlistsLoading,
    error: playlistsError,
  } = usePlaylists();

  const bannerImage = '/images/carousel-homepage-one.jpg';

  const featuredPost = posts[0];

  const categoryCounts = posts.reduce<Record<string, number>>((acc, p) => {
    const key = p.category ?? 'متفرقه';
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  const profileCategories = Object.entries(categoryCounts).map(([name, count], idx) => ({
    id: `profile-cat-${idx}`,
    name,
    count,
  }));

  const tabsItems: TabsProps['items'] = [
    {
      key: 'home',
      label: (
        <span className="flex items-center gap-2 px-4 py-2">
          <span>صفحه اصلی</span>
        </span>
      ),
    },
    {
      key: 'playlists',
      label: (
        <span className="flex items-center gap-2 px-4 py-2">
          <UnorderedListOutlined />
          <span>فهرست‌ها</span>
          <AntBadge count={playlists.length} showZero />
        </span>
      ),
    },
    {
      key: 'posts',
      label: (
        <span className="flex items-center gap-2 px-4 py-2">
          <span>پست‌ها</span>
          <AntBadge count={posts.length} showZero />
        </span>
      ),
    },
    {
      key: 'categories',
      label: (
        <span className="flex items-center gap-2 px-4 py-2">
          <span>دسته‌بندی‌ها</span>
          <AntBadge count={profileCategories.length} showZero />
        </span>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner Section - YouTube Style */}
      <div className="relative h-48 w-full overflow-hidden bg-gradient-to-r from-pink-500 via-purple-500 to-pink-600 sm:h-56 md:h-64 lg:h-72">
        {bannerImage ? (
          <div className="relative h-full w-full">
            <Image src={bannerImage} alt="Profile Banner" fill className="object-cover" priority />
          </div>
        ) : (
          <div className="relative h-full w-full">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-pink-600"></div>
          </div>
        )}
      </div>

      {/* Profile Header - YouTube Style */}
      <div className="relative z-10 -mt-16 border-b border-gray-200 bg-white sm:-mt-20 md:-mt-24 lg:-mt-28">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 md:py-8 lg:px-8">
          <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:gap-8">
            {/* Avatar - Right Side (RTL) */}
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
                          src="/images/alilaloii.jpg"
                          alt="Ali Ahmagh"
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 112px, (max-width: 1024px) 128px, 144px"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Profile Info - Left Side (RTL) */}
            <div className="w-full min-w-0 flex-1 pt-16 sm:pt-20 md:pt-24 lg:w-auto lg:pt-28">
              <div className="flex w-full flex-col items-start gap-4 lg:flex-row lg:items-center lg:gap-6">
                {/* Profile Text Content */}
                <div className="min-w-0 flex-1">
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <Title level={2} className="!mb-0 !text-2xl !text-gray-800 lg:!text-3xl">
                      Ali Ahmagh
                    </Title>
                    {subscribed && (
                      <AntBadge
                        status="success"
                        text={
                          <span className="flex items-center gap-1 text-xs text-green-600">
                            <CheckOutlined /> تأیید شده
                          </span>
                        }
                      />
                    )}
                  </div>

                  <div className="mb-3 flex flex-wrap items-center gap-4">
                    <Text className="text-sm text-gray-600 lg:text-base">
                      <strong className="font-semibold text-gray-800">1.2K</strong> دنبال‌کننده
                    </Text>
                    <Text className="text-sm text-gray-600 lg:text-base">
                      <strong className="font-semibold text-gray-800">{posts.length}</strong> پست
                    </Text>
                    <Text className="text-sm text-gray-600 lg:text-base">
                      <strong className="font-semibold text-gray-800">
                        {formatNumber(posts.reduce((acc: number, p: Post) => acc + p.views, 0))}
                      </strong>{' '}
                      بازدید کل
                    </Text>
                  </div>

                  <Paragraph
                    className="!mb-0 text-sm !leading-6 text-gray-600 lg:text-base"
                    ellipsis={{ rows: 2, expandable: true, symbol: 'بیشتر' }}
                  >
                    خوش آمدید به پروفایل من! اینجا می‌تونید جدیدترین پست‌های مربوط به مد، فشن و
                    استایل رو ببینید. با من همراه باشید تا از جدیدترین ترندها و نکات مهم در زمینه مد
                    و پوشش با خبر بشید.
                  </Paragraph>
                </div>

                {/* Action Buttons */}
                <div className="flex w-full flex-wrap items-center gap-2 sm:gap-3 lg:w-auto">
                  <Button
                    type={subscribed ? 'default' : 'primary'}
                    size="large"
                    icon={subscribed ? <CheckOutlined /> : <BellOutlined />}
                    onClick={() => setSubscribed(!subscribed)}
                    className={
                      subscribed
                        ? ''
                        : 'border-0 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700'
                    }
                  >
                    {subscribed ? 'دنبال می‌کنم' : 'دنبال کردن'}
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

      {/* Tabs Navigation */}
      <div className="sticky top-[72px] z-40 border-b border-gray-200 bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex justify-end">
            <div className="max-w-full flex-1 overflow-x-auto">
              <Tabs
                activeKey={activeTab}
                onChange={setActiveTab}
                items={tabsItems}
                className="custom-profile-tabs !border-0"
                moreIcon={null}
                tabBarStyle={{ marginBottom: 0 }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Content Area based on Active Tab */}
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 md:py-8 lg:px-8">
        {activeTab === 'home' && (
          <div className="space-y-6">
            {postsLoading ? (
              <ProductGridSkeleton count={6} cols={3} />
            ) : postsError ? (
              <div className="py-12 text-center">
                <Text className="text-lg text-red-500">خطا در بارگذاری پست‌ها</Text>
              </div>
            ) : posts.length > 0 ? (
              <>
                {/* Featured Post - Large Display */}
                <div className="overflow-hidden rounded-xl bg-white shadow-lg">
                  <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    {/* Thumbnail */}
                    <div className="relative aspect-video min-h-[300px] w-full lg:aspect-auto lg:h-full">
                      <Link href={`/products/${featuredPost.id}`}>
                        <Image
                          src={featuredPost.thumbnail}
                          alt={featuredPost.title}
                          fill
                          className="object-cover transition-transform duration-300 hover:scale-105"
                          sizes="(max-width: 1024px) 100vw, 50vw"
                        />

                        {/* Post Badges - Top Left */}
                        {featuredPost.badges && featuredPost.badges.length > 0 && (
                          <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                            {featuredPost.badges.map((badge: string, index: number) => (
                              <Badge key={index} text={badge} />
                            ))}
                          </div>
                        )}

                        {/* Category Badge - Bottom Left (Larger for featured) */}
                        <div className="absolute bottom-4 left-4 rounded bg-black/80 px-3 py-1.5 text-sm font-semibold text-white backdrop-blur-sm">
                          {featuredPost.category}
                        </div>
                      </Link>
                    </div>

                    {/* Content */}
                    <div className="flex flex-col justify-between p-6 lg:p-8">
                      <div>
                        <Link href={`/products/${featuredPost.id}`}>
                          <Title
                            level={2}
                            className="!mb-4 !text-2xl !text-gray-800 transition-colors hover:text-pink-600 lg:!text-3xl"
                          >
                            {featuredPost.title}
                          </Title>
                        </Link>

                        <div className="mb-4 flex flex-wrap items-center gap-4 text-sm text-gray-600">
                          <span className="flex items-center gap-2">
                            <EyeOutlined />
                            {formatNumber(featuredPost.views)} بازدید
                          </span>
                          <span className="flex items-center gap-2">
                            <CalendarOutlined />
                            {formatDate(featuredPost.publishedAt)}
                          </span>
                        </div>

                        {featuredPost.likes && featuredPost.comments && (
                          <div className="mb-6 flex items-center gap-4">
                            <span className="flex items-center gap-2 text-gray-600">
                              <LikeOutlined className="text-lg text-pink-500" />
                              <strong>{formatNumber(featuredPost.likes)}</strong>
                            </span>
                            <span className="flex items-center gap-2 text-gray-600">
                              <MessageOutlined className="text-lg text-purple-500" />
                              <strong>{formatNumber(featuredPost.comments)}</strong>
                            </span>
                          </div>
                        )}

                        <Paragraph className="line-clamp-3 !text-base !leading-7 !text-gray-700">
                          {featuredPost.description ||
                            'این پست یکی از محبوب‌ترین پست‌های این کانال است. برای مشاهده جزئیات بیشتر روی لینک زیر کلیک کنید.'}
                        </Paragraph>
                      </div>

                      <div className="mt-6">
                        <Link href={`/products/${featuredPost.id}`}>
                          <Button
                            type="primary"
                            size="large"
                            className="border-0 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
                          >
                            مشاهده پست
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Posts Grid */}
                <div>
                  <Title level={3} className="!mb-6 !text-xl">
                    پست‌های اخیر
                  </Title>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
                    {posts.slice(1, 5).map((post: Post) => (
                      <PostCard key={post.id} post={post} />
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="py-16 text-center">
                <Text className="text-lg text-gray-500">پستی یافت نشد</Text>
              </div>
            )}
          </div>
        )}

        {activeTab === 'playlists' && (
          <div>
            {playlistsLoading ? (
              <ProductGridSkeleton count={6} cols={3} />
            ) : playlistsError ? (
              <div className="py-12 text-center">
                <Text className="text-lg text-red-500">خطا در بارگذاری فهرست‌ها</Text>
              </div>
            ) : playlists.length > 0 ? (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
                {playlists.map((playlist) => (
                  <PlaylistCard key={playlist.id} playlist={playlist as Playlist} />
                ))}
              </div>
            ) : (
              <div className="py-16 text-center">
                <Text className="text-lg text-gray-500">فهرستی یافت نشد</Text>
              </div>
            )}
          </div>
        )}

        {activeTab === 'posts' && (
          <div>
            {postsLoading ? (
              <ProductGridSkeleton count={6} cols={3} />
            ) : postsError ? (
              <div className="py-12 text-center">
                <Text className="text-lg text-red-500">خطا در بارگذاری پست‌ها</Text>
              </div>
            ) : posts.length > 0 ? (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
                {posts.map((post: Post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div className="py-16 text-center">
                <Text className="text-lg text-gray-500">پستی یافت نشد</Text>
              </div>
            )}
          </div>
        )}

        {activeTab === 'categories' && (
          <div>
            {postsLoading ? (
              <ProductGridSkeleton count={8} cols={4} />
            ) : postsError ? (
              <div className="py-12 text-center">
                <Text className="text-lg text-red-500">خطا در بارگذاری پست‌ها</Text>
              </div>
            ) : (
              <CategoriesGrid categories={profileCategories} />
            )}
          </div>
        )}
      </div>

      {/* Chat Fixed - Keep the existing chat component */}
      <div className="fixed bottom-0 left-0 z-50 mb-4 ml-4 w-80">
        {/* Chat component can be added here if needed */}
      </div>

      <style jsx global>{`
        .custom-profile-tabs .ant-tabs-nav {
          margin-bottom: 0 !important;
          margin-right: 0 !important;
          margin-left: auto !important;
        }
        .custom-profile-tabs .ant-tabs-nav-list {
          justify-content: flex-end !important;
        }
        .custom-profile-tabs .ant-tabs-tab {
          border-radius: 12px !important;
          margin: 0 2px !important;
          padding: 8px 12px !important;
          transition: all 0.3s ease !important;
          white-space: nowrap !important;
        }
        @media (min-width: 640px) {
          .custom-profile-tabs .ant-tabs-tab {
            padding: 8px 16px !important;
            margin: 0 4px !important;
          }
        }
        .custom-profile-tabs .ant-tabs-tab:hover {
          background: rgba(236, 72, 153, 0.1) !important;
          color: #ec4899 !important;
        }
        .custom-profile-tabs .ant-tabs-tab-active {
          background: linear-gradient(135deg, #ec4899, #8b5cf6) !important;
          color: white !important;
        }
        .custom-profile-tabs .ant-tabs-tab-active .ant-tabs-tab-btn {
          color: white !important;
        }
        .custom-profile-tabs .ant-tabs-tab-active .ant-badge-count {
          background: rgba(255, 255, 255, 0.3) !important;
          border-color: rgba(255, 255, 255, 0.3) !important;
        }
        .custom-profile-tabs .ant-tabs-ink-bar {
          display: none !important;
        }
        /* Responsive improvements */
        @media (max-width: 640px) {
          .custom-profile-tabs .ant-tabs-tab-btn {
            font-size: 12px !important;
          }
        }
      `}</style>
    </div>
  );
}
