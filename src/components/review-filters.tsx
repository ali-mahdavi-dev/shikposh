import React from 'react';
import { Select, Space, Typography } from 'antd';
import { FilterOutlined, SortAscendingOutlined } from '@ant-design/icons';

const { Text } = Typography;
const { Option } = Select;

interface ReviewFiltersProps {
  sortBy: string;
  filterBy: string;
  onSortChange: (value: string) => void;
  onFilterChange: (value: string) => void;
  totalReviews: number;
}

const ReviewFilters: React.FC<ReviewFiltersProps> = ({
  sortBy,
  filterBy,
  onSortChange,
  onFilterChange,
  totalReviews,
}) => {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <FilterOutlined className="text-gray-500" />
          <Text strong className="text-gray-700">
            فیلتر و مرتب‌سازی ({totalReviews} نظر)
          </Text>
        </div>

        <Space size="middle" wrap>
          <div className="flex items-center gap-2">
            <SortAscendingOutlined className="text-gray-500" />
            <Text className="text-sm text-gray-600">مرتب‌سازی:</Text>
            <Select value={sortBy} onChange={onSortChange} className="w-32" size="small">
              <Option value="newest">جدیدترین</Option>
              <Option value="oldest">قدیمی‌ترین</Option>
              <Option value="highest">بالاترین امتیاز</Option>
              <Option value="lowest">پایین‌ترین امتیاز</Option>
              <Option value="mostHelpful">مفیدترین</Option>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <Text className="text-sm text-gray-600">فیلتر:</Text>
            <Select value={filterBy} onChange={onFilterChange} className="w-32" size="small">
              <Option value="all">همه نظرات</Option>
              <Option value="5">5 ستاره</Option>
              <Option value="4">4 ستاره</Option>
              <Option value="3">3 ستاره</Option>
              <Option value="2">2 ستاره</Option>
              <Option value="1">1 ستاره</Option>
              <Option value="verified">خرید تایید شده</Option>
            </Select>
          </div>
        </Space>
      </div>
    </div>
  );
};

export default ReviewFilters;
