import type { IHttpAdapter, RequestConfig } from './http.adapter';
import { getApiBaseUrl } from '@/shared/config/env';

/**
 * Server-side request configuration with Next.js cache support
 */
export interface ServerRequestConfig extends RequestConfig {
  tags?: string[];
  revalidate?: number | false;
}

/**
 * Server Fetch Adapter
 * HTTP adapter implementation for server-side requests with Next.js cache support
 * Extends FetchAdapter functionality with Next.js-specific cache tags and revalidation
 */
export class ServerFetchAdapter implements IHttpAdapter {
  private baseURL: string;
  private defaultHeaders: Record<string, string>;
  private defaultRevalidate: number | false;

  constructor(
    baseURL?: string,
    defaultHeaders?: Record<string, string>,
    defaultRevalidate: number | false = 3600, // Default 1 hour
  ) {
    this.baseURL = baseURL || getApiBaseUrl();
    this.defaultHeaders = defaultHeaders || {
      'Content-Type': 'application/json',
    };
    this.defaultRevalidate = defaultRevalidate;
  }

  async get<T>(url: string, config?: ServerRequestConfig): Promise<T> {
    return this.request<T>(url, {
      ...config,
      method: 'GET',
    });
  }

  async post<T>(url: string, data?: unknown, config?: ServerRequestConfig): Promise<T> {
    return this.request<T>(url, {
      ...config,
      method: 'POST',
      body: data,
    });
  }

  async put<T>(url: string, data?: unknown, config?: ServerRequestConfig): Promise<T> {
    return this.request<T>(url, {
      ...config,
      method: 'PUT',
      body: data,
    });
  }

  async patch<T>(url: string, data?: unknown, config?: ServerRequestConfig): Promise<T> {
    return this.request<T>(url, {
      ...config,
      method: 'PATCH',
      body: data,
    });
  }

  async delete<T>(url: string, config?: ServerRequestConfig): Promise<T> {
    return this.request<T>(url, {
      ...config,
      method: 'DELETE',
    });
  }

  async request<T>(
    url: string,
    config: ServerRequestConfig & { method?: string; body?: unknown },
  ): Promise<T> {
    const fullUrl = this.buildUrl(url, config.params);
    const headers = this.buildHeaders(config.headers);

    try {
      const fetchConfig: RequestInit = {
        method: config.method || 'GET',
        headers,
      };

      // Add body for POST, PUT, PATCH
      if (config.body && ['POST', 'PUT', 'PATCH'].includes(config.method || '')) {
        fetchConfig.body = JSON.stringify(config.body);
      }

      // Add Next.js cache options
      const nextOptions: { revalidate?: number | false; tags?: string[] } = {};
      if (config.revalidate !== undefined) {
        nextOptions.revalidate = config.revalidate;
      } else if (this.defaultRevalidate !== undefined) {
        nextOptions.revalidate = this.defaultRevalidate;
      }
      if (config.tags) {
        nextOptions.tags = config.tags;
      }

      const response = await fetch(fullUrl, {
        ...fetchConfig,
        next: Object.keys(nextOptions).length > 0 ? nextOptions : undefined,
      });

      // Handle non-OK responses
      if (!response.ok) {
        const errorData = await this.parseErrorResponse(response);
        throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
      }

      // Parse response
      const data = await this.parseResponse<T>(response);
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Unknown error occurred');
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
