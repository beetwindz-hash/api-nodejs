// ============================================================================
// src/modules/dishes/domain/services/dish-validation.service.ts
// ============================================================================
import { DishEntity } from "../entities/dish.entity";
import { BusinessRuleViolationError } from "@core/errors";

export class DishValidationService {
  static canPublish(dish: DishEntity): void {
    if (!dish.name || dish.name.trim().length < 3) {
      throw new BusinessRuleViolationError(
        "Dish name must be at least 3 characters"
      );
    }

    if (!dish.description || dish.description.trim().length < 10) {
      throw new BusinessRuleViolationError(
        "Dish description must be at least 10 characters"
      );
    }

    if (dish.images.length === 0) {
      throw new BusinessRuleViolationError("At least one image is required");
    }

    if (dish.price <= 0) {
      throw new BusinessRuleViolationError("Valid price is required");
    }

    if (dish.preparationTime <= 0) {
      throw new BusinessRuleViolationError(
        "Preparation time must be specified"
      );
    }

    if (dish.ingredients.length === 0) {
      throw new BusinessRuleViolationError(
        "At least one ingredient is required"
      );
    }
  }

  static validateIngredients(ingredients: string[]): void {
    if (!ingredients || ingredients.length === 0) {
      throw new BusinessRuleViolationError(
        "At least one ingredient is required"
      );
    }

    if (ingredients.length > 50) {
      throw new BusinessRuleViolationError("Maximum 50 ingredients allowed");
    }

    for (const ingredient of ingredients) {
      if (!ingredient.trim()) {
        throw new BusinessRuleViolationError("Ingredient cannot be empty");
      }
    }
  }
}
