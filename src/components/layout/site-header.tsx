"use client";
import React, { useState, useEffect, useMemo } from "react";
import {
  Layout,
  Input,
  Button,
  Badge,
  Dropdown,
  Avatar,
  Drawer,
  Typography,
  Divider,
} from "antd";
import {
  SearchOutlined,
  ShoppingCartOutlined,
  HeartOutlined,
  UserOutlined,
  MenuOutlined,
  BellOutlined,
  DownOutlined,
  CloseOutlined,
  HomeOutlined,
  AppstoreOutlined,
  InfoCircleOutlined,
  PhoneOutlined,
  FireOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";
import Link from "next/link";

const { Header: AntHeader } = Layout;
const { Text } = Typography;

interface HeaderProps {
  cartItemsCount?: number;
  wishlistCount?: number;
}

const Header: React.FC<HeaderProps> = ({
  cartItemsCount = 3,
  wishlistCount = 5,
}) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [searchFocused, setSearchFocused] = useState<boolean>(false);
  const [hasAnimated, setHasAnimated] = useState<boolean>(false);
  const [isDesktop, setIsDesktop] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Check if desktop size and prevent drawer from opening on desktop
  useEffect(() => {
    const checkScreenSize = () => {
      // lg breakpoint in Tailwind is 1024px
      setIsDesktop(window.innerWidth >= 1024);
      if (window.innerWidth >= 1024 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, [mobileMenuOpen]);

  // Track if component has animated to prevent animation replay on navigation
  useEffect(() => {
    // Mark as animated after first mount to prevent replay on re-renders
    setHasAnimated(true);
  }, []);

  // Memoize menu items to prevent recreating on every render
  const userMenuItems = useMemo(() => [
    {
      key: "profile",
      label: (
        <Link href="/profile" className="flex items-center gap-2 px-2 py-1">
          <UserOutlined className="text-pink-500" />
          <span>پروفایل کاربری</span>
        </Link>
      ),
    },
    {
      key: "orders",
      label: (
        <Link href="/orders" className="flex items-center gap-2 px-2 py-1">
          <ShoppingCartOutlined className="text-pink-500" />
          <span>سفارش‌های من</span>
        </Link>
      ),
    },
    {
      key: "wishlist",
      label: (
        <Link href="/wishlist" className="flex items-center gap-2 px-2 py-1">
          <HeartOutlined className="text-pink-500" />
          <span>علاقه‌مندی‌ها</span>
        </Link>
      ),
    },
    {
      type: "divider" as const,
    },
    {
      key: "logout",
      label: (
        <span className="text-red-500 px-2 py-1 block">خروج از حساب</span>
      ),
      danger: true,
    },
  ], []);

  const categoryMenuItems = useMemo(() => [
    {
      key: "dresses",
      label: (
        <Link href="/category/dresses" className="block px-4 py-2 hover:bg-pink-50 rounded-lg transition-colors">
          <span className="flex items-center gap-2">
            <FireOutlined className="text-pink-500" />
            پیراهن و لباس مجلسی
          </span>
        </Link>
      ),
    },
    {
      key: "tops",
      label: (
        <Link href="/category/tops" className="block px-4 py-2 hover:bg-pink-50 rounded-lg transition-colors">
          <span className="flex items-center gap-2">
            <FireOutlined className="text-pink-500" />
            بلوز و تاپ
          </span>
        </Link>
      ),
    },
    {
      key: "skirts",
      label: (
        <Link href="/category/skirts" className="block px-4 py-2 hover:bg-pink-50 rounded-lg transition-colors">
          <span className="flex items-center gap-2">
            <FireOutlined className="text-pink-500" />
            دامن
          </span>
        </Link>
      ),
    },
    {
      key: "pants",
      label: (
        <Link href="/category/pants" className="block px-4 py-2 hover:bg-pink-50 rounded-lg transition-colors">
          <span className="flex items-center gap-2">
            <FireOutlined className="text-pink-500" />
            شلوار
          </span>
        </Link>
      ),
    },
    {
      key: "accessories",
      label: (
        <Link href="/category/accessories" className="block px-4 py-2 hover:bg-pink-50 rounded-lg transition-colors">
          <span className="flex items-center gap-2">
            <FireOutlined className="text-pink-500" />
            اکسسوری
          </span>
        </Link>
      ),
    },
  ], []);

  const handleSearch = (value: string) => {
    console.log("Search:", value);
  };

  const navLinks = useMemo(() => [
    { href: "/", label: "صفحه اصلی", icon: <HomeOutlined /> },
    { href: "/about", label: "درباره ما", icon: <InfoCircleOutlined /> },
    { href: "/contact", label: "تماس با ما", icon: <PhoneOutlined /> },
  ], []);

  return (
    <>
      <AntHeader
        className={`!bg-white/95 backdrop-blur-md !shadow-md !border-b !border-gray-100/50 !px-4 !lg:px-8 !sticky !top-0 !z-50 transition-all duration-300 ${
          scrolled ? "!shadow-xl" : ""
        }`}
        style={{ height: "auto", minHeight: "72px", lineHeight: "normal" }}
      >
        <div className="max-w-7xl mx-auto w-full">
          {/* Top Bar */}
          <div className="flex items-center justify-between h-20 gap-2 sm:gap-4">
            {/* Logo and Brand - Right Side (RTL Start) */}
            <motion.div
              className="flex items-center gap-3 flex-shrink-0 w-auto"
              initial={hasAnimated ? false : { opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link href="/" className="flex items-center gap-3 group">
                <motion.div
                  className="w-12 h-12 bg-gradient-to-br from-pink-500 via-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg shadow-pink-200/50 group-hover:shadow-pink-300/70 transition-all duration-300"
                  whileHover={{ scale: 1.05, rotate: [0, -5, 5, -5, 0] }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Text className="text-white font-bold text-xl">ش</Text>
                </motion.div>
                <div className="hidden md:block">
                  <Text className="text-2xl font-extrabold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                    شیک‌پوشان
                  </Text>
                  <div className="text-xs text-gray-500 font-medium">
                    فروشگاه لباس زنانه
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Desktop Navigation Menu - Center */}
            <motion.nav
              className="hidden md:flex items-center gap-4 flex-shrink-0"
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
                    className="relative group px-4 py-3 text-gray-700 hover:text-pink-600 transition-colors font-medium text-sm whitespace-nowrap"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      <span className="opacity-70 group-hover:opacity-100 transition-opacity text-base">
                        {link.icon}
                      </span>
                      {link.label}
                    </span>
                    <motion.span
                      className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-pink-600 rounded-full opacity-0 group-hover:opacity-100 origin-center"
                      layoutId={`navbar-indicator-${link.href}`}
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    />
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
                  className="relative group"
                >
                  <Button
                    type="text"
                    className="text-gray-700 hover:text-pink-600 font-medium text-sm px-4 py-3 flex items-center gap-2 whitespace-nowrap relative"
                  >
                    <AppstoreOutlined className="text-base" />
                    دسته‌بندی‌ها
                    <DownOutlined className="text-xs" />
                  </Button>
                  <motion.span
                    className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-pink-600 rounded-full opacity-0 group-hover:opacity-100 origin-center"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  />
                </motion.div>
              </Dropdown>
            </motion.nav>

            {/* Search Bar - Desktop - Takes remaining space */}
            <motion.div
              className="hidden lg:flex flex-1 min-w-0 max-w-lg mx-4"
              initial={hasAnimated ? false : { opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div
                className={`relative w-full transition-all duration-300 ${
                  searchFocused ? "scale-105" : ""
                }`}
              >
                <Input
                  placeholder="جستجو در محصولات..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                  onPressEnter={(e) => handleSearch((e.target as HTMLInputElement).value)}
                  size="large"
                  prefix={<SearchOutlined className="text-gray-400" />}
                  className="rounded-full border-gray-200 hover:border-pink-300 focus:border-pink-500 shadow-sm w-full"
                  style={{
                    borderRadius: "9999px",
                  }}
                />
                {searchValue && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute left-2 top-1/2 -translate-y-1/2"
                  >
                    <Button
                      type="primary"
                      size="small"
                      icon={<SearchOutlined />}
                      onClick={() => handleSearch(searchValue)}
                      className="bg-gradient-to-r from-pink-500 to-purple-600 border-0 rounded-full shadow-md"
                    />
                  </motion.div>
                )}
              </div>
            </motion.div>

            {/* User Actions - Left Side (RTL End) */}
            <motion.div
              className="flex items-center gap-1 sm:gap-2 flex-shrink-0 w-auto"
              initial={hasAnimated ? false : { opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {/* Notifications - Hidden on small screens, shown in mobile menu */}
              <motion.div className="hidden sm:block" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Badge
                  count={2}
                  size="small"
                  className="custom-badge"
                  style={{ backgroundColor: "#ec4899" }}
                >
                  <Button
                    type="text"
                    icon={<BellOutlined />}
                    className="text-gray-600 hover:text-pink-600 w-11 h-11 rounded-full hover:bg-pink-50 transition-all"
                  />
                </Badge>
              </motion.div>

              {/* Wishlist - Hidden on small screens, shown in mobile menu */}
              <motion.div className="hidden sm:block" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Badge
                  count={wishlistCount}
                  size="small"
                  className="custom-badge"
                  style={{ backgroundColor: "#ec4899" }}
                >
                  <Link href="/wishlist">
                    <Button
                      type="text"
                      icon={<HeartOutlined />}
                      className="text-gray-600 hover:text-pink-600 w-11 h-11 rounded-full hover:bg-pink-50 transition-all"
                    />
                  </Link>
                </Badge>
              </motion.div>

              {/* Shopping Cart */}
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Badge
                  count={cartItemsCount}
                  size="small"
                  className="custom-badge"
                  style={{ backgroundColor: "#ec4899" }}
                >
                  <Link href="/cart">
                    <Button
                      type="text"
                      icon={<ShoppingCartOutlined />}
                      className="text-gray-600 hover:text-pink-600 w-11 h-11 rounded-full hover:bg-pink-50 transition-all"
                    />
                  </Link>
                </Badge>
              </motion.div>

              {/* User Menu */}
              <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    type="text"
                    className="flex items-center gap-2 px-2 lg:px-3 h-11 rounded-full hover:bg-pink-50 transition-all border border-gray-200 hover:border-pink-300 flex-shrink-0"
                  >
                    <Avatar
                      size="small"
                      icon={<UserOutlined />}
                      className="bg-gradient-to-br from-pink-500 to-purple-600 border-2 border-white shadow-md"
                    />
                    <span className="hidden lg:inline text-gray-700 font-medium text-sm">
                      حساب کاربری
                    </span>
                    <DownOutlined className="text-xs text-gray-500 hidden lg:inline" />
                  </Button>
                </motion.div>
              </Dropdown>

              {/* Mobile Menu Button - Hidden on desktop (lg and above) */}
              <div className="lg:hidden">
              <Button
                type="text"
                icon={<MenuOutlined />}
                onClick={() => {
                  // Prevent opening on desktop
                  if (window.innerWidth < 1024) {
                    setMobileMenuOpen(true);
                  }
                }}
                className="flex text-gray-600 w-11 h-11 rounded-full hover:bg-pink-50 flex-shrink-0"
              />
              </div>
            </motion.div>
          </div>
        </div>
      </AntHeader>

      {/* Mobile Menu Drawer */}
      <Drawer
        title={
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-pink-500 via-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg shadow-pink-200/50">
              <Text className="text-white font-bold text-lg">ش</Text>
            </div>
            <div>
              <Text className="text-lg font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                شیک‌پوشان
              </Text>
              <div className="text-xs text-gray-500">فروشگاه لباس زنانه</div>
            </div>
          </div>
        }
        placement="right"
        onClose={() => setMobileMenuOpen(false)}
        open={mobileMenuOpen && !isDesktop}
        closable={false}
        mask={!isDesktop}
        maskClosable={!isDesktop}
        extra={
          <Button
            type="text"
            icon={<CloseOutlined />}
            onClick={() => setMobileMenuOpen(false)}
            className="text-gray-600 hover:text-pink-600 hover:bg-pink-50 rounded-full"
          />
        }
        className="mobile-menu-drawer"
        width={320}
      >
        {/* Mobile Search */}
        <div className="mb-6">
          <Input
            placeholder="جستجو در محصولات..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onPressEnter={(e) => handleSearch((e.target as HTMLInputElement).value)}
            size="large"
            prefix={<SearchOutlined className="text-gray-400" />}
            suffix={
              searchValue && (
                <Button
                  type="primary"
                  size="small"
                  icon={<SearchOutlined />}
                  onClick={() => handleSearch(searchValue)}
                  className="bg-gradient-to-r from-pink-500 to-purple-600 border-0"
                />
              )
            }
            className="rounded-xl"
          />
        </div>

        <Divider />

        {/* Mobile Navigation Links */}
        <div className="flex flex-col gap-2">
          {navLinks.map((link, index) => (
            <motion.div
              key={link.href}
              initial={hasAnimated ? false : { opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Link
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:text-pink-600 hover:bg-pink-50 rounded-xl transition-all font-medium"
              >
                <span className="text-lg">{link.icon}</span>
                {link.label}
              </Link>
            </motion.div>
          ))}

          <Dropdown
            menu={{ items: categoryMenuItems }}
            placement="topRight"
            trigger={["click"]}
          >
            <Button
              type="text"
              className="flex items-center justify-between w-full px-4 py-3 text-gray-700 hover:text-pink-600 hover:bg-pink-50 rounded-xl transition-all font-medium text-right"
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

        {/* Mobile User Actions */}
        <div className="flex flex-col gap-2">
          <Link
            href="/wishlist"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between px-4 py-3 text-gray-700 hover:text-pink-600 hover:bg-pink-50 rounded-xl transition-all"
          >
            <span className="flex items-center gap-3">
              <HeartOutlined className="text-lg" />
              <span className="font-medium">علاقه‌مندی‌ها</span>
            </span>
            <Badge count={wishlistCount} size="small" />
          </Link>

          <Link
            href="/cart"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between px-4 py-3 text-gray-700 hover:text-pink-600 hover:bg-pink-50 rounded-xl transition-all"
          >
            <span className="flex items-center gap-3">
              <ShoppingCartOutlined className="text-lg" />
              <span className="font-medium">سبد خرید</span>
            </span>
            <Badge count={cartItemsCount} size="small" />
          </Link>

          <Link
            href="/notification"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between px-4 py-3 text-gray-700 hover:text-pink-600 hover:bg-pink-50 rounded-xl transition-all"
          >
            <span className="flex items-center gap-3">
              <BellOutlined className="text-lg" />
              <span className="font-medium">اعلان‌ها</span>
            </span>
            <Badge count={2} size="small" />
          </Link>
        </div>
      </Drawer>

      <style jsx global>{`
        .custom-dropdown .ant-dropdown-menu {
          border-radius: 16px;
          box-shadow: 0 10px 40px rgba(236, 72, 153, 0.15);
          padding: 8px;
          border: 1px solid rgba(236, 72, 153, 0.1);
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
        }
        .custom-dropdown .ant-dropdown-menu-item {
          border-radius: 8px;
          margin: 4px 0;
          transition: all 0.2s ease;
        }
        .custom-dropdown .ant-dropdown-menu-item:hover {
          background: linear-gradient(90deg, rgba(236, 72, 153, 0.1), rgba(139, 92, 246, 0.1)) !important;
          transform: translateX(-4px);
        }
        .mobile-menu-drawer .ant-drawer-header {
          border-bottom: 1px solid rgba(236, 72, 153, 0.1);
          padding: 20px 24px;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.9));
        }
        .mobile-menu-drawer .ant-drawer-body {
          padding: 24px;
        }
        .custom-badge .ant-badge-count {
          font-size: 10px;
          min-width: 18px;
          height: 18px;
          line-height: 18px;
          border-radius: 9px;
          box-shadow: 0 2px 8px rgba(236, 72, 153, 0.3);
          background: linear-gradient(135deg, #ec4899, #8b5cf6) !important;
        }
        /* Fix header layout issues */
        .ant-layout-header {
          display: flex !important;
          align-items: center !important;
          padding: 0 !important;
          line-height: normal !important;
        }
        /* Ensure proper spacing in RTL */
        @media (max-width: 1280px) {
          .ant-layout-header .hidden.xl\\:flex {
            display: none !important;
          }
        }
        @media (max-width: 1024px) {
          .ant-layout-header .hidden.lg\\:flex {
            display: none !important;
          }
        }
        /* Prevent text overflow */
        .ant-layout-header * {
          max-width: 100%;
        }
        /* Enhanced navigation link hover effect */
        .ant-layout-header nav a {
          position: relative;
        }
        /* Dropdown menu items with gradient hover */
        .ant-dropdown-menu-item:hover {
          background: linear-gradient(90deg, rgba(236, 72, 153, 0.1), rgba(139, 92, 246, 0.1)) !important;
        }
      `}</style>
    </>
  );
};

export default React.memo(Header);
