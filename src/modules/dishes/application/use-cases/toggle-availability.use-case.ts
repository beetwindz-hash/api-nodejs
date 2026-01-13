// ============================================================================
// src/modules/dishes/application/use-cases/toggle-availability.use-case.ts
// ============================================================================
import { IDishRepository } from "../../domain/repositories/dish.repository";
import { NotFoundError, ForbiddenError } from "@core/errors";

export class ToggleAvailabilityUseCase {
  constructor(private readonly dishRepository: IDishRepository) {}

  async execute(dishId: string, cookId: string, isAvailable: boolean) {
    const dish = await this.dishRepository.findById(dishId);
    if (!dish) {
      throw new NotFoundError("Dish not found");
    }

    if (dish.cookId !== cookId) {
      throw new ForbiddenError("You can only update your own dishes");
    }

    dish.setAvailability(isAvailable);
    const updated = await this.dishRepository.save(dish);
    return updated.toJSON();
  }
}
