// Centralized environment configuration for API endpoints

const isServer = typeof window === 'undefined';

// Use global to track warning across module reloads in Next.js (survives HMR)
declare global {
  // eslint-disable-next-line no-var
  var __apiBaseUrlWarned: boolean | undefined;
}

export function getApiBaseUrl(): string {
  // Prefer server-only var, fall back to public for client compatibility
  const fromServer = process.env.API_BASE_URL;
  const fromPublic = process.env.NEXT_PUBLIC_API_URL;

  let baseUrl = fromServer || fromPublic || '';

  if (!baseUrl) {
    const isDev = process.env.NODE_ENV !== 'production';
    // Provide a sensible dev default to avoid crashes during local development
    if (isDev) {
      baseUrl = 'http://localhost:8000';
      // Only log once per process (survives HMR in Next.js)
      if (!global.__apiBaseUrlWarned) {
        global.__apiBaseUrlWarned = true;
        console.log(
          '[API Config] Using default API base URL: http://localhost:8000 (backend). ' +
            'To override, set API_BASE_URL or NEXT_PUBLIC_API_URL in your environment.',
        );
      }
    } else {
      const message =
        'Missing API base URL. Set API_BASE_URL (server) or NEXT_PUBLIC_API_URL (client) in your environment.';
      if (isServer) {
        throw new Error(message);
      }
      // In the browser, avoid throwing synchronously; return empty to surface at call sites
      if (!global.__apiBaseUrlWarned) {
        global.__apiBaseUrlWarned = true;
        console.warn(message);
      }
    }
  }

  return baseUrl;
}
