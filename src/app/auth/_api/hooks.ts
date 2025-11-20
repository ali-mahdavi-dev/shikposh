import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AuthContainer } from './container';
import type { SendOtpRequest, VerifyOtpRequest, RegisterRequest, LoginRequest } from './entities';
import { useAppDispatch } from '@/stores/hooks';
import { logout } from '@/stores/slices/authSlice';
import { App } from 'antd';
import { getErrorMessage } from '@/shared/utils/error-handler';
import { clearTokens } from '@/shared/services/api.service';

const authService = AuthContainer.getAuthService();

export const useSendOtp = () => {
  return useMutation({
    mutationFn: (request: SendOtpRequest) => authService.sendOtp(request),
  });
};

export const useVerifyOtp = () => {
  const { message } = App.useApp();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: VerifyOtpRequest) => authService.verifyOtp(request),
    onSuccess: () => {
      // Don't automatically set credentials here
      // Let the component handle it based on userExists flag
      queryClient.invalidateQueries({ queryKey: ['auth', 'user'] });
    },
    onError: (error: any) => {
      // Log error for debugging
      console.error('Verify OTP Error:', {
        error: error,
        errorMessage: error?.message,
        errorType: error?.constructor?.name,
        errorString: String(error),
      });

      // Use the error handler utility to get the message
      const errorMessage = getErrorMessage(error) || 'خطا در تایید کد OTP';

      message.error(errorMessage);
    },
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: (request: RegisterRequest) => authService.register(request),
  });
};

export const useLogin = () => {
  const { message } = App.useApp();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: LoginRequest) => authService.login(request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auth', 'user'] });
    },
    onError: (error: any) => {
      message.error(error?.message || 'خطا در ورود');
    },
  });
};

export const useLogout = () => {
  const dispatch = useAppDispatch();
  const { message } = App.useApp();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      // Clear tokens
      clearTokens();
      dispatch(logout());
      queryClient.clear();
      message.success('خروج با موفقیت انجام شد');
    },
    onError: (error: any) => {
      message.error(error?.message || 'خطا در خروج');
      // Even if logout fails on server, clear local state
      clearTokens();
      dispatch(logout());
      queryClient.clear();
    },
  });
};

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ['auth', 'user'],
    queryFn: () => authService.getCurrentUser(),
    enabled: false, // Only fetch when explicitly called
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
