// Server-side fetch utilities for SSG/ISR
import { getApiBaseUrl } from '../config/env';

interface FetchOptions {
  revalidate?: number | false;
  tags?: string[];
}

export async function serverFetch<T>(
  endpoint: string,
  options: FetchOptions = {},
): Promise<T | null> {
  const baseUrl = getApiBaseUrl();
  const url = `${baseUrl}${endpoint}`;

  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      next: {
        revalidate: options.revalidate ?? 3600, // Default 1 hour
        tags: options.tags,
      },
    });

    if (!response.ok) {
      console.error(`Server fetch error: ${response.status} ${response.statusText}`);
      return null;
    }

    const data = await response.json();

    // Handle backend ResponseResult structure
    if (data && typeof data === 'object' && 'success' in data) {
      if (data.success && data.data !== undefined) {
        return data.data as T;
      }
      return null;
    }

    return data as T;
  } catch (error) {
    console.error('Server fetch error:', error);
    return null;
  }
}
