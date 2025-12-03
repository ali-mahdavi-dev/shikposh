import { AppError } from '../base/app.error';

/**
 * Error Handler Strategy Interface
 * Different error handlers implement this interface
 */
export interface IErrorHandlerStrategy {
  /**
   * Handle an error and return a user-friendly message
   */
  handle(error: unknown): AppError;

  /**
   * Check if this handler can handle the error
   */
  canHandle(error: unknown): boolean;
}

/**
 * Base error handler strategy
 */
export abstract class BaseErrorHandlerStrategy implements IErrorHandlerStrategy {
  protected nextHandler?: IErrorHandlerStrategy;

  /**
   * Set the next handler in the chain
   */
  setNext(handler: IErrorHandlerStrategy): IErrorHandlerStrategy {
    this.nextHandler = handler;
    return handler;
  }

  /**
   * Handle error or pass to next handler
   */
  handle(error: unknown): AppError {
    if (this.canHandle(error)) {
      return this.handleError(error);
    }

    if (this.nextHandler) {
      return this.nextHandler.handle(error);
    }

    // Default fallback
    return this.createDefaultError(error);
  }

  /**
   * Abstract method to be implemented by subclasses
   */
  protected abstract handleError(error: unknown): AppError;

  /**
   * Check if this handler can handle the error
   */
  abstract canHandle(error: unknown): boolean;

  /**
   * Create a default error if no handler can process it
   */
  protected createDefaultError(error: unknown): AppError {
    if (error instanceof Error) {
      return AppError.internal(error.message, undefined, error);
    }
    return AppError.internal('An unknown error occurred');
  }
}
