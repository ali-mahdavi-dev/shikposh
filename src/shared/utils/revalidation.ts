/**
 * Base revalidation utility for Next.js SSG pages
 * Provides a clean, reusable way to revalidate static pages after mutations
 */

interface RevalidationOptions {
  tags?: string[];
  paths?: string[];
}

/**
 * Base revalidation function that handles the API call
 * @param options - Revalidation options including tags and paths
 */
export async function revalidate(options: RevalidationOptions = {}) {
  const { tags = [], paths = [] } = options;

  if (tags.length === 0 && paths.length === 0) {
    return; // Nothing to revalidate
  }

  try {
    await fetch('/api/revalidate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tags: tags.length > 0 ? tags : undefined,
        path: paths.length > 0 ? paths : undefined,
      }),
    });
  } catch (error) {
    // Silently fail - revalidation is not critical
    console.warn('Failed to revalidate SSG pages:', error);
  }
}

/**
 * Revalidate by tags only
 */
export async function revalidateByTags(tags: string[]) {
  return revalidate({ tags });
}

/**
 * Revalidate by paths only
 */
export async function revalidateByPaths(paths: string[]) {
  return revalidate({ paths });
}

/**
 * Revalidate both tags and paths
 */
export async function revalidateByTagsAndPaths(tags: string[], paths: string[]) {
  return revalidate({ tags, paths });
}
