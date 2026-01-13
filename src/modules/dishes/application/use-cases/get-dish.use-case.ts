// ============================================================================
// src/modules/dishes/application/use-cases/get-dish.use-case.ts
// ============================================================================
import { IDishRepository } from "../../domain/repositories/dish.repository";
import { ICookRepository } from "@modules/cooks/domain/repositories/cook.repository";
import { NotFoundError } from "@core/errors";

export class GetDishUseCase {
  constructor(
    private readonly dishRepository: IDishRepository,
    private readonly cookRepository: ICookRepository
  ) {}

  async execute(dishId: string) {
    const dish = await this.dishRepository.findById(dishId);
    if (!dish) {
      throw new NotFoundError("Dish not found");
    }

    dish.incrementViewCount();
    await this.dishRepository.save(dish);

    const cook = await this.cookRepository.findById(dish.cookId);

    return {
      ...dish.toJSON(),
      cook: cook
        ? {
            id: cook.id,
            businessName: cook.businessName,
            rating: cook.rating,
            totalReviews: cook.totalReviews,
            location: cook.location,
          }
        : null,
    };
  }
}
