// ============================================================================
// src/modules/users/domain/repositories/user-profile.repository.ts
// ============================================================================
import { UserProfileEntity } from "../entities/user-profile.entity";

export interface IUserProfileRepository {
  findById(id: string): Promise<UserProfileEntity | null>;
  findByUserId(userId: string): Promise<UserProfileEntity | null>;
  save(profile: UserProfileEntity): Promise<UserProfileEntity>;
  update(
    id: string,
    data: Partial<UserProfileEntity>
  ): Promise<UserProfileEntity>;
}
