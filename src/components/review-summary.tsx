import React, { useState } from 'react';
import { Card, Rate, Typography, Button, Progress, Form, Input, App } from 'antd';
import { StarOutlined, CommentOutlined } from '@ant-design/icons';
import { ReviewEntity, useCreateReview } from '@/features/products';

const { Text, Title } = Typography;

interface ReviewSummaryProps {
  productId: string;
  reviews: ReviewEntity[];
  averageRating: number;
  totalReviews: number;
}

const ReviewSummary: React.FC<ReviewSummaryProps> = ({ productId, reviews, averageRating, totalReviews }) => {
  const { notification } = App.useApp();
  const [showForm, setShowForm] = useState(false);
  const [form] = Form.useForm();
  const createReviewMutation = useCreateReview();

  const handleSubmitReview = async (values: { rating: number; comment: string }) => {
    try {
      await createReviewMutation.mutateAsync({ productId, rating: values.rating, comment: values.comment });
      form.resetFields();
      setShowForm(false);
      notification.success({ message: 'عملیات موفق', description: 'نظر شما با موفقیت ثبت شد' });
    } catch (e) {
      notification.error({ message: 'خطا', description: 'خطا در ثبت نظر. لطفاً دوباره تلاش کنید' });
    }
  };
  // Calculate rating distribution
  const ratingDistribution = [5, 4, 3, 2, 1].map((star) => {
    const count = reviews.filter((review) => review.rating === star).length;
    const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
    return { star, count, percentage };
  });

  // Get recent reviews (last 3)
  const recentReviews = reviews
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  return (
    <Card className="rounded-2xl border-0 shadow-sm">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CommentOutlined className="text-xl text-pink-500" />
            <Title level={4} className="mb-0 text-gray-800">
              نظرات کاربران
            </Title>
          </div>
          <Button type="link" onClick={() => setShowForm((s) => !s)} className="font-semibold text-pink-600">
            {showForm ? 'لغو ثبت نظر' : 'ثبت نظر'}
          </Button>
        </div>

        {/* Rating Overview */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Overall Rating */}
          <div className="text-center">
            <div className="mb-2 text-4xl font-bold text-pink-600">{averageRating.toFixed(1)}</div>
            <Rate disabled value={averageRating} allowHalf className="mb-2 text-lg" />
            <Text className="text-gray-600">از {totalReviews} نظر</Text>
          </div>

          {/* Rating Distribution */}
          <div className="space-y-2">
            {ratingDistribution.map(({ star, count, percentage }) => (
              <div key={star} className="flex items-center gap-3">
                <div className="flex w-12 items-center gap-1">
                  <Text className="text-sm font-medium">{star}</Text>
                  <StarOutlined className="text-xs text-yellow-400" />
                </div>
                <div className="flex-1">
                  <Progress
                    percent={percentage}
                    showInfo={false}
                    strokeColor="#ec4899"
                    trailColor="#f3f4f6"
                    size="small"
                  />
                </div>
                <Text className="w-12 text-right text-sm text-gray-600">{count}</Text>
              </div>
            ))}
          </div>
        </div>

        {/* Inline Review Form */}
        {showForm && (
          <Card className="rounded-xl border-0 bg-white/70">
            <Form form={form} onFinish={handleSubmitReview} layout="vertical">
              <Form.Item
                name="rating"
                label="امتیاز شما"
                rules={[{ required: true, message: 'لطفاً امتیاز خود را انتخاب کنید' }]}
              >
                <Rate />
              </Form.Item>
              <Form.Item
                name="comment"
                label="نظر شما"
                rules={[
                  { required: true, message: 'لطفاً نظر خود را بنویسید' },
                  { min: 10, message: 'نظر باید حداقل 10 کاراکتر باشد' },
                ]}
              >
                <Input.TextArea rows={4} className="rounded-xl" placeholder="نظر خود را بنویسید..." />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  size="large"
                  htmlType="submit"
                  loading={createReviewMutation.isPending}
                  className="h-10 rounded-xl border-0 bg-gradient-to-r from-pink-500 to-purple-600 px-6"
                >
                  ثبت نظر
                </Button>
              </Form.Item>
            </Form>
          </Card>
        )}

        {/* Recent Reviews Preview */}
        {recentReviews.length > 0 && (
          <div className="space-y-3">
            <Text strong className="text-gray-800">
              آخرین نظرات:
            </Text>
            {recentReviews.map((review) => (
              <div key={review.id} className="rounded-lg bg-gray-50 p-3">
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Text strong className="text-sm">
                      {review.user}
                    </Text>
                    {review.verified && (
                      <span className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-600">
                        ✓ تایید شده
                      </span>
                    )}
                  </div>
                  <Rate disabled value={review.rating} className="text-xs" />
                </div>
                <Text className="line-clamp-2 text-sm text-gray-600">{review.comment}</Text>
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};

export default ReviewSummary;
