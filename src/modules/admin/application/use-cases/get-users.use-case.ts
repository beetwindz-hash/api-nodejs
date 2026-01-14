// ============================================================================
// src/modules/admin/application/use-cases/get-users.use-case.ts
// ============================================================================
import { IAdminRepository, AdminUserFilters } from "../../domain/repositories/admin.repository";
import { QueryOptions } from "@core/types";

export class GetAdminUsersUseCase {
  constructor(private readonly adminRepository: IAdminRepository) {}

  async execute(filters: AdminUserFilters, options: QueryOptions) {
    const page = options.page && options.page > 0 ? options.page : 1;
    const limit =
      options.limit && options.limit > 0 && options.limit <= 100
        ? options.limit
        : 10;

    return this.adminRepository.getUsers(filters, {
      ...options,
      page,
      limit,
    });
  }
}

