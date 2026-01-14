// ============================================================================
// src/modules/notifications/infrastructure/mappers/notification-preferences.mapper.ts
// ============================================================================
import {
  NotificationPreferencesEntity,
  NotificationPreferencesProps,
} from "../../domain/entities/notification-preferences.entity";
import { INotificationPreferencesDocument } from "../models/notification-preferences.model";

export class NotificationPreferencesMapper {
  static toDomain(
    document: INotificationPreferencesDocument
  ): NotificationPreferencesEntity {
    const props: NotificationPreferencesProps = {
      id: document._id.toString(),
      userId: document.userId.toString(),
      push: document.push,
      email: document.email,
      createdAt: document.createdAt,
      updatedAt: document.updatedAt,
    };

    return NotificationPreferencesEntity.fromPersistence(props);
  }

  static toPersistence(
    entity: NotificationPreferencesEntity
  ): Partial<INotificationPreferencesDocument> {
    return {
      userId: entity.userId as any,
      push: entity.push,
      email: entity.email,
    };
  }
}

