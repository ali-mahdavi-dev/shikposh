import React, { useState, useMemo } from 'react';
import { Rate, Typography, Avatar, Form } from 'antd';
import { UserOutlined, LikeOutlined, DislikeOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import { CommentBoxProps, ReviewFormData } from '@/types';
import { useReviews, useCreateReview, useUpdateReviewHelpful } from '@/features/products';
import { Card, Button, Input, Spin, Alert, App } from 'antd';
import { ContentLoading, CommentBoxSkeleton } from '@/shared/components/loading';
import ReviewStats from './review-stats';
import ReviewFilters from './review-filters';

const { Text, Paragraph } = Typography;

const CommentBox: React.FC<CommentBoxProps> = ({ productId = '1' }) => {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('newest');
  const [filterBy, setFilterBy] = useState('all');
  const [form] = Form.useForm();
  const { message } = App.useApp();

  const reviewsPerPage = 5;

  const { data: reviews = [], isLoading, error } = useReviews(productId);
  const createReviewMutation = useCreateReview();
  const updateHelpfulMutation = useUpdateReviewHelpful();

  // Calculate average rating and rating distribution
  const ratingStats = useMemo(() => {
    if (!reviews.length) return { average: 0, distribution: {} };

    const totalRating = reviews.reduce((sum, r) => sum + r.rating, 0);
    const average = totalRating / reviews.length;

    const distribution: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach((r) => {
      distribution[r.rating] = (distribution[r.rating] || 0) + 1;
    });

    const distributionPercent: Record<number, number> = {};
    Object.keys(distribution).forEach((rating) => {
      distributionPercent[Number(rating)] = (distribution[Number(rating)] / reviews.length) * 100;
    });

    return { average, distribution: distributionPercent };
  }, [reviews]);

  // Filter and sort reviews
  const filteredAndSortedReviews = useMemo(() => {
    let filtered = reviews;

    // Apply filter
    if (filterBy === 'verified') {
      filtered = filtered.filter((review) => review.verified);
    } else if (filterBy !== 'all') {
      filtered = filtered.filter((review) => review.rating === parseInt(filterBy));
    }

    // Apply sorting
    switch (sortBy) {
      case 'newest':
        filtered = [...filtered].sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        );
        break;
      case 'oldest':
        filtered = [...filtered].sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
        );
        break;
      case 'highest':
        filtered = [...filtered].sort((a, b) => b.rating - a.rating);
        break;
      case 'lowest':
        filtered = [...filtered].sort((a, b) => a.rating - b.rating);
        break;
      case 'mostHelpful':
        filtered = [...filtered].sort(
          (a, b) => b.helpful - b.notHelpful - (a.helpful - a.notHelpful),
        );
        break;
      default:
        break;
    }

    return filtered;
  }, [reviews, sortBy, filterBy]);

  // Pagination logic
  const totalPages = Math.ceil(filteredAndSortedReviews.length / reviewsPerPage);
  const startIndex = (currentPage - 1) * reviewsPerPage;
  const endIndex = startIndex + reviewsPerPage;
  const currentReviews = filteredAndSortedReviews.slice(startIndex, endIndex);

  const handleLoadMore = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
    setCurrentPage(1); // Reset to first page
  };

  const handleFilterChange = (value: string) => {
    setFilterBy(value);
    setCurrentPage(1); // Reset to first page
  };

  const handleSubmitReview = async (values: ReviewFormData) => {
    try {
      await createReviewMutation.mutateAsync({
        ...values,
        productId,
      });
      form.resetFields();
      setShowReviewForm(false);
      message.success('نظر شما با موفقیت ثبت شد');
    } catch (error) {
      console.error('Failed to submit review:', error);
      message.error('خطا در ثبت نظر. لطفاً دوباره تلاش کنید');
    }
  };

  const handleHelpful = async (reviewId: number, type: 'helpful' | 'notHelpful') => {
    try {
      await updateHelpfulMutation.mutateAsync({ reviewId, type });
      message.success(type === 'helpful' ? 'نظر مفید ثبت شد' : 'نظر غیرمفید ثبت شد');
    } catch (error) {
      console.error('Failed to update review helpful:', error);
      message.error('خطا در ثبت نظر. لطفاً دوباره تلاش کنید');
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
      {/* Review Summary */}
      <ReviewStats
        reviews={reviews}
        averageRating={ratingStats.average}
        totalReviews={reviews.length}
      />

      {/* Review Filters */}
      {reviews.length > 0 && (
        <ReviewFilters
          sortBy={sortBy}
          filterBy={filterBy}
          onSortChange={handleSortChange}
          onFilterChange={handleFilterChange}
          totalReviews={filteredAndSortedReviews.length}
        />
      )}

      {/* Add Review Button */}
      <div className="text-center">
        <Button
          type="primary"
          size="large"
          onClick={() => setShowReviewForm(!showReviewForm)}
          className="rounded-xl border-0 bg-gradient-to-r from-pink-500 to-purple-600 px-8"
        >
          {showReviewForm ? 'لغو نظر' : 'ثبت نظر جدید'}
        </Button>
      </div>

      {/* Review Form */}
      {showReviewForm && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          <Card className="rounded-2xl border-0 shadow-lg">
            <Form form={form} onFinish={handleSubmitReview} layout="vertical">
              <Form.Item
                name="rating"
                label="امتیاز شما"
                rules={[
                  {
                    required: true,
                    message: 'لطفاً امتیاز خود را انتخاب کنید',
                  },
                ]}
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
                <Input.TextArea
                  placeholder="نظر خود را در مورد این محصول بنویسید..."
                  rows={4}
                  className="rounded-xl"
                />
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
        </motion.div>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        {filteredAndSortedReviews.length === 0 ? (
          <Card className="border-2 border-dashed border-gray-200 py-8 text-center">
            <Text className="text-lg text-gray-500">
              {reviews.length === 0
                ? 'هنوز نظری ثبت نشده است'
                : 'هیچ نظری با فیلتر انتخابی یافت نشد'}
            </Text>
            <Text className="mt-2 block text-gray-400">
              {reviews.length === 0
                ? 'اولین نفری باشید که نظر می‌دهد'
                : 'فیلترهای خود را تغییر دهید'}
            </Text>
          </Card>
        ) : (
          currentReviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="rounded-2xl border-0 shadow-sm transition-all duration-300 hover:shadow-md">
                <div className="space-y-4">
                  {/* Review Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar icon={<UserOutlined />} className="bg-pink-500" />
                      <div>
                        <div className="flex items-center gap-2">
                          <Text strong className="text-gray-800">
                            {review.user}
                          </Text>
                          {review.verified && (
                            <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-600">
                              ✓ خرید تایید شده
                            </span>
                          )}
                        </div>
                        <Text className="text-sm text-gray-500">{review.date}</Text>
                      </div>
                    </div>

                    <Rate disabled value={review.rating} className="text-sm" />
                  </div>

                  {/* Review Content */}
                  <Paragraph className="mb-4 leading-relaxed text-gray-700">
                    {review.comment}
                  </Paragraph>

                  {/* Review Actions */}
                  <div className="flex items-center gap-4 border-t border-gray-100 pt-3">
                    <Text className="text-sm font-medium text-gray-500">آیا این نظر مفید بود؟</Text>

                    <Button
                      type="text"
                      size="small"
                      onClick={() => handleHelpful(review.id, 'helpful')}
                      loading={updateHelpfulMutation.isPending}
                      className="flex items-center gap-1 text-green-600 hover:bg-green-50 hover:text-green-700"
                    >
                      <LikeOutlined />
                      مفید ({review.helpful})
                    </Button>

                    <Button
                      type="text"
                      size="small"
                      onClick={() => handleHelpful(review.id, 'notHelpful')}
                      loading={updateHelpfulMutation.isPending}
                      className="flex items-center gap-1 text-red-600 hover:bg-red-50 hover:text-red-700"
                    >
                      <DislikeOutlined />
                      غیرمفید ({review.notHelpful})
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))
        )}
      </div>

      {/* Load More Reviews */}
      {filteredAndSortedReviews.length > reviewsPerPage && currentPage < totalPages && (
        <div className="text-center">
          <Button
            type="default"
            size="large"
            onClick={handleLoadMore}
            className="rounded-xl border-2 border-gray-300 px-8 hover:border-pink-300 hover:text-pink-500"
          >
            مشاهده نظرات بیشتر ({filteredAndSortedReviews.length - endIndex} نظر باقی‌مانده)
          </Button>
        </div>
      )}

      {/* Pagination Info */}
      {filteredAndSortedReviews.length > reviewsPerPage && (
        <div className="text-center text-sm text-gray-500">
          نمایش {startIndex + 1} تا {Math.min(endIndex, filteredAndSortedReviews.length)} از{' '}
          {filteredAndSortedReviews.length} نظر
        </div>
      )}
    </div>
  );
};

export default CommentBox;
