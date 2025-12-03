import type { IHttpAdapter, RequestConfig } from './http.adapter';
import { getApiBaseUrl } from '@/shared/config/env';

/**
 * Fetch Adapter
 * HTTP adapter implementation using native Fetch API
 */
export class FetchAdapter implements IHttpAdapter {
  private baseURL: string;
  private defaultHeaders: Record<string, string>;
  private defaultTimeout: number;

  constructor(
    baseURL?: string,
    defaultHeaders?: Record<string, string>,
    defaultTimeout: number = 30000,
  ) {
    this.baseURL = baseURL || getApiBaseUrl();
    this.defaultHeaders = defaultHeaders || {
      'Content-Type': 'application/json',
    };
    this.defaultTimeout = defaultTimeout;
  }

  async get<T>(url: string, config?: RequestConfig): Promise<T> {
    return this.request<T>(url, {
      ...config,
      method: 'GET',
    });
  }

  async post<T>(url: string, data?: unknown, config?: RequestConfig): Promise<T> {
    return this.request<T>(url, {
      ...config,
      method: 'POST',
      body: data,
    });
  }

  async put<T>(url: string, data?: unknown, config?: RequestConfig): Promise<T> {
    return this.request<T>(url, {
      ...config,
      method: 'PUT',
      body: data,
    });
  }

  async patch<T>(url: string, data?: unknown, config?: RequestConfig): Promise<T> {
    return this.request<T>(url, {
      ...config,
      method: 'PATCH',
      body: data,
    });
  }

  async delete<T>(url: string, config?: RequestConfig): Promise<T> {
    return this.request<T>(url, {
      ...config,
      method: 'DELETE',
    });
  }

  async request<T>(
    url: string,
    config: RequestConfig & { method?: string; body?: unknown },
  ): Promise<T> {
    const fullUrl = this.buildUrl(url, config.params);
    const headers = this.buildHeaders(config.headers);
    const timeout = config.timeout || this.defaultTimeout;

    // Create abort controller for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const fetchConfig: RequestInit = {
        method: config.method || 'GET',
        headers,
        signal: config.signal || controller.signal,
      };

      // Add body for POST, PUT, PATCH
      if (config.body && ['POST', 'PUT', 'PATCH'].includes(config.method || '')) {
        fetchConfig.body = JSON.stringify(config.body);
      }

      const response = await fetch(fullUrl, fetchConfig);
      clearTimeout(timeoutId);

      // Handle non-OK responses
      if (!response.ok) {
        const errorData = await this.parseErrorResponse(response);
        throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
      }

      // Parse response
      const data = await this.parseResponse<T>(response);
      return data;
    } catch (error) {
      clearTimeout(timeoutId);

      if (error instanceof Error && error.name === 'AbortError') {
        throw new Error(`Request timeout after ${timeout}ms`);
      }

      throw error;
    }
  }

  /**
   * Build full URL with query parameters
   */
  private buildUrl(url: string, params?: Record<string, string | number | boolean>): string {
    const baseUrl = url.startsWith('http') ? url : `${this.baseURL}${url}`;
    const urlObj = new URL(baseUrl);

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          urlObj.searchParams.append(key, String(value));
        }
      });
    }

    return urlObj.toString();
  }

  /**
   * Build headers
   */
  private buildHeaders(customHeaders?: Record<string, string>): HeadersInit {
    const headers = new Headers(this.defaultHeaders);

    if (customHeaders) {
      Object.entries(customHeaders).forEach(([key, value]) => {
        headers.set(key, value);
      });
    }

    return headers;
  }

  /**
   * Parse response based on content type
   */
  private async parseResponse<T>(response: Response): Promise<T> {
    const contentType = response.headers.get('content-type');

    if (contentType?.includes('application/json')) {
      const data = await response.json();

      // Handle backend ResponseResult structure
      if (data && typeof data === 'object' && 'success' in data) {
        if (data.success && data.data !== undefined) {
          return data.data as T;
        }
        throw new Error(data.error?.message || 'Request failed');
      }

      return data as T;
    }

    if (contentType?.includes('text/')) {
      return (await response.text()) as unknown as T;
    }

    return (await response.blob()) as unknown as T;
  }

  /**
   * Parse error response
   */
  private async parseErrorResponse(
    response: Response,
  ): Promise<{ message: string; details?: unknown }> {
    try {
      const contentType = response.headers.get('content-type');
      if (contentType?.includes('application/json')) {
        const data = await response.json();
        return {
          message: data.error?.message || data.message || response.statusText,
          details: data.error?.details || data,
        };
      }
      const text = await response.text();
      return { message: text || response.statusText };
    } catch {
      return { message: response.statusText };
    }
  }
}
