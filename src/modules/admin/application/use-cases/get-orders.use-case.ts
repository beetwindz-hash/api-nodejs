// ============================================================================
// src/modules/admin/application/use-cases/get-orders.use-case.ts
// ============================================================================
import { IAdminRepository, AdminOrderFilters } from "../../domain/repositories/admin.repository";
import { QueryOptions } from "@core/types";

export class GetAdminOrdersUseCase {
  constructor(private readonly adminRepository: IAdminRepository) {}

  async execute(filters: AdminOrderFilters, options: QueryOptions) {
    const page = options.page && options.page > 0 ? options.page : 1;
    const limit =
      options.limit && options.limit > 0 && options.limit <= 100
        ? options.limit
        : 10;

    return this.adminRepository.getOrders(filters, {
      ...options,
      page,
      limit,
    });
  }
}

