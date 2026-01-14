// ============================================================================
// src/modules/notifications/infrastructure/mappers/notification.mapper.ts
// ============================================================================
import { NotificationEntity } from "../../domain/entities/notification.entity";
import { INotificationDocument } from "../models/notification.model";

export class NotificationMapper {
  static toDomain(document: INotificationDocument): NotificationEntity {
    return NotificationEntity.fromPersistence({
      id: document._id.toString(),
      userId: document.userId.toString(),
      type: document.type,
      title: document.title,
      message: document.message,
      data: (document.data as Record<string, unknown> | null) ?? null,
      isRead: document.isRead,
      readAt: document.readAt ?? null,
      createdAt: document.createdAt,
      updatedAt: document.updatedAt,
    });
  }

  static toPersistence(
    entity: NotificationEntity
  ): Partial<INotificationDocument> {
    return {
      userId: entity.userId as any,
      type: entity.type,
      title: entity.title,
      message: entity.message,
      data: (entity.data ?? null) as any,
      isRead: entity.isRead,
      readAt: entity.readAt ?? null,
    };
  }
}

