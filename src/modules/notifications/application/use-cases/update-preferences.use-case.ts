// ============================================================================
// src/modules/notifications/application/use-cases/update-preferences.use-case.ts
// ============================================================================
import { INotificationPreferencesRepository } from "../../domain/repositories/notification-preferences.repository";
import {
  NotificationPreferencesEntity,
  UpdatePreferencesInput,
} from "../../domain/entities/notification-preferences.entity";

export class UpdateNotificationPreferencesUseCase {
  constructor(
    private readonly preferencesRepository: INotificationPreferencesRepository
  ) {}

  async execute(userId: string, input: UpdatePreferencesInput) {
    let preferences = await this.preferencesRepository.findByUserId(userId);

    if (!preferences) {
      preferences = NotificationPreferencesEntity.createDefault(userId);
    }

    preferences.update(input);
    const saved = await this.preferencesRepository.save(preferences);

    return saved.toJSON();
  }
}

