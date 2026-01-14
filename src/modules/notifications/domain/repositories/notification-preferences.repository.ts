// ============================================================================
// src/modules/notifications/domain/repositories/notification-preferences.repository.ts
// ============================================================================
import { NotificationPreferencesEntity } from "../entities/notification-preferences.entity";

export interface INotificationPreferencesRepository {
  findByUserId(
    userId: string
  ): Promise<NotificationPreferencesEntity | null>;
  save(
    preferences: NotificationPreferencesEntity
  ): Promise<NotificationPreferencesEntity>;
}

