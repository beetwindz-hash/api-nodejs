// ============================================================================
// src/modules/dishes/application/use-cases/publish-dish.use-case.ts
// ============================================================================
import { IDishRepository } from "../../domain/repositories/dish.repository";
import { DishValidationService } from "../../domain/services/dish-validation.service";
import { NotFoundError, ForbiddenError } from "@core/errors";

export class PublishDishUseCase {
  constructor(private readonly dishRepository: IDishRepository) {}

  async execute(dishId: string, cookId: string) {
    const dish = await this.dishRepository.findById(dishId);
    if (!dish) {
      throw new NotFoundError("Dish not found");
    }

    if (dish.cookId !== cookId) {
      throw new ForbiddenError("You can only publish your own dishes");
    }

    DishValidationService.canPublish(dish);
    dish.activate();

    const updated = await this.dishRepository.save(dish);
    return updated.toJSON();
  }
}
