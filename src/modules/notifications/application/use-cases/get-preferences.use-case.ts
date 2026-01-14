// ============================================================================
// src/modules/notifications/application/use-cases/get-preferences.use-case.ts
// ============================================================================
import { INotificationPreferencesRepository } from "../../domain/repositories/notification-preferences.repository";
import { NotificationPreferencesEntity } from "../../domain/entities/notification-preferences.entity";

export class GetNotificationPreferencesUseCase {
  constructor(
    private readonly preferencesRepository: INotificationPreferencesRepository
  ) {}

  async execute(userId: string) {
    let preferences = await this.preferencesRepository.findByUserId(userId);

    if (!preferences) {
      preferences = NotificationPreferencesEntity.createDefault(userId);
      preferences = await this.preferencesRepository.save(preferences);
    }

    return preferences.toJSON();
  }
}

