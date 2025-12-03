/**
 * HTTP Adapter Interface
 * Abstract interface for HTTP client implementations
 */
export interface IHttpAdapter {
  /**
   * Make a GET request
   */
  get<T>(url: string, config?: RequestConfig): Promise<T>;

  /**
   * Make a POST request
   */
  post<T>(url: string, data?: unknown, config?: RequestConfig): Promise<T>;

  /**
   * Make a PUT request
   */
  put<T>(url: string, data?: unknown, config?: RequestConfig): Promise<T>;

  /**
   * Make a PATCH request
   */
  patch<T>(url: string, data?: unknown, config?: RequestConfig): Promise<T>;

  /**
   * Make a DELETE request
   */
  delete<T>(url: string, config?: RequestConfig): Promise<T>;

  /**
   * Make a custom request
   */
  request<T>(url: string, config: RequestConfig): Promise<T>;
}

/**
 * Request configuration
 */
export interface RequestConfig {
  headers?: Record<string, string>;
  params?: Record<string, string | number | boolean>;
  timeout?: number;
  signal?: AbortSignal;
  retry?: boolean;
  retryCount?: number;
}

