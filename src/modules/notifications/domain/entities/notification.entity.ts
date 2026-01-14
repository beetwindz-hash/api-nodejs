// ============================================================================
// src/modules/notifications/domain/entities/notification.entity.ts
// ============================================================================
import { NotificationType, Timestamp } from "@core/types";

export interface NotificationProps extends Timestamp {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  data?: Record<string, unknown> | null;
  isRead: boolean;
  readAt?: Date | null;
}

export class NotificationEntity {
  private constructor(private props: NotificationProps) {}

  static create(props: {
    userId: string;
    type: NotificationType;
    title: string;
    message: string;
    data?: Record<string, unknown> | null;
  }): NotificationEntity {
    const now = new Date();

    return new NotificationEntity({
      id: "",
      userId: props.userId,
      type: props.type,
      title: props.title,
      message: props.message,
      data: props.data ?? null,
      isRead: false,
      readAt: null,
      createdAt: now,
      updatedAt: now,
    });
  }

  static fromPersistence(props: NotificationProps): NotificationEntity {
    return new NotificationEntity(props);
  }

  get id(): string {
    return this.props.id;
  }

  get userId(): string {
    return this.props.userId;
  }

  get type(): NotificationType {
    return this.props.type;
  }

  get title(): string {
    return this.props.title;
  }

  get message(): string {
    return this.props.message;
  }

  get data(): Record<string, unknown> | null | undefined {
    return this.props.data;
  }

  get isRead(): boolean {
    return this.props.isRead;
  }

  get readAt(): Date | null | undefined {
    return this.props.readAt;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  markAsRead(): void {
    if (!this.props.isRead) {
      this.props.isRead = true;
      this.props.readAt = new Date();
      this.props.updatedAt = new Date();
    }
  }

  toJSON() {
    return {
      id: this.props.id,
      userId: this.props.userId,
      type: this.props.type,
      title: this.props.title,
      message: this.props.message,
      data: this.props.data ?? null,
      isRead: this.props.isRead,
      readAt: this.props.readAt ?? null,
      createdAt: this.props.createdAt,
      updatedAt: this.props.updatedAt,
    };
  }
}

