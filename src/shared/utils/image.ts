/**
 * Validates and normalizes image URLs for Next.js Image component
 * Next.js Image requires either:
 * - A relative path starting with "/"
 * - An absolute URL starting with "http://" or "https://"
 *
 * @param src - The image source URL to validate
 * @param defaultSrc - The default image path to use if src is invalid (default: '/images/default-avatar.jpg')
 * @returns A valid image URL
 */
export function getValidImageSrc(
  src: string | undefined | null,
  defaultSrc: string = '/images/default-avatar.jpg',
): string {
  if (!src) {
    return defaultSrc;
  }

  // Check if it's already a valid absolute URL
  if (src.startsWith('http://') || src.startsWith('https://')) {
    return src;
  }

  // Check if it's a valid relative path (starts with /)
  if (src.startsWith('/')) {
    return src;
  }

  // If it doesn't match any valid format, return default
  return defaultSrc;
}
