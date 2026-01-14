// ============================================================================
// src/modules/conversations/domain/entities/message.entity.ts
// ============================================================================
import { Timestamp } from "@core/types";

export interface MessageProps extends Timestamp {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  isOrder: boolean;
  isRead: boolean;
}

export class MessageEntity {
  private constructor(private props: MessageProps) {}

  static create(props: {
    conversationId: string;
    senderId: string;
    content: string;
    isOrder?: boolean;
  }): MessageEntity {
    const now = new Date();

    return new MessageEntity({
      id: "",
      conversationId: props.conversationId,
      senderId: props.senderId,
      content: props.content,
      isOrder: props.isOrder ?? false,
      isRead: false,
      createdAt: now,
      updatedAt: now,
    });
  }

  static fromPersistence(props: MessageProps): MessageEntity {
    return new MessageEntity(props);
  }

  get id(): string {
    return this.props.id;
  }

  get conversationId(): string {
    return this.props.conversationId;
  }

  get senderId(): string {
    return this.props.senderId;
  }

  get content(): string {
    return this.props.content;
  }

  get isOrder(): boolean {
    return this.props.isOrder;
  }

  get isRead(): boolean {
    return this.props.isRead;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  markRead(): void {
    if (!this.props.isRead) {
      this.props.isRead = true;
      this.props.updatedAt = new Date();
    }
  }

  toJSON() {
    return {
      id: this.props.id,
      conversationId: this.props.conversationId,
      senderId: this.props.senderId,
      content: this.props.content,
      isOrder: this.props.isOrder,
      isRead: this.props.isRead,
      createdAt: this.props.createdAt,
      updatedAt: this.props.updatedAt,
    };
  }
}

