// ============================================================================
// src/modules/conversations/domain/entities/conversation.entity.ts
// ============================================================================
import { Timestamp } from "@core/types";

export interface ConversationProps extends Timestamp {
  id: string;
  cookId: string;
  customerId: string;
  dishName: string;
  lastMessage: string | null;
  lastMessageAt: Date | null;
  unreadCountForCook: number;
  unreadCountForCustomer: number;
}

export class ConversationEntity {
  private constructor(private props: ConversationProps) {}

  static create(props: {
    cookId: string;
    customerId: string;
    dishName: string;
  }): ConversationEntity {
    const now = new Date();

    return new ConversationEntity({
      id: "",
      cookId: props.cookId,
      customerId: props.customerId,
      dishName: props.dishName,
      lastMessage: null,
      lastMessageAt: null,
      unreadCountForCook: 0,
      unreadCountForCustomer: 0,
      createdAt: now,
      updatedAt: now,
    });
  }

  static fromPersistence(props: ConversationProps): ConversationEntity {
    return new ConversationEntity(props);
  }

  get id(): string {
    return this.props.id;
  }

  get cookId(): string {
    return this.props.cookId;
  }

  get customerId(): string {
    return this.props.customerId;
  }

  get dishName(): string {
    return this.props.dishName;
  }

  get lastMessage(): string | null {
    return this.props.lastMessage;
  }

  get lastMessageAt(): Date | null {
    return this.props.lastMessageAt;
  }

  get unreadCountForCook(): number {
    return this.props.unreadCountForCook;
  }

  get unreadCountForCustomer(): number {
    return this.props.unreadCountForCustomer;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  updateLastMessage(message: string, at: Date, senderIsCook: boolean): void {
    this.props.lastMessage = message;
    this.props.lastMessageAt = at;

    if (senderIsCook) {
      this.props.unreadCountForCustomer += 1;
    } else {
      this.props.unreadCountForCook += 1;
    }

    this.props.updatedAt = new Date();
  }

  markMessagesRead(forCook: boolean): void {
    if (forCook) {
      this.props.unreadCountForCook = 0;
    } else {
      this.props.unreadCountForCustomer = 0;
    }
    this.props.updatedAt = new Date();
  }

  toJSON() {
    const unreadCount =
      this.props.unreadCountForCook + this.props.unreadCountForCustomer;

    return {
      id: this.props.id,
      cookId: this.props.cookId,
      customerId: this.props.customerId,
      dishName: this.props.dishName,
      lastMessage: this.props.lastMessage,
      lastMessageAt: this.props.lastMessageAt,
      unreadCount,
      createdAt: this.props.createdAt,
      updatedAt: this.props.updatedAt,
    };
  }
}

