// ============================================================================
// src/modules/admin/application/use-cases/update-user-status.use-case.ts
// ============================================================================
import { IAdminRepository } from "../../domain/repositories/admin.repository";
import { NotFoundError } from "@core/errors";

export class UpdateUserStatusUseCase {
  constructor(private readonly adminRepository: IAdminRepository) {}

  async execute(id: string, isActive: boolean) {
    const updated = await this.adminRepository.setUserActiveState(
      id,
      isActive
    );

    if (!updated) {
      throw new NotFoundError("User not found");
    }

    return updated;
  }
}

