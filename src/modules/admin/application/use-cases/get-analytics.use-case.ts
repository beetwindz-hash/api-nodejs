// ============================================================================
// src/modules/admin/application/use-cases/get-analytics.use-case.ts
// ============================================================================
import { IAdminRepository } from "../../domain/repositories/admin.repository";

export class GetAdminAnalyticsUseCase {
  constructor(private readonly adminRepository: IAdminRepository) {}

  async execute() {
    return this.adminRepository.getAnalytics();
  }
}

