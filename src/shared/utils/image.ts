/**
 * Beautiful SVG placeholders for different use cases
 * Standard approach used by most websites (like placeholder.com, via.placeholder.com)
 * Each type has its own design and color scheme
 */

// Product placeholder - shopping bag icon with pink/purple gradient
const PRODUCT_PLACEHOLDER = `data:image/svg+xml,%3Csvg width='400' height='400' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3ClinearGradient id='productGrad' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23fce7f3;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23f3e8ff;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23productGrad)'/%3E%3Cg fill='%23ec4899' opacity='0.6'%3E%3Cpath d='M 200 120 L 240 120 L 240 160 L 200 160 Z M 160 160 L 280 160 L 280 200 L 160 200 Z M 160 200 L 180 320 L 220 320 L 200 200 Z M 220 200 L 260 320 L 220 320 Z'/%3E%3Cpath d='M 180 160 L 180 140 L 220 140 L 220 160' stroke='%23ec4899' stroke-width='3' fill='none'/%3E%3C/g%3E%3C/svg%3E`;

// Avatar placeholder - user icon with blue gradient
const AVATAR_PLACEHOLDER = `data:image/svg+xml,%3Csvg width='400' height='400' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3ClinearGradient id='avatarGrad' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23dbeafe;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23e0e7ff;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23avatarGrad)'/%3E%3Cg fill='%233b82f6' opacity='0.7'%3E%3Ccircle cx='200' cy='150' r='50'/%3E%3Cpath d='M 100 320 Q 100 280 200 280 Q 300 280 300 320 L 300 400 L 100 400 Z'/%3E%3C/g%3E%3C/svg%3E`;

// Seller placeholder - shop/store icon with orange gradient
const SELLER_PLACEHOLDER = `data:image/svg+xml,%3Csvg width='400' height='400' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3ClinearGradient id='sellerGrad' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23fef3c7;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23fed7aa;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23sellerGrad)'/%3E%3Cg fill='%23f59e0b' opacity='0.7'%3E%3Cpath d='M 120 200 L 120 320 L 280 320 L 280 200 L 200 120 Z'/%3E%3Crect x='160' y='240' width='80' height='60' fill='%23f59e0b' opacity='0.3'/%3E%3Ccircle cx='200' cy='270' r='8' fill='%23f59e0b'/%3E%3C/g%3E%3C/svg%3E`;

// Category placeholder - grid icon with purple gradient
const CATEGORY_PLACEHOLDER = `data:image/svg+xml,%3Csvg width='400' height='400' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3ClinearGradient id='categoryGrad' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23f3e8ff;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23e9d5ff;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23categoryGrad)'/%3E%3Cg fill='%23a855f7' opacity='0.6'%3E%3Crect x='120' y='120' width='80' height='80' rx='8'/%3E%3Crect x='220' y='120' width='80' height='80' rx='8'/%3E%3Crect x='120' y='220' width='80' height='80' rx='8'/%3E%3Crect x='220' y='220' width='80' height='80' rx='8'/%3E%3C/g%3E%3C/svg%3E`;

// Post placeholder - image icon with green gradient
const POST_PLACEHOLDER = `data:image/svg+xml,%3Csvg width='400' height='400' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3ClinearGradient id='postGrad' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23d1fae5;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23a7f3d0;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23postGrad)'/%3E%3Cg fill='%2310b981' opacity='0.6'%3E%3Crect x='120' y='120' width='160' height='120' rx='8'/%3E%3Cpath d='M 120 120 L 200 180 L 280 120' stroke='%2310b981' stroke-width='3' fill='none'/%3E%3Ccircle cx='240' cy='160' r='15' fill='%2310b981'/%3E%3C/g%3E%3C/svg%3E`;

// Banner placeholder - wide image icon with gradient
const BANNER_PLACEHOLDER = `data:image/svg+xml,%3Csvg width='800' height='400' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3ClinearGradient id='bannerGrad' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23fce7f3;stop-opacity:1' /%3E%3Cstop offset='50%25' style='stop-color:%23f3e8ff;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23e0e7ff;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23bannerGrad)'/%3E%3Cg fill='%239c88ff' opacity='0.5'%3E%3Crect x='200' y='100' width='400' height='200' rx='12'/%3E%3Cpath d='M 300 200 L 400 150 L 500 200 L 400 250 Z'/%3E%3C/g%3E%3C/svg%3E`;

/**
 * Default image paths for different use cases
 * Each type has its own beautiful placeholder design
 */
export const DEFAULT_IMAGES = {
  product: PRODUCT_PLACEHOLDER,
  avatar: AVATAR_PLACEHOLDER,
  seller: SELLER_PLACEHOLDER,
  category: CATEGORY_PLACEHOLDER,
  post: POST_PLACEHOLDER,
  banner: BANNER_PLACEHOLDER,
  general: PRODUCT_PLACEHOLDER,
} as const;

/**
 * List of allowed hostnames for external images (must match next.config.ts remotePatterns)
 * This prevents Next.js Image errors for unconfigured hostnames
 */
const ALLOWED_HOSTNAMES = [
  'localhost',
  'images.unsplash.com',
  'images.pexels.com',
  'picsum.photos',
  'via.placeholder.com',
];

/**
 * Checks if a hostname is allowed for Next.js Image component
 */
function isAllowedHostname(url: string): boolean {
  try {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname.replace(/^www\./, ''); // Remove www. prefix

    // Check if hostname matches any allowed hostname
    return ALLOWED_HOSTNAMES.some((allowed) => {
      // Exact match or subdomain match (e.g., localhost matches localhost:8000)
      return hostname === allowed || hostname.startsWith(`${allowed}:`);
    });
  } catch {
    return false;
  }
}

/**
 * Validates if a relative path looks like a valid image path
 * Filters out obviously invalid paths like very short filenames or suspicious patterns
 */
function isValidRelativeImagePath(path: string): boolean {
  // Remove leading slash for validation
  const pathWithoutSlash = path.startsWith('/') ? path.slice(1) : path;

  // Reject empty or very short paths
  if (!pathWithoutSlash || pathWithoutSlash.length < 4) {
    return false;
  }

  // Common image extensions
  const imageExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg', '.avif', '.ico'];
  const hasImageExtension = imageExtensions.some((ext) =>
    pathWithoutSlash.toLowerCase().endsWith(ext),
  );

  // If it has an image extension, validate the filename
  if (hasImageExtension) {
    // Get the filename (last part after /)
    const filename = pathWithoutSlash.split('/').pop() || pathWithoutSlash;
    const nameWithoutExt = filename.replace(/\.[^.]+$/, '');

    // Reject very short filenames (like "sss.png" - only 3 chars before extension)
    // Allow at least 4 characters in the filename (before extension)
    if (nameWithoutExt.length < 4) {
      return false;
    }
    return true;
  }

  // If no extension, check if it looks like a directory path without proper filename (reject)
  // Paths like "/addr/png" should be rejected (has slash but no proper extension)
  if (pathWithoutSlash.includes('/')) {
    // If it has slashes but no image extension, it's likely invalid
    return false;
  }

  // For paths without clear extension but reasonable length and no slashes, allow them
  // (might be API endpoints that serve images, but be conservative)
  return pathWithoutSlash.length >= 8;
}

/**
 * Validates and normalizes image URLs for Next.js Image component
 * Next.js Image requires either:
 * - A relative path starting with "/"
 * - An absolute URL starting with "http://" or "https://" with allowed hostname
 * - A data URI (data:image/...)
 *
 * @param src - The image source URL to validate
 * @param defaultSrc - The default image path to use if src is invalid (default: DEFAULT_IMAGES.general)
 * @returns A valid image URL
 */
export function getValidImageSrc(
  src: string | undefined | null,
  defaultSrc: string = DEFAULT_IMAGES.general,
): string {
  if (!src) {
    return defaultSrc;
  }

  // Data URIs are always valid (e.g., data:image/svg+xml,...)
  if (src.startsWith('data:')) {
    return src;
  }

  // Check if it's a valid relative path (starts with /)
  if (src.startsWith('/')) {
    // Validate that the relative path looks reasonable
    if (isValidRelativeImagePath(src)) {
      return src;
    }
    // If path looks invalid, return default
    return defaultSrc;
  }

  // Check if it's an absolute URL with allowed hostname
  if (src.startsWith('http://') || src.startsWith('https://')) {
    if (isAllowedHostname(src)) {
      return src;
    }
    // If hostname is not allowed, return placeholder to avoid Next.js Image error
    return defaultSrc;
  }

  // If it doesn't match any valid format, return default
  return defaultSrc;
}
