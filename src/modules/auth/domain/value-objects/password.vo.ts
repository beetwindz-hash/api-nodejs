// ============================================================================
// src/modules/auth/domain/value-objects/password.vo.ts
// ============================================================================
import { ValidationError } from "@core/errors";

export class Password {
  private readonly value: string;

  private constructor(password: string) {
    this.value = password;
  }

  static create(password: string): Password {
    if (!password) {
      throw new ValidationError("Password is required");
    }

    if (password.length < 8) {
      throw new ValidationError("Password must be at least 8 characters long");
    }

    if (!/(?=.*[a-z])/.test(password)) {
      throw new ValidationError(
        "Password must contain at least one lowercase letter"
      );
    }

    if (!/(?=.*[A-Z])/.test(password)) {
      throw new ValidationError(
        "Password must contain at least one uppercase letter"
      );
    }

    if (!/(?=.*\d)/.test(password)) {
      throw new ValidationError("Password must contain at least one number");
    }

    return new Password(password);
  }

  getValue(): string {
    return this.value;
  }
}
