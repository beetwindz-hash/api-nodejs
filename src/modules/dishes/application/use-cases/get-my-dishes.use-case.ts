// ============================================================================
// src/modules/dishes/application/use-cases/get-my-dishes.use-case.ts
// ============================================================================
import { IDishRepository } from "../../domain/repositories/dish.repository";
import { ICookRepository } from "@modules/cooks/domain/repositories/cook.repository";
import { NotFoundError } from "@core/errors";
import { PaginationUtil } from "@core/utils";

export class GetMyDishesUseCase {
  constructor(
    private readonly dishRepository: IDishRepository,
    private readonly cookRepository: ICookRepository
  ) {}

  async execute(userId: string, page?: number, limit?: number) {
    const cook = await this.cookRepository.findByUserId(userId);
    if (!cook) {
      throw new NotFoundError("Cook profile not found");
    }

    const pagination = PaginationUtil.getPagination({ page, limit });

    const { dishes, total } = await this.dishRepository.findByCookId(cook.id, {
      page: pagination.page,
      limit: pagination.limit,
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
