/**
 * React Query Mutation Utilities
 * Common mutation patterns and utilities
 */

import { useMutation, useQueryClient, type UseMutationOptions } from '@tanstack/react-query';
import type { productKeys, orderKeys, wishlistKeys, cartKeys } from './query-keys';

/**
 * Generic mutation with cache invalidation
 */
export function useMutationWithInvalidation<TData, TVariables, TError = Error>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  invalidateQueries: string[][],
  options?: Omit<UseMutationOptions<TData, TError, TVariables>, 'mutationFn'>,
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn,
    onSuccess: () => {
      // Invalidate specified query keys
      invalidateQueries.forEach((queryKey) => {
        queryClient.invalidateQueries({ queryKey });
      });
    },
    ...options,
  });
}

/**
 * Optimistic update mutation
 */
export function useOptimisticMutation<TData, TVariables, TError = Error>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  optimisticUpdate: {
    queryKey: unknown[];
    updater: (oldData: TData | undefined, variables: TVariables) => TData;
  },
  options?: Omit<UseMutationOptions<TData, TError, TVariables>, 'mutationFn'>,
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn,
    onMutate: async (variables) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: optimisticUpdate.queryKey });

      // Snapshot previous value
      const previousData = queryClient.getQueryData<TData>(optimisticUpdate.queryKey);

      // Optimistically update
      queryClient.setQueryData<TData>(
        optimisticUpdate.queryKey,
        (old) => optimisticUpdate.updater(old, variables),
      );

      return { previousData };
    },
    onError: (err, variables, context) => {
      // Rollback on error
      if (context?.previousData) {
        queryClient.setQueryData(optimisticUpdate.queryKey, context.previousData);
      }
      options?.onError?.(err, variables, context);
    },
    onSettled: () => {
      // Refetch after mutation
      queryClient.invalidateQueries({ queryKey: optimisticUpdate.queryKey });
      options?.onSettled?.();
    },
    ...options,
  });
}

