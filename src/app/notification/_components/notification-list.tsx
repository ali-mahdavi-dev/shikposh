'use client';
import React from 'react';
import { Card, List, Typography, Button, Tag } from 'antd';
import Link from 'next/link';
import type { NotificationListProps } from '../_types';

const { Title, Text } = Typography;

export function NotificationList({ items, loading, onMarkAllRead, onMarkRead }: NotificationListProps) {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-4 flex items-center justify-between">
        <Title level={3} className="!mb-0">اعلان‌ها</Title>
        <Button onClick={onMarkAllRead}>علامت‌گذاری همه به عنوان خوانده شده</Button>
      </div>
      <Card className="rounded-2xl" loading={!!loading}>
        <List
          dataSource={items}
          renderItem={(n) => {
            const productHref = n.meta?.productId ? `/products/${n.meta.productId}` : null;
            const sellerHref = n.meta?.sellerId ? `/seller/${n.meta.sellerId}` : null;
            const actionHref = productHref || sellerHref;
            return (
              <List.Item
                actions={[
                  actionHref ? (
                    <Link key="view" href={actionHref} onClick={() => onMarkRead(n.id)}>
                      <Button type="link">مشاهده</Button>
                    </Link>
                  ) : null,
                ]}
              >
                <List.Item.Meta
                  title={
                    <div className="flex items-center gap-2">
                      <Text strong>{n.title}</Text>
                      {!n.read && <Tag color="purple">جدید</Tag>}
                    </div>
                  }
                  description={
                    <div className="text-gray-600">
                      <div>{n.message}</div>
                      <div className="text-xs text-gray-400 mt-1">{new Date(n.createdAt).toLocaleString('fa-IR')}</div>
                    </div>
                  }
                />
              </List.Item>
            );
          }}
        />
      </Card>
    </div>
  );
}

export default NotificationList;

