"use client";
import React, { useState } from "react";
import {
  Card,
  Button,
  Rate,
  Typography,
  Divider,
  Tabs,
  Breadcrumb,
  Tag,
  Tooltip,
  Badge,
} from "antd";
import {
  ShoppingCartOutlined,
  ShareAltOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";
import {
  Product,
  ProductColor,
  RelatedProduct,
  ProductDetailProps,
} from "../types";
import ColorSelector from "../components/color-selector";
import SizeSelector from "../components/size-selector";
import QuantitySelector from "../components/quantity-selector";
import RelatedProducts from "../components/related-products";
import ProductImageGallery from "../components/product-image-gallery";
import CommentBox from "@/components/comment-box";

const { Title, Paragraph, Text } = Typography;

const ProductDetail: React.FC<ProductDetailProps> = ({ productId = "1" }) => {
  const product: Product = {
    id: productId,
    name: "پیراهن مجلسی زنانه",
    brand: "Fashion Elite",
    rating: 4.8,
    reviewCount: 156,
    description:
      "پیراهن مجلسی شیک و زیبا با طراحی مدرن و پارچه با کیفیت بالا. مناسب برای مهمانی‌ها و مراسم خاص.",
    features: [
      "پارچه ساتن با کیفیت بالا",
      "طراحی مدرن و شیک",
      "قابل شستشو در ماشین لباسشویی",
      "مناسب برای تمام فصول",
    ],
    colors: {
      red: {
        name: "قرمز",
        images: ["/images/dress-main.jpg", "/images/dress-alt1.jpg"],
        price: 299000,
        stock: 8,
        discount: 15,
      },
      blue: {
        name: "آبی",
        images: ["/images/dress-alt2.jpeg", "/images/dress-main.jpg"],
        price: 329000,
        stock: 5,
        discount: 0,
      },
      black: {
        name: "مشکی",
        images: ["/images/dress-alt1.jpg", "/images/dress-alt2.jpeg"],
        price: 349000,
        stock: 12,
        discount: 10,
      },
    },
    sizes: ["S", "M", "L", "XL"],
    specs: {
      "جنس پارچه": "ساتن",
      "نوع آستین": "کوتاه",
      طول: "زیر زانو",
      "مناسب برای": "مهمانی و مراسم",
      "راهنمای شستشو": "شستشوی ماشینی در آب سرد",
      "کشور تولید": "ترکیه",
    },
    category: "dresses", // Added category
    tags: ["مجلسی", "جدید"],
  };

  const [selectedColor, setSelectedColor] = useState<string>(
    Object.keys(product.colors)[0]
  );
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[1]);
  const [quantity, setQuantity] = useState<number>(1);
  const [isWishlisted, setIsWishlisted] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("1");

  const currentColor: ProductColor = product.colors[selectedColor];
  const discountPrice: number = currentColor.discount
    ? Math.round(currentColor.price * (1 - currentColor.discount / 100))
    : currentColor.price;

  const relatedProducts: RelatedProduct[] = [
    {
      id: "p1",
      name: "کیف دستی زنانه",
      price: 189000,
      image: "/images/handbag.jpg",
      rating: 4.5,
    },
    {
      id: "p2",
      name: "کفش پاشنه بلند",
      price: 259000,
      image: "/images/shoes.jpg",
      rating: 4.7,
    },
    {
      id: "p3",
      name: "ست جواهرات",
      price: 149000,
      image: "/images/jewelry.jpg",
      rating: 4.6,
    },
  ];

  const handleAddToCart = () => {
    // Add to cart logic here
    console.log("Added to cart:", {
      productId: product.id,
      color: selectedColor,
      size: selectedSize,
      quantity,
    });
  };

  const handleWishlistToggle = () => {
    setIsWishlisted(!isWishlisted);
  };

  const tabItems = [
    {
      key: "1",
      label: "مشخصات فنی",
      children: (
        <div className="space-y-3">
          {Object.entries(product.specs).map(([key, value]) => (
            <div
              key={key}
              className="flex justify-between py-2 border-b border-gray-100"
            >
              <Text strong className="text-gray-700">
                {key}:
              </Text>
              <Text className="text-gray-600">{value}</Text>
            </div>
          ))}
        </div>
      ),
    },
    {
      key: "2",
      label: `نظرات کاربران (${product.reviewCount})`,
      children: <CommentBox />,
    },
    {
      key: "3",
      label: "راهنمای سایز",
      children: (
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">راهنمای انتخاب سایز:</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <strong>S:</strong> 36-38
              </div>
              <div>
                <strong>M:</strong> 38-40
              </div>
              <div>
                <strong>L:</strong> 40-42
              </div>
              <div>
                <strong>XL:</strong> 42-44
              </div>
            </div>
          </div>
          <p className="text-gray-600 text-sm">
            💡 توصیه می‌شود قبل از خرید، جدول سایز را با دقت مطالعه کنید.
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <Breadcrumb className="text-sm">
              <Breadcrumb.Item>خانه</Breadcrumb.Item>
              <Breadcrumb.Item>لباس زنانه</Breadcrumb.Item>
              <Breadcrumb.Item>پیراهن مجلسی</Breadcrumb.Item>
              <Breadcrumb.Item>{product.name}</Breadcrumb.Item>
            </Breadcrumb>
          </motion.div>

          {/* Main Product Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="shadow-2xl rounded-3xl overflow-hidden bg-white/80 backdrop-blur-sm">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
                {/* Product Images */}
                <div className="space-y-4">
                  <ProductImageGallery
                    images={currentColor.images}
                    productName={product.name}
                  />
                </div>

                {/* Product Details */}
                <div className="space-y-6">
                  {/* Header */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Text className="text-gray-500 text-sm">
                        {product.brand}
                      </Text>
                      <Tag color="pink" className="text-xs">
                        برند معتبر
                      </Tag>
                    </div>
                    <Title level={2} className="mb-3 text-gray-800">
                      {product.name}
                      {currentColor.discount && currentColor.discount > 0 && (
                        <Badge.Ribbon
                          text={`${currentColor.discount}% تخفیف`}
                          color="red"
                        >
                          <div></div>
                        </Badge.Ribbon>
                      )}
                    </Title>

                    <div className="flex items-center gap-3 mb-4">
                      <Rate
                        allowHalf
                        disabled
                        value={product.rating}
                        className="text-sm"
                      />
                      <Text className="text-gray-500">
                        ({product.reviewCount} نظر)
                      </Text>
                    </div>
                  </div>

                  {/* Description */}
                  <Paragraph className="text-gray-600 leading-relaxed">
                    {product.description}
                  </Paragraph>

                  {/* Features */}
                  <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-4 rounded-xl">
                    <h4 className="font-semibold mb-3 text-gray-800">
                      ویژگی‌های محصول:
                    </h4>
                    <ul className="space-y-2">
                      {product.features.map((feature, index) => (
                        <li
                          key={index}
                          className="flex items-center gap-2 text-sm text-gray-600"
                        >
                          <span className="w-1.5 h-1.5 bg-pink-400 rounded-full"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Color Selection */}
                  <ColorSelector
                    colors={product.colors}
                    selectedColor={selectedColor}
                    onColorChange={setSelectedColor}
                  />

                  {/* Size Selection */}
                  <SizeSelector
                    sizes={product.sizes}
                    selectedSize={selectedSize}
                    onSizeChange={setSelectedSize}
                  />

                  {/* Stock Status */}
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        currentColor.stock > 0 ? "bg-green-500" : "bg-red-500"
                      }`}
                    ></div>
                    <Text
                      className={
                        currentColor.stock > 0
                          ? "text-green-600"
                          : "text-red-500"
                      }
                    >
                      {currentColor.stock > 0
                        ? `موجود در انبار (${currentColor.stock} عدد)`
                        : "ناموجود"}
                    </Text>
                  </div>

                  {/* Price and Actions */}
                  <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        {currentColor.discount && currentColor.discount > 0 ? (
                          <>
                            <Text delete className="text-gray-400 text-lg">
                              {currentColor.price.toLocaleString()} تومان
                            </Text>
                            <Text className="text-2xl font-bold text-red-600">
                              {discountPrice.toLocaleString()} تومان
                            </Text>
                          </>
                        ) : (
                          <Text className="text-2xl font-bold text-pink-600">
                            {currentColor.price.toLocaleString()} تومان
                          </Text>
                        )}
                      </div>

                      <QuantitySelector
                        quantity={quantity}
                        onQuantityChange={setQuantity}
                        max={currentColor.stock}
                      />
                    </div>

                    <div className="flex gap-3">
                      <Button
                        type="primary"
                        size="large"
                        icon={<ShoppingCartOutlined />}
                        onClick={handleAddToCart}
                        disabled={currentColor.stock === 0}
                        className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 border-0 h-12 text-white font-semibold rounded-xl hover:from-pink-600 hover:to-purple-700 transition-all duration-300"
                      >
                        افزودن به سبد خرید
                      </Button>

                      <Tooltip
                        title={
                          isWishlisted
                            ? "حذف از علاقه‌مندی‌ها"
                            : "افزودن به علاقه‌مندی‌ها"
                        }
                      >
                        <Button
                          size="large"
                          icon={<HeartOutlined />}
                          onClick={handleWishlistToggle}
                          className={`h-12 w-12 rounded-xl border-2 transition-all duration-300 ${
                            isWishlisted
                              ? "bg-red-50 border-red-300 text-red-500 hover:bg-red-100"
                              : "border-gray-300 hover:border-pink-300 hover:text-pink-500"
                          }`}
                        />
                      </Tooltip>

                      <Tooltip title="اشتراک‌گذاری">
                        <Button
                          size="large"
                          icon={<ShareAltOutlined />}
                          className="h-12 w-12 rounded-xl border-2 border-gray-300 hover:border-purple-300 hover:text-purple-500 transition-all duration-300"
                        />
                      </Tooltip>
                    </div>
                  </div>

                  {/* Shipping Info */}
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-xl">
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="text-green-600">🚚</span>
                        <Text>ارسال رایگان برای خرید بالای 500,000 تومان</Text>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-blue-600">🛡️</span>
                        <Text>گارانتی اصالت و کیفیت محصول</Text>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-purple-600">↩️</span>
                        <Text>امکان بازگشت تا 7 روز</Text>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Divider className="my-8" />

              {/* Tabs Section */}
              <div className="px-6 pb-6">
                <Tabs
                  activeKey={activeTab}
                  onChange={setActiveTab}
                  items={tabItems}
                  className="custom-tabs"
                />
              </div>

              <Divider className="my-8" />

              {/* Related Products */}
              <div className="px-6 pb-6">
                <RelatedProducts products={relatedProducts} />
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
