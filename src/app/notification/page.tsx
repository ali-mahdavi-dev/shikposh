'use client';
import React, { useEffect } from 'react';
import { useAppDispatch } from '@/stores/hooks';
import { setNotifications, markRead as markReadSlice, markAllRead as markAllReadSlice } from '@/stores/slices/notificationSlice';
import { useNotifications, useMarkNotificationAsRead, useMarkAllNotificationsAsRead } from './_api';
import { NotificationList } from './_components';

export default function NotificationPage() {
  const dispatch = useAppDispatch();
  const { data: notifications = [], isLoading, error } = useNotifications();
  const markAsReadMutation = useMarkNotificationAsRead();
  const markAllAsReadMutation = useMarkAllNotificationsAsRead();

  // Sync notifications with Redux store
  useEffect(() => {
    if (notifications.length > 0) {
      dispatch(setNotifications(notifications));
    }
  }, [notifications, dispatch]);

  const handleMarkRead = async (id: string) => {
    try {
      await markAsReadMutation.mutateAsync(id);
      dispatch(markReadSlice(id));
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
      // Fallback to local state update
      dispatch(markReadSlice(id));
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await markAllAsReadMutation.mutateAsync();
      dispatch(markAllReadSlice());
    } catch (error) {
      console.error('Failed to mark all notifications as read:', error);
      // Fallback to local state update
      dispatch(markAllReadSlice());
    }
  };

  return (
    <NotificationList
      items={notifications}
      loading={isLoading || markAsReadMutation.isPending || markAllAsReadMutation.isPending}
      onMarkAllRead={handleMarkAllRead}
      onMarkRead={handleMarkRead}
    />
  );
}
