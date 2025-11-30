'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Card,
  Button,
  Space,
  Typography,
  Table,
  Image,
  Tag,
  Popconfirm,
  App,
  Input,
  Tooltip,
} from 'antd';
import {
  PlusOutlined,
  ArrowLeftOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { useProducts, useDeleteProduct } from './_api';
import { formatIranianPrice } from '@/shared/utils';
import type { AdminProduct } from './_api/entities/product.entity';
import type { ColumnsType } from 'antd/es/table';

const { Title } = Typography;

export default function ProductsPage() {
  const router = useRouter();
  const { message } = App.useApp();
  const { data: products = [], isLoading } = useProducts();
  const deleteProductMutation = useDeleteProduct();
  const [searchText, setSearchText] = useState('');
  const [deletingProductId, setDeletingProductId] = useState<number | string | null>(null);

  const handleDelete = async (id: number | string) => {
    setDeletingProductId(id);
    try {
      await deleteProductMutation.mutateAsync({ id, softDelete: true });
      message.success('محصول با موفقیت حذف شد');
    } catch (error) {
      message.error('خطا در حذف محصول');
    } finally {
      setDeletingProductId(null);
    }
  };

  const filteredProducts = products.filter((product) => {
    if (!searchText) return true;
    const searchLower = searchText.toLowerCase();
    return (
      product.title.toLowerCase().includes(searchLower) ||
      product.brand.toLowerCase().includes(searchLower) ||
      product.slug.toLowerCase().includes(searchLower) ||
      product.categories.some((cat) => cat.name.toLowerCase().includes(searchLower))
    );
  });

  const columns: ColumnsType<AdminProduct> = [
    {
      title: 'تصویر',
      dataIndex: 'thumbnail',
      key: 'thumbnail',
      width: 100,
      render: (thumbnail: string) => (
        <Image
          src={thumbnail}
          alt="product"
          width={60}
          height={60}
          style={{ objectFit: 'cover', borderRadius: 4 }}
          fallback="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Crect fill='%23ddd' width='60' height='60'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23999' font-size='12'%3Eبدون تصویر%3C/text%3E%3C/svg%3E"
        />
      ),
    },
    {
      title: 'عنوان',
      dataIndex: 'title',
      key: 'title',
      render: (title: string, record: AdminProduct) => (
        <div>
          <div className="font-medium">{title}</div>
          <div className="text-xs text-gray-500">{record.brand}</div>
        </div>
      ),
    },
    {
      title: 'دسته‌بندی',
      dataIndex: 'categories',
      key: 'categories',
      render: (categories: Array<{ id: number; name: string; slug: string }>) => (
        <Space size="small" wrap>
          {categories.map((cat) => (
            <Tag key={cat.id} color="blue">
              {cat.name}
            </Tag>
          ))}
        </Space>
      ),
    },
    {
      title: 'قیمت',
      key: 'price',
      render: (_: any, record: AdminProduct) => (
        <div className="text-left" dir="ltr">
          <div className="font-medium text-pink-600">{formatIranianPrice(record.price)} تومان</div>
          {record.discount > 0 && (
            <div className="text-xs text-gray-400">تخفیف: {record.discount}%</div>
          )}
        </div>
      ),
    },
    {
      title: 'موجودی',
      dataIndex: 'stock',
      key: 'stock',
      render: (stock: number) => <Tag color={stock > 0 ? 'green' : 'red'}>{stock}</Tag>,
    },
    {
      title: 'وضعیت',
      key: 'status',
      render: (_: any, record: AdminProduct) => (
        <Space direction="vertical" size="small">
          {record.is_featured && <Tag color="purple">ویژه</Tag>}
          {record.is_new && <Tag color="green">جدید</Tag>}
        </Space>
      ),
    },
    {
      title: 'امتیاز',
      dataIndex: 'rating',
      key: 'rating',
      render: (rating: number) => (
        <div className="text-left" dir="ltr">
          {rating.toFixed(1)} ⭐
        </div>
      ),
    },
    {
      title: 'عملیات',
      key: 'actions',
      width: 150,
      fixed: 'right',
      render: (_: any, record: AdminProduct) => (
        <Space size="small">
          <Tooltip title="مشاهده">
            <Button
              type="text"
              icon={<EyeOutlined />}
              onClick={() => router.push(`/products/${record.slug}`)}
            />
          </Tooltip>
          <Tooltip title="ویرایش">
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => router.push(`/admin/products/${record.slug}/edit`)}
            />
          </Tooltip>
          <Popconfirm
            title="حذف محصول"
            description="آیا از حذف این محصول اطمینان دارید؟"
            onConfirm={() => handleDelete(record.id)}
            okText="بله"
            cancelText="خیر"
            okButtonProps={{ danger: true }}
            disabled={deletingProductId !== null}
          >
            <Tooltip title="حذف">
              <Button
                type="text"
                danger
                icon={<DeleteOutlined />}
                loading={deletingProductId === record.id}
              />
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="container mx-auto py-6">
      <Space direction="vertical" size="large" className="w-full">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Title level={2} className="mb-0!">
            مدیریت محصولات
          </Title>
          <Space>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => router.push('/admin/products/new')}
            >
              افزودن محصول جدید
            </Button>
            <Button icon={<ArrowLeftOutlined />} onClick={() => router.push('/admin')}>
              بازگشت به داشبورد
            </Button>
          </Space>
        </div>

        {/* Search and Filters */}
        <Card>
          <div className="mb-4">
            <Space.Compact style={{ width: '100%' }} size="large">
              <Input
                placeholder="جستجو در محصولات (عنوان، برند، دسته‌بندی)..."
                allowClear
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onPressEnter={() => {
                  // Search functionality can be added here if needed
                }}
              />
              <Button icon={<SearchOutlined />} type="primary" />
            </Space.Compact>
          </div>

          {/* Products Table */}
          <Table
            columns={columns}
            dataSource={filteredProducts}
            rowKey="id"
            loading={isLoading}
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showTotal: (total) => `مجموع ${total} محصول`,
              position: ['bottomCenter'],
            }}
            scroll={{ x: 1200 }}
            locale={{
              emptyText: 'هیچ محصولی یافت نشد',
            }}
          />
        </Card>
      </Space>
    </div>
  );
}
