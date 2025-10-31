import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { NotificationContainer } from './container';
import type { NotificationEntity } from './entities';

const notificationService = NotificationContainer.getNotificationService();

// Get all notifications
export const useNotifications = () => {
  return useQuery<NotificationEntity[]>({
    queryKey: ['notifications'],
    queryFn: () => notificationService.getAllNotifications(),
    staleTime: 1 * 60 * 1000, // 1 minute
    refetchInterval: 30 * 1000, // Refetch every 30 seconds for real-time updates
  });
};

// Get single notification
export const useNotification = (id: string) => {
  return useQuery<NotificationEntity>({
    queryKey: ['notifications', id],
    queryFn: () => notificationService.getNotificationById(id),
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

// Create notification
export const useCreateNotification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (notification: Omit<NotificationEntity, 'id' | 'createdAt' | 'read'>) =>
      notificationService.createNotification(notification),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
    onError: (error) => {
      console.error('Failed to create notification:', error);
    },
  });
};

// Delete notification
export const useDeleteNotification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => notificationService.deleteNotification(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
    onError: (error) => {
      console.error('Failed to delete notification:', error);
    },
  });
};

