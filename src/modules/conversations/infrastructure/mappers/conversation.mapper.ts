// ============================================================================
// src/modules/conversations/infrastructure/mappers/conversation.mapper.ts
// ============================================================================
import { ConversationEntity } from "../../domain/entities/conversation.entity";
import { IConversationDocument } from "../models/conversation.model";

export class ConversationMapper {
  static toDomain(document: IConversationDocument): ConversationEntity {
    return ConversationEntity.fromPersistence({
      id: document._id.toString(),
      cookId: document.cookId.toString(),
      customerId: document.customerId.toString(),
      dishName: document.dishName,
      lastMessage: document.lastMessage ?? null,
      lastMessageAt: document.lastMessageAt ?? null,
      unreadCountForCook: document.unreadCountForCook,
      unreadCountForCustomer: document.unreadCountForCustomer,
      createdAt: document.createdAt,
      updatedAt: document.updatedAt,
    });
  }

  static toPersistence(
    entity: ConversationEntity
  ): Partial<IConversationDocument> {
    return {
      cookId: entity.cookId as any,
      customerId: entity.customerId as any,
      dishName: entity.dishName,
      lastMessage: entity.lastMessage,
      lastMessageAt: entity.lastMessageAt ?? undefined,
      unreadCountForCook: entity.unreadCountForCook,
      unreadCountForCustomer: entity.unreadCountForCustomer,
    };
  }
}


