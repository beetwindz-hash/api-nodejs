// ============================================================================
// src/core/utils/pagination.util.ts
// ============================================================================
import { QueryOptions, Pagination } from "@core/types";

export class PaginationUtil {
  static getPagination(options: QueryOptions): Pagination {
    const page = Math.max(1, options.page || 1);
    const limit = Math.min(100, Math.max(1, options.limit || 10));
    const skip = (page - 1) * limit;

    return { page, limit, skip };
  }

  static buildSortOptions(options: QueryOptions): Record<string, 1 | -1> {
    if (!options.sort) {
      return { createdAt: -1 };
    }

    const order = options.order === "asc" ? 1 : -1;
    return { [options.sort]: order };
  }
}
