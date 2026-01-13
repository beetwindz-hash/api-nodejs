// ============================================================================
// src/modules/dishes/application/use-cases/update-dietary-info.use-case.ts
// ============================================================================
import { IDishRepository } from "../../domain/repositories/dish.repository";
import { UpdateDietaryInfoDto } from "../dto/dish.dto";
import { NotFoundError, ForbiddenError } from "@core/errors";

export class UpdateDietaryInfoUseCase {
  constructor(private readonly dishRepository: IDishRepository) {}

  async execute(dishId: string, cookId: string, dto: UpdateDietaryInfoDto) {
    const dish = await this.dishRepository.findById(dishId);
    if (!dish) {
      throw new NotFoundError("Dish not found");
    }

    if (dish.cookId !== cookId) {
      throw new ForbiddenError("You can only update your own dishes");
    }

    dish.updateDietaryInfo(dto);
    const updated = await this.dishRepository.save(dish);
    return updated.toJSON();
  }
}
