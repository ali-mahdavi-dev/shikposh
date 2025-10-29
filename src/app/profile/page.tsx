"use client";
import React, { useState } from "react";
import {
  Button,
  Tabs,
  TabsProps,
  Typography,
  Badge,
} from "antd";
import {
  BellOutlined,
  CalendarOutlined,
  EyeOutlined,
  LikeOutlined,
  MessageOutlined,
  CheckOutlined,
  PlayCircleOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Post } from "@/types";

const { Title, Text, Paragraph } = Typography;

// Mock posts data
const mockPosts: Post[] = [
  {
    id: "1",
    title: "کلکسیون جدید بهاری 1403 - معرفی لباس‌های مجلسی",
    thumbnail: "/images/carousel-homepage-one.jpg",
    views: 15230,
    publishedAt: "2024-02-15",
    category: "مد و فشن",
    likes: 342,
    comments: 89,
  },
  {
    id: "2",
    title: "راهنمای انتخاب سایز مناسب - نکات مهم خرید آنلاین",
    thumbnail: "/images/daman.jpeg",
    views: 9876,
    publishedAt: "2024-02-10",
    category: "راهنما",
    likes: 256,
    comments: 45,
  },
  {
    id: "3",
    title: "ترندهای مد فصل بهار - رنگ‌های محبوب 1403",
    thumbnail: "/images/Women-Formal.avif",
    views: 23456,
    publishedAt: "2024-02-05",
    category: "ترند",
    likes: 567,
    comments: 123,
  },
  {
    id: "4",
    title: "نحوه نگهداری و شستشوی لباس‌های حریر",
    thumbnail: "/images/harir.jpeg",
    views: 6543,
    publishedAt: "2024-01-28",
    category: "راهنما",
    likes: 189,
    comments: 34,
  },
  {
    id: "5",
    title: "مجموعه دامن‌های پلیسه - استایل‌های مختلف",
    thumbnail: "/images/daman.jpeg",
    views: 18765,
    publishedAt: "2024-01-20",
    category: "محصولات",
    likes: 432,
    comments: 78,
  },
  {
    id: "6",
    title: "لباس مجلسی برای مهمانی شب - انتخاب بهترین استایل",
    thumbnail: "/images/carousel-homepage-one.jpg",
    views: 22134,
    publishedAt: "2024-01-15",
    category: "استایل",
    likes: 678,
    comments: 145,
  },
  {
    id: "7",
    title: "راهنمای انتخاب شلوار کتان مناسب",
    thumbnail: "/images/shalva-katan.jpeg",
    views: 11234,
    publishedAt: "2024-01-10",
    category: "راهنما",
    likes: 234,
    comments: 56,
  },
  {
    id: "8",
    title: "اکسسوری‌های برتر فصل - کیف و کفش‌های شیک",
    thumbnail: "/images/handbag.jpg",
    views: 15678,
    publishedAt: "2024-01-05",
    category: "اکسسوری",
    likes: 389,
    comments: 67,
  },
];

// Format number (e.g., 15230 -> "15.2K")
const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toString();
};

// Format date (simple format for now)
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return "امروز";
  if (diffDays === 1) return "دیروز";
  if (diffDays < 7) return `${diffDays} روز پیش`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} هفته پیش`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} ماه پیش`;
  return `${Math.floor(diffDays / 365)} سال پیش`;
};

// Post Card Component
const PostCard: React.FC<{ post: Post }> = ({ post }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="cursor-pointer"
    >
      <Link href={`/profile/${post.id}`} className="block h-full">
        <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col">
          {/* Thumbnail */}
          <div className="relative w-full aspect-video overflow-hidden bg-gray-100 flex-shrink-0">
                <Image
              src={post.thumbnail}
              alt={post.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover transition-transform duration-300 hover:scale-110"
            />
            {/* Category badge */}
            <div className="absolute bottom-2 left-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
              {post.category}
            </div>
          </div>

          {/* Content */}
          <div className="p-3 sm:p-4 flex-1 flex flex-col">
            <Title
              level={5}
              className="!mb-2 line-clamp-2 !text-gray-800 hover:text-pink-600 transition-colors"
              style={{ fontSize: "14px", fontWeight: 600, minHeight: "44px" }}
            >
              {post.title}
            </Title>

            {/* Stats */}
            <div className="flex items-center flex-wrap gap-3 text-xs text-gray-500 mt-2">
              <span className="flex items-center gap-1 whitespace-nowrap">
                <EyeOutlined />
                {formatNumber(post.views)} بازدید
              </span>
              <span className="flex items-center gap-1 whitespace-nowrap">
                <CalendarOutlined />
                {formatDate(post.publishedAt)}
              </span>
            </div>

            {/* Engagement */}
            {post.likes && post.comments && (
              <div className="flex items-center gap-4 mt-3 pt-3 border-t border-gray-100">
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
};

// Mock Playlist data
interface Playlist {
  id: string;
  title: string;
  thumbnail: string;
  itemCount: number;
  views: number;
}

const mockPlaylists: Playlist[] = [
  {
    id: "1",
    title: "مجموعه لباس‌های مجلسی",
    thumbnail: "/images/carousel-homepage-one.jpg",
    itemCount: 12,
    views: 45678,
  },
  {
    id: "2",
    title: "راهنمای خرید و انتخاب",
    thumbnail: "/images/daman.jpeg",
    itemCount: 8,
    views: 23456,
  },
  {
    id: "3",
    title: "ترندهای فصل بهار",
    thumbnail: "/images/Women-Formal.avif",
    itemCount: 15,
    views: 67890,
  },
];

// Playlist Card Component
const PlaylistCard: React.FC<{ playlist: Playlist }> = ({ playlist }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="cursor-pointer"
    >
      <Link href={`/profile/playlist/${playlist.id}`} className="block h-full">
        <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col">
          {/* Thumbnail */}
          <div className="relative w-full aspect-video overflow-hidden bg-gray-100 flex-shrink-0">
            <Image
              src={playlist.thumbnail}
              alt={playlist.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-300 hover:scale-110"
            />
            {/* Playlist Icon Overlay */}
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <div className="bg-white/90 rounded-full p-3">
                <UnorderedListOutlined className="text-2xl text-pink-600" />
              </div>
            </div>
            {/* Item Count Badge */}
            <div className="absolute bottom-2 left-2 bg-black/80 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
              <PlayCircleOutlined />
              {playlist.itemCount} پست
            </div>
          </div>

          {/* Content */}
          <div className="p-3 sm:p-4 flex-1 flex flex-col">
            <Title
              level={5}
              className="!mb-2 line-clamp-2 !text-gray-800 hover:text-pink-600 transition-colors"
              style={{ fontSize: "14px", fontWeight: 600, minHeight: "44px" }}
            >
              {playlist.title}
            </Title>

            {/* Stats */}
            <div className="flex items-center gap-3 text-xs text-gray-500 mt-2">
              <span className="flex items-center gap-1 whitespace-nowrap">
                <EyeOutlined />
                {formatNumber(playlist.views)} بازدید
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<string>("home");
  const [subscribed, setSubscribed] = useState<boolean>(false);
  
  // Mock banner image - در واقعیت از API می‌آید
  const bannerImage = "/images/carousel-homepage-one.jpg";
  
  // Featured post for home tab - جدیدترین یا محبوب‌ترین پست
  const featuredPost = mockPosts[0];

  const tabsItems: TabsProps["items"] = [
    {
      key: "home",
      label: (
        <span className="px-4 py-2 flex items-center gap-2">
          <span>صفحه اصلی</span>
        </span>
      ),
    },
    {
      key: "playlists",
      label: (
        <span className="px-4 py-2 flex items-center gap-2">
          <UnorderedListOutlined />
          <span>فهرست‌ها</span>
          <Badge count={mockPlaylists.length} showZero />
        </span>
      ),
    },
    {
      key: "posts",
      label: (
        <span className="px-4 py-2 flex items-center gap-2">
          <span>پست‌ها</span>
          <Badge count={mockPosts.length} showZero />
        </span>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner Section - YouTube Style */}
      <div className="relative w-full h-48 sm:h-56 md:h-64 lg:h-72 bg-gradient-to-r from-pink-500 via-purple-500 to-pink-600 overflow-hidden">
        {bannerImage ? (
          <div className="relative w-full h-full">
            <Image
              src={bannerImage}
              alt="Profile Banner"
              fill
              className="object-cover"
              priority
            />
          </div>
        ) : (
          <div className="relative w-full h-full">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-pink-600"></div>
          </div>
        )}
      </div>

      {/* Profile Header - YouTube Style */}
      <div className="bg-white border-b border-gray-200 -mt-16 sm:-mt-20 md:-mt-24 lg:-mt-28 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6 lg:gap-8">
            
            {/* Avatar - Right Side (RTL) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="flex-shrink-0 w-full lg:w-auto flex justify-center lg:justify-start pt-16 sm:pt-20 md:pt-24 lg:pt-28"
            >
              <div className="relative">
                <div className="relative w-28 h-28 sm:w-32 sm:h-32 lg:w-36 lg:h-36">
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full p-[3px]">
                    <div className="bg-white rounded-full w-full h-full p-1 relative">
                      <div className="absolute inset-1 rounded-full overflow-hidden">
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
            <div className="flex-1 min-w-0 w-full lg:w-auto pt-16 sm:pt-20 md:pt-24 lg:pt-28">
              <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-6 w-full">
                {/* Profile Text Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <Title level={2} className="!mb-0 !text-gray-800 !text-2xl lg:!text-3xl">
                      Ali Ahmagh
                    </Title>
                    {subscribed && (
                      <Badge
                        status="success"
                        text={
                          <span className="text-xs text-green-600 flex items-center gap-1">
                            <CheckOutlined /> تأیید شده
                          </span>
                        }
                      />
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-4 mb-3">
                    <Text className="text-gray-600 text-sm lg:text-base">
                      <strong className="text-gray-800 font-semibold">1.2K</strong> دنبال‌کننده
                    </Text>
                    <Text className="text-gray-600 text-sm lg:text-base">
                      <strong className="text-gray-800 font-semibold">{mockPosts.length}</strong> پست
                    </Text>
                    <Text className="text-gray-600 text-sm lg:text-base">
                      <strong className="text-gray-800 font-semibold">
                        {formatNumber(
                          mockPosts.reduce((acc, p) => acc + p.views, 0)
                        )}
                      </strong>{" "}
                      بازدید کل
                    </Text>
                  </div>

                  <Paragraph
                    className="!mb-0 text-gray-600 text-sm lg:text-base !leading-6"
                    ellipsis={{ rows: 2, expandable: true, symbol: "بیشتر" }}
                  >
                    خوش آمدید به پروفایل من! اینجا می‌تونید جدیدترین پست‌های مربوط به
                    مد، فشن و استایل رو ببینید. با من همراه باشید تا از جدیدترین
                    ترندها و نکات مهم در زمینه مد و پوشش با خبر بشید.
                  </Paragraph>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full lg:w-auto">
                  <Button
                    type={subscribed ? "default" : "primary"}
                    size="large"
                    icon={subscribed ? <CheckOutlined /> : <BellOutlined />}
                    onClick={() => setSubscribed(!subscribed)}
                    className={subscribed ? "" : "bg-gradient-to-r from-pink-500 to-purple-600 border-0 hover:from-pink-600 hover:to-purple-700"}
                  >
                    {subscribed ? "دنبال می‌کنم" : "دنبال کردن"}
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
      <div className="bg-white border-b border-gray-200 sticky top-[72px] z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-end">
            <div className="flex-1 max-w-full overflow-x-auto">
        <Tabs
                activeKey={activeTab}
                onChange={setActiveTab}
                items={tabsItems}
                className="!border-0 custom-profile-tabs"
                moreIcon={null}
                tabBarStyle={{ marginBottom: 0 }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Content Area based on Active Tab */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        {activeTab === "home" && (
          <div className="space-y-6">
            {/* Featured Post - Large Display */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Thumbnail */}
                <div className="relative w-full aspect-video lg:aspect-auto lg:h-full min-h-[300px]">
                  <Link href={`/profile/${featuredPost.id}`}>
                    <Image
                      src={featuredPost.thumbnail}
                      alt={featuredPost.title}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4 bg-black/80 text-white text-xs px-3 py-1.5 rounded">
                      {featuredPost.category}
                    </div>
                  </Link>
                </div>

                {/* Content */}
                <div className="p-6 lg:p-8 flex flex-col justify-between">
                  <div>
                    <Link href={`/profile/${featuredPost.id}`}>
                      <Title
                        level={2}
                        className="!mb-4 !text-2xl lg:!text-3xl !text-gray-800 hover:text-pink-600 transition-colors"
                      >
                        {featuredPost.title}
                      </Title>
                    </Link>

                    <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-gray-600">
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
                      <div className="flex items-center gap-4 mb-6">
                        <span className="flex items-center gap-2 text-gray-600">
                          <LikeOutlined className="text-pink-500 text-lg" />
                          <strong>{formatNumber(featuredPost.likes)}</strong>
                        </span>
                        <span className="flex items-center gap-2 text-gray-600">
                          <MessageOutlined className="text-purple-500 text-lg" />
                          <strong>{formatNumber(featuredPost.comments)}</strong>
                        </span>
                      </div>
                    )}

                    <Paragraph className="!text-gray-700 !text-base !leading-7 line-clamp-3">
                      {featuredPost.description || "این پست یکی از محبوب‌ترین پست‌های این کانال است. برای مشاهده جزئیات بیشتر روی لینک زیر کلیک کنید."}
                    </Paragraph>
                  </div>

                  <div className="mt-6">
                    <Link href={`/profile/${featuredPost.id}`}>
                      <Button
                        type="primary"
                        size="large"
                        className="bg-gradient-to-r from-pink-500 to-purple-600 border-0 hover:from-pink-600 hover:to-purple-700"
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {mockPosts.slice(1, 5).map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "playlists" && (
          <div>
            {mockPlaylists.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {mockPlaylists.map((playlist) => (
                  <PlaylistCard key={playlist.id} playlist={playlist} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <Text className="text-gray-500 text-lg">
                  فهرستی یافت نشد
                </Text>
              </div>
            )}
          </div>
        )}

        {activeTab === "posts" && (
          <div>
            {mockPosts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {mockPosts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <Text className="text-gray-500 text-lg">
                  پستی یافت نشد
                </Text>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Chat Fixed - Keep the existing chat component */}
      <div className="fixed left-0 bottom-0 ml-4 mb-4 z-50 w-80">
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
