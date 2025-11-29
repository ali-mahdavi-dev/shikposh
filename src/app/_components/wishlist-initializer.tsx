'use client';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import { setWishlist, clearWishlist, setSynced } from '@/stores/slices/wishlistSlice';
import { useWishlistQuery } from '@/app/wishlist/_api/hooks';
import { useQueryClient } from '@tanstack/react-query';
import { WISHLIST_QUERY_KEY } from '@/app/wishlist/_api/hooks';

/**
 * Component that initializes wishlist from API when user is authenticated
 * This ensures wishlist persists after page refresh and stays in sync
 */
export default function WishlistInitializer() {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const wishlistSynced = useAppSelector((state) => state.wishlist.synced);

  // Fetch wishlist if authenticated (always fetch to keep in sync)
  const { data: wishlistData, error } = useWishlistQuery(
    isAuthenticated ? { enabled: true } : { enabled: false },
  );

  useEffect(() => {
    // If we have wishlist data and user is authenticated, sync it to Redux
    if (isAuthenticated && wishlistData?.product_ids) {
      const productIds = wishlistData.product_ids.map((id) => String(id));
      dispatch(setWishlist(productIds));
    } else if (isAuthenticated && wishlistData?.product_ids === undefined && wishlistSynced) {
      // If API returns empty array or undefined, clear the wishlist
      dispatch(setWishlist([]));
    }
  }, [isAuthenticated, wishlistData, wishlistSynced, dispatch]);

  // Clear wishlist when user logs out
  useEffect(() => {
    if (!isAuthenticated && wishlistSynced) {
      dispatch(clearWishlist());
      // Clear the query cache when user logs out
      queryClient.removeQueries({ queryKey: WISHLIST_QUERY_KEY });
    }
  }, [isAuthenticated, wishlistSynced, dispatch, queryClient]);

  // Reset synced flag when authentication changes to allow re-fetching
  useEffect(() => {
    if (isAuthenticated && !wishlistSynced) {
      // This will be set to true when setWishlist is called
    } else if (!isAuthenticated && wishlistSynced) {
      dispatch(setSynced(false));
    }
  }, [isAuthenticated, wishlistSynced, dispatch]);

  // Log errors for debugging (only in development)
  useEffect(() => {
    if (error && process.env.NODE_ENV === 'development') {
      console.error('Failed to load wishlist:', error);
    }
  }, [error]);

  return null; // This component doesn't render anything
}
