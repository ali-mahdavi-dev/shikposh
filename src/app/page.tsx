"use client";
import React, { useState } from "react";
import {
  Typography,
  Row,
  Col,
  Card,
  Button,
  Carousel,
  Tag,
  Rate,
  Badge,
} from "antd";
import {
  ShoppingCartOutlined,
  EyeOutlined,
  HeartOutlined,
  FireOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";
import Link from "next/link";
import { Category, Product } from "@/types";
import Image from "next/image";

const { Title, Text, Paragraph } = Typography;

const Page: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Hero carousel data
  const heroSlides = [
    {
      id: 1,
      title: "کلکسیون بهاری جدید",
      subtitle: "تا ۵۰٪ تخفیف روی محصولات منتخب",
      image: "/images/daman.jpeg",
      buttonText: "مشاهده کلکسیون",
      link: "/category/spring-collection",
    },
    {
      id: 2,
      title: "لباس‌های مجلسی شیک",
      subtitle: "برای مهمانی‌های خاص شما",
      image: "/images/carousel-homepage-one.jpg",
      buttonText: "خرید کنید",
      link: "/category/formal",
    },
    {
      id: 3,
      title: "ارسال رایگان",
      subtitle: "برای خریدهای بالای ۵۰۰ هزار تومان",
      image: "/images/Women-Formal.avif",
      buttonText: "شروع خرید",
      link: "/products",
    },
  ];

  // Categories data
  const categories: Category[] = [
    { id: "all", name: "همه", count: 125, color: "#e91e63" },
    { id: "dresses", name: "پیراهن و لباس مجلسی", count: 45, color: "#f44336" },
    { id: "tops", name: "بلوز و تاپ", count: 30, color: "#ff9800" },
    { id: "skirts", name: "دامن", count: 20, color: "#4caf50" },
    { id: "pants", name: "شلوار", count: 15, color: "#2196f3" },
    { id: "accessories", name: "اکسسوری", count: 15, color: "#9c27b0" },
  ];

  // Featured products
  const featuredProducts: Product[] = [
    {
      id: "featured1",
      name: "پیراهن مجلسی ساتن قرمز",
      price: 299000,
      originalPrice: 350000,
      discount: 15,
      rating: 4.8,
      reviewCount: 156,
      image: "/images/carousel-homepage-one.jpg",
      category: "dresses",
      isNew: false,
      isFeatured: true,
      colors: {
        red: { name: "قرمز", stock: 5, discount: 15 },
        black: { name: "مشکی", stock: 3, discount: 0 },
      },
      sizes: ["S", "M", "L", "XL"],
      brand: "Fashion Elite",
      description: "پیراهن مجلسی شیک و زیبا",
    },
    {
      id: "featured2",
      name: "بلوز حریر طرح‌دار",
      price: 180000,
      originalPrice: 220000,
      discount: 18,
      rating: 4.6,
      reviewCount: 89,
      image: "/images/harir.jpeg",
      category: "tops",
      isNew: true,
      isFeatured: true,
      colors: {
        blue: { name: "آبی", stock: 8, discount: 18 },
        white: { name: "سفید", stock: 5, discount: 18 },
      },
      sizes: ["S", "M", "L"],
      brand: "Silk Touch",
      description: "بلوز حریر با طرح زیبا",
    },
    {
      id: "featured3",
      name: "دامن پلیسه بلند",
      price: 120000,
      originalPrice: 150000,
      discount: 20,
      rating: 4.7,
      reviewCount: 67,
      image: "/images/daman.jpeg",
      category: "skirts",
      isNew: false,
      isFeatured: true,
      colors: {
        black: { name: "مشکی", stock: 6, discount: 20 },
        navy: { name: "سرمه‌ای", stock: 4, discount: 20 },
      },
      sizes: ["S", "M", "L", "XL"],
      brand: "Elegant Style",
      description: "دامن پلیسه شیک و راحت",
    },
    {
      id: "featured4",
      name: "شلوار کتان جذب",
      price: 85000,
      originalPrice: 110000,
      discount: 23,
      rating: 4.5,
      reviewCount: 43,
      image: "/images/shalva-katan.jpeg",
      category: "pants",
      isNew: true,
      isFeatured: true,
      colors: {
        beige: { name: "بژ", stock: 7, discount: 23 },
        white: { name: "سفید", stock: 5, discount: 23 },
      },
      sizes: ["S", "M", "L", "XL"],
      brand: "Comfort Wear",
      description: "شلوار کتان راحت و شیک",
    },
  ];

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  return (
    <div className="min-h-screen ">
      {/* Hero Section */}
      <section className="relative">
        <Carousel
          autoplay
          autoplaySpeed={3000}
          // effect="fade"
          className="h-96 md:h-[500px]"
        >
          {heroSlides.map((slide, index) => (
            <div key={slide.id} className="!h-96 md:!h-[500px] relative">
              <div className="relative h-96 md:h-[500px] w-full">
                {/* تصویر پس‌زمینه */}
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  priority={index === 0} // اسلاید اول رو فورس کن سریع لود شه
                  className="object-cover"
                  draggable={false}
                />

                {/* لایه گرادینت */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40" />

                {/* متن و دکمه */}
                <div className="relative flex items-center justify-center h-full">
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.2 }}
                    className="text-center text-white px-6 max-w-3xl"
                  >
                    <Title
                      level={1}
                      className="!text-white mb-4 text-3xl md:text-5xl font-extrabold leading-tight"
                    >
                      {slide.title}
                    </Title>

                    <Paragraph className="!text-white text-base md:text-lg mb-6 opacity-90">
                      {slide.subtitle}
                    </Paragraph>

                    {slide.link && (
                      <Link href={slide.link}>
                        <Button
                          type="primary"
                          size="large"
                          className="!bg-white !text-white-600 !border-0 rounded-2xl px-8 py-3 h-auto font-semibold shadow-md hover:!bg-gray-100"
                        >
                          {slide.buttonText}
                        </Button>
                      </Link>
                    )}
                  </motion.div>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Categories Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-16"
        >
          <div className="text-center mb-8">
            <Title level={2} className="text-gray-800 mb-4">
              دسته‌بندی محصولات
            </Title>
            <Text className="text-gray-600 text-lg">
              محصولات خود را بر اساس دسته‌بندی مورد نظر انتخاب کنید
            </Text>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  type={
                    selectedCategory === category.id ? "primary" : "default"
                  }
                  size="large"
                  onClick={() => handleCategoryChange(category.id)}
                  className={`rounded-xl px-6 py-3 h-auto font-semibold transition-all duration-300 ${
                    selectedCategory === category.id
                      ? "bg-pink-500 border-pink-500 text-white shadow-lg"
                      : "bg-white border-gray-300 text-gray-700 hover:border-pink-300 hover:text-pink-500"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {category.name}
                    <Badge
                      count={category.count}
                      style={{
                        backgroundColor:
                          selectedCategory === category.id
                            ? "rgba(255,255,255,0.2)"
                            : category.color,
                        fontSize: "10px",
                      }}
                    />
                  </span>
                </Button>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Featured Products Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.1 }}
          className="mb-16"
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <Title
                level={2}
                className="text-gray-800 mb-2 flex items-center gap-2"
              >
                <FireOutlined className="text-orange-500" />
                محصولات ویژه
              </Title>
              <Text className="text-gray-600">
                بهترین و محبوب‌ترین محصولات ما
              </Text>
            </div>
            <Link href="/products">
              <Button type="link" className="text-pink-600 font-semibold">
                مشاهده همه →
              </Button>
            </Link>
          </div>

          <Row gutter={[24, 24]}>
            {featuredProducts.map((product, index) => (
              <Col xs={24} sm={12} lg={6} key={product.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <Card
                    className="h-full shadow-lg hover:shadow-2xl transition-all duration-300 rounded-2xl overflow-hidden border-0"
                    style={{ padding: 0 }}
                  >
                    <Link href={`/products/${product.id}`} className="block">
                      <div className="relative">
                        {product.image && (
                          <Image
                            src={product.image}
                            alt={product.name}
                            width={200}
                            height={200}
                            className="w-full h-64 object-cover"
                          />
                        )}

                        {/* Badges */}
                        <div className="absolute top-3 left-3 flex flex-col gap-2">
                          {product.isNew && (
                            <Tag
                              color="green"
                              className="rounded-full px-3 py-1 text-xs font-semibold"
                            >
                              جدید
                            </Tag>
                          )}
                          {product.discount && product.discount > 0 && (
                            <Tag
                              color="red"
                              className="rounded-full px-3 py-1 text-xs font-semibold"
                            >
                              {product.discount}% تخفیف
                            </Tag>
                          )}
                        </div>

                        {/* Action Buttons */}
                        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Button
                              type="primary"
                              shape="circle"
                              icon={<HeartOutlined />}
                              className="bg-white/80 text-pink-500 border-0 shadow-md hover:bg-white"
                            />
                          </motion.div>
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Link href={`/product/${product.id}`}>
                              <Button
                                type="primary"
                                shape="circle"
                                icon={<EyeOutlined />}
                                className="bg-white/80 text-blue-500 border-0 shadow-md hover:bg-white"
                              />
                            </Link>
                          </motion.div>
                        </div>
                      </div>

                      <div className="p-4 space-y-3">
                        <Text className="text-gray-800 font-semibold text-base hover:text-pink-600 transition-colors line-clamp-2">
                          {product.name}
                        </Text>

                        <div className="flex items-center gap-2">
                          <Rate
                            disabled
                            value={product.rating}
                            className="text-xs"
                          />
                          <Text className="text-gray-500 text-xs">
                            ({product.reviewCount})
                          </Text>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex flex-col">
                            {product.originalPrice &&
                              product.price &&
                              product.originalPrice > product.price && (
                                <Text delete className="text-gray-400 text-sm">
                                  {product.originalPrice.toLocaleString()} تومان
                                </Text>
                              )}
                            {product.price && (
                              <Text className="text-pink-600 font-bold text-lg">
                                {product.price.toLocaleString()} تومان
                              </Text>
                            )}
                          </div>

                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Button
                              type="primary"
                              icon={<ShoppingCartOutlined />}
                              className="bg-gradient-to-r from-pink-500 to-purple-600 border-0 rounded-lg"
                            >
                              خرید
                            </Button>
                          </motion.div>
                        </div>
                      </div>
                    </Link>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </motion.section>

        {/* Why Choose Us Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="mb-16"
        >
          <div className="text-center mb-8">
            <Title level={2} className="text-gray-800 mb-4">
              چرا شیک‌پوشان؟
            </Title>
            <Text className="text-gray-600 text-lg">
              مزایای خرید از فروشگاه ما
            </Text>
          </div>

          <Row gutter={[24, 24]}>
            {[
              {
                icon: "🚚",
                title: "ارسال سریع",
                description: "ارسال رایگان برای خریدهای بالای ۵۰۰ هزار تومان",
              },
              {
                icon: "🛡️",
                title: "ضمانت کیفیت",
                description: "تضمین اصالت و کیفیت تمامی محصولات",
              },
              {
                icon: "↩️",
                title: "بازگشت آسان",
                description: "امکان بازگشت کالا تا ۷ روز پس از خرید",
              },
              {
                icon: "📞",
                title: "پشتیبانی ۲۴/۷",
                description: "پاسخگویی در تمام ساعات شبانه‌روز",
              },
            ].map((feature, index) => (
              <Col xs={24} sm={12} lg={6} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="text-center h-full shadow-md hover:shadow-lg transition-all duration-300 rounded-2xl border-0">
                    <div className="text-4xl mb-4">{feature.icon}</div>
                    <Title level={4} className="text-gray-800 mb-3">
                      {feature.title}
                    </Title>
                    <Text className="text-gray-600">{feature.description}</Text>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </motion.section>

        {/* Newsletter Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.6 }}
          className="mb-16"
        >
          <Card className="bg-gradient-to-r from-pink-500 to-purple-600 border-0 rounded-2xl text-white text-center">
            <div className="py-8">
              <Title level={2} className="text-white mb-4">
                عضویت در خبرنامه
              </Title>
              <Paragraph className="text-white/90 text-lg mb-6">
                از جدیدترین محصولات و تخفیف‌های ویژه با خبر شوید
              </Paragraph>
              <div className="max-w-md mx-auto flex gap-3">
                <input
                  type="email"
                  placeholder="ایمیل خود را وارد کنید"
                  className="flex-1 px-4 py-3 rounded-xl border-0 text-gray-800"
                />
                <Button
                  type="primary"
                  size="large"
                  className="bg-white text-pink-600 border-0 rounded-xl px-6 font-semibold hover:bg-gray-100"
                >
                  عضویت
                </Button>
              </div>
            </div>
          </Card>
        </motion.section>
      </div>
    </div>
  );
};

export default Page;
