// ============================================================================
// src/modules/notifications/application/use-cases/mark-all-notifications-read.use-case.ts
// ============================================================================
import { INotificationRepository } from "../../domain/repositories/notification.repository";

export class MarkAllNotificationsReadUseCase {
  constructor(
    private readonly notificationRepository: INotificationRepository
  ) {}

  async execute(userId: string) {
    const modifiedCount = await this.notificationRepository.markAllAsRead(
      userId
    );

    return {
      updated: modifiedCount,
    };
  }
}

