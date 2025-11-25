'use client';
import React, { useState } from 'react';
import { Layout, Button, Badge, Drawer, Typography, Divider, Dropdown, Avatar } from 'antd';
import {
  ShoppingCartOutlined,
  HeartOutlined,
  UserOutlined,
  MenuOutlined,
  BellOutlined,
  CloseOutlined,
  AppstoreOutlined,
  SearchOutlined,
  DownOutlined,
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { SearchDropdown } from './search-dropdown';
import { HeaderSharedProps } from './header-types';

const { Header: AntHeader } = Layout;
const { Text } = Typography;

interface TabletHeaderProps extends HeaderSharedProps {
  onMenuToggle: (open: boolean) => void;
  menuOpen: boolean;
}

export const TabletHeader: React.FC<TabletHeaderProps> = ({
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
  onMenuToggle,
  menuOpen,
}) => {
  const [searchDropdownVisible, setSearchDropdownVisible] = useState<boolean>(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState<boolean>(false);

  const handleSearch = (value: string) => {
    onSearch(value);
    setMobileSearchOpen(false);
    setSearchDropdownVisible(false);
  };

  return (
    <>
      <AntHeader
        className={`!sticky !top-0 !z-50 !border-b !border-gray-100/50 !bg-white/95 !px-4 !shadow-md backdrop-blur-md transition-all duration-300 ${
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
                <div className="hidden sm:block">
                  <Text className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-2xl font-extrabold text-transparent">
                    شیک‌پوشان
                  </Text>
                  <div className="text-xs font-medium text-gray-500">فروشگاه لباس زنانه</div>
                </div>
              </Link>
            </motion.div>

            {/* Tablet Navigation Menu */}
            <motion.nav
              className="hidden flex-shrink-0 items-center gap-3 md:flex"
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
                    className="group nav-link !hover:text-pink-600 relative px-3 py-2 text-sm font-medium whitespace-nowrap !text-gray-900 !transition-colors"
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
            </motion.nav>

            {/* Tablet Actions */}
            <motion.div
              className="flex w-auto flex-shrink-0 items-center gap-1 sm:gap-2"
              initial={hasAnimated ? false : { opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {/* Search Button */}
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button
                  type="text"
                  icon={<SearchOutlined />}
                  onClick={() => {
                    setMobileSearchOpen(true);
                    setSearchDropdownVisible(true);
                  }}
                  className="h-11 w-11 rounded-full text-gray-600 transition-all hover:bg-pink-50 hover:text-pink-600"
                />
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

              {/* User Menu or Login Button */}
              {isAuthenticated ? (
                <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      type="text"
                      className="flex h-11 flex-shrink-0 items-center gap-2 rounded-full border border-gray-200 px-2 transition-all hover:border-pink-300 hover:bg-pink-50"
                    >
                      <Avatar
                        size="small"
                        src={user?.avatar}
                        icon={<UserOutlined />}
                        className="border-2 border-white bg-gradient-to-br from-pink-500 to-purple-600 shadow-md"
                      >
                        {user?.first_name?.[0] || user?.phone?.[0]}
                      </Avatar>
                    </Button>
                  </motion.div>
                </Dropdown>
              ) : (
                <Link href="/auth">
                  <Button
                    type="primary"
                    className="h-11 rounded-full border-0 bg-gradient-to-r from-pink-500 to-purple-600 px-4 font-semibold text-white shadow-md transition-all hover:from-pink-600 hover:to-purple-700"
                  >
                    ورود
                  </Button>
                </Link>
              )}

              {/* Menu Button */}
              <Button
                type="text"
                icon={<MenuOutlined />}
                onClick={() => onMenuToggle(true)}
                className="flex h-11 w-11 flex-shrink-0 rounded-full text-gray-600 hover:bg-pink-50"
              />
            </motion.div>
          </div>
        </div>
      </AntHeader>

      {/* Tablet Menu Drawer */}
      <Drawer
        title={
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 via-purple-500 to-pink-600 shadow-lg shadow-pink-200/50">
              <Text className="text-lg font-bold text-white">ش</Text>
            </div>
            <div>
              <Text className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-lg font-bold text-transparent">
                شیک‌پوشان
              </Text>
              <div className="text-xs text-gray-500">فروشگاه لباس زنانه</div>
            </div>
          </div>
        }
        placement="right"
        onClose={() => onMenuToggle(false)}
        open={menuOpen}
        closable={false}
        extra={
          <Button
            type="text"
            icon={<CloseOutlined />}
            onClick={() => onMenuToggle(false)}
            className="rounded-full text-gray-600 hover:bg-pink-50 hover:text-pink-600"
          />
        }
        className="mobile-menu-drawer"
        width={320}
      >
        {/* Tablet Search */}
        <div className="mb-6">
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
        </div>

        <Divider />

        {/* Categories Dropdown */}
        <div className="mb-4">
          <Dropdown menu={{ items: categoryMenuItems }} placement="topRight" trigger={['click']}>
            <Button
              type="text"
              className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-right font-medium text-gray-700 transition-all hover:bg-pink-50 hover:text-pink-600"
              block
            >
              <span className="flex items-center gap-3">
                <AppstoreOutlined className="text-lg" />
                دسته‌بندی‌ها
              </span>
              <DownOutlined />
            </Button>
          </Dropdown>
        </div>

        <Divider />

        {/* Tablet User Actions */}
        <div className="flex flex-col gap-2">
          <Link
            href="/wishlist"
            onClick={() => onMenuToggle(false)}
            className="flex items-center justify-between rounded-xl px-4 py-3 text-gray-700 transition-all hover:bg-pink-50 hover:text-pink-600"
          >
            <span className="flex items-center gap-3">
              <HeartOutlined className="text-lg" />
              <span className="font-medium">علاقه‌مندی‌ها</span>
            </span>
            <Badge count={wishlistCount} size="small" />
          </Link>

          <Link
            href="/notification"
            onClick={() => onMenuToggle(false)}
            className="flex items-center justify-between rounded-xl px-4 py-3 text-gray-700 transition-all hover:bg-pink-50 hover:text-pink-600"
          >
            <span className="flex items-center gap-3">
              <BellOutlined className="text-lg" />
              <span className="font-medium">اعلان‌ها</span>
            </span>
            <Badge count={notificationCount} size="small" />
          </Link>
        </div>

        <Divider />

        {/* Tablet Auth Section */}
        {isAuthenticated ? (
          <div className="flex flex-col gap-2">
            <Link
              href="/profile"
              onClick={() => onMenuToggle(false)}
              className="flex items-center gap-3 rounded-xl px-4 py-3 font-medium text-gray-700 transition-all hover:bg-pink-50 hover:text-pink-600"
            >
              <UserOutlined className="text-lg" />
              <span>پروفایل کاربری</span>
            </Link>
            <Button
              type="text"
              danger
              onClick={() => {
                onLogout();
                onMenuToggle(false);
              }}
              className="flex items-center justify-start gap-3 rounded-xl px-4 py-3 font-medium text-red-500 transition-all hover:bg-red-50"
              loading={logoutLoading}
            >
              <span>خروج از حساب</span>
            </Button>
          </div>
        ) : (
          <Link href="/auth" onClick={() => onMenuToggle(false)}>
            <Button
              type="primary"
              block
              className="h-11 rounded-xl border-0 bg-gradient-to-r from-pink-500 to-purple-600 font-semibold text-white shadow-md"
            >
              ورود / ثبت نام
            </Button>
          </Link>
        )}
      </Drawer>

      {/* Tablet Search Overlay */}
      {mobileSearchOpen && (
        <div className="fixed inset-0 z-[9999]">
          <SearchDropdown
            value={searchValue}
            onChange={(value) => {
              onSearchValueChange(value);
              setSearchDropdownVisible(true);
            }}
            onSearch={handleSearch}
            onClose={() => {
              setMobileSearchOpen(false);
              setSearchDropdownVisible(false);
            }}
            visible={searchDropdownVisible}
          />
        </div>
      )}
    </>
  );
};
