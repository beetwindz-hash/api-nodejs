// ============================================================================
// src/modules/cooks/application/use-cases/search-cooks.use-case.ts
// ============================================================================
import { ICookRepository } from "../../domain/repositories/cook.repository";
import { SearchCooksDto } from "../dto/cook.dto";
import { PaginationUtil } from "@core/utils";

export class SearchCooksUseCase {
  constructor(private readonly cookRepository: ICookRepository) {}

  async execute(dto: SearchCooksDto) {
    const pagination = PaginationUtil.getPagination({
      page: dto.page,
      limit: dto.limit,
    });

    const filters = {
      cuisines: dto.cuisines,
      city: dto.city,
      maxDistance: dto.maxDistance,
      minRating: dto.minRating,
      coordinates:
        dto.latitude && dto.longitude
          ? { lat: dto.latitude, lng: dto.longitude }
          : undefined,
      status: "active" as const,
      isVerified: true,
    };

    const { cooks, total } = await this.cookRepository.search(filters, {
      page: pagination.page,
      limit: pagination.limit,
    });

    return {
      cooks: cooks.map((cook) => cook.toJSON()),
      pagination: {
        page: pagination.page,
        limit: pagination.limit,
        total,
        totalPages: Math.ceil(total / pagination.limit),
      },
    };
  }
}
