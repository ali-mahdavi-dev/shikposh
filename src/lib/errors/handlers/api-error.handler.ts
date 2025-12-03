import { AppError } from '../base';
import { BaseErrorHandlerStrategy } from '../strategies/error-handler.strategy';

/**
 * API Error Handler
 * Handles errors from API calls (AppError instances)
 */
export class ApiErrorHandler extends BaseErrorHandlerStrategy {
  canHandle(error: unknown): boolean {
    return error instanceof AppError;
  }

  protected handleError(error: unknown): AppError {
    if (error instanceof AppError) {
      return error;
    }

    return this.createDefaultError(error);
  }
}
