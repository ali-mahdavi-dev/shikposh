import React, { useState } from "react";
import {
  Card,
  Rate,
  Typography,
  Button,
  Avatar,
  Divider,
  Input,
  Form,
} from "antd";
import { UserOutlined, LikeOutlined, DislikeOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import { CommentBoxProps, Review, ReviewFormData } from "@/types";

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

const CommentBox: React.FC<CommentBoxProps> = ({ productId }) => {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [form] = Form.useForm();

  const reviews: Review[] = [
    {
      id: 1,
      user: "مریم احمدی",
      rating: 5,
      date: "1403/01/15",
      comment:
        "پیراهن فوق‌العاده زیبا و با کیفیتی بود. جنس پارچه عالی و دوخت بسیار تمیز. قطعاً دوباره از این فروشگاه خرید خواهم کرد.",
      helpful: 12,
      notHelpful: 1,
      verified: true,
    },
    {
      id: 2,
      user: "سارا کریمی",
      rating: 4,
      date: "1403/01/10",
      comment:
        "محصول خوبی است اما رنگ کمی متفاوت از تصویر بود. در کل راضی هستم.",
      helpful: 8,
      notHelpful: 2,
      verified: true,
    },
    {
      id: 3,
      user: "فاطمه رضایی",
      rating: 5,
      date: "1403/01/05",
      comment:
        "عالی بود! سایز دقیقاً مطابق جدول بود و کیفیت پارچه بسیار خوب. پیشنهاد می‌کنم.",
      helpful: 15,
      notHelpful: 0,
      verified: true,
    },
  ];

  const handleSubmitReview = (values: ReviewFormData) => {
    console.log("New review:", values);
    form.resetFields();
    setShowReviewForm(false);
  };

  const handleHelpful = (reviewId: number, type: string) => {
    console.log(`Mark review ${reviewId} as ${type}`);
  };

  return (
    <div className="space-y-6">
      {/* Review Summary */}
      <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-6 rounded-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-pink-600 mb-2">4.8</div>
            <Rate disabled value={4.8} allowHalf className="mb-2" />
            <Text className="text-gray-600">از 156 نظر</Text>
          </div>

          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((star) => (
              <div key={star} className="flex items-center gap-3">
                <Text className="w-8">{star} ⭐</Text>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-pink-500 h-2 rounded-full"
                    style={{
                      width: `${star === 5 ? 75 : star === 4 ? 20 : 5}%`,
                    }}
                  />
                </div>
                <Text className="text-sm text-gray-500 w-8">
                  {star === 5 ? "75%" : star === 4 ? "20%" : "5%"}
                </Text>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Review Button */}
      <div className="text-center">
        <Button
          type="primary"
          size="large"
          onClick={() => setShowReviewForm(!showReviewForm)}
          className="bg-gradient-to-r from-pink-500 to-purple-600 border-0 rounded-xl px-8"
        >
          {showReviewForm ? "لغو نظر" : "ثبت نظر جدید"}
        </Button>
      </div>

      {/* Review Form */}
      {showReviewForm && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
        >
          <Card className="rounded-2xl shadow-lg">
            <Form form={form} onFinish={handleSubmitReview} layout="vertical">
              <Form.Item
                name="rating"
                label="امتیاز شما"
                rules={[
                  {
                    required: true,
                    message: "لطفاً امتیاز خود را انتخاب کنید",
                  },
                ]}
              >
                <Rate />
              </Form.Item>

              <Form.Item
                name="comment"
                label="نظر شما"
                rules={[
                  { required: true, message: "لطفاً نظر خود را بنویسید" },
                ]}
              >
                <TextArea
                  rows={4}
                  placeholder="نظر خود را در مورد این محصول بنویسید..."
                  className="rounded-xl"
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="bg-pink-500 border-pink-500 rounded-xl"
                >
                  ثبت نظر
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </motion.div>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.map((review, index) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="space-y-4">
                {/* Review Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar icon={<UserOutlined />} className="bg-pink-500" />
                    <div>
                      <div className="flex items-center gap-2">
                        <Text strong>{review.user}</Text>
                        {review.verified && (
                          <span className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full">
                            ✓ خرید تایید شده
                          </span>
                        )}
                      </div>
                      <Text className="text-gray-500 text-sm">
                        {review.date}
                      </Text>
                    </div>
                  </div>

                  <Rate disabled value={review.rating} className="text-sm" />
                </div>

                {/* Review Content */}
                <Paragraph className="text-gray-700 mb-4">
                  {review.comment}
                </Paragraph>

                {/* Review Actions */}
                <div className="flex items-center gap-4 pt-2 border-t border-gray-100">
                  <Text className="text-gray-500 text-sm">
                    آیا این نظر مفید بود؟
                  </Text>

                  <Button
                    type="text"
                    size="small"
                    icon={<LikeOutlined />}
                    onClick={() => handleHelpful(review.id, "helpful")}
                    className="text-green-600 hover:bg-green-50"
                  >
                    مفید ({review.helpful})
                  </Button>

                  <Button
                    type="text"
                    size="small"
                    icon={<DislikeOutlined />}
                    onClick={() => handleHelpful(review.id, "not-helpful")}
                    className="text-red-600 hover:bg-red-50"
                  >
                    غیرمفید ({review.notHelpful})
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Load More Reviews */}
      <div className="text-center">
        <Button
          type="default"
          className="rounded-xl border-2 border-gray-300 hover:border-pink-300 hover:text-pink-500"
        >
          مشاهده نظرات بیشتر
        </Button>
      </div>
    </div>
  );
};

export default CommentBox;
