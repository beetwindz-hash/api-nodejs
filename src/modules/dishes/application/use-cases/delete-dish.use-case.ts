// ============================================================================
// src/modules/dishes/application/use-cases/delete-dish.use-case.ts
// ============================================================================
import { IDishRepository } from "../../domain/repositories/dish.repository";
import { NotFoundError, ForbiddenError } from "@core/errors";

export class DeleteDishUseCase {
  constructor(private readonly dishRepository: IDishRepository) {}

  async execute(dishId: string, cookId: string): Promise<void> {
    const dish = await this.dishRepository.findById(dishId);
    if (!dish) {
      throw new NotFoundError("Dish not found");
    }

    if (dish.cookId !== cookId) {
      throw new ForbiddenError("You can only delete your own dishes");
    }

    await this.dishRepository.delete(dishId);
  }
}
