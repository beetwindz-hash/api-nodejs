// ============================================================================
// src/modules/dishes/domain/services/dish-pricing.service.ts
// ============================================================================
import { BusinessRuleViolationError } from "@core/errors";

export class DishPricingService {
  static validatePricing(price: number, originalPrice?: number): void {
    if (price <= 0) {
      throw new BusinessRuleViolationError("Price must be greater than 0");
    }

    if (originalPrice) {
      if (originalPrice < price) {
        throw new BusinessRuleViolationError(
          "Original price must be greater than or equal to current price"
        );
      }

      const discountPercentage =
        ((originalPrice - price) / originalPrice) * 100;
      if (discountPercentage > 90) {
        throw new BusinessRuleViolationError("Discount cannot exceed 90%");
      }
    }
  }

  static calculateBulkDiscount(basePrice: number, quantity: number): number {
    if (quantity >= 10) {
      return basePrice * 0.85; // 15% discount for 10+ items
    }
    if (quantity >= 5) {
      return basePrice * 0.9; // 10% discount for 5+ items
    }
    return basePrice;
  }
}
