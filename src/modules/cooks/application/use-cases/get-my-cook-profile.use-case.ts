// ============================================================================
// src/modules/cooks/application/use-cases/get-my-cook-profile.use-case.ts
// ============================================================================
import { ICookRepository } from "../../domain/repositories/cook.repository";
import { IUserRepository } from "@modules/auth/domain/repositories/user.repository";
import { NotFoundError } from "@core/errors";

export class GetMyCookProfileUseCase {
  constructor(
    private readonly cookRepository: ICookRepository,
    private readonly userRepository: IUserRepository
  ) {}

  async execute(userId: string) {
    const cook = await this.cookRepository.findByUserId(userId);
    if (!cook) {
      throw new NotFoundError("Cook profile not found");
    }

    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundError("User not found");
    }

    return {
      ...cook.toJSON(),
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        avatarUrl: user.avatarUrl,
      },
    };
  }
}
