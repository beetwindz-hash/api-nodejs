// ============================================================================
// src/modules/cooks/application/use-cases/get-cook-profile.use-case.ts
// ============================================================================
import { ICookRepository } from "../../domain/repositories/cook.repository";
import { IUserRepository } from "@modules/auth/domain/repositories/user.repository";
import { NotFoundError } from "@core/errors";

export class GetCookProfileUseCase {
  constructor(
    private readonly cookRepository: ICookRepository,
    private readonly userRepository: IUserRepository
  ) {}

  async execute(cookId: string) {
    const cook = await this.cookRepository.findById(cookId);
    if (!cook) {
      throw new NotFoundError("Cook profile not found");
    }

    const user = await this.userRepository.findById(cook.userId);
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
