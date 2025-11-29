'use client';
import React, { useState, useEffect } from 'react';
import { Layout, Button, Badge, Drawer, Typography, Divider, Tooltip } from 'antd';
import {
  ShoppingCartOutlined,
  HeartOutlined,
  UserOutlined,
  MenuOutlined,
  BellOutlined,
  CloseOutlined,
  AppstoreOutlined,
  SearchOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { SearchDropdown } from './search-dropdown';
import { HeaderSharedProps } from './header-types';
import { MobileMegaMenu } from './mobile-mega-menu';

const { Header: AntHeader } = Layout;
const { Text } = Typography;

interface MobileHeaderProps extends HeaderSharedProps {
  onMenuToggle: (open: boolean) => void;
  menuOpen: boolean;
}

export const MobileHeader: React.FC<MobileHeaderProps> = ({
  cartCount,
  wishlistCount,
  notificationCount,
  isAuthenticated,
  user: _user,
  searchValue,
  onSearchValueChange,
  onSearch,
  userMenuItems: _userMenuItems,
  categoryMenuItems: _categoryMenuItems,
  categories,
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

  // Fix hydration error: only use authentication state after client-side mount
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  // Use isAuthenticated only after mount to prevent hydration mismatch
  const displayIsAuthenticated = mounted ? isAuthenticated : false;

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
          <div className="flex h-20 items-center justify-between gap-2">
            {/* Logo - Right Side */}
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
              </Link>
            </motion.div>

            {/* Center Actions - Products, Search, About */}
            <motion.div
              className="flex flex-1 items-center justify-center gap-1 sm:gap-2"
              initial={hasAnimated ? false : { opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {/* Mobile Products Link */}
              <Tooltip title="محصولات" placement="bottom">
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Link href="/products">
                    <Button
                      type="text"
                      icon={<AppstoreOutlined />}
                      className="h-11 w-11 rounded-full text-gray-600 transition-all hover:bg-pink-50 hover:text-pink-600"
                    />
                  </Link>
                </motion.div>
              </Tooltip>

              {/* Mobile Search Button */}
              <Tooltip title="جستجو" placement="bottom">
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
              </Tooltip>

              {/* About Link */}
              <Tooltip title="درباره ما" placement="bottom">
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Link href="/about">
                    <Button
                      type="text"
                      icon={<InfoCircleOutlined />}
                      className="h-11 w-11 rounded-full text-gray-600 transition-all hover:bg-pink-50 hover:text-pink-600"
                    />
                  </Link>
                </motion.div>
              </Tooltip>
            </motion.div>

            {/* Left Actions - Cart, Menu */}
            <motion.div
              className="flex w-auto flex-shrink-0 items-center gap-2 sm:gap-3"
              initial={hasAnimated ? false : { opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {/* Mobile Shopping Cart */}
              <Tooltip title="سبد خرید" placement="bottom">
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
              </Tooltip>

              {/* Mobile Menu Button */}
              <Tooltip title="منو" placement="bottom">
                <Button
                  type="text"
                  icon={<MenuOutlined />}
                  onClick={() => onMenuToggle(true)}
                  className="flex h-11 w-11 flex-shrink-0 rounded-full text-gray-600 hover:bg-pink-50"
                />
              </Tooltip>
            </motion.div>
          </div>
        </div>
      </AntHeader>

      {/* Mobile Menu Drawer */}
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
        {/* Mobile Search */}
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

        {/* Mobile Navigation Links */}
        <div className="flex flex-col gap-2">
          {navLinks
            .filter((link) => link.href !== '/about' && link.href !== '/contact')
            .map((link, index) => (
              <motion.div
                key={link.href}
                initial={hasAnimated ? false : { opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Link
                  href={link.href}
                  onClick={() => onMenuToggle(false)}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 font-medium !text-gray-700 no-underline transition-all hover:bg-pink-50 hover:!text-pink-600"
                >
                  <span className="text-lg">{link.icon}</span>
                  {link.label}
                </Link>
              </motion.div>
            ))}

          {/* Mobile Mega Menu */}
          <div className="w-full">
            <MobileMegaMenu categories={categories} onClose={() => onMenuToggle(false)} />
          </div>
        </div>

        <Divider />

        {/* Mobile User Actions */}
        <div className="flex flex-col gap-2">
          <Link
            href="/wishlist"
            onClick={() => onMenuToggle(false)}
            className="flex items-center justify-between rounded-xl px-4 py-3 !text-gray-700 no-underline transition-all hover:bg-pink-50 hover:!text-pink-600"
          >
            <span className="flex items-center gap-3">
              <HeartOutlined className="text-lg" />
              <span className="font-medium">علاقه‌مندی‌ها</span>
            </span>
            <Badge count={wishlistCount} size="small" />
          </Link>

          <Link
            href="/cart"
            onClick={() => onMenuToggle(false)}
            className="flex items-center justify-between rounded-xl px-4 py-3 !text-gray-700 no-underline transition-all hover:bg-pink-50 hover:!text-pink-600"
          >
            <span className="flex items-center gap-3">
              <ShoppingCartOutlined className="text-lg" />
              <span className="font-medium">سبد خرید</span>
            </span>
            <Badge count={cartCount} size="small" />
          </Link>

          <Link
            href="/notification"
            onClick={() => onMenuToggle(false)}
            className="flex items-center justify-between rounded-xl px-4 py-3 !text-gray-700 no-underline transition-all hover:bg-pink-50 hover:!text-pink-600"
          >
            <span className="flex items-center gap-3">
              <BellOutlined className="text-lg" />
              <span className="font-medium">اعلان‌ها</span>
            </span>
            <Badge count={notificationCount} size="small" />
          </Link>
        </div>

        <Divider />

        {/* Mobile Auth Section */}
        {displayIsAuthenticated ? (
          <div className="flex flex-col gap-2">
            <Link
              href="/profile"
              onClick={() => onMenuToggle(false)}
              className="flex items-center gap-3 rounded-xl px-4 py-3 font-medium !text-gray-700 no-underline transition-all hover:bg-pink-50 hover:!text-pink-600"
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

        <Divider />

        {/* About Us and Contact Us - Bottom Section */}
        <div className="flex flex-col gap-2">
          {navLinks
            .filter((link) => link.href === '/about' || link.href === '/contact')
            .map((link, index) => (
              <motion.div
                key={link.href}
                initial={hasAnimated ? false : { opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Link
                  href={link.href}
                  onClick={() => onMenuToggle(false)}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 font-medium !text-gray-700 no-underline transition-all hover:bg-pink-50 hover:!text-pink-600"
                >
                  <span className="text-lg">{link.icon}</span>
                  {link.label}
                </Link>
              </motion.div>
            ))}
        </div>
      </Drawer>

      {/* Mobile Search Overlay */}
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
