import React, { useState, useMemo } from "react";
import {
  Card,
  Rate,
  Typography,
  Button,
  Avatar,
  Input,
  Form,
  Spin,
  Alert,
} from "antd";
import { UserOutlined, LikeOutlined, DislikeOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import { CommentBoxProps, ReviewFormData } from "@/types";
import { useReviews, useCreateReview, useUpdateReviewHelpful } from "@/hooks/use-api";

const { Text, Paragraph } = Typography;
const { TextArea } = Input;

const CommentBox: React.FC<CommentBoxProps> = ({ productId = "1" }) => {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [form] = Form.useForm();
  
  const { data: reviews = [], isLoading, error } = useReviews(productId);
  const createReviewMutation = useCreateReview();
  const updateHelpfulMutation = useUpdateReviewHelpful();

  // Calculate average rating and rating distribution
  const ratingStats = useMemo(() => {
    if (!reviews.length) return { average: 0, distribution: {} };
    
    const totalRating = reviews.reduce((sum, r) => sum + r.rating, 0);
    const average = totalRating / reviews.length;
    
    const distribution: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach(r => {
      distribution[r.rating] = (distribution[r.rating] || 0) + 1;
    });
    
    const distributionPercent: Record<number, number> = {};
    Object.keys(distribution).forEach(rating => {
      distributionPercent[Number(rating)] = (distribution[Number(rating)] / reviews.length) * 100;
    });
    
    return { average, distribution: distributionPercent };
  }, [reviews]);

  const handleSubmitReview = async (values: ReviewFormData) => {
    try {
      await createReviewMutation.mutateAsync({
        ...values,
        productId,
      });
      form.resetFields();
      setShowReviewForm(false);
    } catch (error) {
      console.error("Failed to submit review:", error);
    }
  };

  const handleHelpful = async (reviewId: number, type: "helpful" | "notHelpful") => {
    try {
      await updateHelpfulMutation.mutateAsync({ reviewId, type });
    } catch (error) {
      console.error("Failed to update review helpful:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert
        message="خطا در بارگذاری نظرات"
        description="لطفاً دوباره تلاش کنید"
        type="error"
        showIcon
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Review Summary */}
      <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-6 rounded-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-pink-600 mb-2">
              {ratingStats.average.toFixed(1)}
            </div>
            <Rate disabled value={ratingStats.average} allowHalf className="mb-2" />
            <Text className="text-gray-600">از {reviews.length} نظر</Text>
          </div>

          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((star) => (
              <div key={star} className="flex items-center gap-3">
                <Text className="w-8">{star} ⭐</Text>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-pink-500 h-2 rounded-full"
                    style={{
                      width: `${ratingStats.distribution[star] || 0}%`,
                    }}
                  />
                </div>
                <Text className="text-sm text-gray-500 w-8">
                  {ratingStats.distribution[star]?.toFixed(0) || 0}%
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
                  loading={createReviewMutation.isPending}
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
                    loading={updateHelpfulMutation.isPending}
                    className="text-green-600 hover:bg-green-50"
                  >
                    مفید ({review.helpful})
                  </Button>

                  <Button
                    type="text"
                    size="small"
                    icon={<DislikeOutlined />}
                    onClick={() => handleHelpful(review.id, "notHelpful")}
                    loading={updateHelpfulMutation.isPending}
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
      {reviews.length > 0 && (
        <div className="text-center">
          <Button
            type="default"
            className="rounded-xl border-2 border-gray-300 hover:border-pink-300 hover:text-pink-500"
          >
            مشاهده نظرات بیشتر
          </Button>
        </div>
      )}
    </div>
  );
};

export default CommentBox;

