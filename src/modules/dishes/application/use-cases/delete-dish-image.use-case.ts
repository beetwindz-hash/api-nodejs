// ============================================================================
// src/modules/dishes/application/use-cases/delete-dish-image.use-case.ts
// ============================================================================
import { IDishRepository } from "../../domain/repositories/dish.repository";
import { NotFoundError, ForbiddenError } from "@core/errors";

export class DeleteDishImageUseCase {
  constructor(private readonly dishRepository: IDishRepository) {}

  async execute(dishId: string, cookId: string, imageUrl: string) {
    const dish = await this.dishRepository.findById(dishId);
    if (!dish) {
      throw new NotFoundError("Dish not found");
    }

    if (dish.cookId !== cookId) {
      throw new ForbiddenError("You can only update your own dishes");
    }

    dish.removeImage(imageUrl);
    const updated = await this.dishRepository.save(dish);
    return updated.toJSON();
  }
}
