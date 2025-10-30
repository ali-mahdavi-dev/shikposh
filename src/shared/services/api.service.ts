import { ApiError } from '../errors';
import { cacheService } from './cache.service';
import { getApiBaseUrl } from '../config/env';
import { handleApiError } from '../utils/error-handler';

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export class ApiService {
  private baseURL: string;

  constructor(baseURL: string = getApiBaseUrl()) {
    this.baseURL = baseURL;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;

    const defaultHeaders = {
      'Content-Type': 'application/json',
    };

    const config: RequestInit = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        // Attempt to parse structured error
        let serverMessage: string | undefined;
        try {
          const errorJson = await response.json();
          serverMessage = errorJson?.message || errorJson?.error || errorJson?.errors?.[0]?.message;
        } catch {
          // ignore body parse errors
        }

        const message = serverMessage || `${response.status} ${response.statusText}`;
        throw new ApiError(message, response.status);
      }

      // Gracefully handle empty body (204)
      if (response.status === 204) {
        return undefined as unknown as T;
      }

      const data = await response.json();
      return data as T;
    } catch (error) {
      const normalized = handleApiError(error);
      throw normalized;
    }
  }

  // GET request with caching
  async get<T>(
    endpoint: string,
    params?: Record<string, any>,
    useCache: boolean = true,
  ): Promise<T> {
    const url = new URL(`${this.baseURL}${endpoint}`);

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, String(value));
        }
      });
    }

    const cacheKey = `GET:${url.pathname + url.search}`;

    // Check cache first
    if (useCache) {
      const cachedData = cacheService.get<T>(cacheKey);
      if (cachedData) {
        return cachedData;
      }
    }

    const data = await this.request<T>(url.pathname + url.search);

    // Cache the result
    if (useCache) {
      cacheService.set(cacheKey, data, 5 * 60 * 1000); // 5 minutes
    }

    return data;
  }

  // POST request
  async post<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  // PUT request
  async put<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  // PATCH request
  async patch<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  // DELETE request
  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'DELETE',
    });
  }

  // Upload file
  async upload<T>(endpoint: string, file: File, additionalData?: Record<string, any>): Promise<T> {
    const formData = new FormData();
    formData.append('file', file);

    if (additionalData) {
      Object.entries(additionalData).forEach(([key, value]) => {
        formData.append(key, String(value));
      });
    }

    return this.request<T>(endpoint, {
      method: 'POST',
      headers: {}, // Let browser set Content-Type for FormData
      body: formData,
    });
  }
}

// Singleton instance
export const apiService = new ApiService();
