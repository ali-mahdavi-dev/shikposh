'use client';
import React, { useState, useEffect } from 'react';
import { Card, List, Typography, Button, Tag } from 'antd';
import Link from 'next/link';
import type { NotificationListProps } from '../_types';

const { Title, Text } = Typography;

// Format date consistently to avoid hydration mismatch
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${year}/${month}/${day} ${hours}:${minutes}`;
}

export function NotificationList({
  items,
  loading,
  onMarkAllRead,
  onMarkRead,
}: NotificationListProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-4 flex items-center justify-between">
        <Title level={3} className="!mb-0">
          اعلان‌ها
        </Title>
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
                      <div className="mt-1 text-xs text-gray-400">
                        {isMounted
                          ? new Date(n.createdAt).toLocaleString('fa-IR')
                          : formatDate(n.createdAt)}
                      </div>
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
