// ============================================================================
// src/modules/notifications/infrastructure/repositories/notification-preferences.repository.impl.ts
// ============================================================================
import { INotificationPreferencesRepository } from "../../domain/repositories/notification-preferences.repository";
import { NotificationPreferencesEntity } from "../../domain/entities/notification-preferences.entity";
import { NotificationPreferencesModel } from "../models/notification-preferences.model";
import { NotificationPreferencesMapper } from "../mappers/notification-preferences.mapper";
import mongoose from "mongoose";

export class NotificationPreferencesRepositoryImpl
  implements INotificationPreferencesRepository
{
  async findByUserId(
    userId: string
  ): Promise<NotificationPreferencesEntity | null> {
    const doc = await NotificationPreferencesModel.findOne({
      userId: new mongoose.Types.ObjectId(userId),
    });
    return doc ? NotificationPreferencesMapper.toDomain(doc) : null;
  }

  async save(
    preferences: NotificationPreferencesEntity
  ): Promise<NotificationPreferencesEntity> {
    const data = NotificationPreferencesMapper.toPersistence(preferences);

    if (preferences.id) {
      const updated = await NotificationPreferencesModel.findOneAndUpdate(
        {
          _id: preferences.id,
          userId: new mongoose.Types.ObjectId(preferences.userId),
        },
        data,
        { new: true, upsert: true }
      );
      return NotificationPreferencesMapper.toDomain(updated!);
    }

    const created = await NotificationPreferencesModel.create(data);
    return NotificationPreferencesMapper.toDomain(created);
  }
}

