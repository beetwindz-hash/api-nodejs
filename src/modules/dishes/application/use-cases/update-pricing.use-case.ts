// ============================================================================
// src/modules/dishes/application/use-cases/update-pricing.use-case.ts
// ============================================================================
import { IDishRepository } from "../../domain/repositories/dish.repository";
import { DishPricingService } from "../../domain/services/dish-pricing.service";
import { UpdatePricingDto } from "../dto/dish.dto";
import { NotFoundError, ForbiddenError } from "@core/errors";

export class UpdatePricingUseCase {
  constructor(private readonly dishRepository: IDishRepository) {}

  async execute(dishId: string, cookId: string, dto: UpdatePricingDto) {
    const dish = await this.dishRepository.findById(dishId);
    if (!dish) {
      throw new NotFoundError("Dish not found");
    }

    if (dish.cookId !== cookId) {
      throw new ForbiddenError("You can only update your own dishes");
    }

    DishPricingService.validatePricing(dto.price, dto.originalPrice);
    dish.updatePrice(dto.price, dto.originalPrice);

    const updated = await this.dishRepository.save(dish);
    return updated.toJSON();
  }
}
