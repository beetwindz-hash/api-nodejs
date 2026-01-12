// ============================================================================
// src/modules/users/infrastructure/mappers/user-profile.mapper.ts
// ============================================================================
import { UserProfileEntity } from "../../domain/entities/user-profile.entity";
import { IUserProfileDocument } from "../models/user-profile.model";

export class UserProfileMapper {
  static toDomain(document: IUserProfileDocument): UserProfileEntity {
    return UserProfileEntity.fromPersistence({
      id: document._id.toString(),
      userId: document.userId.toString(),
      phone: document.phone,
      address: document.address,
      preferences: document.preferences,
      createdAt: document.createdAt,
      updatedAt: document.updatedAt,
    });
  }

  static toPersistence(
    entity: UserProfileEntity
  ): Partial<IUserProfileDocument> {
    return {
      userId: entity.userId as any,
      phone: entity.phone,
      address: entity.address,
      preferences: entity.preferences,
    };
  }
}
