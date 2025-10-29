// API base URL - defaults to json-server in development
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const api = {
  // Products
  getProducts: () => fetch(`${API_BASE_URL}/products`).then((res) => res.json()),
  getProduct: (id: string) => fetch(`${API_BASE_URL}/products/${id}`).then((res) => res.json()),
  getFeaturedProducts: () =>
    fetch(`${API_BASE_URL}/products?isFeatured=true`).then((res) => res.json()),
  getProductsByCategory: (category: string) => {
    if (category === 'all') {
      return fetch(`${API_BASE_URL}/products`).then((res) => res.json());
    }
    return fetch(`${API_BASE_URL}/products?category=${category}`).then((res) => res.json());
  },

  // Categories
  getCategories: () => fetch(`${API_BASE_URL}/categories`).then((res) => res.json()),

  // Reviews
  getReviews: (productId: string) =>
    fetch(`${API_BASE_URL}/reviews?productId=${productId}`).then((res) => res.json()),
  createReview: (review: {
    productId: string;
    user: string;
    rating: number;
    comment: string;
    date: string;
  }) =>
    fetch(`${API_BASE_URL}/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(review),
    }).then((res) => res.json()),
  updateReviewHelpful: (reviewId: number, type: 'helpful' | 'notHelpful') =>
    fetch(`${API_BASE_URL}/reviews/${reviewId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        [type === 'helpful' ? 'helpful' : 'notHelpful']: true, // This is simplified - in real app you'd increment
      }),
    }).then((res) => res.json()),

  // Chat Users
  getChatUsers: () => fetch(`${API_BASE_URL}/chatUsers`).then((res) => res.json()),

  // Posts
  getPosts: () => fetch(`${API_BASE_URL}/posts`).then((res) => res.json()),
  getPost: (id: string) => fetch(`${API_BASE_URL}/posts/${id}`).then((res) => res.json()),
  getFeaturedPosts: () => fetch(`${API_BASE_URL}/posts?isFeatured=true`).then((res) => res.json()),
  getPostsByCategory: (category: string) => {
    if (category === 'all') {
      return fetch(`${API_BASE_URL}/posts`).then((res) => res.json());
    }
    return fetch(`${API_BASE_URL}/posts?category=${category}`).then((res) => res.json());
  },

  // Playlists
  getPlaylists: () => fetch(`${API_BASE_URL}/playlists`).then((res) => res.json()),
  getPlaylist: (id: string) => fetch(`${API_BASE_URL}/playlists/${id}`).then((res) => res.json()),

  // Sellers
  getSellers: () => fetch(`${API_BASE_URL}/sellers`).then((res) => res.json()),
  getSeller: (id: string) => fetch(`${API_BASE_URL}/sellers/${id}`).then((res) => res.json()),
};
