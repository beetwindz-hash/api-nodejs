// ============================================================================
// src/modules/notifications/application/use-cases/create-notification.use-case.ts
// ============================================================================
import { INotificationRepository } from "../../domain/repositories/notification.repository";
import {
  NotificationPreferencesEntity,
  Channel,
} from "../../domain/entities/notification-preferences.entity";
import { INotificationPreferencesRepository } from "../../domain/repositories/notification-preferences.repository";
import { NotificationEntity } from "../../domain/entities/notification.entity";
import { NotificationType } from "@core/types";

interface CreateNotificationInput {
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  data?: Record<string, unknown> | null;
  channel?: Channel;
}

export class CreateNotificationUseCase {
  constructor(
    private readonly notificationRepository: INotificationRepository,
    private readonly preferencesRepository: INotificationPreferencesRepository
  ) {}

  /**
   * Helper to create a notification respecting user preferences.
   * For now this only persists in the database; integration with
   * external push/email providers can be added later.
   */
  async execute(input: CreateNotificationInput) {
    const preferences =
      (await this.preferencesRepository.findByUserId(input.userId)) ??
      NotificationPreferencesEntity.createDefault(input.userId);

    // If a channel is specified, check if notifications are enabled for it.
    if (input.channel && !preferences.isEnabled(input.type, input.channel)) {
      return null;
    }

    const notification = NotificationEntity.create({
      userId: input.userId,
      type: input.type,
      title: input.title,
      message: input.message,
      data: input.data ?? null,
    });

    const saved = await this.notificationRepository.save(notification);
    return saved.toJSON();
  }
}

