// ============================================================================
// src/modules/dishes/domain/value-objects/price.vo.ts
// ============================================================================
import { ValidationError } from "@core/errors";

export class Price {
  private readonly value: number;
  private readonly currency: string;

  private constructor(value: number, currency: string = "DZD") {
    this.value = value;
    this.currency = currency;
  }

  static create(value: number, currency: string = "DZD"): Price {
    if (value <= 0) {
      throw new ValidationError("Price must be greater than 0");
    }

    if (value > 1000000) {
      throw new ValidationError("Price cannot exceed 1,000,000");
    }

    return new Price(value, currency);
  }

  getValue(): number {
    return this.value;
  }

  getCurrency(): string {
    return this.currency;
  }

  format(): string {
    return `${this.value.toLocaleString()} ${this.currency}`;
  }

  isGreaterThan(other: Price): boolean {
    return this.value > other.value;
  }

  calculateDiscount(discountedPrice: Price): number {
    if (discountedPrice.value >= this.value) {
      return 0;
    }
    return Math.round(
      ((this.value - discountedPrice.value) / this.value) * 100
    );
  }
}
