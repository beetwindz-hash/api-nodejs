// ============================================================================
// src/modules/auth/infrastructure/repositories/user.repository.impl.ts
// ============================================================================
import { IUserRepository } from "../../domain/repositories/user.repository";
import { UserEntity } from "../../domain/entities/user.entity";
import { UserModel } from "../models/user.model";
import { UserMapper } from "../mappers/user.mapper";

export class UserRepositoryImpl implements IUserRepository {
  async findById(id: string): Promise<UserEntity | null> {
    const user = await UserModel.findById(id).select(
      "+password +refreshToken +passwordResetToken +passwordResetExpires"
    );

    return user ? UserMapper.toDomain(user) : null;
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await UserModel.findOne({ email }).select(
      "+password +refreshToken +passwordResetToken +passwordResetExpires"
    );

    return user ? UserMapper.toDomain(user) : null;
  }

  async findByRefreshToken(token: string): Promise<UserEntity | null> {
    const user = await UserModel.findOne({ refreshToken: token }).select(
      "+password +refreshToken +passwordResetToken +passwordResetExpires"
    );

    return user ? UserMapper.toDomain(user) : null;
  }

  async findByPasswordResetToken(token: string): Promise<UserEntity | null> {
    const user = await UserModel.findOne({ passwordResetToken: token }).select(
      "+password +refreshToken +passwordResetToken +passwordResetExpires"
    );

    return user ? UserMapper.toDomain(user) : null;
  }

  async save(user: UserEntity): Promise<UserEntity> {
    const persistenceData = UserMapper.toPersistence(user);

    if (user.id) {
      const updated = await UserModel.findByIdAndUpdate(
        user.id,
        persistenceData,
        { new: true }
      ).select(
        "+password +refreshToken +passwordResetToken +passwordResetExpires"
      );

      return UserMapper.toDomain(updated!);
    }

    const created = await UserModel.create(persistenceData);
    const populated = await UserModel.findById(created._id).select(
      "+password +refreshToken +passwordResetToken +passwordResetExpires"
    );

    return UserMapper.toDomain(populated!);
  }

  async update(id: string, data: Partial<UserEntity>): Promise<UserEntity> {
    const updated = await UserModel.findByIdAndUpdate(id, data, {
      new: true,
    }).select(
      "+password +refreshToken +passwordResetToken +passwordResetExpires"
    );

    if (!updated) {
      throw new Error("User not found");
    }

    return UserMapper.toDomain(updated);
  }

  async delete(id: string): Promise<void> {
    await UserModel.findByIdAndDelete(id);
  }

  async exists(email: string): Promise<boolean> {
    const count = await UserModel.countDocuments({ email });
    return count > 0;
  }
}
