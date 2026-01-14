// ============================================================================
// src/modules/notifications/domain/repositories/notification.repository.ts
// ============================================================================
import { NotificationEntity } from "../entities/notification.entity";
import { NotificationType, QueryOptions } from "@core/types";

export interface NotificationSearchFilters {
  userId: string;
  type?: NotificationType;
  isRead?: boolean;
}

export interface INotificationRepository {
  findById(id: string, userId: string): Promise<NotificationEntity | null>;
  findForUser(
    filters: NotificationSearchFilters,
    options: QueryOptions
  ): Promise<{ notifications: NotificationEntity[]; total: number }>;
  save(notification: NotificationEntity): Promise<NotificationEntity>;
  markAsRead(ids: string[], userId: string): Promise<number>;
  markAllAsRead(userId: string): Promise<number>;
  getUnreadCount(userId: string): Promise<number>;
}

