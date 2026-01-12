// ============================================================================
// src/modules/auth/application/use-cases/logout.use-case.ts
// ============================================================================
import { IUserRepository } from "../../domain/repositories/user.repository";
import { NotFoundError } from "@core/errors";

export class LogoutUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(userId: string): Promise<void> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundError("User not found");
    }

    user.clearRefreshToken();
    await this.userRepository.save(user);
  }
}
