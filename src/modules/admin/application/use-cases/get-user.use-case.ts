// ============================================================================
// src/modules/admin/application/use-cases/get-user.use-case.ts
// ============================================================================
import { IAdminRepository } from "../../domain/repositories/admin.repository";
import { NotFoundError } from "@core/errors";

export class GetAdminUserUseCase {
  constructor(private readonly adminRepository: IAdminRepository) {}

  async execute(id: string) {
    const user = await this.adminRepository.getUserById(id);

    if (!user) {
      throw new NotFoundError("User not found");
    }

    return user;
  }
}

