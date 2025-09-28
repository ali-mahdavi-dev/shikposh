"use client";

import {
  Card,
  Button,
  Rate,
  Typography,
  Divider,
  Image as AntImage,
  Tabs,
  Breadcrumb,
  Tooltip,
  Tag,
} from "antd";
import { ShoppingCartOutlined, ShareAltOutlined } from "@ant-design/icons";
import { useState } from "react";
import ProductImageLens from "../components/product-image";
import CommentBox from "@/components/comment-box";
import Image from "next/image";

const { Title, Paragraph } = Typography;

export default function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const product = {
    id: params.id,
    name: "Gaming Laptop ASUS ROG",
    rating: 4.5,
    description:
      "لپتاپ گیمینگ ASUS ROG با کارت گرافیک RTX 4070 و پردازنده Intel i9 مناسب برای بازی‌های سنگین.",
    colors: {
      red: {
        images: ["/images/alilaloii.jpg", "/images/girl.png"],
        price: 1299,
        stock: 5,
      },
      black: {
        images: ["/images/girl.png", "/images/alilaloii.jpg"],
        price: 1399,
        discount: 10,
        stock: 3,
      },
      blue: { images: ["/images/alilaloii.jpg"], price: 1350, stock: 0 },
    },
    specs: {
      CPU: "Intel i9",
      GPU: "RTX 4070",
      RAM: "32GB",
      Storage: "1TB SSD",
      Display: "15.6” QHD 240Hz",
      Weight: "2.4kg",
    },
  };

  const colorOptions = Object.keys(product.colors);
  const [selectedColor, setSelectedColor] = useState(colorOptions[0]);
  const [mainImage, setMainImage] = useState(
    product.colors[selectedColor].images[0]
  );
  const [quantity, setQuantity] = useState(1);

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    setMainImage(product.colors[color].images[0]);
    setQuantity(1);
  };

  const currentColor = product.colors[selectedColor];
  const discountPrice = currentColor.discount
    ? Math.round(currentColor.price * (1 - currentColor.discount / 100))
    : currentColor.price;

  const relatedProducts = [
    {
      id: "p1",
      name: "Gaming Mouse",
      price: 59,
      image: "/images/alilaloii.jpg",
    },
    {
      id: "p2",
      name: "Mechanical Keyboard",
      price: 129,
      image: "/images/girl.png",
    },
    {
      id: "p3",
      name: "Gaming Headset",
      price: 89,
      image: "/images/alilaloii.jpg",
    },
  ];

  return (
    <div className="flex justify-center p-8">
      <Card className="w-full max-w-6xl shadow-lg rounded-2xl p-6">
        {/* Breadcrumb بالا */}
        <Breadcrumb className="mb-4">
          <Breadcrumb.Item>خانه</Breadcrumb.Item>
          <Breadcrumb.Item>لپتاپ</Breadcrumb.Item>
          <Breadcrumb.Item>{product.name}</Breadcrumb.Item>
        </Breadcrumb>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* تصویر محصول */}
          <div>
            <div className="flex justify-center mb-4">
              <ProductImageLens
                src={mainImage}
                alt={product.name}
                width={500}
                height={500}
                zoom={2}
              />
            </div>
            {/* گالری */}
            <div className="flex gap-3 justify-center">
              {currentColor.images.map((img, idx) => (
                <AntImage
                  key={idx}
                  width={80}
                  height={80}
                  src={img}
                  alt={`thumb-${idx}`}
                  className={`rounded-lg cursor-pointer border ${
                    mainImage === img ? "border-blue-500" : "border-gray-200"
                  }`}
                  preview={false}
                  onMouseEnter={() => setMainImage(img)}
                />
              ))}
            </div>
          </div>

          {/* جزئیات */}
          <div className="flex flex-col justify-between">
            <div>
              <Title level={3}>
                {product.name}{" "}
                <Tag color="green" className="ml-2">
                  پرفروش 🔥
                </Tag>
              </Title>
              <Rate allowHalf disabled defaultValue={product.rating} />
              <Paragraph className="text-gray-600 mt-2">
                {product.description}
              </Paragraph>

              {/* انتخاب رنگ */}
              <div className="flex gap-3 items-center mt-3">
                <span className="text-gray-700">رنگ:</span>
                {colorOptions.map((color) => (
                  <div key={color} className="relative">
                    <button
                      onClick={() => handleColorChange(color)}
                      className={`w-8 h-8 rounded-full border-2 ${
                        selectedColor === color
                          ? "border-blue-500"
                          : "border-gray-300"
                      }`}
                      style={{ backgroundColor: color }}
                    />
                    {product.colors[color].discount && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold px-1 rounded-full">
                        {product.colors[color].discount}%
                      </span>
                    )}
                  </div>
                ))}
              </div>

              {/* موجودی */}
              <p
                className={`text-sm font-medium mt-2 ${
                  currentColor.stock > 0 ? "text-green-600" : "text-red-500"
                }`}
              >
                {currentColor.stock > 0 ? "موجود در انبار" : "ناموجود"}
              </p>
            </div>

            <Divider />

            {/* قیمت و خرید */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                {currentColor.discount ? (
                  <>
                    <span className="text-gray-400 line-through text-lg">
                      ${currentColor.price}
                    </span>
                    <Tag color="red">{currentColor.discount}% OFF</Tag>
                    <span className="text-2xl font-bold text-red-600">
                      ${discountPrice}
                    </span>
                  </>
                ) : (
                  <span className="text-2xl font-bold text-blue-600">
                    ${currentColor.price}
                  </span>
                )}

                {/* Quantity */}
                <div className="flex items-center gap-2 ml-4">
                  <Button
                    size="small"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  >
                    -
                  </Button>
                  <span>{quantity}</span>
                  <Button
                    size="small"
                    onClick={() => setQuantity((q) => q + 1)}
                  >
                    +
                  </Button>
                </div>
              </div>

              <Button
                type="primary"
                icon={<ShoppingCartOutlined />}
                size="large"
                className="bg-blue-500"
                disabled={currentColor.stock === 0}
              >
                افزودن به سبد
              </Button>
            </div>

            {/* ارسال و گارانتی */}
            <div className="mt-4 text-sm text-gray-700 space-y-1">
              <p>🚚 ارسال رایگان برای خرید بالای 1000$</p>
              <p>🛡️ گارانتی ۲۴ ماهه</p>
              <p>↩️ امکان بازگشت تا ۷ روز</p>
            </div>

            {/* اشتراک‌گذاری */}
            <div className="flex gap-2 mt-4">
              <Tooltip title="اشتراک‌گذاری">
                <Button shape="circle" icon={<ShareAltOutlined />} />
              </Tooltip>
            </div>
          </div>
        </div>

        <Divider />

        {/* Tabs */}
        <Tabs defaultActiveKey="1">
          <Tabs.TabPane tab="مشخصات فنی" key="1">
            <ul className="list-disc ml-5">
              {Object.entries(product.specs).map(([key, value]) => (
                <li key={key}>
                  <strong>{key}:</strong> {value}
                </li>
              ))}
            </ul>
          </Tabs.TabPane>
          <Tabs.TabPane tab="نظرات کاربران" key="2">
            <CommentBox />
          </Tabs.TabPane>
          <Tabs.TabPane tab="سوالات" key="3">
            <p>❓ آیا این لپتاپ برای برنامه‌نویسی مناسبه؟</p>
            <p className="text-gray-600">✅ بله، عالیه برای برنامه‌نویسی.</p>
          </Tabs.TabPane>
        </Tabs>

        <Divider />

        {/* محصولات مشابه */}
        <Title level={5}>محصولات مشابه</Title>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {relatedProducts.map((p) => (
            <Card
              key={p.id}
              className="w-44 flex-shrink-0 hover:shadow-lg transition"
              cover={
                <Image
                  src={p.image}
                  alt={p.name}
                  width={180}
                  height={140}
                  className="rounded-t-lg"
                />
              }
            >
              <p className="text-sm font-semibold">{p.name}</p>
              <p className="text-red-600 font-bold">${p.price}</p>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  );
}
