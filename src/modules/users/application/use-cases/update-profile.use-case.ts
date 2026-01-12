// ============================================================================
// src/modules/users/application/use-cases/update-profile.use-case.ts
// ============================================================================
import { IUserProfileRepository } from "../../domain/repositories/user-profile.repository";
import { IUserRepository } from "@modules/auth/domain/repositories/user.repository";
import { UpdateProfileDto } from "../dto/user.dto";
import { NotFoundError } from "@core/errors";

export class UpdateProfileUseCase {
  constructor(
    private readonly profileRepository: IUserProfileRepository,
    private readonly userRepository: IUserRepository
  ) {}

  async execute(userId: string, dto: UpdateProfileDto) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundError("User not found");
    }

    let profile = await this.profileRepository.findByUserId(userId);
    if (!profile) {
      throw new NotFoundError("Profile not found");
    }

    if (dto.name && dto.name !== user.name) {
      await this.userRepository.update(userId, { name: dto.name } as any);
    }

    profile.updateProfile({
      phone: dto.phone,
      address: dto.address,
      preferences: dto.preferences,
    });

    profile = await this.profileRepository.save(profile);

    const updatedUser = await this.userRepository.findById(userId);

    return {
      id: profile.id,
      userId: profile.userId,
      name: updatedUser!.name,
      email: updatedUser!.email,
      phone: profile.phone,
      avatarUrl: updatedUser!.avatarUrl,
      role: updatedUser!.role,
      address: profile.address,
      preferences: profile.preferences,
      createdAt: updatedUser!.createdAt,
      updatedAt: profile.updatedAt,
    };
  }
}
