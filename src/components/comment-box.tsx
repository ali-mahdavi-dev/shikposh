import React, { useState } from 'react';
import { Rate, Typography, Avatar, Form, Input, Button, App } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { CommentBoxProps } from '@/types';
import { useReviews, useCreateReview } from '@/features/products';
import { Card, Alert } from 'antd';
import { CommentBoxSkeleton } from '@/shared/components/loading';

const { Text, Paragraph } = Typography;
// ReviewSummary lazy import removed; not used here after inlining form in ReviewSummary

const CommentBox: React.FC<CommentBoxProps> = ({ productId = '1', initialShowForm = false }) => {
  const { notification } = App.useApp();
  const [showForm, setShowForm] = useState(initialShowForm);
  const [form] = Form.useForm();
  const { data: reviews = [], isLoading, error } = useReviews(productId);
  const createReviewMutation = useCreateReview();
  const displayedReviews = reviews.slice(0, 10);

  const handleSubmitReview = async (values: { rating: number; comment: string }) => {
    try {
      await createReviewMutation.mutateAsync({
        productId,
        rating: values.rating,
        comment: values.comment,
      });
      form.resetFields();
      setShowForm(false);
      notification.success({ message: 'عملیات موفق', description: 'نظر شما با موفقیت ثبت شد' });
    } catch (e) {
      notification.error({ message: 'خطا', description: 'خطا در ثبت نظر. لطفاً دوباره تلاش کنید' });
    }
  };

  if (isLoading) {
    return <CommentBoxSkeleton />;
  }

  if (error) {
    return (
      <Alert
        message="خطا در بارگذاری نظرات"
        description="لطفاً اتصال اینترنت خود را بررسی کنید و دوباره تلاش کنید"
        type="error"
        showIcon
        className="mb-4"
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <Button
          type="primary"
          size="large"
          onClick={() => setShowForm((s) => !s)}
          className="rounded-xl border-0 bg-gradient-to-r from-pink-500 to-purple-600 px-8"
        >
          {showForm ? 'لغو' : 'ثبت نظر'}
        </Button>
      </div>

      {showForm && (
        <Card className="rounded-2xl border-0 shadow-lg">
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
                block
                className="h-12 rounded-xl border-0 bg-gradient-to-r from-pink-500 to-purple-600"
              >
                ثبت نظر
              </Button>
            </Form.Item>
          </Form>
        </Card>
      )}

      

      {displayedReviews.length === 0 ? (
        <Card className="border-2 border-dashed border-gray-200 py-8 text-center">
          <Text className="text-lg text-gray-500">هنوز نظری ثبت نشده است</Text>
        </Card>
      ) : (
        displayedReviews.map((review) => (
          <Card key={review.id} className="rounded-2xl border-0 shadow-sm">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar icon={<UserOutlined />} className="bg-pink-500" />
                  <div>
                    <Text strong className="text-gray-800">{review.user}</Text>
                    <div className="text-sm text-gray-500">{review.date}</div>
                  </div>
                </div>
                <Rate disabled value={review.rating} className="text-sm" />
              </div>
              <Paragraph className="mb-0 leading-relaxed text-gray-700">{review.comment}</Paragraph>
            </div>
          </Card>
        ))
      )}
    </div>
  );
};

export default CommentBox;
