// ============================================================================
// src/modules/admin/application/use-cases/get-stats.use-case.ts
// ============================================================================
import { IAdminRepository } from "../../domain/repositories/admin.repository";

export class GetAdminStatsUseCase {
  constructor(private readonly adminRepository: IAdminRepository) {}

  async execute() {
    return this.adminRepository.getStats();
  }
}

