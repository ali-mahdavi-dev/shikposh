import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authContainer } from './container';
import { authKeys } from '@/lib/react-query/query-keys';
import { handleError } from '@/lib/errors';
import type { SendOtpRequest, VerifyOtpRequest, RegisterRequest, LoginRequest } from './entities';
import { useAppDispatch } from '@/stores/hooks';
import { logout } from '@/stores/features/auth';
import { App } from 'antd';
import { clearTokens } from '@/shared/services/api.service';

const authService = authContainer.getService();

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
      queryClient.invalidateQueries({ queryKey: authKeys.user() });
    },
    onError: (error: any) => {
      // Use enterprise error handling
      const appError = handleError(error);
      
      // Log error for debugging
      if (process.env.NODE_ENV === 'development') {
        console.error('Verify OTP Error:', appError.toJSON());
      }

      message.error(appError.message || 'خطا در تایید کد OTP');
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
      queryClient.invalidateQueries({ queryKey: authKeys.user() });
    },
    onError: (error: any) => {
      // Use enterprise error handling
      const appError = handleError(error);
      message.error(appError.message || 'خطا در ورود');
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
