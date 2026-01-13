// ============================================================================
// src/modules/cooks/domain/value-objects/phone-number.vo.ts
// ============================================================================
import { ValidationError } from "@core/errors";

export class PhoneNumber {
  private readonly value: string;

  private constructor(phone: string) {
    this.value = phone;
  }

  static create(phone: string): PhoneNumber {
    if (!phone) {
      throw new ValidationError("Phone number is required");
    }

    // Remove all non-digit characters
    const cleaned = phone.replace(/\D/g, "");

    // Algerian phone numbers: +213 followed by 9 digits
    // International format: at least 10 digits
    if (cleaned.length < 10) {
      throw new ValidationError("Phone number must be at least 10 digits");
    }

    if (cleaned.length > 15) {
      throw new ValidationError("Phone number cannot exceed 15 digits");
    }

    return new PhoneNumber(phone);
  }

  getValue(): string {
    return this.value;
  }

  getCleanedValue(): string {
    return this.value.replace(/\D/g, "");
  }

  format(): string {
    const cleaned = this.getCleanedValue();

    // Format Algerian numbers: +213 5XX XX XX XX
    if (cleaned.startsWith("213") && cleaned.length === 12) {
      return `+213 ${cleaned.slice(3, 6)} ${cleaned.slice(
        6,
        8
      )} ${cleaned.slice(8, 10)} ${cleaned.slice(10)}`;
    }

    return this.value;
  }
}
