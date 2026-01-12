// ============================================================================
// src/modules/auth/application/use-cases/reset-password.use-case.ts
// ============================================================================
import { IUserRepository } from "../../domain/repositories/user.repository";
import { AuthDomainService } from "../../domain/services/auth.service";
import { Password } from "../../domain/value-objects/password.vo";
import { ResetPasswordDto } from "../dto/auth.dto";
import { HashUtil } from "@core/utils";
import { NotFoundError, BadRequestError } from "@core/errors";

export class ResetPasswordUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(dto: ResetPasswordDto): Promise<void> {
    if (dto.password !== dto.confirmPassword) {
      throw new BadRequestError("Passwords do not match");
    }

    const user = await this.userRepository.findByPasswordResetToken(dto.token);
    if (!user) {
      throw new NotFoundError("Invalid reset token");
    }

    await AuthDomainService.validatePasswordResetToken(user);

    const password = Password.create(dto.password);
    const hashedPassword = await HashUtil.hash(password.getValue());

    user.updatePassword(hashedPassword);
    user.clearPasswordResetToken();
    await this.userRepository.save(user);
  }
}
