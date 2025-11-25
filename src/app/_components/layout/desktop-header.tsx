'use client';
import React, { useState } from 'react';
import { Layout, Button, Badge, Dropdown, Avatar, Typography } from 'antd';
import {
  ShoppingCartOutlined,
  HeartOutlined,
  UserOutlined,
  BellOutlined,
  DownOutlined,
  AppstoreOutlined,
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { SearchDropdown } from './search-dropdown';
import { HeaderSharedProps } from './header-types';

const { Header: AntHeader } = Layout;
const { Text } = Typography;

export const DesktopHeader: React.FC<HeaderSharedProps> = ({
  cartCount,
  wishlistCount,
  notificationCount,
  isAuthenticated,
  user,
  searchValue,
  onSearchValueChange,
  onSearch,
  userMenuItems,
  categoryMenuItems,
  navLinks,
  scrolled,
  hasAnimated,
  onLogout,
  logoutLoading,
}) => {
  const [searchDropdownVisible, setSearchDropdownVisible] = useState<boolean>(false);

  const handleSearch = (value: string) => {
    onSearch(value);
    setSearchDropdownVisible(false);
  };

  return (
    <AntHeader
      className={`!lg:px-8 !sticky !top-0 !z-50 !border-b !border-gray-100/50 !bg-white/95 !px-4 !shadow-md backdrop-blur-md transition-all duration-300 ${
        scrolled ? '!shadow-xl' : ''
      }`}
      style={{ height: 'auto', minHeight: '72px', lineHeight: 'normal' }}
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="flex h-20 items-center justify-between gap-2 sm:gap-4">
          {/* Logo and Brand */}
          <motion.div
            className="flex w-auto flex-shrink-0 items-center gap-3"
            initial={hasAnimated ? false : { opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/" className="group flex items-center gap-3">
              <motion.div
                className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 via-purple-500 to-pink-600 shadow-lg shadow-pink-200/50 transition-all duration-300 group-hover:shadow-pink-300/70"
                whileHover={{ scale: 1.05, rotate: [0, -5, 5, -5, 0] }}
                whileTap={{ scale: 0.95 }}
              >
                <Text className="text-xl font-bold text-white">ش</Text>
              </motion.div>
              <div className="hidden md:block">
                <Text className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-2xl font-extrabold text-transparent">
                  شیک‌پوشان
                </Text>
                <div className="text-xs font-medium text-gray-500">فروشگاه لباس زنانه</div>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation Menu - Center */}
          <motion.nav
            className="hidden flex-shrink-0 items-center gap-4 md:flex"
            initial={hasAnimated ? false : { opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {navLinks.map((link, index) => (
              <motion.div
                key={link.href}
                initial={hasAnimated ? false : { opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
              >
                <Link
                  href={link.href}
                  className="group nav-link !hover:text-pink-600 relative px-4 py-3 text-sm font-medium whitespace-nowrap !text-gray-900 !transition-colors"
                >
                  <span className="nav-label relative z-10 inline-flex items-center gap-2">
                    <span className="text-base opacity-70 transition-opacity group-hover:opacity-100">
                      {link.icon}
                    </span>
                    {link.label}
                  </span>
                </Link>
              </motion.div>
            ))}

            <Dropdown
              menu={{ items: categoryMenuItems }}
              placement="bottom"
              overlayClassName="custom-dropdown"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative"
              >
                <Button
                  type="text"
                  className="nav-trigger relative flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap text-gray-900 hover:text-pink-600"
                >
                  <AppstoreOutlined className="text-base" />
                  دسته‌بندی‌ها
                  <DownOutlined className="text-xs" />
                </Button>
              </motion.div>
            </Dropdown>
          </motion.nav>

          {/* Search Bar - Desktop - Takes remaining space */}
          <motion.div
            className="mx-4 hidden max-w-lg min-w-0 flex-1 lg:flex"
            initial={hasAnimated ? false : { opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <SearchDropdown
              value={searchValue}
              onChange={(value) => {
                onSearchValueChange(value);
                setSearchDropdownVisible(true);
              }}
              onSearch={handleSearch}
              onClose={() => setSearchDropdownVisible(false)}
              visible={searchDropdownVisible}
            />
          </motion.div>

          {/* User Actions - Left Side (RTL End) */}
          <motion.div
            className="flex w-auto flex-shrink-0 items-center gap-1 sm:gap-2"
            initial={hasAnimated ? false : { opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {/* Notifications */}
            <motion.div
              className="hidden sm:block"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Badge
                count={notificationCount}
                size="small"
                className="custom-badge"
                style={{ backgroundColor: '#ec4899' }}
              >
                <Link href="/notification">
                  <Button
                    type="text"
                    icon={<BellOutlined />}
                    className="h-11 w-11 rounded-full text-gray-600 transition-all hover:bg-pink-50 hover:text-pink-600"
                  />
                </Link>
              </Badge>
            </motion.div>

            {/* Wishlist */}
            <motion.div
              className="hidden sm:block"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Badge
                count={wishlistCount}
                size="small"
                className="custom-badge"
                style={{ backgroundColor: '#ec4899' }}
              >
                <Link href="/wishlist">
                  <Button
                    type="text"
                    icon={<HeartOutlined />}
                    className="h-11 w-11 rounded-full text-gray-600 transition-all hover:bg-pink-50 hover:text-pink-600"
                  />
                </Link>
              </Badge>
            </motion.div>

            {/* Shopping Cart */}
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Badge
                count={cartCount || 0}
                size="small"
                className="custom-badge"
                style={{ backgroundColor: '#ec4899' }}
              >
                <Link href="/cart">
                  <Button
                    type="text"
                    icon={<ShoppingCartOutlined />}
                    className="h-11 w-11 rounded-full text-gray-600 transition-all hover:bg-pink-50 hover:text-pink-600"
                  />
                </Link>
              </Badge>
            </motion.div>

            {/* User Menu - Show if authenticated, otherwise show login/register buttons */}
            {isAuthenticated ? (
              <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    type="text"
                    className="flex h-11 flex-shrink-0 items-center gap-2 rounded-full border border-gray-200 px-2 transition-all hover:border-pink-300 hover:bg-pink-50 lg:px-3"
                  >
                    <Avatar
                      size="small"
                      src={user?.avatar}
                      icon={<UserOutlined />}
                      className="border-2 border-white bg-gradient-to-br from-pink-500 to-purple-600 shadow-md"
                    >
                      {user?.first_name?.[0] || user?.phone?.[0]}
                    </Avatar>
                    <span className="hidden text-sm font-medium text-gray-700 lg:inline">
                      {user?.first_name && user?.last_name
                        ? `${user.first_name} ${user.last_name}`
                        : user?.phone || 'حساب کاربری'}
                    </span>
                    <DownOutlined className="hidden text-xs text-gray-500 lg:inline" />
                  </Button>
                </motion.div>
              </Dropdown>
            ) : (
              <Link href="/auth">
                <Button
                  type="primary"
                  className="h-11 rounded-full border-0 bg-gradient-to-r from-pink-500 to-purple-600 px-4 font-semibold text-white shadow-md transition-all hover:from-pink-600 hover:to-purple-700"
                >
                  ورود / ثبت نام
                </Button>
              </Link>
            )}
          </motion.div>
        </div>
      </div>
    </AntHeader>
  );
};
