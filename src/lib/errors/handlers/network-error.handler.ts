import { AppError } from '../base';
import { BaseErrorHandlerStrategy } from '../strategies/error-handler.strategy';

/**
 * Network Error Handler
 * Handles network-related errors (fetch failures, timeouts, etc.)
 */
export class NetworkErrorHandler extends BaseErrorHandlerStrategy {
  canHandle(error: unknown): boolean {
    if (error instanceof Error) {
      const message = error.message.toLowerCase();
      return (
        message.includes('fetch') ||
        message.includes('network') ||
        message.includes('connection') ||
        message.includes('timeout') ||
        message.includes('failed to fetch')
      );
    }
    return false;
  }

  protected handleError(error: unknown): AppError {
    if (error instanceof Error) {
      const message = error.message.toLowerCase();
      let errorMessage = 'خطا در اتصال به سرور';

      if (message.includes('timeout')) {
        errorMessage = 'زمان اتصال به سرور به پایان رسید';
        return AppError.timeout(errorMessage, { originalMessage: error.message });
      }

      if (message.includes('failed to fetch') || message.includes('network')) {
        errorMessage = 'خطا در اتصال به شبکه';
      }

      return AppError.network(errorMessage, { originalMessage: error.message }, error);
    }

    return this.createDefaultError(error);
  }
}
