import { z } from 'zod';
import { AppError } from '../base';
import { BaseErrorHandlerStrategy } from '../strategies/error-handler.strategy';

/**
 * Validation Error Handler
 * Handles Zod validation errors
 */
export class ValidationErrorHandler extends BaseErrorHandlerStrategy {
  canHandle(error: unknown): boolean {
    return error instanceof z.ZodError;
  }

  protected handleError(error: unknown): AppError {
    if (error instanceof z.ZodError) {
      const messages = error.issues.map((err) => {
        const path = err.path.join('.');
        return path ? `${path}: ${err.message}` : err.message;
      });

      const message = messages.join('; ');
      const context = {
        errors: error.issues,
        formattedErrors: messages,
      };

      return AppError.validation(message, context);
    }

    return this.createDefaultError(error);
  }
}
