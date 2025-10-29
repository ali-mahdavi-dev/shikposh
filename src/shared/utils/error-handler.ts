import { ApiError } from '../errors';

export const handleApiError = (error: unknown): ApiError => {
  if (error instanceof ApiError) {
    return error;
  }

  if (error instanceof Error) {
    // Network errors
    if (error.message.includes('fetch')) {
      return ApiError.networkError('خطا در اتصال به سرور');
    }

    // JSON parsing errors
    if (error.message.includes('JSON')) {
      return ApiError.internal('خطا در پردازش داده‌ها');
    }

    // Generic error
    return ApiError.internal(error.message);
  }

  return ApiError.internal('خطای ناشناخته');
};

export const getErrorMessage = (error: unknown): string => {
  const apiError = handleApiError(error);
  return apiError.message;
};

export const getErrorStatus = (error: unknown): number => {
  const apiError = handleApiError(error);
  return apiError.statusCode;
};
