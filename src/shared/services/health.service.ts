import { apiService } from './api.service';

export interface HealthStatus {
  status: 'healthy' | 'degraded' | 'unhealthy';
  timestamp: string;
  services: {
    api: boolean;
    database: boolean;
  };
  responseTime: number;
  version: string;
}

export class HealthService {
  private static instance: HealthService;
  private lastCheck: HealthStatus | null = null;
  private checkInterval: NodeJS.Timeout | null = null;

  static getInstance(): HealthService {
    if (!HealthService.instance) {
      HealthService.instance = new HealthService();
    }
    return HealthService.instance;
  }

  async checkHealth(): Promise<HealthStatus> {
    const startTime = Date.now();
    const timestamp = new Date().toISOString();

    try {
      // Check API connectivity
      await apiService.get('/health', {}, false); // Skip cache for health check

      const totalResponseTime = Date.now() - startTime;

      const healthStatus: HealthStatus = {
        status: 'healthy',
        timestamp,
        services: {
          api: true,
          database: true, // Keep for backward compatibility, but not actually checked
        },
        responseTime: totalResponseTime,
        version: process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0',
      };

      this.lastCheck = healthStatus;
      return healthStatus;
    } catch (error) {
      const totalResponseTime = Date.now() - startTime;

      const healthStatus: HealthStatus = {
        status: 'unhealthy',
        timestamp,
        services: {
          api: false,
          database: false,
        },
        responseTime: totalResponseTime,
        version: process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0',
      };

      this.lastCheck = healthStatus;
      return healthStatus;
    }
  }

  getLastCheck(): HealthStatus | null {
    return this.lastCheck;
  }

  startPeriodicCheck(intervalMs: number = 30000): void {
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
    }

    this.checkInterval = setInterval(async () => {
      await this.checkHealth();
    }, intervalMs);
  }

  stopPeriodicCheck(): void {
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
      this.checkInterval = null;
    }
  }

  isHealthy(): boolean {
    if (!this.lastCheck) {
      return false;
    }

    const timeSinceLastCheck = Date.now() - new Date(this.lastCheck.timestamp).getTime();
    const isRecent = timeSinceLastCheck < 60000; // 1 minute

    return this.lastCheck.status === 'healthy' && isRecent;
  }
}

export const healthService = HealthService.getInstance();
