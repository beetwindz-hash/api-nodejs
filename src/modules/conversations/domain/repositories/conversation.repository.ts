// ============================================================================
// src/modules/conversations/domain/repositories/conversation.repository.ts
// ============================================================================
import { ConversationEntity } from "../entities/conversation.entity";
import { MessageEntity } from "../entities/message.entity";
import { QueryOptions } from "@core/types";

export interface IConversationRepository {
  findById(id: string): Promise<ConversationEntity | null>;
  findByUser(
    userId: string,
    options: QueryOptions
  ): Promise<{ conversations: ConversationEntity[]; total: number }>;
  findBetweenUsers(
    cookId: string,
    customerId: string,
    dishName?: string
  ): Promise<ConversationEntity | null>;
  save(conversation: ConversationEntity): Promise<ConversationEntity>;
}

export interface IMessageRepository {
  findByConversationId(
    conversationId: string,
    options: QueryOptions
  ): Promise<{ messages: MessageEntity[]; total: number }>;
  save(message: MessageEntity): Promise<MessageEntity>;
  markConversationMessagesRead(
    conversationId: string,
    userId: string
  ): Promise<void>;
}

