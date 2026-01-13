// ============================================================================
// src/modules/dishes/application/use-cases/create-dish.use-case.ts
// ============================================================================
import { IDishRepository } from "../../domain/repositories/dish.repository";
import { ICookRepository } from "@modules/cooks/domain/repositories/cook.repository";
import { DishEntity } from "../../domain/entities/dish.entity";
import { Price } from "../../domain/value-objects/price.vo";
import { DishPricingService } from "../../domain/services/dish-pricing.service";
import { DishValidationService } from "../../domain/services/dish-validation.service";
import { CreateDishDto } from "../dto/dish.dto";
import { NotFoundError, ForbiddenError } from "@core/errors";

export class CreateDishUseCase {
  constructor(
    private readonly dishRepository: IDishRepository,
    private readonly cookRepository: ICookRepository
  ) {}

  async execute(userId: string, dto: CreateDishDto) {
    const cook = await this.cookRepository.findByUserId(userId);
    if (!cook) {
      throw new NotFoundError("Cook profile not found");
    }

    if (!cook.isVerified) {
      throw new ForbiddenError("Only verified cooks can create dishes");
    }

    // Validate pricing
    const price = Price.create(dto.price);
    DishPricingService.validatePricing(dto.price, dto.originalPrice);

    // Validate ingredients
    DishValidationService.validateIngredients(dto.ingredients);

    const dish = DishEntity.create({
      cookId: cook.id,
      name: dto.name,
      description: dto.description,
      category: dto.category,
      cuisine: dto.cuisine,
      price: dto.price,
      originalPrice: dto.originalPrice,
      preparationTime: dto.preparationTime,
      servings: dto.servings,
      portionSize: dto.portionSize,
      spiceLevel: dto.spiceLevel,
      images: [],
      ingredients: dto.ingredients,
      dietaryInfo: dto.dietaryInfo,
      nutritionalInfo: dto.nutritionalInfo,
      tags: dto.tags || [],
      isAvailable: false,
      status: "draft",
      maxOrdersPerDay: dto.maxOrdersPerDay,
    });

    const savedDish = await this.dishRepository.save(dish);
    return savedDish.toJSON();
  }
}
