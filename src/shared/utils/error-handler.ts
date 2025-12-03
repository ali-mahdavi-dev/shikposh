import { handleError as enterpriseHandleError, type AppError } from '@/lib/errors';

/**
 * Legacy error handler - now uses enterprise error handling
 * @deprecated Use handleError from @/lib/errors directly
 */
export const handleApiError = (error: unknown): AppError => {
  // Use enterprise error handling
  return enterpriseHandleError(error);
};

/**
 * Get error message - uses enterprise error handling
 */
export const getErrorMessage = (error: unknown): string => {
  const appError = enterpriseHandleError(error);
  return appError.message;
};

/**
 * Get error status code - uses enterprise error handling
 */
export const getErrorStatus = (error: unknown): number => {
  const appError = enterpriseHandleError(error);
  return appError.statusCode;
};
