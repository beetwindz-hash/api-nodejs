// ============================================================================
// src/modules/dishes/application/use-cases/update-dish.use-case.ts
// ============================================================================
import { IDishRepository } from "../../domain/repositories/dish.repository";
import { UpdateDishDto } from "../dto/dish.dto";
import { NotFoundError, ForbiddenError } from "@core/errors";

export class UpdateDishUseCase {
  constructor(private readonly dishRepository: IDishRepository) {}

  async execute(
    userId: string,
    dishId: string,
    dto: UpdateDishDto,
    cookId: string
  ) {
    const dish = await this.dishRepository.findById(dishId);
    if (!dish) {
      throw new NotFoundError("Dish not found");
    }

    if (dish.cookId !== cookId) {
      throw new ForbiddenError("You can only update your own dishes");
    }

    dish.updateDetails(dto);
    const updated = await this.dishRepository.save(dish);
    return updated.toJSON();
  }
}
