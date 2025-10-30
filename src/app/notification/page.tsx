'use client';
import React from 'react';
import { Card, List, Typography, Button, Tag } from 'antd';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import { markAllRead, markRead, setNotifications } from '@/stores/slices/notificationSlice';
import { getApiBaseUrl } from '@/shared/config/env';
import Link from 'next/link';

const { Title, Text } = Typography;

export default function NotificationPage() {
  const dispatch = useAppDispatch();
  const items = useAppSelector((s) => s.notifications.items);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    // Hydrate from json-server if store is empty
    if (items.length === 0) {
      const load = async () => {
        try {
          setLoading(true);
          const res = await fetch(`${getApiBaseUrl()}/notifications`);
          if (!res.ok) return;
          const data = await res.json();
          dispatch(setNotifications(data));
        } finally {
          setLoading(false);
        }
      };
      load();
    }
  }, []);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-4 flex items-center justify-between">
        <Title level={3} className="!mb-0">اعلان‌ها</Title>
        <Button onClick={() => dispatch(markAllRead())}>علامت‌گذاری همه به عنوان خوانده شده</Button>
      </div>
      <Card className="rounded-2xl" loading={loading}>
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
                    <Link key="view" href={actionHref} onClick={() => dispatch(markRead(n.id))}>
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
