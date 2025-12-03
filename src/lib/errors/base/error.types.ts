/**
 * Error types enum
 */

export enum ErrorType {
  VALIDATION = 'validation',
  NOT_FOUND = 'not_found',
  CONFLICT = 'conflict',
  UNAUTHORIZED = 'unauthorized',
  FORBIDDEN = 'forbidden',
  TIMEOUT = 'timeout',
  RATE_LIMIT = 'rate_limit',
  TOO_LARGE = 'too_large',
  INTERNAL = 'internal',
  METHOD_NOT_ALLOWED = 'method_not_allowed',
  NETWORK = 'network',
  BAD_REQUEST = 'bad_request',
}

/**
 * Error severity levels
 */
export enum ErrorSeverity {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical',
}

/**
 * Error context for additional information
 */
export interface ErrorContext {
  [key: string]: unknown;
  requestId?: string;
  userId?: string;
  timestamp?: string;
  path?: string;
  method?: string;
}
