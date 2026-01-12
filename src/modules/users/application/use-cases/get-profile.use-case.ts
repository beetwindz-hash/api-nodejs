// ============================================================================
// APPLICATION - Use Cases
// ============================================================================
// src/modules/users/application/use-cases/get-profile.use-case.ts
import { IUserProfileRepository } from "../../domain/repositories/user-profile.repository";
import { IUserRepository } from "@modules/auth/domain/repositories/user.repository";
import { NotFoundError } from "@core/errors";

export class GetProfileUseCase {
  constructor(
    private readonly profileRepository: IUserProfileRepository,
    private readonly userRepository: IUserRepository
  ) {}

  async execute(userId: string) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundError("User not found");
    }

    let profile = await this.profileRepository.findByUserId(userId);

    if (!profile) {
      // Create default profile
      const UserProfileEntity = (
        await import("../../domain/entities/user-profile.entity")
      ).UserProfileEntity;
      profile = UserProfileEntity.create({
        userId,
        name: user.name,
        email: user.email,
        role: user.role,
        preferences: {
          language: "en",
          notifications: true,
          newsletter: false,
        },
      });
      profile = await this.profileRepository.save(profile);
    }

    return {
      ...profile.toJSON(),
      avatarUrl: user.avatarUrl,
    };
  }
}
