import { HttpAdminRepository } from './repository';
import type { AdminRepository } from './repository';

class AdminService {
  private repository: AdminRepository;

  constructor(repository: AdminRepository) {
    this.repository = repository;
  }

  getDashboardStats() {
    return this.repository.getDashboardStats();
  }

  getDailySales(days: number = 7) {
    return this.repository.getDailySales(days);
  }
}

// Create singleton instance
const adminRepository = new HttpAdminRepository();
export const adminService = new AdminService(adminRepository);

