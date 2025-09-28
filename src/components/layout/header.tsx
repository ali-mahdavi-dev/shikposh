"use client";
import React, { useState } from "react";
import {
  Layout,
  Input,
  Button,
  Badge,
  Dropdown,
  Avatar,
  Space,
  Typography,
} from "antd";
import {
  SearchOutlined,
  ShoppingCartOutlined,
  HeartOutlined,
  UserOutlined,
  MenuOutlined,
  BellOutlined,
  DownOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { motion } from "framer-motion";

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

  const userMenuItems = [
    {
      key: "profile",
      label: (
        <Link href={"/profile"} className="flex items-center gap-2">
          <UserOutlined />
          پروفایل کاربری
        </Link>
      ),
    },
    {
      key: "orders",
      label: (
        <Link href={"/orders"} className="flex items-center gap-2">
          <ShoppingCartOutlined />
          سفارش‌های من
        </Link>
      ),
    },
    {
      key: "wishlist",
      label: (
        <Link href={"/wishlist"} className="flex items-center gap-2">
          <HeartOutlined />
          علاقه‌مندی‌ها
        </Link>
      ),
    },
    {
      type: "divider" as const,
    },
    {
      key: "logout",
      label: "خروج از حساب",
      danger: true,
    },
  ];

  const categoryMenuItems = [
    {
      key: "dresses",
      label: <Link href={"/category/dresses"}>پیراهن و لباس مجلسی</Link>,
    },
    {
      key: "tops",
      label: <Link href={"/category/tops"}>بلوز و تاپ</Link>,
    },
    {
      key: "skirts",
      label: <Link href={"/category/skirts"}>دامن</Link>,
    },
    {
      key: "pants",
      label: <Link href={"/category/pants"}>شلوار</Link>,
    },
    {
      key: "accessories",
      label: <Link href={"/category/accessories"}>اکسسوری</Link>,
    },
  ];

  const handleSearch = (value: string) => {
    console.log("Search:", value);
    // In a real application, this would trigger a search
  };

  return (
    <AntHeader className="!bg-white !shadow-lg !border-b !border-gray-100 !px-4 !lg:px-8 !sticky !top-0 !z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-16">
        {/* Logo and Brand */}
        <motion.div
          className="flex items-center gap-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Text className="text-white font-bold text-lg">ش</Text>
            </div>
            <div className="hidden md:block">
              <Text className="text-xl font-bold text-gray-800">شیک‌پوشان</Text>
              <div className="text-xs text-gray-500">فروشگاه لباس زنانه</div>
            </div>
          </Link>
        </motion.div>

        {/* Navigation Menu - Desktop */}
        <motion.div
          className="hidden lg:flex items-center gap-8"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <Link
            href={"/"}
            className="text-gray-700 hover:text-pink-600 transition-colors font-medium"
          >
            صفحه اصلی
          </Link>

          <Dropdown menu={{ items: categoryMenuItems }} placement="bottom">
            <Button
              type="text"
              className="text-gray-700 hover:text-pink-600 font-medium"
            >
              دسته‌بندی‌ها <DownOutlined className="text-xs" />
            </Button>
          </Dropdown>

          <Link
            href={"/about"}
            className="text-gray-700 hover:text-pink-600 transition-colors font-medium"
          >
            درباره ما
          </Link>

          <Link
            href={"/contact"}
            className="text-gray-700 hover:text-pink-600 transition-colors font-medium"
          >
            تماس با ما
          </Link>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          className="flex-1 max-w-md mx-4 lg:mx-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Input.Search
            placeholder="جستجو در محصولات..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onSearch={handleSearch}
            size="large"
            className="rounded-xl"
            enterButton={
              <Button
                type="primary"
                icon={<SearchOutlined />}
                className="bg-gradient-to-r from-pink-500 to-purple-600 border-0 rounded-l-xl"
              >
                جستجو
              </Button>
            }
          />
        </motion.div>

        {/* User Actions */}
        <motion.div
          className="flex items-center gap-3"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          {/* Notifications */}
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Badge count={2} size="small">
              <Button
                type="text"
                icon={<BellOutlined />}
                className="text-gray-600 hover:text-pink-600 w-10 h-10 rounded-xl"
              />
            </Badge>
          </motion.div>

          {/* Wishlist */}
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Badge count={wishlistCount} size="small">
              <Button
                type="text"
                icon={<HeartOutlined />}
                className="text-gray-600 hover:text-pink-600 w-10 h-10 rounded-xl"
              />
            </Badge>
          </motion.div>

          {/* Shopping Cart */}
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Badge count={cartItemsCount} size="small">
              <Button
                type="text"
                icon={<ShoppingCartOutlined />}
                className="text-gray-600 hover:text-pink-600 w-10 h-10 rounded-xl"
              />
            </Badge>
          </motion.div>

          {/* User Menu */}
          <Dropdown menu={{ items: userMenuItems }} placement="bottomLeft">
            <Button
              type="text"
              className="flex items-center gap-2 px-3 h-10 rounded-xl hover:bg-gray-50"
            >
              <Avatar
                size="small"
                icon={<UserOutlined />}
                className="bg-pink-500"
              />
              <span className="hidden md:inline text-gray-700">
                حساب کاربری
              </span>
              <DownOutlined className="text-xs text-gray-500" />
            </Button>
          </Dropdown>

          {/* Mobile Menu */}
          <Button
            type="text"
            icon={<MenuOutlined />}
            className="lg:hidden text-gray-600 w-10 h-10 rounded-xl"
          />
        </motion.div>
      </div>

      {/* Mobile Navigation - Hidden by default, can be toggled */}
      <motion.div
        className="lg:hidden border-t border-gray-100 py-4 hidden"
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
      >
        <div className="flex flex-col gap-3">
          <Link
            href={"/"}
            className="text-gray-700 hover:text-pink-600 transition-colors font-medium px-4 py-2"
          >
            صفحه اصلی
          </Link>
          <Link
            href={"/categories"}
            className="text-gray-700 hover:text-pink-600 transition-colors font-medium px-4 py-2"
          >
            دسته‌بندی‌ها
          </Link>
          <Link
            href={"/about"}
            className="text-gray-700 hover:text-pink-600 transition-colors font-medium px-4 py-2"
          >
            درباره ما
          </Link>
          <Link
            href={"/contact"}
            className="text-gray-700 hover:text-pink-600 transition-colors font-medium px-4 py-2"
          >
            تماس با ما
          </Link>
        </div>
      </motion.div>
    </AntHeader>
  );
};

export default Header;
