// Performance monitoring utilities
export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: Map<string, number> = new Map();

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  // Start timing a performance metric
  startTiming(label: string): void {
    if (typeof window !== 'undefined' && 'performance' in window) {
      performance.mark(`${label}-start`);
    }
  }

  // End timing and record the metric
  endTiming(label: string): number {
    if (typeof window !== 'undefined' && 'performance' in window) {
      performance.mark(`${label}-end`);
      performance.measure(label, `${label}-start`, `${label}-end`);

      const measure = performance.getEntriesByName(label)[0];
      const duration = measure.duration;

      this.metrics.set(label, duration);

      // Log in development
      if (process.env.NODE_ENV === 'development') {
        console.log(`⏱️ ${label}: ${duration.toFixed(2)}ms`);
      }

      return duration;
    }
    return 0;
  }

  // Get all metrics
  getMetrics(): Record<string, number> {
    return Object.fromEntries(this.metrics);
  }

  // Clear all metrics
  clearMetrics(): void {
    this.metrics.clear();
  }

  // Measure component render time
  measureRender<T extends (...args: any[]) => any>(componentName: string, renderFn: T): T {
    return ((...args: Parameters<T>) => {
      this.startTiming(`${componentName}-render`);
      const result = renderFn(...args);
      this.endTiming(`${componentName}-render`);
      return result;
    }) as T;
  }
}

// Hook for measuring component performance
export const usePerformanceMonitor = (componentName: string) => {
  const monitor = PerformanceMonitor.getInstance();

  const startTiming = (label: string) => monitor.startTiming(`${componentName}-${label}`);
  const endTiming = (label: string) => monitor.endTiming(`${componentName}-${label}`);

  return { startTiming, endTiming };
};

// Web Vitals monitoring
export const reportWebVitals = (metric: any) => {
  if (process.env.NODE_ENV === 'development') {
    console.log('Web Vitals:', metric);
  }

  // In production, you would send this to your analytics service
  // Example: analytics.track('web-vitals', metric);
};

// Bundle analyzer helper
export const analyzeBundle = () => {
  if (process.env.NODE_ENV === 'development') {
    // This would typically be used with @next/bundle-analyzer
    console.log('Bundle analysis available in development mode');
  }
};
