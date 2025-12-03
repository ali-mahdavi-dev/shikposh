import { QueryClient, DefaultOptions } from '@tanstack/react-query';

/**
 * Default options for React Query
 * These can be overridden per query/mutation
 */
export const defaultQueryOptions: DefaultOptions = {
  queries: {
    // Data is considered fresh for 5 minutes
    staleTime: 5 * 60 * 1000, // 5 minutes

    // Cache data for 10 minutes after it becomes unused
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)

    // Don't refetch on window focus to prevent unnecessary requests
    refetchOnWindowFocus: false,

    // Don't refetch on mount if data is fresh
    refetchOnMount: false,

    // Always refetch on reconnect
    refetchOnReconnect: 'always',

    // Retry logic: don't retry on 4xx errors, retry up to 3 times for other errors
    retry: (failureCount, error) => {
      // Don't retry on 4xx errors (client errors)
      if (error instanceof Error && 'status' in error) {
        const status = (error as any).status;
        if (status >= 400 && status < 500) {
          return false;
        }
      }
      return failureCount < 3;
    },

    // Exponential backoff retry delay
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  },

  mutations: {
    // Retry mutations once
    retry: 1,

    // Retry delay for mutations
    retryDelay: 1000,
  },
};

/**
 * Creates a new QueryClient with default options
 *
 * @param options - Optional overrides for default options
 * @returns Configured QueryClient instance
 */
export function createQueryClient(options?: Partial<DefaultOptions>): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        ...defaultQueryOptions.queries,
        ...options?.queries,
      },
      mutations: {
        ...defaultQueryOptions.mutations,
        ...options?.mutations,
      },
    },
  });
}

/**
 * Default QueryClient instance
 * Use this in your QueryClientProvider
 */
export const queryClient = createQueryClient();
