// ============================================================================
// src/modules/conversations/infrastructure/repositories/conversation.repository.impl.ts
// ============================================================================
import {
  IConversationRepository,
  IMessageRepository,
} from "../../domain/repositories/conversation.repository";
import { ConversationEntity } from "../../domain/entities/conversation.entity";
import { MessageEntity } from "../../domain/entities/message.entity";
import { ConversationModel } from "../models/conversation.model";
import { MessageModel } from "../models/message.model";
import { ConversationMapper } from "../mappers/conversation.mapper";
import { MessageMapper } from "../mappers/message.mapper";
import { QueryOptions } from "@core/types";
import mongoose from "mongoose";

export class ConversationRepositoryImpl implements IConversationRepository {
  async findById(id: string): Promise<ConversationEntity | null> {
    const doc = await ConversationModel.findById(id);
    return doc ? ConversationMapper.toDomain(doc) : null;
  }

  async findByUser(
    userId: string,
    options: QueryOptions
  ): Promise<{ conversations: ConversationEntity[]; total: number }> {
    const page = options.page || 1;
    const limit = options.limit || 10;
    const skip = (page - 1) * limit;

    const userObjectId = new mongoose.Types.ObjectId(userId);

    const query = {
      $or: [{ customerId: userObjectId }, { cookId: userObjectId }],
    };

    const [docs, total] = await Promise.all([
      ConversationModel.find(query)
        .sort({ lastMessageAt: -1, createdAt: -1 })
        .skip(skip)
        .limit(limit),
      ConversationModel.countDocuments(query),
    ]);

    return {
      conversations: docs.map(ConversationMapper.toDomain),
      total,
    };
  }

  async findBetweenUsers(
    cookId: string,
    customerId: string,
    dishName?: string
  ): Promise<ConversationEntity | null> {
    const query: any = {
      cookId: new mongoose.Types.ObjectId(cookId),
      customerId: new mongoose.Types.ObjectId(customerId),
    };

    if (dishName) {
      query.dishName = dishName;
    }

    const doc = await ConversationModel.findOne(query);
    return doc ? ConversationMapper.toDomain(doc) : null;
  }

  async save(conversation: ConversationEntity): Promise<ConversationEntity> {
    const data = ConversationMapper.toPersistence(conversation);

    if (conversation.id) {
      const updated = await ConversationModel.findByIdAndUpdate(
        conversation.id,
        data,
        { new: true }
      );
      return ConversationMapper.toDomain(updated!);
    }

    const created = await ConversationModel.create(data);
    return ConversationMapper.toDomain(created);
  }
}

export class MessageRepositoryImpl implements IMessageRepository {
  async findByConversationId(
    conversationId: string,
    options: QueryOptions
  ): Promise<{ messages: MessageEntity[]; total: number }> {
    const page = options.page || 1;
    const limit = options.limit || 20;
    const skip = (page - 1) * limit;

    const query = {
      conversationId: new mongoose.Types.ObjectId(conversationId),
    };

    const [docs, total] = await Promise.all([
      MessageModel.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      MessageModel.countDocuments(query),
    ]);

    return {
      messages: docs.map(MessageMapper.toDomain),
      total,
    };
  }

  async save(message: MessageEntity): Promise<MessageEntity> {
    const data = MessageMapper.toPersistence(message);

    if (message.id) {
      const updated = await MessageModel.findByIdAndUpdate(message.id, data, {
        new: true,
      });
      return MessageMapper.toDomain(updated!);
    }

    const created = await MessageModel.create(data);
    return MessageMapper.toDomain(created);
  }

  async markConversationMessagesRead(
    conversationId: string,
    userId: string
  ): Promise<void> {
    await MessageModel.updateMany(
      {
        conversationId: new mongoose.Types.ObjectId(conversationId),
        senderId: { $ne: new mongoose.Types.ObjectId(userId) },
        isRead: false,
      },
      { isRead: true }
    );
  }
}

