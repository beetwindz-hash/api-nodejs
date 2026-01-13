// ============================================================================
// src/modules/dishes/application/use-cases/search-dishes.use-case.ts
// ============================================================================
import { IDishRepository } from "../../domain/repositories/dish.repository";
import { SearchDishesDto } from "../dto/dish.dto";
import { PaginationUtil } from "@core/utils";

export class SearchDishesUseCase {
  constructor(private readonly dishRepository: IDishRepository) {}

  async execute(dto: SearchDishesDto) {
    const pagination = PaginationUtil.getPagination({
      page: dto.page,
      limit: dto.limit,
    });

    const filters = {
      cookId: dto.cookId,
      category: dto.category,
      cuisine: dto.cuisine,
      minPrice: dto.minPrice,
      maxPrice: dto.maxPrice,
      spiceLevel: dto.spiceLevel,
      isVegetarian: dto.isVegetarian,
      isVegan: dto.isVegan,
      isGlutenFree: dto.isGlutenFree,
      isDairyFree: dto.isDairyFree,
      isHalal: dto.isHalal,
      minRating: dto.minRating,
      tags: dto.tags,
      search: dto.search,
      status: "active" as const,
      isAvailable: true,
    };

    const { dishes, total } = await this.dishRepository.search(filters, {
      page: pagination.page,
      limit: pagination.limit,
      sort: dto.sort || "newest",
    });

    return {
      dishes: dishes.map((dish) => dish.toJSON()),
      pagination: {
        page: pagination.page,
        limit: pagination.limit,
        total,
        totalPages: Math.ceil(total / pagination.limit),
      },
    };
  }
}
