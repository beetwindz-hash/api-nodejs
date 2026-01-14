// ============================================================================
// src/modules/notifications/application/use-cases/get-notification.use-case.ts
// ============================================================================
import { INotificationRepository } from "../../domain/repositories/notification.repository";
import { NotFoundError } from "@core/errors";

export class GetNotificationUseCase {
  constructor(
    private readonly notificationRepository: INotificationRepository
  ) {}

  async execute(id: string, userId: string) {
    const notification = await this.notificationRepository.findById(
      id,
      userId
    );

    if (!notification) {
      throw new NotFoundError("Notification not found");
    }

    return notification.toJSON();
  }
}

