// ============================================================================
// src/modules/auth/infrastructure/mappers/user.mapper.ts
// ============================================================================
import { UserEntity } from "../../domain/entities/user.entity";
import { IUserDocument } from "../models/user.model";

export class UserMapper {
  static toDomain(document: IUserDocument): UserEntity {
    return UserEntity.fromPersistence({
      id: document._id.toString(),
      email: document.email,
      password: document.password,
      name: document.name,
      role: document.role,
      avatarUrl: document.avatarUrl,
      isAdmin: document.isAdmin,
      isVerified: document.isVerified,
      isActive: document.isActive,
      refreshToken: document.refreshToken,
      passwordResetToken: document.passwordResetToken,
      passwordResetExpires: document.passwordResetExpires,
      createdAt: document.createdAt,
      updatedAt: document.updatedAt,
    });
  }

  static toPersistence(entity: UserEntity): Partial<IUserDocument> {
    return {
      email: entity.email,
      password: entity.password,
      name: entity.name,
      role: entity.role,
      avatarUrl: entity.avatarUrl,
      isAdmin: entity.isAdmin,
      isVerified: entity.isVerified,
      isActive: entity.isActive,
      refreshToken: entity.refreshToken,
      passwordResetToken: entity.passwordResetToken,
      passwordResetExpires: entity.passwordResetExpires,
    };
  }
}
