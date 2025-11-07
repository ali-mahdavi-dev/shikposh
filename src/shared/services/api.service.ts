import { ApiError } from '../errors';
import { cacheService } from './cache.service';
import { getApiBaseUrl } from '../config/env';
import { handleApiError } from '../utils/error-handler';

// HTTPError structure matching backend HTTPError
export interface HTTPError {
  code: string;
  message: string;
  detail: string;
  status: string;
  request_id?: string;
}

// Base response structure matching backend ResponseResult
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  total?: number;
  page?: number;
  pages?: number;
  error?: HTTPError;
}

// Paginated response structure matching backend ResponseResult with pagination
export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  total: number;
  page: number;
  pages: number;
  error?: HTTPError;
}

const statusMap: Record<string, number> = {
  'Bad Request': 400,
  Unauthorized: 401,
  'Payment Required': 402,
  Forbidden: 403,
  'Not Found': 404,
  'Method Not Allowed': 405,
  Conflict: 409,
  'Request Entity Too Large': 413,
  'Request Timeout': 408,
  'Too Many Requests': 429,
  'Internal Server Error': 500,
};

const defaultHeaders = {
  'Content-Type': 'application/json',
};

// Helper function to convert HTTP status text to status code
function statusTextToCode(statusText: string): number {
  return statusMap[statusText] || 500;
}

export class ApiService {
  private baseURL: string;

  constructor(baseURL: string = getApiBaseUrl()) {
    this.baseURL = baseURL;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;

    const config: RequestInit = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);

      // Gracefully handle empty body (204)
      if (response.status === 204) {
        return undefined as unknown as T;
      }

      const data = await response.json();

      // Check if response follows backend ResponseResult structure
      if (data && typeof data === 'object' && 'success' in data) {
        const apiResponse = data as ApiResponse<any>;

        // If there's an error in the response, throw it
        if (apiResponse.error) {
          const httpError = apiResponse.error;
          throw new ApiError(
            httpError.message || httpError.detail || 'خطای سرور',
            statusTextToCode(httpError.status),
          );
        }

        // If success is false but no error object, treat as error
        if (!apiResponse.success) {
          throw new ApiError('درخواست با خطا مواجه شد', response.status);
        }

        // If response has pagination fields (total, page, pages), return full structure
        // This handles PaginatedResponse cases
        if (
          apiResponse.total !== undefined ||
          apiResponse.page !== undefined ||
          apiResponse.pages !== undefined
        ) {
          return apiResponse as T;
        }

        // Otherwise, extract and return just the data field
        // This handles simple ApiResponse cases where user expects just the data
        return (apiResponse.data !== undefined ? apiResponse.data : apiResponse) as T;
      }

      // If response is not ok and doesn't follow ResponseResult structure
      if (!response.ok) {
        // Attempt to parse structured error
        let serverMessage: string | undefined;
        try {
          if (data && typeof data === 'object') {
            serverMessage = data?.message || data?.error?.message || data?.errors?.[0]?.message;
          }
        } catch {
          // ignore body parse errors
        }

        const message = serverMessage || `${response.status} ${response.statusText}`;
        throw new ApiError(message, response.status);
      }

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
