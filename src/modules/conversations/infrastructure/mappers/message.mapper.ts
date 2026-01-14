// ============================================================================
// src/modules/conversations/infrastructure/mappers/message.mapper.ts
// ============================================================================
import { MessageEntity } from "../../domain/entities/message.entity";
import { IMessageDocument } from "../models/message.model";

export class MessageMapper {
  static toDomain(document: IMessageDocument): MessageEntity {
    return MessageEntity.fromPersistence({
      id: document._id.toString(),
      conversationId: document.conversationId.toString(),
      senderId: document.senderId.toString(),
      content: document.content,
      isOrder: document.isOrder,
      isRead: document.isRead,
      createdAt: document.createdAt,
      updatedAt: document.updatedAt,
    });
  }

  static toPersistence(entity: MessageEntity): Partial<IMessageDocument> {
    return {
      conversationId: entity.conversationId as any,
      senderId: entity.senderId as any,
      content: entity.content,
      isOrder: entity.isOrder,
      isRead: entity.isRead,
    };
  }
}

