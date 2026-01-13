// ============================================================================
// src/modules/cooks/domain/value-objects/delivery-radius.vo.ts
// ============================================================================
import { ValidationError } from "@core/errors";

export class DeliveryRadius {
  private readonly value: number;

  private constructor(radius: number) {
    this.value = radius;
  }

  static create(radius: number): DeliveryRadius {
    if (radius <= 0) {
      throw new ValidationError("Delivery radius must be greater than 0");
    }

    if (radius > 50) {
      throw new ValidationError("Delivery radius cannot exceed 50 km");
    }

    return new DeliveryRadius(radius);
  }

  getValue(): number {
    return this.value;
  }

  isWithinRadius(distanceKm: number): boolean {
    return distanceKm <= this.value;
  }
}
