// ============================================================================
// src/modules/orders/domain/value-objects/order-amount.vo.ts
// ============================================================================
import { ValidationError } from "@core/errors";

export class OrderAmount {
  private readonly value: number;

  private constructor(value: number) {
    this.value = value;
  }

  static create(value: number): OrderAmount {
    if (value < 0) {
      throw new ValidationError("Amount cannot be negative");
    }

    if (value > 1000000) {
      throw new ValidationError("Amount cannot exceed 1,000,000");
    }

    return new OrderAmount(value);
  }

  getValue(): number {
    return this.value;
  }

  add(other: OrderAmount): OrderAmount {
    return new OrderAmount(this.value + other.value);
  }

  subtract(other: OrderAmount): OrderAmount {
    const result = this.value - other.value;
    if (result < 0) {
      throw new ValidationError("Result cannot be negative");
    }
    return new OrderAmount(result);
  }

  multiply(factor: number): OrderAmount {
    return new OrderAmount(this.value * factor);
  }

  format(currency: string = "DZD"): string {
    return `${this.value.toLocaleString()} ${currency}`;
  }
}
