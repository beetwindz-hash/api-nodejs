// ============================================================================
// src/modules/auth/application/use-cases/get-me.use-case.ts
// ============================================================================
import { IUserRepository } from "../../domain/repositories/user.repository";
import { NotFoundError } from "@core/errors";

export class GetMeUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(userId: string) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundError("User not found");
    }

    return user.toJSON();
  }
}
