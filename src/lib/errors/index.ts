/**
 * Errors module exports
 */

export * from './base';
export * from './strategies';
export * from './handlers';

/**
 * Error handler chain factory
 * Creates a chain of error handlers
 */
import { ApiErrorHandler } from './handlers/api-error.handler';
import { ValidationErrorHandler } from './handlers/validation-error.handler';
import { NetworkErrorHandler } from './handlers/network-error.handler';
import type { IErrorHandlerStrategy } from './strategies/error-handler.strategy';
import { BaseErrorHandlerStrategy } from './strategies/error-handler.strategy';
import { AppError } from './base';

/**
 * Create default error handler chain
 */
export function createErrorHandlerChain(): IErrorHandlerStrategy {
  const validationHandler = new ValidationErrorHandler();
  const networkHandler = new NetworkErrorHandler();
  const apiHandler = new ApiErrorHandler();

  // Chain: Validation -> Network -> API
  (validationHandler as BaseErrorHandlerStrategy).setNext(networkHandler);
  (networkHandler as BaseErrorHandlerStrategy).setNext(apiHandler);

  return validationHandler;
}

/**
 * Default error handler instance
 */
export const defaultErrorHandler = createErrorHandlerChain();

/**
 * Handle any error using the default handler chain
 */
export function handleError(error: unknown): AppError {
  return defaultErrorHandler.handle(error);
}
