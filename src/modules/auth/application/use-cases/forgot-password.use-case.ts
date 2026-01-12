// ============================================================================
// src/modules/auth/application/use-cases/forgot-password.use-case.ts
// ============================================================================
import { IUserRepository } from "../../domain/repositories/user.repository";
import { ForgotPasswordDto } from "../dto/auth.dto";
import { NotFoundError } from "@core/errors";
import crypto from "crypto";

export class ForgotPasswordUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(dto: ForgotPasswordDto): Promise<void> {
    const user = await this.userRepository.findByEmail(dto.email);
    if (!user) {
      // Don't reveal if email exists
      return;
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 3600000); // 1 hour

    user.setPasswordResetToken(resetToken, expires);
    await this.userRepository.save(user);

    // TODO: Send email with reset token
    // await emailService.sendPasswordResetEmail(user.email, resetToken);
  }
}
