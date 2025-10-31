import React from 'react';
import { Card, Rate, Progress, Typography, Row, Col, Statistic } from 'antd';
import { StarOutlined, LikeOutlined, DislikeOutlined } from '@ant-design/icons';
import { ReviewEntity } from '@/app/products/_api';

const { Text } = Typography;

interface ReviewStatsProps {
  reviews: ReviewEntity[];
  averageRating: number;
  totalReviews: number;
}

const ReviewStats: React.FC<ReviewStatsProps> = ({ reviews, averageRating, totalReviews }) => {
  // Calculate rating distribution
  const ratingDistribution = [5, 4, 3, 2, 1].map((star) => {
    const count = reviews.filter((review) => review.rating === star).length;
    const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
    return { star, count, percentage };
  });

  // Calculate helpful stats
  const totalHelpful = reviews.reduce((sum, review) => sum + review.helpful, 0);
  const totalNotHelpful = reviews.reduce((sum, review) => sum + review.notHelpful, 0);
  const helpfulPercentage =
    totalHelpful + totalNotHelpful > 0
      ? (totalHelpful / (totalHelpful + totalNotHelpful)) * 100
      : 0;

  return (
    <Card className="rounded-2xl border-0 shadow-sm">
      <Row gutter={[24, 24]}>
        {/* Overall Rating */}
        <Col xs={24} md={8}>
          <div className="text-center">
            <div className="mb-2 text-5xl font-bold text-pink-600">{averageRating.toFixed(1)}</div>
            <Rate disabled value={averageRating} allowHalf className="mb-3 text-lg" />
            <Text className="text-lg text-gray-600">از {totalReviews} نظر</Text>
          </div>
        </Col>

        {/* Rating Distribution */}
        <Col xs={24} md={10}>
          <div className="space-y-3">
            <Text strong className="mb-4 block text-base text-gray-800">
              توزیع امتیازات:
            </Text>
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
                    className="mb-1"
                  />
                </div>
                <div className="w-16 text-right">
                  <Text className="text-sm text-gray-600">
                    {count} ({percentage.toFixed(0)}%)
                  </Text>
                </div>
              </div>
            ))}
          </div>
        </Col>

        {/* Helpful Stats */}
        <Col xs={24} md={6}>
          <div className="space-y-4">
            <Text strong className="block text-base text-gray-800">
              آمار مفید بودن:
            </Text>

            <Statistic
              title="نظرات مفید"
              value={totalHelpful}
              prefix={<LikeOutlined className="text-green-500" />}
              valueStyle={{ color: '#10b981', fontSize: '20px' }}
            />

            <Statistic
              title="نظرات غیرمفید"
              value={totalNotHelpful}
              prefix={<DislikeOutlined className="text-red-500" />}
              valueStyle={{ color: '#ef4444', fontSize: '20px' }}
            />

            <div className="rounded-lg bg-gray-50 p-3">
              <Text className="text-sm text-gray-600">
                {helpfulPercentage.toFixed(1)}% از نظرات مفید هستند
              </Text>
            </div>
          </div>
        </Col>
      </Row>
    </Card>
  );
};

export default ReviewStats;
