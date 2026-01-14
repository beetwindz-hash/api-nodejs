// ============================================================================
// src/modules/notifications/application/use-cases/mark-notifications-read.use-case.ts
// ============================================================================
import { INotificationRepository } from "../../domain/repositories/notification.repository";

export class MarkNotificationsReadUseCase {
  constructor(
    private readonly notificationRepository: INotificationRepository
  ) {}

  async execute(userId: string, ids: string[]) {
    const modifiedCount = await this.notificationRepository.markAsRead(
      ids,
      userId
    );

    return {
      updated: modifiedCount,
    };
  }
}

