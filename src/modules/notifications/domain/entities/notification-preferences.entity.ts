// ============================================================================
// src/modules/notifications/domain/entities/notification-preferences.entity.ts
// ============================================================================
import { NotificationType, Timestamp } from "@core/types";

export type Channel = "push" | "email";

export type ChannelPreferences = Record<NotificationType, boolean>;

export interface NotificationPreferencesProps extends Timestamp {
  id: string;
  userId: string;
  push: ChannelPreferences;
  email: ChannelPreferences;
}

export interface UpdatePreferencesInput {
  push?: Partial<ChannelPreferences>;
  email?: Partial<ChannelPreferences>;
}

export class NotificationPreferencesEntity {
  private constructor(private props: NotificationPreferencesProps) {}

  static createDefault(userId: string): NotificationPreferencesEntity {
    const defaultChannelPrefs: ChannelPreferences = {
      order_update: true,
      new_order: true,
      message: true,
      review: true,
      application_update: true,
    };

    const now = new Date();

    return new NotificationPreferencesEntity({
      id: "",
      userId,
      push: { ...defaultChannelPrefs },
      email: { ...defaultChannelPrefs },
      createdAt: now,
      updatedAt: now,
    });
  }

  static fromPersistence(
    props: NotificationPreferencesProps
  ): NotificationPreferencesEntity {
    return new NotificationPreferencesEntity(props);
  }

  get id(): string {
    return this.props.id;
  }

  get userId(): string {
    return this.props.userId;
  }

  get push(): ChannelPreferences {
    return this.props.push;
  }

  get email(): ChannelPreferences {
    return this.props.email;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  update(input: UpdatePreferencesInput): void {
    if (input.push) {
      this.props.push = {
        ...this.props.push,
        ...input.push,
      };
    }

    if (input.email) {
      this.props.email = {
        ...this.props.email,
        ...input.email,
      };
    }

    this.props.updatedAt = new Date();
  }

  isEnabled(type: NotificationType, channel: Channel): boolean {
    const prefs = channel === "push" ? this.props.push : this.props.email;
    return prefs[type];
  }

  toJSON() {
    return {
      id: this.props.id,
      userId: this.props.userId,
      push: this.props.push,
      email: this.props.email,
      createdAt: this.props.createdAt,
      updatedAt: this.props.updatedAt,
    };
  }
}

