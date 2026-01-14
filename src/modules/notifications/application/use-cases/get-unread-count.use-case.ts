// ============================================================================
// src/modules/notifications/application/use-cases/get-unread-count.use-case.ts
// ============================================================================
import { INotificationRepository } from "../../domain/repositories/notification.repository";

export class GetUnreadCountUseCase {
  constructor(
    private readonly notificationRepository: INotificationRepository
  ) {}

  async execute(userId: string) {
    const count = await this.notificationRepository.getUnreadCount(userId);
    return { count };
  }
}

