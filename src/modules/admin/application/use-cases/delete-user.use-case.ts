// ============================================================================
// src/modules/admin/application/use-cases/delete-user.use-case.ts
// ============================================================================
import { IAdminRepository } from "../../domain/repositories/admin.repository";

export class DeleteUserUseCase {
  constructor(private readonly adminRepository: IAdminRepository) {}

  async execute(id: string) {
    await this.adminRepository.deleteUser(id);
    return { deleted: true };
  }
}

