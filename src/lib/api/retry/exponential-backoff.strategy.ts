/**
 * Exponential Backoff Retry Strategy
 * Implements enterprise retry logic with exponential backoff for API requests
 */

export interface ExponentialBackoffStrategyOptions {
  maxRetries: number;
  initialDelay: number;
  retryableStatusCodes?: number[];
  maxDelay?: number;
  multiplier?: number;
}

export class ExponentialBackoffStrategy {
  private maxRetries: number;
  private initialDelay: number;
  private retryableStatusCodes: number[];
  private maxDelay: number;
  private multiplier: number;

  constructor(options: ExponentialBackoffStrategyOptions) {
    this.maxRetries = options.maxRetries;
    this.initialDelay = options.initialDelay;
    this.retryableStatusCodes = options.retryableStatusCodes || [
      408, // Request Timeout
      429, // Too Many Requests
      500, // Internal Server Error
      502, // Bad Gateway
      503, // Service Unavailable
      504, // Gateway Timeout
    ];
    this.maxDelay = options.maxDelay || 30000; // 30 seconds max
    this.multiplier = options.multiplier || 2;
  }

  /**
   * Execute a function with exponential backoff retry logic
   * @param fn - The async function to execute
   * @returns The result of the function
   * @throws The last error if all retries fail
   */
  async execute<T>(fn: () => Promise<T>): Promise<T> {
    let lastError: Error | unknown;
    let delay = this.initialDelay;

    for (let attempt = 0; attempt <= this.maxRetries; attempt++) {
      try {
        return await fn();
      } catch (error) {
        lastError = error;

        // If this is the last attempt, throw the error
        if (attempt >= this.maxRetries) {
          throw error;
        }

        // Check if error has a status code and if it's retryable
        const statusCode = this.getStatusCodeFromError(error);
        if (statusCode && !this.retryableStatusCodes.includes(statusCode)) {
          // Not a retryable status code, throw immediately
          throw error;
        }

        // Calculate delay with exponential backoff
        const currentDelay = Math.min(delay, this.maxDelay);

        // Log retry attempt in development
        if (process.env.NODE_ENV === 'development') {
          console.warn(
            `Retry attempt ${attempt + 1}/${this.maxRetries} after ${currentDelay}ms`,
            statusCode ? `(Status: ${statusCode})` : '',
          );
        }

        // Wait before retrying
        await this.sleep(currentDelay);

        // Increase delay exponentially for next retry
        delay *= this.multiplier;
      }
    }

    // This should never be reached, but TypeScript needs it
    throw lastError;
  }

  /**
   * Extract status code from error object
   */
  private getStatusCodeFromError(error: unknown): number | null {
    if (error && typeof error === 'object') {
      // Check for statusCode property
      if ('statusCode' in error && typeof error.statusCode === 'number') {
        return error.statusCode;
      }
      // Check for status property
      if ('status' in error && typeof error.status === 'number') {
        return error.status;
      }
      // Check for response.status
      if ('response' in error && error.response && typeof error.response === 'object') {
        if ('status' in error.response && typeof error.response.status === 'number') {
          return error.response.status;
        }
        if ('statusCode' in error.response && typeof error.response.statusCode === 'number') {
          return error.response.statusCode;
        }
      }
    }
    return null;
  }

  /**
   * Sleep utility function
   */
  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
