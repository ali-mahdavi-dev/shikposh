import '@/lib/di/init'; // Ensure reflect-metadata is loaded before decorators

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { NotificationContainer } from './container';
import type { NotificationEntity } from './entities';

const notificationService = NotificationContainer.getNotificationService();

// Get all notifications
export const useNotifications = () => {
  return useQuery<NotificationEntity[]>({
    queryKey: ['notifications'],
    queryFn: () => notificationService.findAll(),
    staleTime: 1 * 60 * 1000, // 1 minute
    refetchInterval: 30 * 1000, // Refetch every 30 seconds for real-time updates
  });
};

// Get single notification
export const useNotification = (id: string) => {
  return useQuery<NotificationEntity>({
    queryKey: ['notifications', id],
    queryFn: async (): Promise<NotificationEntity> => {
      const notification = await notificationService.findById(id);
      if (!notification) {
        throw new Error(`Notification with id ${id} not found`);
      }
      return notification;
    },
    enabled: !!id,
    staleTime: 1 * 60 * 1000,
  });
};

// Mark notification as read
export const useMarkNotificationAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => notificationService.markAsRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
    onError: (error) => {
      console.error('Failed to mark notification as read:', error);
    },
  });
};

// Mark all notifications as read
export const useMarkAllNotificationsAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => notificationService.markAllAsRead(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
    onError: (error) => {
      console.error('Failed to mark all notifications as read:', error);
    },
  });
};

// Note: create/delete notification mutations have been removed as they are not used.
