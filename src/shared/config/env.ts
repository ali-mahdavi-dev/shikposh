// Centralized environment configuration for API endpoints

const isServer = typeof window === 'undefined';
let hasWarnedAboutApiBaseUrl = false;

export function getApiBaseUrl(): string {
  // Prefer server-only var, fall back to public for client compatibility
  const fromServer = process.env.API_BASE_URL;
  const fromPublic = process.env.NEXT_PUBLIC_API_URL;

  let baseUrl = fromServer || fromPublic || '';

  if (!baseUrl) {
    const isDev = process.env.NODE_ENV !== 'production';
    // Provide a sensible dev default to avoid crashes during local development
    if (isDev) {
      baseUrl = 'http://localhost:3001';
      if (!hasWarnedAboutApiBaseUrl) {
        hasWarnedAboutApiBaseUrl = true;
        console.warn(
          'API base URL not set. Falling back to http://localhost:3001 for development. '
            + 'Set API_BASE_URL or NEXT_PUBLIC_API_URL to override.',
        );
      }
    } else {
      const message =
        'Missing API base URL. Set API_BASE_URL (server) or NEXT_PUBLIC_API_URL (client) in your environment.';
      if (isServer) {
        throw new Error(message);
      }
      // In the browser, avoid throwing synchronously; return empty to surface at call sites
      if (!hasWarnedAboutApiBaseUrl) {
        hasWarnedAboutApiBaseUrl = true;
        console.warn(message);
      }
    }
  }

  return baseUrl;
}


