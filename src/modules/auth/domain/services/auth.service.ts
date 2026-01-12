// ============================================================================
// src/modules/auth/domain/services/auth.service.ts
// ============================================================================
import { HashUtil } from "@core/utils";
import { UnauthorizedError } from "@core/errors";
import { UserEntity } from "../entities/user.entity";

export class AuthDomainService {
  static async validateCredentials(
    user: UserEntity,
    password: string
  ): Promise<void> {
    if (!user.isActive) {
      throw new UnauthorizedError("Account is inactive");
    }

    const isPasswordValid = await HashUtil.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedError("Invalid credentials");
    }
  }

  static async validatePasswordResetToken(user: UserEntity): Promise<void> {
    if (!user.passwordResetToken || !user.passwordResetExpires) {
      throw new UnauthorizedError("Invalid or expired reset token");
    }

    if (user.passwordResetExpires < new Date()) {
      throw new UnauthorizedError("Password reset token has expired");
    }
  }
}
