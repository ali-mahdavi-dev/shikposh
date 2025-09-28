// app/products/[id]/page.tsx
"use client";

import {
  Card,
  Button,
  Rate,
  Typography,
  Divider,
  Image as AntImage,
} from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import Image from "next/image";
import { useState } from "react";
import CommentBox from "@/components/comment-box";
import ProductImageLens from "../components/product-image";

const { Title, Paragraph } = Typography;

export default function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  // داده نمونه
  const product = {
    id: params.id,
    name: "Gaming Laptop ASUS ROG",
    price: 1299,
    rating: 4.5,
    description:
      "لپتاپ گیمینگ ASUS ROG با کارت گرافیک RTX 4070 و پردازنده Intel i9 مناسب برای بازی‌های سنگین.",
    images: ["/images/alilaloii.jpg", "/images/girl.png"],
  };

  const [mainImage, setMainImage] = useState(product.images[0]);

  return (
    <div className="flex justify-center items-center p-8">
      <Card
        className="w-full max-w-5xl shadow-lg rounded-2xl p-4"
        bodyStyle={{ padding: "1.5rem" }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* بخش تصویر */}
          <div>
            <div className="flex justify-center mb-4 ">
                <ProductImageLens
                  src={mainImage}
                  alt={product.name}
                  width={500}
                  height={500}
                  zoom={2}
                  className="transition-transform duration-300 ease-in-out object-cover"
                />
            </div>

            {/* گالری تصاویر */}
            <div className="flex gap-3 justify-center">
              {product.images.map((img, idx) => (
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
                  onClick={() => setMainImage(img)}
                />
              ))}
            </div>
          </div>

          {/* جزئیات */}
          <div className="flex flex-col justify-between">
            <div>
              <Title level={3}>{product.name}</Title>
              <Rate
                allowHalf
                disabled
                defaultValue={product.rating}
                className="mb-2"
              />
              <Paragraph className="text-gray-600">
                {product.description}
              </Paragraph>
            </div>

            <Divider />

            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold text-blue-600">
                ${product.price}
              </span>
              <Button
                type="primary"
                icon={<ShoppingCartOutlined />}
                size="large"
                className="bg-blue-500"
              >
                افزودن به سبد
              </Button>
            </div>
          </div>
        </div>

        {/* بخش کامنت‌ها */}
        <Divider />
        <Title level={4}>نظرات کاربران</Title>
        <CommentBox />
      </Card>
    </div>
  );
}
