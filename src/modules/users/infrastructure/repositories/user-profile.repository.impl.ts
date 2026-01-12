// ============================================================================
// src/modules/users/infrastructure/repositories/user-profile.repository.impl.ts
// ============================================================================
import { IUserProfileRepository } from "../../domain/repositories/user-profile.repository";
import { UserProfileEntity } from "../../domain/entities/user-profile.entity";
import { UserProfileModel } from "../models/user-profile.model";
import { UserProfileMapper } from "../mappers/user-profile.mapper";
import mongoose from "mongoose";

export class UserProfileRepositoryImpl implements IUserProfileRepository {
  async findById(id: string): Promise<UserProfileEntity | null> {
    const profile = await UserProfileModel.findById(id);
    return profile ? UserProfileMapper.toDomain(profile) : null;
  }

  async findByUserId(userId: string): Promise<UserProfileEntity | null> {
    const profile = await UserProfileModel.findOne({
      userId: new mongoose.Types.ObjectId(userId),
    });
    return profile ? UserProfileMapper.toDomain(profile) : null;
  }

  async save(profile: UserProfileEntity): Promise<UserProfileEntity> {
    const persistenceData = UserProfileMapper.toPersistence(profile);

    if (profile.id) {
      const updated = await UserProfileModel.findByIdAndUpdate(
        profile.id,
        persistenceData,
        { new: true }
      );
      return UserProfileMapper.toDomain(updated!);
    }

    const created = await UserProfileModel.create(persistenceData);
    return UserProfileMapper.toDomain(created);
  }

  async update(
    id: string,
    data: Partial<UserProfileEntity>
  ): Promise<UserProfileEntity> {
    const updated = await UserProfileModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (!updated) {
      throw new Error("Profile not found");
    }
    return UserProfileMapper.toDomain(updated);
  }
}
