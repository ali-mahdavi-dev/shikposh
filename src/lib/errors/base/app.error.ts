import { ErrorType, ErrorSeverity, type ErrorContext } from './error.types';

/**
 * Base application error class
 * All application errors should extend this class
 */
export class AppError extends Error {
  public readonly type: ErrorType;
  public readonly statusCode: number;
  public readonly severity: ErrorSeverity;
  public readonly isOperational: boolean;
  public readonly context?: ErrorContext;
  public readonly originalError?: Error;

  constructor(
    message: string,
    type: ErrorType = ErrorType.INTERNAL,
    statusCode: number = 500,
    severity: ErrorSeverity = ErrorSeverity.MEDIUM,
    isOperational: boolean = true,
    context?: ErrorContext,
    originalError?: Error,
  ) {
    super(message);
    this.name = this.constructor.name;
    this.type = type;
    this.statusCode = statusCode;
    this.severity = severity;
    this.isOperational = isOperational;
    this.context = context;
    this.originalError = originalError;

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  /**
   * Convert error to JSON for logging/API responses
   */
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      type: this.type,
      statusCode: this.statusCode,
      severity: this.severity,
      context: this.context,
      stack: this.stack,
    };
  }

  /**
   * Static factory methods for common error types
   */
  static validation(message: string, context?: ErrorContext): AppError {
    return new AppError(message, ErrorType.VALIDATION, 400, ErrorSeverity.LOW, true, context);
  }

  static notFound(message: string = 'Resource not found', context?: ErrorContext): AppError {
    return new AppError(message, ErrorType.NOT_FOUND, 404, ErrorSeverity.LOW, true, context);
  }

  static conflict(message: string, context?: ErrorContext): AppError {
    return new AppError(message, ErrorType.CONFLICT, 409, ErrorSeverity.MEDIUM, true, context);
  }

  static unauthorized(message: string = 'Unauthorized', context?: ErrorContext): AppError {
    return new AppError(message, ErrorType.UNAUTHORIZED, 401, ErrorSeverity.MEDIUM, true, context);
  }

  static forbidden(message: string = 'Forbidden', context?: ErrorContext): AppError {
    return new AppError(message, ErrorType.FORBIDDEN, 403, ErrorSeverity.MEDIUM, true, context);
  }

  static timeout(message: string = 'Request timeout', context?: ErrorContext): AppError {
    return new AppError(message, ErrorType.TIMEOUT, 408, ErrorSeverity.MEDIUM, true, context);
  }

  static rateLimit(message: string = 'Rate limit exceeded', context?: ErrorContext): AppError {
    return new AppError(message, ErrorType.RATE_LIMIT, 429, ErrorSeverity.MEDIUM, true, context);
  }

  static tooLarge(message: string = 'Request entity too large', context?: ErrorContext): AppError {
    return new AppError(message, ErrorType.TOO_LARGE, 413, ErrorSeverity.MEDIUM, true, context);
  }

  static internal(
    message: string = 'Internal server error',
    context?: ErrorContext,
    originalError?: Error,
  ): AppError {
    return new AppError(
      message,
      ErrorType.INTERNAL,
      500,
      ErrorSeverity.HIGH,
      false,
      context,
      originalError,
    );
  }

  static network(
    message: string = 'Network error',
    context?: ErrorContext,
    originalError?: Error,
  ): AppError {
    return new AppError(
      message,
      ErrorType.NETWORK,
      0,
      ErrorSeverity.HIGH,
      true,
      context,
      originalError,
    );
  }

  static badRequest(message: string = 'Bad request', context?: ErrorContext): AppError {
    return new AppError(message, ErrorType.BAD_REQUEST, 400, ErrorSeverity.LOW, true, context);
  }
}

/**
 * Specific error classes for common HTTP error types
 * These extend AppError and provide convenient constructors
 */
export class BadRequestError extends AppError {
  constructor(message: string = 'Bad request', context?: ErrorContext) {
    super(message, ErrorType.BAD_REQUEST, 400, ErrorSeverity.LOW, true, context);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string = 'Unauthorized', context?: ErrorContext) {
    super(message, ErrorType.UNAUTHORIZED, 401, ErrorSeverity.MEDIUM, true, context);
  }
}

export class ForbiddenError extends AppError {
  constructor(message: string = 'Forbidden', context?: ErrorContext) {
    super(message, ErrorType.FORBIDDEN, 403, ErrorSeverity.MEDIUM, true, context);
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = 'Resource not found', context?: ErrorContext) {
    super(message, ErrorType.NOT_FOUND, 404, ErrorSeverity.LOW, true, context);
  }
}

export class InternalError extends AppError {
  constructor(
    message: string = 'Internal server error',
    context?: ErrorContext,
    originalError?: Error,
  ) {
    super(message, ErrorType.INTERNAL, 500, ErrorSeverity.HIGH, false, context, originalError);
  }
}

export class NetworkError extends AppError {
  constructor(message: string = 'Network error', context?: ErrorContext, originalError?: Error) {
    super(message, ErrorType.NETWORK, 0, ErrorSeverity.HIGH, true, context, originalError);
  }
}
