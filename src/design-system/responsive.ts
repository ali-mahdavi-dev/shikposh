/**
 * Responsive Utilities
 * Mobile-first responsive helper functions and utilities
 */

import { breakpoints } from './tokens';

/**
 * Generate responsive class names
 * @param mobile - Mobile styles (default)
 * @param tablet - Tablet styles (768px+)
 * @param desktop - Desktop styles (1024px+)
 * @param wide - Wide screen styles (1280px+)
 */
export function responsive(
  mobile: string,
  tablet?: string,
  desktop?: string,
  wide?: string,
): string {
  const classes = [mobile];
  if (tablet) classes.push(`md:${tablet}`);
  if (desktop) classes.push(`lg:${desktop}`);
  if (wide) classes.push(`xl:${wide}`);
  return classes.join(' ');
}

/**
 * Generate responsive spacing
 * @param mobile - Mobile spacing
 * @param desktop - Desktop spacing
 */
export function spacing(mobile: string, desktop?: string): string {
  return desktop ? `${mobile} ${desktop ? `md:${desktop}` : ''}` : mobile;
}

/**
 * Generate responsive text size
 * @param mobile - Mobile text size
 * @param desktop - Desktop text size
 */
export function textSize(mobile: string, desktop?: string): string {
  return desktop ? `${mobile} ${desktop ? `md:${desktop}` : ''}` : mobile;
}

/**
 * Generate responsive padding
 * @param mobile - Mobile padding (e.g., 'p-4')
 * @param desktop - Desktop padding (e.g., 'p-6')
 */
export function padding(mobile: string, desktop?: string): string {
  return desktop ? `${mobile} ${desktop ? `md:${desktop}` : ''}` : mobile;
}

/**
 * Generate responsive margin
 * @param mobile - Mobile margin
 * @param desktop - Desktop margin
 */
export function margin(mobile: string, desktop?: string): string {
  return desktop ? `${mobile} ${desktop ? `md:${desktop}` : ''}` : mobile;
}

/**
 * Generate responsive gap
 * @param mobile - Mobile gap
 * @param desktop - Desktop gap
 */
export function gap(mobile: string, desktop?: string): string {
  return desktop ? `${mobile} ${desktop ? `md:${desktop}` : ''}` : mobile;
}

/**
 * Generate responsive width
 * @param mobile - Mobile width
 * @param desktop - Desktop width
 */
export function width(mobile: string, desktop?: string): string {
  return desktop ? `${mobile} ${desktop ? `md:${desktop}` : ''}` : mobile;
}

/**
 * Generate responsive height
 * @param mobile - Mobile height
 * @param desktop - Desktop height
 */
export function height(mobile: string, desktop?: string): string {
  return desktop ? `${mobile} ${desktop ? `md:${desktop}` : ''}` : mobile;
}

/**
 * Generate responsive grid columns
 * @param mobile - Mobile columns (e.g., 'grid-cols-1')
 * @param tablet - Tablet columns (e.g., 'grid-cols-2')
 * @param desktop - Desktop columns (e.g., 'grid-cols-3')
 */
export function gridCols(mobile: string, tablet?: string, desktop?: string): string {
  const classes = [mobile];
  if (tablet) classes.push(`md:${tablet}`);
  if (desktop) classes.push(`lg:${desktop}`);
  return classes.join(' ');
}

/**
 * Check if current viewport is mobile
 */
export function isMobile(): boolean {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < parseInt(breakpoints.tablet);
}

/**
 * Check if current viewport is tablet
 */
export function isTablet(): boolean {
  if (typeof window === 'undefined') return false;
  const width = window.innerWidth;
  return width >= parseInt(breakpoints.tablet) && width < parseInt(breakpoints.desktop);
}

/**
 * Check if current viewport is desktop
 */
export function isDesktop(): boolean {
  if (typeof window === 'undefined') return false;
  return window.innerWidth >= parseInt(breakpoints.desktop);
}

/**
 * Get current breakpoint
 */
export function getBreakpoint(): 'mobile' | 'tablet' | 'desktop' | 'wide' {
  if (typeof window === 'undefined') return 'mobile';
  const width = window.innerWidth;
  if (width >= parseInt(breakpoints.wide)) return 'wide';
  if (width >= parseInt(breakpoints.desktop)) return 'desktop';
  if (width >= parseInt(breakpoints.tablet)) return 'tablet';
  return 'mobile';
}

/**
 * Media query helper
 */
export const mediaQuery = {
  mobile: `(max-width: ${parseInt(breakpoints.tablet) - 1}px)`,
  tablet: `(min-width: ${breakpoints.tablet}) and (max-width: ${parseInt(breakpoints.desktop) - 1}px)`,
  desktop: `(min-width: ${breakpoints.desktop})`,
  wide: `(min-width: ${breakpoints.wide})`,
} as const;
